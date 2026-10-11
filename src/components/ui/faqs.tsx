import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqItems = [
  { id: 'item-1', question: 'Who can use Liquex?', answer: 'Liquex is invite-only. We work with a small number of IBs and networks, and review every request.' },
  { id: 'item-2', question: 'What does it do?', answer: 'It follows every trader from first view to funded client — and tells you what to do next.' },
  { id: 'item-3', question: 'Do I need to change brokers?', answer: 'No. Liquex works alongside the brokers you already use.' },
  { id: 'item-4', question: 'How do I get access?', answer: 'Request access. If it’s a fit, we’ll set you up personally.' },
]

export default function FAQs() {
  return (
    <section className="scroll-py-16 py-16 pb-4 md:py-20 md:pb-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">Questions</h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-[28px] bg-white/[0.035] px-8 py-2">
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
