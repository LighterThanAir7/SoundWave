// import VibeItems from "./VibeItems.jsx";
import Carousel from "../common/Carousel.jsx";

const vibeItems = [
  {
    icons: ['heartline', 'heartline', 'heartline', 'trending-up', 'coffee-cup', 'heart_outline', 'confetti', 'workout', 'focus', 'book'],
    names: ['Vibe', 'Vibe', 'Vibe', 'Trending', 'Chill', 'Love', 'Dance', 'Workout', 'Focus', 'Study']
  }
]

export default function Vibe () {
  return (
    <section className="section">
      <h4 className="mb-6"><span className="text-primary-500">Vibe:</span> Play how you feel</h4>
      <p className="mb-40">An infinite, personalized mix of the music you love and new descoveries</p>
      {/*<VibeItems />*/}
      <Carousel data={vibeItems} cardType="vibe"/>
    </section>
  )
}