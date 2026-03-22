import { HeroSection } from '@/components/blocks/hero-section'
import LogoCloud from '@/components/blocks/logo-cloud'
import FAQs from '@/components/ui/faqs'
import FooterSection from '@/components/ui/footer-section'
import FeaturesSection from '@/components/ui/features'
import Testimonials from '@/components/ui/testimonials'

function App() {
  return (
    <>
      <div id="top">
        <HeroSection />
      </div>
      <div id="integrations">
        <LogoCloud />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="results">
        <Testimonials />
      </div>
      <div id="faq">
        <FAQs />
      </div>
      <FooterSection />
    </>
  )
}

export default App
