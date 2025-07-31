const PatternHotspot = ({ pattern, handlePatternClick, identifiedPatterns }) => {
  return (
    <div
      key={pattern.patternId}
      style={{
        position: 'absolute',
        left: pattern.location.x,
        top: pattern.location.y,
        width: pattern.location.width,
        height: pattern.location.height,
        border: identifiedPatterns.some(p => p.patternId === pattern.patternId) ? '2px solid green' : '2px dashed rgba(255, 0, 0, 0.5)',
        cursor: 'pointer',
        backgroundColor: identifiedPatterns.some(p => p.patternId === pattern.patternId) ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
      }}
      onClick={() => handlePatternClick(pattern.patternId)}
    ></div>
  );
};

export default PatternHotspot;