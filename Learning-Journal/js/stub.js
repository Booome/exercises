import { faker } from "https://esm.sh/@faker-js/faker";

const fakeImage = () =>
    faker.image.urlPicsumPhotos({
        width: 800,
        height: 600,
        grayscale: false,
        blur: 0,
    });

const fakeAvatar = async () => {
    return fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((data) => data.results[0].picture.large)
        .catch((error) => {
            console.error("Error fetching random avatar:", error);
            return "https://via.placeholder.com/150";
        });
};

const generateContent = () => {
    const content = [];
    const HEADER_LEVELS = ["h2", "h3"];

    content.push({
        type: "p",
        content: faker.lorem.sentence({ min: 20, max: 30 }),
    });

    const generateHeaderGroup = (level) => {
        const headerCount = faker.number.int({ min: 2, max: 3 });
        const headerType = HEADER_LEVELS[level];

        for (let i = 0; i < headerCount; i++) {
            content.push({
                type: headerType,
                content: faker.lorem.sentence({ min: 3, max: 8 }),
            });

            content.push({
                type: "p",
                content: faker.lorem.paragraph({ min: 5, max: 15 }),
            });

            if (
                level < HEADER_LEVELS.length - 1 &&
                faker.number.int({ min: 1, max: 100 }) > 50
            ) {
                generateHeaderGroup(level + 1);
            }
        }
    };

    const blockGroupsCount = faker.number.int({ min: 2, max: 5 });

    for (let i = 0; i < blockGroupsCount; i++) {
        if (faker.number.int({ min: 1, max: 100 }) > 30) {
            generateHeaderGroup(0);
        } else {
            content.push({
                type: "p",
                content: faker.lorem.paragraph({ min: 5, max: 15 }),
            });
        }
    }

    return content;
};

export const fetchBlogPosts = async (count = 20) => {
    return Array.from({ length: count }, () => {
        return {
            id: faker.string.uuid(),
            time: faker.date.recent({ days: 10 * 365 }).toISOString(),
            title: faker.lorem.sentence(),
            content: generateContent(),
            image: fakeImage(),
            imageAlt: faker.lorem.sentence(),
        };
    }).sort((a, b) => new Date(b.time) - new Date(a.time));
};

export const fetchAboutMe = async () => {
    return {
        name: faker.person.fullName(),
        image: faker.image.avatar(),
        imageAlt: faker.lorem.sentence(),
        bio: generateContent(),
    };
};
