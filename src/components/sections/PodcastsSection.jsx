import MainHeaderSection from "../common/MainHeaderSection.jsx";

export default function PodcastsSection () {
  return (
    <section className="section flex justify-space-between g-96">
      <div>
        <MainHeaderSection
          heading="Podcasts"
          subheading="Listen with curiosity speak with honesty, act with integrity"
          primaryWords={['curiosity']}
          secondaryWords={['honesty', 'integrity']}
          paragraph="The greatest problem with communication is we don’t listen to understand. We listen to reply. When we listen with curiosity, we don’t listen with the intent to reply. We listen for what’s behind the words."
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