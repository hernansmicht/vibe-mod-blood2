import { useState } from 'react';

const DeductionPhase = ({ currentCase, setPlayerAnswers, setCurrentPhase, GamePhase }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handleAnswer = (answer) => {
    setPlayerAnswers(prev => [...prev, { question: currentCase.deductionQuestions[currentQuestionIndex].question, answer }]);
    if (currentQuestionIndex < currentCase.deductionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setTimeout(() => {
        setCurrentPhase(GamePhase.Result);
      }, 1000);
    }
  };

  const question = currentCase.deductionQuestions[currentQuestionIndex];

  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.8)', color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: '600px', borderRadius: '8px' }}>
      <h2>Phase 3: Deduction</h2>
      {question && (
        <div>
          <p>{question.question}</p>
          <div>
            {question.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)} style={{ margin: '5px', padding: '10px 15px', background: '#8b0000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeductionPhase;