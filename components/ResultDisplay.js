const ResultDisplay = () => {
  const ranks = ["Clinical Analyst", "Trace Architect", "Blood Whisperer", "Void Walker"];
  const randomRank = ranks[Math.floor(Math.random() * ranks.length)]; // Simple random rank for now

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.8)', color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: '600px', borderRadius: '8px', textAlign: 'center' }}>
      <h2>Case Concluded</h2>
      <p>Your performance rank:</p>
      <h3>{randomRank}</h3>
      <button onClick={() => window.location.reload()} style={{ margin: '20px', padding: '10px 20px', background: '#8b0000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Restart Case
      </button>
    </div>
  );
};

export default ResultDisplay;