'use client'

import { useState, useEffect } from 'react';
import cases from '../lib/data/cases.json';
import bloodPatterns from '../lib/data/bloodPatterns.json';
import CrimeSceneDisplay from '../components/CrimeSceneDisplay';
import PatternRecognitionPhase from '../components/PatternRecognitionPhase';
import TimelineReconstructionPhase from '../components/TimelineReconstructionPhase';
import DeductionPhase from '../components/DeductionPhase';
import ResultDisplay from '../components/ResultDisplay';
import FeedbackDisplay from '../components/FeedbackDisplay'; // Import the new component

// Define Game Phases
enum GamePhase {
  PatternRecognition = 'PATTERN_RECOGNITION',
  TimelineReconstruction = 'TIMELINE_RECONSTRUCTION',
  Deduction = 'DEDUCTION',
  Result = 'RESULT',
}

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState(GamePhase.PatternRecognition);
  const [currentCase, setCurrentCase] = useState(cases[0]); // Load the first case
  const [identifiedPatterns, setIdentifiedPatterns] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [playerAnswers, setPlayerAnswers] = useState([]);
  const [feedback, setFeedback] = useState('');



  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#1a1a1a', color: '#e0e0e0' }}>
      <CrimeSceneDisplay imageUrl={currentCase.sceneImage}>
        {currentPhase === GamePhase.PatternRecognition && (
          <PatternRecognitionPhase
            currentCase={currentCase}
            setIdentifiedPatterns={setIdentifiedPatterns}
            setFeedback={setFeedback}
            setCurrentPhase={setCurrentPhase}
            identifiedPatterns={identifiedPatterns}
            GamePhase={GamePhase}
          />
        )}
        <FeedbackDisplay feedback={feedback} />
        {currentPhase === GamePhase.TimelineReconstruction && (
          <TimelineReconstructionPhase
            currentCase={currentCase}
            setTimelineEvents={setTimelineEvents}
            setCurrentPhase={setCurrentPhase}
            GamePhase={GamePhase}
          />
        )}
        {currentPhase === GamePhase.Deduction && (
          <DeductionPhase
            currentCase={currentCase}
            setPlayerAnswers={setPlayerAnswers}
            setCurrentPhase={setCurrentPhase}
            GamePhase={GamePhase}
          />
        )}
        {currentPhase === GamePhase.Result && <ResultDisplay />}
      </CrimeSceneDisplay>
    </main>
  );
}
