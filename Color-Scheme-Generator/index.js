const generateButtonEl = document.getElementById("generate-button");
const colorPickerEl = document.getElementById("color-picker");

const fillColorCards = (data) => {
    const colorCardContainerEl = document.getElementById(
        "color-card-container"
    );
    colorCardContainerEl.innerHTML = data.colors
        .map((color) => {
            return `<div class="color-card" style="width: ${
                100 / data.colors.length
            }%;">
            <div class="color-card-color" style="background-color: ${
                color.hex.value
            }"></div>
            <button class="color-card-hex">${color.hex.value}</button>
        </div>`;
        })
        .join("");
};

const generateColorScheme = async () => {
    const seedColor = colorPickerEl.value.slice(1);

    const response = await fetch(
        `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=monochrome`
    );
    const data = await response.json();

    fillColorCards(data);
};

generateButtonEl.addEventListener("click", () => {
    generateColorScheme();
});

const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            const success = document.execCommand("copy");
            document.body.removeChild(textArea);
            return success;
        }
    } catch (err) {
        console.error("Copy failed:", err);
        return false;
    }
};

document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("color-card-hex")) {
        const colorHex = event.target.textContent;
        const success = await copyToClipboard(colorHex);
        if (success) {
            showCopiedFeedback(event.target);
        }
    }
});

function showCopiedFeedback(element) {
    const originalText = element.textContent;
    element.textContent = "Copied!";
    setTimeout(() => {
        element.textContent = originalText;
    }, 1000);
}

generateColorScheme();
