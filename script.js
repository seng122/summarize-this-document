document.getElementById('summarizer-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const spNumber = document.getElementById('sp-number').value;
    const summaryElement = document.getElementById('summary');
    summaryElement.textContent = 'Summarizing...';
  
    try {
      const summary = await getSummary(spNumber);
      summaryElement.textContent = summary;
    } catch (error) {
      summaryElement.textContent = 'Error: Unable to get the summary.';
    }
  });
  
  async function getSummary(spNumber) {
    const response = await fetch('/.netlify/functions/get_summary?spNumber=' + spNumber);
    const data = await response.json();
    return data.summary;
  }
  