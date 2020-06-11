const fieldsetsArr = document.querySelectorAll("fieldset");
const nextStepBtn = document.querySelector(".next-step");
const fieldsetsIndicator = document.querySelectorAll(".indicator");

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