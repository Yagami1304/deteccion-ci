const questions = [
    { text: "¿Ha notado palidez extrema en la piel?", image: null },
    { text: "¿El niño/a ha tenido fiebre recurrente sin causa aparente?", image: "https://medlineplus.gov/images/Fever.jpg" },
    { text: "¿Se queja de dolor en huesos o articulaciones?", image: "https://drmariosuarez.com/wp-content/uploads/2019/09/rodilla-k7iH-620x349@abc.jpg" },
    { text: "¿Presenta moretones frecuentes o sangrado sin razón?", image: null },
    { text: "¿Ha tenido inflamación en el abdomen?", image: null },
    { text: "¿Presenta pérdida de peso inexplicable?", image: null },
    { text: "¿Ha presentado ganglios linfáticos inflamados?", image: "https://medicinaysaludpublica.blob.core.windows.net.optimalcdn.com/images/2022/09/20/shutterstock110191145-scaled-e75c17fe-focus-0.3-0.05-688-364.jpg" },
    { text: "¿Ha tenido sangrado nasal frecuente?", image: "https://i1.wp.com/www.palabraenfermera.enfermerianavarra.com/wp-content/uploads/2021/03/sangrado-nasal-blog.jpg?resize=1080%2C675" },
    { text: "¿Experimenta cansancio excesivo?", image: null },
    { text: "¿Ha tenido infecciones frecuentes?", image: null },
    { text: "¿Ha notado bultos en alguna parte del cuerpo?", image: "https://www.elblogdetubebe.com/wp-content/uploads/2018/04/ganglio-inflamado-cuello-lado-derecho.jpg" },
    { text: "¿Presenta problemas para respirar?", image: null },
    { text: "¿Tiene ojos o piel amarillentos?", image: "https://example.com/ictericia.png" },
    { text: "¿Presenta dificultad para ver?", image: null },
    { text: "¿Ha tenido dolor de cabeza constante?", image: "https://example.com/dolor-cabeza.png" },
    { text: "¿Ha notado manchas moradas en la piel?", image: "https://example.com/manchas.png" },
    { text: "¿Tiene dificultad para caminar?", image: "https://example.com/dificultad-caminar.png" },
    { text: "¿Ha experimentado vómitos frecuentes?", image: "https://example.com/vomitos.png" },
    { text: "¿Tiene dolor abdominal persistente?", image: "https://example.com/dolor-abdominal.png" },
    { text: "¿Ha notado cambios en el equilibrio o la coordinación?", image: "https://example.com/equilibrio.png" }
];


let currentQuestionIndex = 0;
let yesCount = 0;
const questionContainer = document.getElementById("questionContainer");
const resultDiv = document.getElementById("resultDiv");
let answeredQuestions = 0;

function showQuestions() {
    questionContainer.innerHTML = "";
    questionContainer.style.animation = "slideIn 0.5s ease";
    answeredQuestions = 0;

    for (let i = currentQuestionIndex; i < currentQuestionIndex + 2 && i < questions.length; i++) {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionLabel = document.createElement("label");
        questionLabel.textContent = questions[i].text;
        questionDiv.appendChild(questionLabel);

        if (questions[i].image) {
            const questionImage = document.createElement("img");
            questionImage.src = questions[i].image;
            questionDiv.appendChild(questionImage);
        }

        const yesAnswer = document.createElement("div");
        yesAnswer.classList.add("answer");
        yesAnswer.textContent = "Sí";
        yesAnswer.dataset.questionIndex = i;
        yesAnswer.dataset.answer = "yes";
        yesAnswer.addEventListener("click", () => handleAnswer(i, "yes", yesAnswer, noAnswer));

        const noAnswer = document.createElement("div");
        noAnswer.classList.add("answer");
        noAnswer.textContent = "No";
        noAnswer.dataset.questionIndex = i;
        noAnswer.dataset.answer = "no";
        noAnswer.addEventListener("click", () => handleAnswer(i, "no", noAnswer, yesAnswer));

        questionDiv.appendChild(yesAnswer);
        questionDiv.appendChild(noAnswer);

        questionContainer.appendChild(questionDiv);
    }
}

function handleAnswer(index, answer, selectedAnswer, otherAnswer) {
    selectedAnswer.classList.add("selected");
    otherAnswer.classList.remove("selected");

    answeredQuestions++;

    if (answer === "yes") yesCount++;

    if (answeredQuestions === 2) {
        setTimeout(() => {
            currentQuestionIndex += 2;
            if (currentQuestionIndex < questions.length) {
                showQuestions();
            } else {
                showResult();
            }
        }, 300);
    }
}

function showResult() {
    questionContainer.style.animation = "fadeOut 0.5s ease"; // Se muestra más rápido
    setTimeout(() => {
        questionContainer.style.display = "none";
        resultDiv.style.display = "block";
        resultDiv.style.animation = "fadeIn 0.5s ease"; // Muestra el resultado más rápido
        resultDiv.style.fontSize = "24px"; // Aumenta el tamaño de la tipografía de la recomendación

        let resultMessage = "";
        if (yesCount >= 10) {
            resultMessage = "Recomendación: Consulte a un médico de inmediato.";
            resultDiv.classList.add("danger");
        } else if (yesCount >= 5) {
            resultMessage = "Recomendación: Consulte a un médico.";
            resultDiv.classList.add("warning");
        } else {
            resultMessage = "No parece haber riesgo inmediato.";
            resultDiv.classList.add("safe");
        }

        resultDiv.textContent = resultMessage;
    }, 500); // Tiempo de espera reducido
}



document.addEventListener("DOMContentLoaded", showQuestions);
