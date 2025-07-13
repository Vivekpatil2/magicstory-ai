async function generateStory() {
  const prompt = document.getElementById("storyInput").value;
  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = "🕐 Generating story...";

  try {
    const response = await fetch("/api/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (data.story) {
      outputDiv.innerHTML = "✨ " + data.story;
    } else {
      outputDiv.innerHTML = "❌ Failed to generate story. Try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    outputDiv.innerHTML = "⚠️ Error connecting to AI server.";
  }
}
