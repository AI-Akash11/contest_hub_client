
import Banner from "../../components/Home/sections/Banner"
import FeaturesSection from "../../components/Home/sections/FeaturesSection"
import PopularContests from "../../components/Home/sections/PopularContests"
import RecentWinners from "../../components/Home/sections/RecentWinners"

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
