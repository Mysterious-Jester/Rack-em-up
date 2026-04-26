let currentScore = parseInt(localStorage.getItem("quizScore")) || 0;

const scoreElement = document.getElementById("score");
if (scoreElement) {
    scoreElement.innerText = currentScore;
}

function handleChoice(isCorrect, nextUrl) {
    let score = parseInt(localStorage.getItem("quizScore")) || 0;
    if (isCorrect) {
        currentScore += 100;
        localStorage.setItem("quizScore", currentScore);
    }
    
    window.location.href = nextUrl;
}


let narrationEnabled = localStorage.getItem("narrationEnabled") === "true";


function speak(text) {
    if (narrationEnabled) {
    
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0; // Normal speed
        window.speechSynthesis.speak(utterance);
    }
}


window.addEventListener("DOMContentLoaded", () => {
    const questionText = document.querySelector('h1')?.innerText;
    const subText = document.querySelector('p')?.innerText;
    
    if (questionText) {
        speak(`${questionText}. ${subText || ""}`);
    }
});


function toggleNarration() {
    narrationEnabled = !narrationEnabled;
    localStorage.setItem("narrationEnabled", narrationEnabled);
    
    if (narrationEnabled) {
        speak("Narration enabled");
    } else {
        window.speechSynthesis.cancel();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const consent = localStorage.getItem("dataConsent");
    const banner = document.getElementById("cookie-banner");

    if (!consent && banner) {
        banner.style.display = "block";
    }
});

function acceptData() {
    localStorage.setItem("dataConsent", "true");
    document.getElementById("cookie-banner").style.display = "none";
}

function declineData() {
    localStorage.clear();
    alert("Data won't be saved, but some features might not work!");
    document.getElementById("cookie-banner").style.display = "none";
}