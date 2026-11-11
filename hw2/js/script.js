document.querySelector("button").addEventListener("click", gradeQuiz);

let score = 0;
let attempts = localStorage.getItem("total_attempts");

displayQ4Choices();

document.querySelector("#q9").addEventListener("input", function () {
    document.querySelector("#q9Value").textContent = this.value;
})
document.querySelector("#q9Value").textContent = document.querySelector("#q9").value;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    shuffleArray(q4ChoicesArray);

    let choicesContainer = document.querySelector("#q4Choices");
    choicesContainer.textContent = "";

    for (let choice of q4ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q4";
        input.id = choice;
        input.value = choice;
        input.className = "form-check-input me-1";

        let label = document.createElement("label");
        label.htmlFor = choice;
        label.textContent = choice;
        label.className = "form-check-label me-3";

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(label);
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}
document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;

function isFormValid() {
    let missing = [];

    if (document.querySelector("#q1").value.trim() === "") { missing.push(1); }
    if (document.querySelector("#q2").value === "") { missing.push(2); }
    if (document.querySelector("input[name=q3]:checked") === null) { missing.push(3); }
    if (document.querySelector("input[name=q4]:checked") === null) { missing.push(4); }
    if (document.querySelector("#q5").value.trim() === "") { missing.push(5); }
    if (document.querySelector("#q6").value === "") { missing.push(6); }
    if (document.querySelector("input[name=q7]:checked") === null) { missing.push(7); }
    if (document.querySelector("input[name=q8]:checked") === null) { missing.push(8); }
    if (document.querySelector("#q10").value === "") { missing.push(10); }

    if (missing.length > 0) {
        document.querySelector("#validationFdbk").textContent =
            `Please answer question(s): ${missing.join(", ")}`;
        return false;
    }
    return true;
}

function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    img.height = 32
    img.className = "me-2 align-middle";
    markContainer.appendChild(img);
}

function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "alert alert-success d-inline-block mt-3 mb-0 py-1";
    setMarkImage(index, "checkmark.png", "Checkmark");
    score += 10;
}

function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "alert alert-danger d-inline-block mt-3 mb-0 py-1";
    setMarkImage(index, "xmark.png", "X mark");
}

function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").textContent = "";

    if (!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;

    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    let selectedQ4 = document.querySelector("input[name=q4]:checked");

    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    let q5Response = document.querySelector("#q5").value.trim().toLowerCase();
    if (q5Response === "alaska") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    let q6Response = Number(document.querySelector("#q6").value);
    if (q6Response === 8) {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    let selectedQ7 = document.querySelector("input[name=q7]:checked");
    if (selectedQ7 !== null && selectedQ7.value === "Florida") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    if (document.querySelector("#q8ca").checked &&
        document.querySelector("#q8az").checked &&
        document.querySelector("#q8nm").checked &&
        document.querySelector("#q8tx").checked &&
        !document.querySelector("#q8nv").checked &&
        !document.querySelector("#q8ok").checked) {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    let q9Response = Number(document.querySelector("#q9").value);
    if (q9Response === 4) {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    let q10Response = document.querySelector("#q10").value;
    if (q10Response === "mckinley") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    let totalScore = document.querySelector("#totalScore");
    totalScore.textContent = `Total Score: ${score}`;

    if (score < 80) {
        totalScore.className = "text-danger";
    } else {
        totalScore.className = "text-success";
    }

    let congrats = document.querySelector("#congrats");
    if (score > 80) {
        congrats.textContent = "Congratulations! You Passed!";
        congrats.className = "alert alert-success d-inline-block";
    } else {
        congrats.textContent = "";
        congrats.className = "";
    }

    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
}