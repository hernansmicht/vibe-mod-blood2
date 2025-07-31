import bloodPatterns from '../lib/data/bloodPatterns.json';

const RadialTool = ({ onSelectPattern }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      zIndex: 50
    }}>
      <h3 style={{ width: '100%', textAlign: 'center', color: 'white', marginBottom: '10px' }}>Common Blood Patterns</h3>
      {bloodPatterns.map(pattern => (
        <button
          key={pattern.id}
          onClick={() => onSelectPattern(pattern.id)}
          style={{
            margin: '5px',
            padding: '10px 15px',
            background: '#8b0000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: '1 0 45%', // Two items per row
            maxWidth: '45%',
            textAlign: 'center'
          }}
        >
          {pattern.name}
        </button>
      ))}
    </div>
  );
};

export default RadialTool;