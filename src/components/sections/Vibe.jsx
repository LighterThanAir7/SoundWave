import Carousel from "../common/Carousel.jsx";

const vibeItems = [
  { icon: 'heartline', name: 'Vibe' },
  { icon: 'trending-up', name: 'Trending' },
  { icon: 'coffee-cup', name: 'Chill' },
  { icon: 'heart_outline', name: 'Love' },
  { icon: 'confetti', name: 'Dance' },
  { icon: 'workout', name: 'Workout' },
  { icon: 'focus', name: 'Focus' },
  { icon: 'book', name: 'Study' }
];

export default function Vibe () {
  return (
    <section className="section">
      <h4 className="mb-6"><span className="text-primary-500">Vibe:</span> Play how you feel</h4>
      <p className="mb-40 w-70">An infinite, personalized mix of the music you love and new descoveries</p>
      <Carousel data={vibeItems} cardType="vibe"/>
    </section>
  )
}