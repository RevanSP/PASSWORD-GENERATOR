const passwordLengthSelect = document.getElementById("passwordLength");
const generateButton = document.getElementById("generatePassword");
const copyButton = document.getElementById("copyButton");
const passwordOutput = document.getElementById("passwordOutput");
const uppercaseCheckbox = document.getElementById("uppercaseCheckbox");
const numbersCheckbox = document.getElementById("numbersCheckbox");
const specialCharactersCheckbox = document.getElementById("specialCharactersCheckbox");

function generatePassword(length, useUppercase, useNumbers, useSpecialChars) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charSet = lowercaseChars;
    if (useUppercase) charSet += uppercaseChars;
    if (useNumbers) charSet += numberChars;
    if (useSpecialChars) charSet += specialChars;

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }

    return password;
}

function copyPassword() {
    passwordOutput.select();
    document.execCommand("copy");

    copyButton.textContent = "COPIED";
    setTimeout(() => {
        copyButton.textContent = "COPY";
    }, 3000);
}

passwordLengthSelect.addEventListener("change", () => {
    const selectedLength = parseInt(passwordLengthSelect.value, 10);
    updatePasswordGeneration(selectedLength);
});

document.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const selectedLength = parseInt(passwordLengthSelect.value, 10);
        updatePasswordGeneration(selectedLength);
    });
});

function updatePasswordGeneration(selectedLength) {
    if (selectedLength) {
        generateButton.disabled = false;
    } else {
        generateButton.disabled = true;
    }

    if (selectedLength && passwordOutput.value) {
        copyButton.disabled = false;
    } else {
        copyButton.disabled = true;
    }
}

generateButton.addEventListener("click", () => {
    const selectedLength = parseInt(passwordLengthSelect.value, 10);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSpecialChars = specialCharactersCheckbox.checked;

    const password = generatePassword(selectedLength, includeUppercase, includeNumbers, includeSpecialChars);
    passwordOutput.value = password;

    copyButton.disabled = false;
});

copyButton.addEventListener("click", copyPassword);

generateButton.disabled = true;
copyButton.disabled = true;
