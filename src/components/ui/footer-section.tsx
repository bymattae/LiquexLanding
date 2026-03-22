const links = [
  {
    title: 'Terms',
    href: '#',
  },
  {
    title: 'Privacy',
    href: '#',
  },
  {
    title: 'Contact',
    href: '#',
  },
]

export default function FooterSection() {
  return (
    <footer className="pb-28 pt-8">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 px-6 text-xs text-white/38">
        <span>Liquex</span>
        {links.map((link) => (
          <a key={link.title} href={link.href} className="transition-colors duration-150 hover:text-white/60">
            {link.title}
          </a>
        ))}
      </div>
    </footer>
  )
}
