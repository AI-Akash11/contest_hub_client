import Banner from "../../components/Home/Banner"
import FeaturesSection from "../../components/Home/FeaturesSection"
import PopularContests from "../../components/Home/PopularContests"
import RecentWinners from "../../components/Home/RecentWinners"

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularContests></PopularContests>
      <RecentWinners></RecentWinners>
      <FeaturesSection></FeaturesSection>
    </div>
  )
}

export default Home
