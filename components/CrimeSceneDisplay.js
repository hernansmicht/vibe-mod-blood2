import Image from 'next/image';

const CrimeSceneDisplay = ({ imageUrl, children }) => {
  return (
    <div style={{ position: 'relative', width: '900px', height: '600px', margin: 'auto', border: '1px solid #333', overflow: 'hidden' }}>
      <Image src={imageUrl} alt="Crime Scene" fill style={{ objectFit: 'cover' }} />
      {children}
    </div>
  );
};

export default CrimeSceneDisplay;