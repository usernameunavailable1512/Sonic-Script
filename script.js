// Text-to-Speech (TTS)
const speakButton = document.getElementById("speakButton");
const ttsInput = document.getElementById("ttsInput");

speakButton.addEventListener("click", () => {
  const text = ttsInput.value;
  if (!text.trim()) {
    alert("Please enter some text to speak.");
    return;
  }

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US"; // Change language if needed
  speech.pitch = 1; // Pitch (0.5 to 2)
  speech.rate = 1; // Speed (0.5 to 2)

  window.speechSynthesis.speak(speech);
});

// Speech-to-Text (STT)
const startSTT = document.getElementById("startSTT");
const stopSTT = document.getElementById("stopSTT");
const sttOutput = document.getElementById("sttOutput");

let recognition;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  // Start Speech Recognition
  startSTT.addEventListener("click", () => {
    recognition.start();
    startSTT.disabled = true;
    stopSTT.disabled = false;
    sttOutput.placeholder = "Listening...";
  });

  // Stop Speech Recognition
  stopSTT.addEventListener("click", () => {
    recognition.stop();
    startSTT.disabled = false;
    stopSTT.disabled = true;
    sttOutput.placeholder = "Transcription complete.";
  });

  // Update Transcription
  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    sttOutput.value = transcript;
  };

  // Handle Errors
  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    sttOutput.placeholder = "Error occurred: " + event.error;
    startSTT.disabled = false;
    stopSTT.disabled = true;
  };
} else {
  alert("Sorry, your browser doesn't support speech recognition.");
}