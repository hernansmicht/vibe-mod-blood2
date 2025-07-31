const FeedbackDisplay = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px 20px', borderRadius: '5px', zIndex: 100 }}>
      {feedback}
    </div>
  );
};

export default FeedbackDisplay;