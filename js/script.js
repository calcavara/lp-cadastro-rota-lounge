const fieldsetsArr = document.querySelectorAll("fieldset");
const nextStepBtn = document.querySelector(".next-step");
const fieldsetsIndicator = document.querySelectorAll(".indicator");
const ownerName = document.getElementById("owner-name");
const ownerCpf = document.getElementById("owner-cpf");
const ownerWpp = document.getElementById("owner-wpp");

// Form Fieldset Stepper
let currentFieldset = 0;

const stepAdvance = () => {
    if (currentFieldset < 3) {
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

// Owner Name Mask
const ownerNameMask = (inputValue) => {
    let charArr = inputValue.target.value.match(/[\u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u017E\s\']/gi);
    if (charArr != null) {
        ownerName.value = charArr.join("");
    } else {
        ownerName.value = "";
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
}

// Owner WhatsApp Mask
const ownerWppMask = (inputValue) => {
    let numbersArr = inputValue.target.value.match(/\d/g);
    if (numbersArr != null) {
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
    } else {
        ownerWpp.value = "";
    }
}

// Business Name Mask
// const 

// Adds listeners to the inputs
ownerName.addEventListener("input", ownerNameMask);
ownerCpf.addEventListener("input", ownerCpfMask);
ownerWpp.addEventListener("input", ownerWppMask);