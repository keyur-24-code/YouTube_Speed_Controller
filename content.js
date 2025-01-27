// Function to set playback speed
const setPlaybackSpeed = (speed) => {
  const video = document.querySelector("video");
  if (video) {
    video.playbackRate = speed;
    console.log(`Playback speed set to ${speed}`);
  } else {
    console.error("No video element found.");
  }
};

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "setSpeed") {
    setPlaybackSpeed(message.speed);
  }
});
