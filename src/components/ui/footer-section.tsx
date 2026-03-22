import { Facebook, Instagram, Twitter } from 'lucide-react'

const links = [
  {
    title: 'Terms & Conditions',
    href: '#',
  },
  {
    title: 'Contact',
    href: '#',
  },
  {
    title: 'About',
    href: '#',
  },
]

export default function FooterSection() {
  return (
    <footer className="pt-14 pb-8 md:pt-18 md:pb-10">
      <div className="mx-auto max-w-5xl px-6">
        <a href="/" aria-label="go home" className="mx-auto block size-fit">
          <img src="/Liquexdark.png" alt="Liquex" className="h-10 w-auto" />
        </a>

        <div className="my-6 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <a key={index} href={link.href} className="text-muted-foreground hover:text-primary block duration-150">
              <span>{link.title}</span>
            </a>
          ))}
        </div>
        <div className="my-6 flex flex-wrap justify-center gap-6 text-sm">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary block">
            <Instagram className="size-6" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-muted-foreground hover:text-primary block">
            <Twitter className="size-6" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary block">
            <Facebook className="size-6" />
          </a>
        </div>
        <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Liquex, All rights reserved</span>
      </div>
    </footer>
  )
}
