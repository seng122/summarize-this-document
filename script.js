document.getElementById('submit').addEventListener('click', async () => {
    const spNumber = document.getElementById('sp-number').value;
  
    if (!spNumber) {
      alert('Please enter a valid NIST SP number.');
      return;
    }
  
    const response = await fetch(`/.netlify/functions/get_summary?spNumber=${encodeURIComponent(spNumber)}`);
    const data = await response.json();
  
    if (data.error) {
      alert('An error occurred while fetching the summary. Please try again later.');
      return;
    }
  
    const summaryElement = document.getElementById('summary');
    summaryElement.innerHTML = data.summary.replace(/\n/g, '<br>');
  });
  