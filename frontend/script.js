async function fetchPersona() {
    const wallet = document.getElementById('walletInput').value;
    const resultBox = document.getElementById('result');
    resultBox.innerHTML = 'Loading...';
  
    try {
      const response = await fetch('http://localhost:3000/persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet })
      });
  
      const data = await response.json();
  
      resultBox.innerHTML = `
        <p><strong>Wallet:</strong> ${data.wallet}</p>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Transactions:</strong> ${data.transactionsCount}</p>
        <p><strong>AI Persona:</strong> ${data.aiPersona}</p>
      `;
    } catch (err) {
      resultBox.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
  }
  