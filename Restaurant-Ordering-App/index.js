import { menuArray } from "./data.js";

let order = {};
let orderName = "";

function renderMenu(menu) {
    const menuContainer = document.querySelector(".menu-container");

    menu.forEach((item) => {
        const menuItem = getMenuItemHtml(item);
        menuContainer.appendChild(menuItem);
    });
}

function getMenuItemHtml(item) {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    const img = document.createElement("img");
    img.classList.add("menu-item-img");
    img.src = `./assets/${item.name.toLowerCase()}.png`;
    img.alt = `${item.name} image`;

    const info = (() => {
        const info = document.createElement("div");
        info.classList.add("menu-item-info");

        const title = document.createElement("p");
        title.classList.add("menu-item-title");
        title.innerText = item.name;

        const ingredients = document.createElement("p");
        ingredients.classList.add("menu-item-ingredients");
        ingredients.innerText = item.ingredients.join(", ");

        const price = document.createElement("p");
        price.classList.add("menu-item-price");
        price.innerText = `$${item.price}`;

        info.appendChild(title);
        info.appendChild(ingredients);
        info.appendChild(price);

        return info;
    })();

    const count = (() => {
        const count = document.createElement("div");
        count.classList.add("menu-item-count");

        const minusBtn = document.createElement("button");
        minusBtn.classList.add("menu-item-btn", "menu-item-minus-btn");
        minusBtn.innerText = "-";
        minusBtn.dataset.name = item.name;

        const countText = document.createElement("input");
        countText.classList.add("menu-item-count-input");
        countText.type = "number";
        countText.value = order[item.name] || "0";
        countText.min = "0";
        countText.max = "99";
        countText.dataset.name = item.name;
        countText.addEventListener("change", handleCountChange);

        const addBtn = document.createElement("button");
        addBtn.classList.add("menu-item-btn", "menu-item-add-btn");
        addBtn.innerText = "+";
        addBtn.dataset.name = item.name;

        parseInt(countText.value) <= 0
            ? (minusBtn.disabled = true)
            : (minusBtn.disabled = false);
        parseInt(countText.value) > 99
            ? (addBtn.disabled = true)
            : (addBtn.disabled = false);

        count.appendChild(minusBtn);
        count.appendChild(countText);
        count.appendChild(addBtn);

        return count;
    })();

    menuItem.appendChild(img);
    menuItem.appendChild(info);
    menuItem.appendChild(count);

    return menuItem;
}

function getMenuItemPrice(name) {
    return menuArray.find((item) => item.name === name).price;
}

function renderOrder() {
    const totalPrice = Object.entries(order).reduce(
        (acc, [name, count]) => acc + count * getMenuItemPrice(name),
        0
    );

    if (totalPrice === 0) {
        document.querySelector(".order-container").style.display = "none";
        return;
    }
    document.querySelector(".order-container").style.display = "flex";

    const totalPriceEl = document.querySelector(".total-price");
    totalPriceEl.innerText = `$${totalPrice}`;

    const listLines = document.querySelector(".order-list-lines");
    listLines.innerHTML = "";

    Object.entries(order)
        .reverse()
        .forEach(([name, count]) => {
            const line = document.createElement("div");
            line.classList.add("order-line");

            const label = document.createElement("span");
            label.classList.add("order-label");
            label.innerText = `${name}`;

            const price = document.createElement("span");
            price.classList.add("order-price");
            price.innerText = `$${getMenuItemPrice(name)} x ${count}`;

            line.appendChild(label);
            line.appendChild(price);

            listLines.appendChild(line);
        });
}

function getMenuItemCountEl(name) {
    return document.querySelector(
        `.menu-item-count-input[data-name="${name}"]`
    );
}

function getMenuItemMinusBtnEl(name) {
    return document.querySelector(`.menu-item-minus-btn[data-name="${name}"]`);
}

function getMenuItemAddBtnEl(name) {
    return document.querySelector(`.menu-item-add-btn[data-name="${name}"]`);
}

function handleMinusBtnClick(event) {
    const name = event.target.dataset.name;
    order[name] = order[name] || 0;
    order[name]--;
    if (order[name] <= 0) {
        order[name] = 0;
    }
    renderAfterOrderChange(name);
}

function handleAddBtnClick(event) {
    const name = event.target.dataset.name;
    order[name] = order[name] || 0;
    order[name]++;
    renderAfterOrderChange(name);
}

function handleCountChange(event) {
    const name = event.target.dataset.name;
    const count = parseInt(event.target.value);
    order[name] = count;
    renderAfterOrderChange(name);
}

function renderAfterOrderChange(name) {
    getMenuItemCountEl(name).value = order[name];
    getMenuItemMinusBtnEl(name).disabled = order[name] <= 0 ? true : false;
    getMenuItemAddBtnEl(name).disabled = order[name] >= 99 ? true : false;
    renderOrder();
}

function handleOrderBtnClick(event) {
    document.querySelector(".payment-modal").style.display = "flex";
}

function handlePaymentModalButtonClick(event) {
    event.preventDefault();
    const form = document.querySelector(".payment-modal");
    const isValid = form.reportValidity();

    if (!isValid) {
        return;
    }

    orderName = document.querySelector(".payment-modal-input-name").value;
    document.querySelector(".payment-modal").style.display = "none";
    document.querySelector(".order-container").style.display = "none";

    const thanksForOrder = document.querySelector(".thans-for-order");
    thanksForOrder.innerText = `Thanks, ${orderName}! Your order is on the way!`;
    thanksForOrder.style.display = "block";
}

renderMenu(menuArray);
renderOrder();

document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("menu-item-minus-btn")) {
        handleMinusBtnClick(e);
    } else if (target.classList.contains("menu-item-add-btn")) {
        handleAddBtnClick(e);
    } else if (target.classList.contains("order-btn")) {
        handleOrderBtnClick(e);
    } else if (target.classList.contains("payment-modal-button")) {
        handlePaymentModalButtonClick(e);
    }
});
