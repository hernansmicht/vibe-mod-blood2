import { useEffect } from 'react';

const TimelineReconstructionPhase = ({ currentCase, setTimelineEvents, setCurrentPhase, GamePhase }) => {
  useEffect(() => {
    // Simulate timeline reconstruction completion
    setTimelineEvents(currentCase.timelineEvents);
    setTimeout(() => {
      setCurrentPhase(GamePhase.Deduction);
    }, 3000);
  }, [currentCase, setTimelineEvents, setCurrentPhase, GamePhase]);

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.8)', color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: '600px', borderRadius: '8px' }}>
      <h2>Phase 2: Timeline Reconstruction</h2>
      <ul>
        {currentCase.timelineEvents.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineReconstructionPhase;