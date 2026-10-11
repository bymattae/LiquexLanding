import { Link } from 'react-router-dom'

/** An internal link ("/grow", "/#video") navigates in-app, without a page reload; anything else is a normal link. */
export function SmartLink({ href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith('/') && !href.startsWith('//')) return <Link to={href} {...rest} />
  return <a href={href} {...rest} />
}
