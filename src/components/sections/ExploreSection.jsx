import MainHeaderSection from "../common/MainHeaderSection.jsx";

export default function ExploreSection () {
  return (
    <section className="section flex justify-space-between g-96">
      <div>
        <MainHeaderSection
          heading="Explore"
          subheading="Be fearless in the pursuit of what sets your soul on fire"
          primaryWords={['fearless']}
          secondaryWords={['soul', 'fire']}
          paragraph="Too often we underestimate the power of a touch, a smile, a kind word, a listening ear, an honest compliment or the smallest act of caring, all of which have the potential to turn a life around."
        />
        <div className="flex align-items-center g-32">
          <a className="btn btn--primary" href="">Learn More</a>
          <button className="icon-with-text">
            <i className="icon-shuffle"></i><span className="ff-primary">Play Random</span>
          </button>
        </div>
      </div>
      <img src="/src/assets/man-with-a-microphone.jpg" alt=""/>
    </section>

)
}