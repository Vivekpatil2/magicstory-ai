async function generateStory() {
  const prompt = document.getElementById('storyInput').value;
  const outputDiv = document.getElementById('output');

  if (!prompt) {
    outputDiv.textContent = '❗ Please enter a story prompt!';
    return;
  }

  outputDiv.textContent = '⏳ Generating your magical story...';

  try {
    const response = await fetch('https://your-backend-url.com/api/story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    outputDiv.textContent = '✨ ' + data.story;
  } catch (error) {
    outputDiv.textContent = '⚠️ Failed to generate story. Please try again later.';
    console.error(error);
  }
}
