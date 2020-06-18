const fieldsetsArr = document.querySelectorAll("fieldset");
const nextStepBtn = document.querySelector(".next-step");
const fieldsetsIndicator = document.querySelectorAll(".indicator");
const ownerName = document.getElementById("owner-name");
const ownerCpf = document.getElementById("owner-cpf");
const ownerWpp = document.getElementById("owner-wpp");
const bizName = document.getElementById("business-name");
const zipCode = document.getElementById("business-zip-code");
const shopType = document.getElementById("shop-type");
const features = document.querySelectorAll(".check-features");
const featuresGroup = document.querySelector(".features-group");
const openDays = document.querySelectorAll(".check-days");
const openDaysGroup = document.querySelector(".atendimento");
const openingHours = document.getElementById("abertura");
const closingHours = document.getElementById("encerramento");

let cheatGo = false;

// Form Fieldset Stepper
let currentFieldset = 0;

const validationUpdate = (valiFunc, inpField, errorClass) => {
    if(valiFunc === false) {
        inpField.parentElement.classList.add(errorClass);
        inpField.style.border = "2px solid rgb(255,53,71)";
    } else {
        inpField.parentElement.classList.remove(errorClass);
        inpField.style.border = "2px solid rgb(0, 200, 81)";
    }
}

const canAdvance = (whichFieldset) => {
    let okAdvance = false;
    if (whichFieldset > 2) {
        return false;
    } else {
        switch (whichFieldset) {
            case 0:
                okAdvance = nameValidation() && cpfValidation() && wppValidation();
                break;
    
            case 1:
                okAdvance = bizNameValidation() && zipCodeValidation();
                break;
    
            case 2:
                okAdvance = shopTypeValidation() && featuresValidation();
                break;
    
            case 3:
                okAdvance = openDaysValidation() && openingHoursValidation() && closingHoursValidation();
                break;
        }
        return okAdvance;
    }
}

const stepAdvance = () => {
    switch (currentFieldset) {
        case 0:
            validationUpdate(nameValidation(), ownerName, "owner-name-error");
            validationUpdate(cpfValidation(), ownerCpf, "owner-cpf-error");
            validationUpdate(wppValidation(), ownerWpp, "owner-wpp-error");
            break;

        case 1:
            validationUpdate(bizNameValidation(), bizName, "business-name-error");
            validationUpdate(zipCodeValidation(), zipCode, "business-zip-code-error");
            break;

        case 2:
            validationUpdate(shopTypeValidation(), shopType, "shop-type-error");
            validationUpdate(featuresValidation(), featuresGroup, "features-error");
            break;

        case 3:
            validationUpdate(openDaysValidation(), openDaysGroup, "open-days-error");
            validationUpdate(openingHoursValidation(), openingHours, "hours-error");
            validationUpdate(closingHoursValidation(), closingHours, "hours-error");
            break;
    }
    if (canAdvance(currentFieldset) || cheatGo) {
        fieldsetsArr[currentFieldset].classList.toggle("fieldset-hidden");
        fieldsetsIndicator[currentFieldset].classList.toggle("active");
        fieldsetsIndicator[currentFieldset].classList.toggle("done");
        fieldsetsIndicator[currentFieldset].textContent = "✔";
        currentFieldset++;
        fieldsetsIndicator[currentFieldset].classList.toggle("active");
        fieldsetsArr[currentFieldset].classList.toggle("fieldset-hidden");
    }
};

nextStepBtn.addEventListener("click", stepAdvance, false);

// **** MASKS ****

