const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    const questionData = quizData[currentQuestion];

    const questionHTML = `
        <div class="question">
            <h3>${questionData.question}</h3>
            ${questionData.options.map(option => `
                <label>
                    <input type="radio" name="answer" value="${option}">
                    ${option}
                </label><br>
            `).join('')}
        </div>
    `;

    quizContainer.innerHTML = questionHTML;
}

function submitQuiz() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        if (selectedOption.value === quizData[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Please select an option!");
    }
}

function showResult() {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = Your score is ${score} out of ${quizData.length};
}

// Load the first question when the page loads
loadQuestion();