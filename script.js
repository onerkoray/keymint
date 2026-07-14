const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const strength = document.getElementById("strength");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}<>?";

lengthValue.textContent = lengthSlider.value;

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function getRandomCharacter(characters) {
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);

    return characters[random[0] % characters.length];
}

function shuffle(text) {
    const array = text.split("");

    for (let i = array.length - 1; i > 0; i--) {
        const random = new Uint32Array(1);
        crypto.getRandomValues(random);

        const j = random[0] % (i + 1);

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array.join("");
}

function updateStrength(length) {
    if (length < 12) {
        strength.textContent = "Strength: Weak";
        strength.style.color = "#ef4444";
    } else if (length < 20) {
        strength.textContent = "Strength: Medium";
        strength.style.color = "#f59e0b";
    } else {
        strength.textContent = "Strength: Strong";
        strength.style.color = "#22c55e";
    }
}

function generatePassword() {
    let availableChars = "";
    let password = [];

    if (uppercase.checked) {
        availableChars += upperChars;
        password.push(getRandomCharacter(upperChars));
    }

    if (lowercase.checked) {
        availableChars += lowerChars;
        password.push(getRandomCharacter(lowerChars));
    }

    if (numbers.checked) {
        availableChars += numberChars;
        password.push(getRandomCharacter(numberChars));
    }

    if (symbols.checked) {
        availableChars += symbolChars;
        password.push(getRandomCharacter(symbolChars));
    }

    if (availableChars.length === 0) {
        alert("Please select at least one character type.");
        return;
    }

    while (password.length < Number(lengthSlider.value)) {
        password.push(getRandomCharacter(availableChars));
    }

    passwordInput.value = shuffle(password.join(""));
    updateStrength(Number(lengthSlider.value));
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", async () => {
    if (passwordInput.value === "") return;

    try {
        await navigator.clipboard.writeText(passwordInput.value);

        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";

        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 1500);
    } catch (error) {
        alert("Failed to copy password.");
    }
});

// Sayfa açıldığında ilk şifreyi oluştur
generatePassword();