// Owner Name Mask
const ownerNameMask = (inputValue) => {
    let charArr = inputValue.target.value.match(/[\u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u017E\s\']/gi);
    if (charArr != null) {
        ownerName.value = charArr.join("");
    } else {
        ownerName.value = "";
    }
    // If an error is indicated on validation, this gives the user a live feedback on the input been updated
    if (ownerName.parentElement.classList.contains("owner-name-error")) {
        validationUpdate(nameValidation(), ownerName, "owner-name-error");
    }
}

// Owner CPF Mask
const ownerCpfMask = (inputValue) => {
    let numbersArr = inputValue.target.value.match(/\d/g);
    if (numbersArr != null) {
        if (numbersArr[3] != undefined && numbersArr[3] != ".") {
            numbersArr.splice(3, 0, ".");
        }
        if (numbersArr[7] != undefined && numbersArr[7] != ".") {
            numbersArr.splice(7, 0, ".");
        }
        if (numbersArr[11] != undefined && numbersArr[11] != "-") {
            numbersArr.splice(11, 0, "-");
        }
        ownerCpf.value = numbersArr.slice(0, 14).join("");
    } else {
        ownerCpf.value = "";
    }
    // If an error is indicated on validation, this gives the user a live feedback on the input been updated
    if (ownerCpf.parentElement.classList.contains("owner-cpf-error")) {
        validationUpdate(cpfValidation(), ownerCpf, "owner-cpf-error");
    }
}

// Owner WhatsApp Mask
const ownerWppMask = (inputValue) => {
    let numbersArr = inputValue.target.value.match(/\d/g);
    if (numbersArr == null || numbersArr[0] == 0) {
        ownerWpp.value = "";
    } else if (numbersArr != null) {
        if (numbersArr[0] != undefined && numbersArr[0] != "(") {
            numbersArr.splice(0, 0, "(");
        }
        if (numbersArr[3] != undefined && numbersArr[3] != ".") {
            numbersArr.splice(3, 0, ") ");
        }
        if (numbersArr[9] != undefined && numbersArr[9] != "-") {
            numbersArr.splice(9, 0, "-");
        }
        ownerWpp.value = numbersArr.slice(0, 14).join("");
    }
    // If an error is indicated on validation, this gives the user a live feedback on the input been updated
    if (ownerWpp.parentElement.classList.contains("owner-wpp-error")) {
        validationUpdate(wppValidation(), ownerWpp, "owner-wpp-error");
    }
}

// Business Name Mask
const bizNameMask = (inputValue) => {
    let charArr = inputValue.target.value.match(/[\u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u017E\s\'\!\?\,\d]/gi);
    if (charArr != null) {
        bizName.value = charArr.join("");
    } else {
        bizName.value = "";
    }
    // If an error is indicated on validation, this gives the user a live feedback on the input been updated
    if (bizName.parentElement.classList.contains("business-name-error")) {
        validationUpdate(bizNameValidation(), bizName, "business-name-error");
    }
}

// Zip Code Mask
const zipCodeMask = (inputValue) => {
    let numArr = inputValue.target.value.match(/\d/g);
    if (numArr != null) {
        if (numArr[5] != undefined && numArr[5] != "-") {
            numArr.splice(5, 0, "-");
        }
        zipCode.value = numArr.join("").slice(0, 9);
    } else {
        zipCode.value = "";
    }
    // If an error is indicated on validation, this gives the user a live feedback on the input been updated
    if (zipCode.parentElement.classList.contains("business-zip-code-error")) {
        validationUpdate(zipCodeValidation(), zipCode, "business-zip-code-error");
    }
}

// Adds listeners to the form inputs
ownerName.addEventListener("input", ownerNameMask);
ownerCpf.addEventListener("input", ownerCpfMask);
ownerWpp.addEventListener("input", ownerWppMask);
bizName.addEventListener("input", bizNameMask);
zipCode.addEventListener("input", zipCodeMask);

// **** VALIDATION ****

// Name Validation
const nameValidation = () => {
    return (/\w\w+\s\w+/).test(ownerName.value);
}

// CPF Validation
const cpfValidation = () => {
    let filteredArr = ownerCpf.value.match(/\d/g);
    if (filteredArr === null) {
        filteredArr = [];
    }
    const numArr = filteredArr.map(x => Number(x));
    // First digit validation
    if (numArr.length === 11) {
        // Tests for all numbers equal
        if (numArr.every(x => x === numArr[0])) {
            return false;
        } else {
            const firstCalc = numArr.reduce((acc, currVal, currIdx) => {
                return acc + currVal * (10 - currIdx);
            }, 0) - numArr[9];
            if ((firstCalc * 10) % 11 != numArr[9]) {
                return false;
            } else { // Second digit validation
                const secondCalc = numArr.reduce((acc, currVal, currIdx) => {
                    return acc + currVal * (11 - currIdx);
                }, 0) - numArr[10];
                if ((secondCalc * 10) % 11 != numArr[10]) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    } else {
        return false;
    }
}

// WhatsApp number validation
const wppValidation = () => {
    let numArr = ownerWpp.value.match(/\d/g);
    if (numArr === null) {
        numArr = [];
    }
    if (numArr.length === 11 && numArr[2] == 9) {
        return true;
    } else {
        return false;
    }
}

// Business Name Validation
const bizNameValidation = () => {
    if(bizName.value.length > 1) {
        return true;
    } else {
        return false;
    }
}

// ZIP Code Validation
const zipCodeValidation = () => {
    if (zipCode.value.length === 9) {
        return true;
    } else {
        return false;
    }
}

// Shop Type Validation
const shopTypeValidation = () => {
    if (shopType.value === "selecionar") {
        return false;
    } else {
        return true;
    }
}

// Shop Features Validation
const featuresValidation = () => {
    const featuresArr = Array.from(features);
    return featuresArr.reduce((isAnyChecked, feature) => isAnyChecked || feature.checked, false);
}

// Open Days Validation
const openDaysValidation = () => {
    const openDaysArr = Array.from(openDays);
    return openDaysArr.reduce((isAnyChecked, day) => isAnyChecked || day.checked, false);
}

// Opening Hours Validation
const openingHoursValidation = () => {
    return /[0-2]\d\:[0-5]\d/.test(openingHours.value);
}

// Closing Hours Validation
const closingHoursValidation = () => {
    return /[0-2]\d\:[0-5]\d/.test(closingHours.value);
}