import { fetchBlogPosts, fetchAboutMe } from "./stub.js";

let currentPage = "home";
let blogPosts = [];
let totalBlogCount = 100;
let previewCount = 10;
let currentBlogId = "";
let aboutMe = {};

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString)
        .toLocaleDateString("en-US", options)
        .toUpperCase();
};

const getBlogPreviewEl = (category) => {
    return document.querySelector(`.${currentPage} .blog-preview.${category}`);
};

const renderBlogPreview = (blog, category) => {
    getBlogPreviewEl(category).innerHTML += `
        <button class="preview-card" data-id="${blog.id}">
            <img 
             class="blog-img" 
             src="${blog.image}" 
             alt="${blog.imageAlt}"
            />
            <div class="preview-text-container${
                category === "hero" ? " page-x-padding" : ""
            }">
                <p class="date">${formatDate(blog.time)}</p>
                <h1 class="clamp-line clamp-line-num-2">${blog.title}</h1>
                <p class="text clamp-line clamp-line-num-3">${
                    blog.content[0].content
                }</p>
            </div>
        </button>
    `;
};

const swtichMainTo = (page) => {
    document.querySelector(".main.home").classList.add("hidden");
    document.querySelector(".main.blog").classList.add("hidden");
    document.querySelector(".main.about").classList.add("hidden");
    document.querySelector(`.main.${page}`).classList.remove("hidden");

    const headerEl = document.querySelector("header");
    if (page === "home") {
        headerEl.classList.add("absolute");
    } else {
        headerEl.classList.remove("absolute");
    }

    if (page === "main") {
        previewCount = 10;
    } else {
        previewCount = 6;
    }

    currentPage = page;
};

const renderHome = () => {
    currentBlogId = "";

    fetchBlogPosts(totalBlogCount).then((posts) => {
        blogPosts = posts;

        swtichMainTo("home");
        previewCount = 10;

        getBlogPreviewEl("hero").innerHTML = "";
        getBlogPreviewEl("normal").innerHTML = "";

        blogPosts.slice(0, previewCount).forEach((blog, index) => {
            const category = index === 0 ? "hero" : "normal";
            renderBlogPreview(blog, category);
        });
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
};

const getContentHtml = (content) => {
    if (content.type === "h2") {
        return `<h2>${content.content}</h2>`;
    } else if (content.type === "h3") {
        return `<h3>${content.content}</h3>`;
    } else if (content.type === "p") {
        return `<p>${content.content}</p>`;
    } else {
        throw new Error("Invalid content type");
    }
};

const renderAboutImpl = () => {
    const aboutContainerEl = document.querySelector(".about");

    const headerHtml = `
        <div class="header">
            <img src="${aboutMe.image}" alt="${aboutMe.imageAlt}" />
            <div class="header-text">
                <h1>${aboutMe.name}</h1>
                <p>${getContentHtml(aboutMe.bio[0])}</p>
            </div>
        </div>
    `;

    const bioHtml = aboutMe.bio
        .slice(1)
        .map((content) => getContentHtml(content))
        .join("");

    aboutContainerEl.innerHTML = headerHtml + bioHtml;
};

const renderAbout = () => {
    swtichMainTo("about");

    if (Object.keys(aboutMe).length === 0) {
        fetchAboutMe().then((about) => {
            aboutMe = about;
            renderAboutImpl();
        });
    } else {
        renderAboutImpl();
    }
};

const getBlogHtml = (blog) => {
    const blogHeader = `
        <p class="date">${formatDate(blog.time)}</p>
        <h1 >${blog.title}</h1>
        <p>${getContentHtml(blog.content[0])}</p>
        <img class="blog-img" src="${blog.image}" alt="${blog.imageAlt}" />
    `;

    const blogBody = blog.content
        .slice(1)
        .map((content) => getContentHtml(content))
        .join("");

    return blogHeader + blogBody;
};

const renderBlog = (blogId) => {
    const blog = blogPosts.find((blog) => blog.id === blogId);
    const blogContainerEl = document.querySelector(".blog-container");

    currentBlogId = blogId;

    blogContainerEl.innerHTML = getBlogHtml(blog);

    blogPosts
        .filter((blog) => blog.id !== blogId)
        .slice(0, previewCount)
        .forEach((blog) => renderBlogPreview(blog, "normal"));

    window.scrollTo({ top: 0, behavior: "smooth" });
};

renderHome();

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-btn-home")) {
        renderHome();
        return;
    }

    if (event.target.classList.contains("nav-btn-about-me")) {
        renderAbout();
        return;
    }

    if (event.target.classList.contains("view-more")) {
        blogPosts
            .filter((blog) => blog.id !== currentBlogId)
            .slice(previewCount, previewCount + 9)
            .forEach((blog) => {
                renderBlogPreview(blog, "normal");
            });
        previewCount += 9;
        return;
    }

    if (event.target.classList.contains("nav-btn-about-me")) {
        return;
    }

    const previewCard = event.target.closest(".preview-card");
    if (previewCard) {
        swtichMainTo("blog");
        renderBlog(previewCard.dataset.id);
        return;
    }
});
