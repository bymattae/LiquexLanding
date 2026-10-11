import { ConvergeHero } from '@/components/affiliate/converge'
import { LogoCloud } from '@/components/blocks/logo-cloud'
import { GetStarted } from '@/components/site/getstarted'
// import { Stories } from '@/components/site/stories'  (hidden for now — see below)
import { Compare } from '@/components/site/compare'
import { AllFeatures, Apply, Divider, Explorer } from '@/components/affiliate/simple'
import { ConnectHub } from '@/components/site/connect'

const logos = [
  { src: '/VTMarketsNew.png', alt: 'VT Markets', width: 132 },
  { src: '/PUPrimeNew.png', alt: 'PU Prime', width: 126 },
  { src: '/StarTraderNew.png', alt: 'StarTrader', width: 142 },
  { src: '/VantageNew.png', alt: 'Vantage', width: 128 },
  { src: '/AxiNew.png', alt: 'Axi', width: 104 },
]

/**
 * AffiliateOS, read top to bottom — one simple idea at a time:
 *   the hook → proof → every tool → each tool → much more →
 *   steps → apply → questions.
 */
export default function IBsPage() {
  return (
    <div className="theme-ibs">
      <div id="top"><ConvergeHero /></div>
      <div className="mx-auto -mb-6 -mt-6 max-w-5xl px-6 opacity-60"><LogoCloud logos={logos} /></div>
      <Divider />
      <div id="toolkit"><Explorer /></div>
      <Divider />
      <Compare />
      <Divider />
      <div id="connect"><ConnectHub /></div>
      <Divider />
      <div id="features"><AllFeatures /></div>
      <Divider />
      {/* Partner stories — hidden until the interviews are filmed. Restore with:
      <div id="stories"><Stories /></div>
      <Divider /> */}
      <Apply />
      <GetStarted />
    </div>
  )
}
