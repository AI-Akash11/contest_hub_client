
import Banner from "../../components/Home/sections/Banner"
import CategoriesSection from "../../components/Home/sections/CategoriesSection"
import FAQSection from "../../components/Home/sections/FAQSection"
import FeaturesSection from "../../components/Home/sections/FeaturesSection"
import HowItWorksSection from "../../components/Home/sections/HowItWorksSection"
import NewsletterSection from "../../components/Home/sections/NewsLetterSection"
import PopularContests from "../../components/Home/sections/PopularContests"
import RecentWinners from "../../components/Home/sections/RecentWinners"

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CategoriesSection></CategoriesSection>
      <HowItWorksSection></HowItWorksSection>
      <PopularContests></PopularContests>
      <FeaturesSection></FeaturesSection>
      <RecentWinners></RecentWinners>
      <FAQSection></FAQSection>
      <NewsletterSection></NewsletterSection>
    </div>
  )
}

export default Home
