export default function MainHeaderSection({ heading, subheading, primaryWords, secondaryWords, paragraph }) {
  const words = subheading.split(' ');

  return (
    <>
      <h2 className="mb-24">{heading}</h2>
      <h4>
        {words.map((word, index) => (
          <span
            key={index}
            className={primaryWords.includes(word) ? 'text-primary-500' : (secondaryWords.includes(word) ? 'text-secondary-500' : '')}
          >
              {word}
            {index < words.length - 1 && ' '}
            </span>
        ))}
      </h4>
      <p className="mb-40">{paragraph}</p>
    </>
  );
}
