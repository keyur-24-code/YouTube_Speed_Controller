const applySpeedButton = document.getElementById("apply-speed");
const speedDropdown = document.getElementById("speed");

// Dynamically populate the dropdown with speed options (from 0.5x to 10x with a step of 0.5)
for (let speed = 0.5; speed <= 10; speed += 0.25) {
  const option = document.createElement("option");
  option.value = speed;
  option.textContent = `${speed}x`;
  speedDropdown.appendChild(option);
}

applySpeedButton.addEventListener("click", () => {
  const selectedSpeed = parseFloat(speedDropdown.value);

  // Send the message to the content script of the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "setSpeed", speed: selectedSpeed },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error:", chrome.runtime.lastError.message);
          } else {
            console.log("Playback speed updated:", response);
          }
        }
      );
    }
  });
});
