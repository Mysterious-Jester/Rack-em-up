let Score = parseInt(localStorage.getItem("quizScore")) || 0;

const scoreElement = document.getElementById("score");
if (scoreElement) {
    scoreElement.innerText = currentScore;
}

function handleChoice(isCorrect, nextUrl) {
    if (isCorrect) {
        let score = parseInt(localStorage.getItem("quizScore")) || 0;
        score += 100;
        localStorage.setItem("quizScore", Score);
    }
    
    window.location.href = nextUrl;
}


let narrationEnabled = localStorage.getItem("narrationEnabled") === "true";

function speak(text) {
    const isEnabled = localStorage.getItem("narrationEnabled") === "true";
    
    if (isEnabled) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        utterance.onend = () => console.log("Done speaking");
        utterance.onerror = (e) => console.error("TTS Error:", e);
        
        window.speechSynthesis.speak(utterance);
    }
}

function toggleNarration() {
    const checkbox = document.getElementById("tts-toggle");
    const newState = checkbox ? checkbox.checked : !narrationEnabled;
    
    localStorage.setItem("narrationEnabled", newState);
    
    if (newState) {
        speak("Narration enabled");
    } else {
        window.speechSynthesis.cancel();
    }
}


window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const questionText = document.querySelector('h1')?.innerText;
        const subText = document.querySelector('p')?.innerText;
        
        if (questionText) {
            speak(`${questionText}. ${subText || ""}`);
        }
    }, 500);
});


document.addEventListener("DOMContentLoaded", () => {
    const consent = localStorage.getItem("dataConsent");
    const banner = document.getElementById("cookie-banner");

    
    if (banner) {
        if (consent === "true") {
            banner.style.display = "none";
        } else {
            banner.style.display = "block";
        }
    }
});

function acceptData() {
    localStorage.setItem("dataConsent", "true");
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "none";
    speak("Thank you for accepting!");
}

function declineData() {
    localStorage.clear();
    localStorage.setItem("dataConsent", "false"); 
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "none";
    alert("Progress will not be saved.");
}