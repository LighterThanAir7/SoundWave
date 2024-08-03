export default function Quote({ mainText, primaryWords, author }) {
  const words = mainText.split(' ');

  return (
    <section className="section pt-80 text-center">
      <h4 className="text-italic">
        {words.map((word, index) => (
          <span
            key={index}
            className={primaryWords.includes(word) ? 'text-primary-500' : ''}
          >
            {word}
            {index < words.length - 1 && ' '}
          </span>
        ))} -
        <span className="text-secondary-400"> {author}</span>
      </h4>
      <i className="arrow-top icon-arrow-up"></i>
    </section>
  );
}
