import { useState, useEffect } from 'react';
import PatternHotspot from './PatternHotspot';
import RadialTool from './RadialTool'; // Import the new component

const PatternRecognitionPhase = ({ currentCase, setIdentifiedPatterns, setFeedback, setCurrentPhase, identifiedPatterns, GamePhase }) => {
  const [showRadialTool, setShowRadialTool] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState(null);

  const handlePatternClick = (patternId) => {
    setActiveHotspotId(patternId);
    setShowRadialTool(true);
  };

  const handleRadialSelection = (selectedPatternId) => {
    setShowRadialTool(false);
    const hotspotPattern = currentCase.patternsInScene.find(p => p.patternId === activeHotspotId);
    const selectedPattern = bloodPatterns.find(p => p.id === selectedPatternId);

    if (hotspotPattern && selectedPattern && hotspotPattern.type === selectedPattern.name) {
      if (!identifiedPatterns.some(p => p.patternId === hotspotPattern.patternId)) {
        setIdentifiedPatterns(prev => [...prev, hotspotPattern]);
        setFeedback(`Correct: ${hotspotPattern.type}. ${hotspotPattern.feedback}`);
        if (identifiedPatterns.length + 1 === currentCase.patternsInScene.length) {
          setTimeout(() => {
            setFeedback('');
            setCurrentPhase(GamePhase.TimelineReconstruction);
          }, 2000);
        } else {
          setTimeout(() => setFeedback(''), 1500);
        }
      } else {
        setFeedback('Pattern already identified.');
        setTimeout(() => setFeedback(''), 1500);
      }
    } else {
      setFeedback('Incorrect pattern. Try again.');
      setTimeout(() => setFeedback(''), 1500);
    }
    setActiveHotspotId(null);
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <h2>Phase 1: Pattern Recognition</h2>
      {currentCase.patternsInScene.map(pattern => (
        <PatternHotspot
          key={pattern.patternId}
          pattern={pattern}
          handlePatternClick={handlePatternClick}
          identifiedPatterns={identifiedPatterns}
        />
      ))}
      {showRadialTool && <RadialTool onSelectPattern={handleRadialSelection} />}
    </div>
  );
};

export default PatternRecognitionPhase;