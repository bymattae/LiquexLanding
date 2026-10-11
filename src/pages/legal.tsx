import { useEffect } from 'react'
import { CONTACT_EMAIL } from '@/components/site/chrome'

/**
 * Privacy policy and terms of service — plain-English starting points.
 * Fill in LEGAL below, and have a lawyer review both before relying on them.
 */

export const LEGAL = {
  company: 'Liquex',            // your registered company name, e.g. "Liquex Ltd"
  number: '',                   // company registration number, if you have one
  address: '',                  // registered address
  law: 'England and Wales',     // the law the terms are governed by
  updated: '11 October 2026',
}

type Section = [string, React.ReactNode]

function LegalPage({ title, intro, sections }: { title: string; intro: React.ReactNode; sections: Section[] }) {
  useEffect(() => { document.title = `${title} · Liquex`; window.scrollTo(0, 0) }, [title])
  const who = [LEGAL.company, LEGAL.number && `company no. ${LEGAL.number}`, LEGAL.address].filter(Boolean).join(', ')
  return (
    <main className="px-6 pb-24 pt-32 sm:pt-40">
      <article className="mx-auto max-w-3xl">
        <div className="text-[13px] text-zinc-500">Last updated {LEGAL.updated}</div>
        <h1 className="mt-3 text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-[3.25rem]">{title}</h1>
        <p className="mt-6 text-[17px] leading-7 text-zinc-300">{intro}</p>
        <p className="mt-4 text-[15px] leading-7 text-zinc-500">This page is published by {who}. Questions? Email <a href={`mailto:${CONTACT_EMAIL}`} className="text-zinc-200 underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>.</p>
        <div className="mt-12 border-t border-white/[0.08]">
          {sections.map(([h, body], i) => (
            <section key={h} className="border-b border-white/[0.08] py-8">
              <h2 className="text-[19px] font-medium tracking-tight text-white"><span className="mr-3 text-zinc-600 tabular-nums">{String(i + 1).padStart(2, '0')}</span>{h}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-7 text-zinc-400 [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-medium [&_strong]:text-zinc-200">{body}</div>
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="Liquex is software for introducing brokers, partners and affiliates. This policy explains what personal data we handle, why, and the choices you have."
      sections={[
        ['Who this covers', <>
          <p><strong>You</strong> — people who visit our website, book a demo or use Liquex as a customer (an “IB”).</p>
          <p><strong>Your audience and clients</strong> — the people who join your channels, message you or verify with your broker through Liquex. For their data, you decide why it’s collected and Liquex processes it on your behalf. You’re responsible for telling them how their data is used.</p>
        </>],
        ['What we collect', <>
          <ul>
            <li><strong>Account details</strong> — your name, email, company and login information.</li>
            <li><strong>Data from what you connect</strong> — broker reporting (account IDs, balances, deposits, withdrawals, volume), Telegram channel and bot activity, social account analytics, and the links you create.</li>
            <li><strong>Messages</strong> — conversations that pass through your Liquex inbox or bot.</li>
            <li><strong>Usage data</strong> — how you use the product and website, device and browser information, and approximate location from your IP address.</li>
            <li><strong>Things you tell us</strong> — for example when you book a call or email us.</li>
          </ul>
        </>],
        ['How we use it', <>
          <ul>
            <li>To run Liquex: show your analytics, verify clients, manage community access and send the alerts you ask for.</li>
            <li>To generate AI summaries and suggestions inside your account.</li>
            <li>To support you, keep the service secure and prevent misuse.</li>
            <li>To improve the product, using aggregated or de-identified data where we can.</li>
            <li>To contact you about your account, and about Liquex if you’ve agreed to hear from us.</li>
          </ul>
          <p>Where UK or EU data protection law applies, we rely on our contract with you, our legitimate interest in running and improving the service, your consent where we ask for it, and legal obligations.</p>
        </>],
        ['Who we share it with', <>
          <p>We don’t sell personal data. We share it only with:</p>
          <ul>
            <li>Service providers who help us run Liquex — hosting, databases, email, analytics and AI providers — under contracts that protect it.</li>
            <li>The platforms you connect (such as your broker or Telegram), only as needed to make those connections work.</li>
            <li>Authorities, where the law requires it, or a buyer if the business is sold.</li>
          </ul>
        </>],
        ['International transfers', <p>Our providers may process data outside your country. When that happens we use recognised safeguards, such as standard contractual clauses, to protect it.</p>],
        ['How long we keep it', <p>We keep data for as long as your account is active and for a reasonable period afterwards to meet legal, accounting and security needs. You can ask us to delete your account and its data at any time.</p>],
        ['Security', <p>We use encryption in transit, access controls and other reasonable measures to protect data. No system is perfectly secure, so please keep your login details safe and tell us straight away if you think your account has been compromised.</p>],
        ['Your rights', <>
          <p>Depending on where you live, you can ask to access, correct, delete or export your data, object to or restrict how we use it, and withdraw consent. Email us to make a request. You can also complain to your local data protection authority — in the UK, that’s the ICO.</p>
          <p>If you’re one of an IB’s clients, please contact that IB first; we’ll help them respond.</p>
        </>],
        ['Cookies', <p>Our website uses essential cookies to work and, if enabled, analytics cookies to understand how it’s used. You can control cookies in your browser settings.</p>],
        ['Children', <p>Liquex isn’t for anyone under 18, and we don’t knowingly collect their data.</p>],
        ['Changes', <p>We may update this policy. If the changes are significant we’ll let customers know, and the date at the top will always show the latest version.</p>],
      ]}
    />
  )
}

export function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      intro="These terms are the agreement between you and Liquex when you use our website or software. By using Liquex, you agree to them."
      sections={[
        ['The service', <p>Liquex is software that helps introducing brokers, partners and affiliates track traffic, manage leads, verify clients and understand their client book. Features can change as we improve the product.</p>],
        ['Not financial advice', <>
          <p>Liquex is a software tool. We don’t provide investment, financial, legal or tax advice, we don’t hold client funds, and we don’t execute trades. AI summaries and suggestions are informational and can be wrong — check anything important before you act on it.</p>
          <p>Trading forex and CFDs carries a high level of risk and may not be suitable for all investors.</p>
        </>],
        ['Your account', <p>You must be at least 18 and able to enter a contract. Keep your login details secure; you’re responsible for activity on your account. Give us accurate information and keep it up to date.</p>],
        ['Your responsibilities', <>
          <p>When you use Liquex you agree to:</p>
          <ul>
            <li>Follow all laws that apply to you, including financial promotion, marketing and data protection rules.</li>
            <li>Follow the terms of your brokers and of the platforms you connect, such as Telegram, Instagram, TikTok and YouTube.</li>
            <li>Only connect accounts and data you have the right to use, and tell your audience and clients how their data is handled.</li>
            <li>Not misuse the service — no unlawful content, spam, attempts to break or reverse-engineer it, or access to other people’s data.</li>
          </ul>
        </>],
        ['Connected services', <p>Liquex works with third-party services like brokers and social platforms. We don’t control them and aren’t responsible for their availability, accuracy or changes. If one changes or limits access, some features may stop working.</p>],
        ['Fees', <p>Pricing is agreed with you when you sign up. Unless we agree otherwise, fees are charged in advance, are non-refundable, and exclude taxes. We’ll give you notice before any price change takes effect.</p>],
        ['Your data', <p>You own the data you bring to Liquex. You give us permission to use it to run and improve the service, as described in our Privacy policy. You can export it, and ask us to delete it, at any time.</p>],
        ['Our product', <p>Liquex, including the software, design and brand, belongs to us. We give you a personal, non-transferable right to use it while your account is active.</p>],
        ['Availability', <p>We work hard to keep Liquex running, but it’s provided “as is” and we can’t promise it will be uninterrupted or error-free. Figures shown in Liquex depend on data from connected services and may be delayed or incomplete.</p>],
        ['Liability', <p>To the extent the law allows, we aren’t liable for indirect or consequential losses, or for lost profits, revenue, clients or data. Our total liability for any claim is limited to the fees you paid us in the 12 months before it. Nothing here limits liability that can’t be limited by law.</p>],
        ['Ending the agreement', <p>You can stop using Liquex at any time. We may suspend or close accounts that break these terms or put the service or others at risk. When an account closes, you can ask for an export of your data within 30 days.</p>],
        ['Changes and law', <p>We may update these terms; if we make significant changes we’ll let you know before they take effect. These terms are governed by the law of {LEGAL.law}, and its courts have jurisdiction.</p>],
      ]}
    />
  )
}
