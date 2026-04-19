let currentScore = parseInt(localStorage.getItem("quizScore")) || 0;

const scoreElement = document.getElementById("score");
if (scoreElement) {
    scoreElement.innerText = currentScore;
}

function handleChoice(isCorrect, nextUrl) {
    if (isCorrect) {
        currentScore += 100;
        localStorage.setItem("quizScore", currentScore);
    }
    
    window.location.href = nextUrl;
}