import './App.css'

import Hero from './components/Sections/Hero';
import Applications from './components/Sections/Applications';
import CoreFeatures from './components/Sections/CoreFeatures';
import ParticlesBackground from './components/Styling/ParticlesBackground';
import StatisticsSection from './components/Sections/StatisticsSection';
import Header from './components/Sections/Header';
import TeamSection from './components/Sections/TeamSection';
import AiIntegrationHub from './Ai/AiIntegrationHub';
import ReviewsSection from './components/Sections/ReviewsSection';
import FooterSection from './components/Sections/FooterSection';
import PricingSection from './components/Sections/PricingSection';
import AnswersSection from './components/Sections/AnswersSection';



function App() {

  return (

      <div className="w-full h-full ">
        
        <ParticlesBackground/>
        <Header/>
        <Hero/>
        <AiIntegrationHub/>
        <CoreFeatures/>
        <Applications/>
        <StatisticsSection/>
        <TeamSection/>
        <PricingSection />
        <ReviewsSection/>
        <AnswersSection />
        <FooterSection/>


      </div>
  );
}

export default App
