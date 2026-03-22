import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqItems = [
  {
    id: 'item-1',
    question: 'How does Liquex help retain clients?',
    answer: 'Liquex tracks client activity in real time, highlights who is at risk, and helps you take action before traders become inactive or leave your book.',
  },
  {
    id: 'item-2',
    question: 'Who is Liquex built for?',
    answer: 'Liquex is built for IBs, broker affiliate managers, and partner teams who want better visibility and control over their client book.',
  },
  {
    id: 'item-3',
    question: 'Do I need to change brokers to use Liquex?',
    answer: 'No. Liquex works alongside your existing broker setup, so you can track and manage your clients without changing infrastructure.',
  },
  {
    id: 'item-4',
    question: 'How does Liquex track my clients?',
    answer: 'Liquex connects to your trading data and monitors activity, balances, and behaviour to give you a clear, real-time view of every client.',
  },
  {
    id: 'item-5',
    question: 'Can I manage multiple IBs or teams?',
    answer: 'Yes. Liquex supports multi-level IB structures, so you can manage teams, sub-IBs, and client flows all in one place.',
  },
]

export default function FAQs() {
  return (
    <section className="scroll-py-16 py-16 pb-4 md:py-20 md:pb-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Frequently Asked Questions</h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/8 bg-black/26 px-8 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <Accordion type="single" collapsible defaultValue="item-1">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
