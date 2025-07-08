function calculateFlames() {
    const name1Input = document.getElementById("name1");
    const name2Input = document.getElementById("name2");
    const errorMsg = document.getElementById("error-msg");

    let name1 = name1Input.value.trim();
    let name2 = name2Input.value.trim();

    // Clear previous error
    errorMsg.style.display = "none";
    errorMsg.innerText = "";

    // Validation
    if (name1 === "" || name2 === "") {
        errorMsg.innerText = "Please enter both names ❤️";
        errorMsg.style.display = "block";

        // Shake input for effect
        if (name1 === "") shakeInput(name1Input);
        if (name2 === "") shakeInput(name2Input);

        if (name1 === "") name1Input.focus();
        else name2Input.focus();

        return;
    }

    // Proceed with flames calculation
    const clean1 = name1.toLowerCase().replace(/ /g, '');
    const clean2 = name2.toLowerCase().replace(/ /g, '');

    let common = [...clean1].filter(char => {
        if (clean2.includes(char)) {
            clean2 = clean2.replace(char, '');
            return false;
        }
        return true;
    });

    const count = common.length + clean2.length;
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let index = 0;

    while (flames.length > 1) {
        index = (index + count - 1) % flames.length;
        flames.splice(index, 1);
    }

    const meaning = {
        F: "Friends",
        L: "Love",
        A: "Affection",
        M: "Marriage",
        E: "Enemies",
        S: "Siblings"
    };

    const resultText = meaning[flames[0]];
    animateResult(resultText);
    saveToDatabase(name1, name2, resultText);
}

const svgMap = {
    "Friends": "🤝",      // Handshake emoji for Friends
    "Love": "❤️",         // Red heart for Love
    "Affection": "😍",    // Smiling face for Affection
    "Marriage": "💍",     // Ring emoji for Marriage
    "Enemies": "👿",      // Fire emoji for Enemies
    "Siblings": "👫"      // People holding hands for Siblings
};

const colorMap = {
    "Friends": "#00cec9",
    "Love": "#e84393",
    "Affection": "#fd79a8",
    "Marriage": "#6c5ce7",
    "Enemies": "#d63031",
    "Siblings": "#fab1a0"
};
const particleEffects = {
    "Love": {
        colors: ['#e84393', '#ff6b81', '#ffffff'],
        emoji: '❤️',
        shape: 'circle',
        spread: 100
    },
    "Friends": {
        colors: ['#00cec9', '#81ecec', '#ffffff'],
        emoji: '🤝',
        shape: 'square',
        spread: 100
    },
    "Affection": {
        colors: ['#fd79a8', '#ffeaa7', '#fab1a0'],
        emoji: '😊',
        shape: 'circle',
        spread: 100
    },
    "Marriage": {
        colors: ['#6c5ce7', '#a29bfe', '#dfe6e9'],
        emoji: '💍',
        shape: 'circle',
        spread: 70
    },
    "Enemies": {
        colors: ['#d63031', '#e17055', '#ff7675'],
        emoji: '🔥',
        shape: 'square',
        spread: 60
    },
    "Siblings": {
        colors: ['#fab1a0', '#ffeaa7', '#81ecec'],
        emoji: '👫',
        shape: 'circle',
        spread: 75
    }
};

function animateResult(resultText) {
    const svgContainer = document.getElementById("result-svg");
    const resultTextElem = document.getElementById("result");

    svgContainer.innerHTML = svgMap[resultText] || "❓";
    resultTextElem.innerText = resultText;

    const color = colorMap[resultText] || "#2d3436";
    svgContainer.style.color = color;
    resultTextElem.style.color = color;

    // Reset styles
    svgContainer.style.opacity = 0;
    svgContainer.style.transform = "scale(0.8)";
    resultTextElem.style.opacity = 0;
    resultTextElem.style.transform = "scale(0.8)";

    // Animate SVG icon
    anime({
        targets: svgContainer,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        easing: 'easeOutBack'
    });

    // Animate text with a small delay
    anime({
        targets: resultTextElem,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 700,
        delay: 400,
        easing: 'easeOutBack'
    });

    setTimeout(() => {
        const effect = particleEffects[resultText] || {};
        confetti({
            particleCount: 100,
            spread: effect.spread || 60,
            origin: { y: 0.8 },
            colors: effect.colors || ['#ffffff'],
            shapes: [effect.shape || 'circle']
        });
    }, 700);


}


window.addEventListener("DOMContentLoaded", () => {
    anime({
        targets: ".container",
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: "easeOutQuad"
    });
});

function saveToDatabase(name1, name2, result) {
    fetch("insert.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name1, name2, result })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Saved:", data);
        })
        .catch(err => {
            console.error("Error saving to DB:", err);
        });
}

function shakeInput(input) {
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 400);
}
