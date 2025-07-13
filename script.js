function generateStory() {
  const input = document.getElementById("storyInput").value.trim();
  const outputDiv = document.getElementById("output");

  if (input === "") {
    outputDiv.innerText = "Please enter a story prompt first!";
    return;
  }

  const response = `✨ Once upon a time, based on your prompt: "${input}", a magical story was created... (AI response will be added soon!)`;

  outputDiv.innerText = response;
}
