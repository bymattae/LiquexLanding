import { Pulse as Activity, ArrowsLeftRight as ArrowRightLeft, ChartBar as BarChart3, Bell, BellRinging as BellRing, Robot as Bot, Clock, DownloadSimple as Download, FilmStrip as Film, Gauge, Tray as Inbox, Key as KeyRound, Stack as Layers, SquaresFour as LayoutGrid, LinkSimple as Link2, LockKey as Lock, SignOut as LogOut, ChatCircle as MessageCircle, ArrowsClockwise as Repeat, ShieldCheck, DeviceMobile as Smartphone, Sparkle as Sparkles, TrendUp as TrendingUp, Trophy, UserPlus, Users, Wallet, XCircle, Lightning as Zap } from '@phosphor-icons/react'
import { AiNextFlow, BookFlow, ChannelFlow, ClientsWide, ConvertFlow, GatingFlow, GrowFlow, GrowHeroFlow, InboxFlow, JoinsWide, LinksFlow, MovedFlow, PlatformsFlow, RetainFlow, VerifyFlow, VerifyWide, WideHero } from '@/components/app/flows'
import { Stage, type StagePage } from '@/components/site/stage'

/** Content for each stage page. Same template, different stage. */

const GROW: StagePage = {
  tone: 'pink',
  icon: <TrendingUp />,
  stage: 'Grow',
  title: ['Scale the traffic', 'that pays you.'],
  sub: 'Every post, platform and link tracked, so you know exactly which traffic brings you funded traders.',
  hero: <GrowHeroFlow />,
  intro: ['Scale your traffic', 'with data.', 'See which posts, platforms and links bring traders, and scale them.'],
  more: {
    title: <>Everything you need <span className="text-zinc-500">to grow.</span></>,
    sub: 'Every tool to find what brings traders in, and scale it.',
    items: [
      { icon: <Film />, tone: 'pink', name: 'Content Analytics', text: 'See the joins and deposits behind every post, so you know what to post more of.', tags: ['Reels', 'Videos', 'Posts'] },
      { icon: <Zap />, tone: 'pink', name: 'Breakout Alerts', text: 'Get alerted when a post beats your usual, so you can push it while it’s hot today.', tags: ['Live', '1.5× or more'] },
      { icon: <Sparkles />, tone: 'pink', name: 'AI Post Reads', text: 'AI explains why each of your posts worked, so you can repeat it again on purpose.', tags: ['Hook', 'Topic', 'CTA'] },
      { icon: <Clock />, tone: 'pink', name: 'Best Time to Post', text: 'The day and hour your audience joins most, so every post lands at the right time.', tags: ['Day', 'Hour'] },
      { icon: <LayoutGrid />, tone: 'pink', name: 'Format Breakdown', text: 'Reels, videos and carousels compared by joins, so you know which format to make.', tags: ['Reels', 'Videos', 'Carousels'] },
      { icon: <BarChart3 />, tone: 'pink', name: 'Traffic Sources', text: 'Compare every platform by funded traders, so your time goes where it really pays.', tags: ['Instagram', 'TikTok', 'YouTube'] },
      { icon: <Link2 />, tone: 'pink', name: 'Smart Links', text: 'A tracked link for every bio, DM and story, so every single client has a source.', tags: ['Bio', 'DM', 'Story'] },
      { icon: <Gauge />, tone: 'pink', name: 'Link Performance', text: 'Joins, leads and funded clients for every link, so you know which placements pay.', tags: ['Joins', 'Leads', 'Funded'] },
      { icon: <Users />, tone: 'pink', name: 'Every Account', text: 'All of your accounts side by side, so you see your whole audience in one view.', tags: ['Instagram', 'TikTok', 'YouTube'] },
    ],
  },
  features: [
    { icon: <Film />, tag: 'Content Analytics', title: 'Posts that bring traders', text: 'Every reel and post matched to the traders who joined and deposited from it.', highlight: 'Do more of what works.', points: ['Joins and deposits per post', 'Your best time to post'], art: <GrowFlow /> },
    { icon: <Activity />, tag: 'Traffic Sources', title: 'Know which platform wins', text: 'Instagram, TikTok, YouTube and Telegram compared by joins and clients.', highlight: 'Put your time where it pays.', points: ['Joins and clients per platform', 'Compare any date range'], art: <PlatformsFlow /> },
    { icon: <Link2 />, tag: 'Smart Links', title: 'A link for every placement', text: 'One tracked link for every bio, DM and post, with joins for each one.', highlight: 'Know where clients come from.', points: ['Unlimited tracked links', 'Joins and clients per link'], art: <LinksFlow /> },
  ],
}

export function GrowPage() { return <Stage p={GROW} /> }

const CONVERT: StagePage = {
  tone: 'sky',
  icon: <Inbox />,
  stage: 'Convert',
  title: ['Turn every join', 'into a client.'],
  sub: 'Every new member, DM and lead in one place, tracked from their first message to their first deposit.',
  hero: <WideHero><JoinsWide /></WideHero>,
  intro: ['Never lose', 'another lead.', 'Capture every join and DM, and move every new lead to funded faster.'],
  features: [
    { icon: <UserPlus />, tag: 'Join Tracking', title: 'See everyone who joins', text: 'Every new Telegram member lands in your CRM with the link that brought them.', highlight: 'No join goes unnoticed.', points: ['Every join, live, with its source', 'See who left and when'], art: <ChannelFlow /> },
    { icon: <Inbox />, tag: 'Lead Inbox', title: 'Every lead in one inbox', text: 'DMs from Telegram and Instagram in one list, with their source and history.', highlight: 'Reply first, close fast.', points: ['Telegram and Instagram DMs', 'Full history on every lead'], art: <InboxFlow /> },
    { icon: <Layers />, tag: 'Lead Stages', title: 'Turn leads into clients', text: 'Follow every person from join to verified, and send your verify link in one click.', highlight: 'Nobody slips.', points: ['Joined, lead, verified, funded', 'See where every lead stalls'], art: <ConvertFlow /> },
  ],
  more: {
    title: <>Everything you need <span className="text-zinc-500">to convert.</span></>,
    sub: 'Every tool to turn your new members into funded clients.',
    items: [
      { icon: <UserPlus />, tone: 'sky', name: 'Join Tracking', text: 'Every new Telegram member and where they came from, so no join goes unnoticed.', tags: ['Live', 'Per link'] },
      { icon: <Inbox />, tone: 'sky', name: 'Lead Inbox', text: 'Every DM and lead together in one list, so you reply first and never lose a lead.', tags: ['Telegram', 'Instagram'] },
      { icon: <Layers />, tone: 'sky', name: 'Lead Stages', text: 'Joined, lead, submitted and verified, so you always know where each person is.', tags: ['Joined', 'Lead', 'Verified'] },
      { icon: <Link2 />, tone: 'sky', name: 'Source Attribution', text: 'Every lead tagged with the post and link behind it, so you know what converts.', tags: ['Post', 'Link', 'Platform'] },
      { icon: <MessageCircle />, tone: 'sky', name: 'Lead History', text: 'Every message and step on one timeline, so you have the context before you reply.', tags: ['Messages', 'Joins', 'Stages'] },
      { icon: <ShieldCheck />, tone: 'sky', name: 'Verify Links', text: 'Send your verify link in one click, so leads become clients without the chasing.', tags: ['One click', 'Tracked'] },
      { icon: <Bot />, tone: 'sky', name: 'Branded Bot', text: 'Your own Telegram bot under your own name, so clients trust it and stay with you.', tags: ['Verify', 'VIP', 'Messages'] },
      { icon: <LogOut />, tone: 'sky', name: 'Left Channel Alerts', text: 'Know when someone leaves your channel, so you can follow up before they’re gone.', tags: ['Live', 'Per member'] },
      { icon: <Download />, tone: 'sky', name: 'Export', text: 'Export any list of your leads or members, so your data is always yours to keep.', tags: ['CSV', 'Any view'] },
    ],
  },
}

const VERIFY: StagePage = {
  tone: 'blue',
  icon: <ShieldCheck />,
  stage: 'Verify',
  title: ['Verify clients', 'automatically.'],
  sub: 'Clients verify in your Telegram and are checked with your broker in seconds, so you know who’s yours.',
  hero: <WideHero><VerifyWide /></WideHero>,
  intro: ['Know every client', 'is yours.', 'Verify every client, gate your VIP and catch anyone who moves IB.'],
  features: [
    { icon: <ShieldCheck />, tag: 'Auto-Verification', title: 'Verified in a few seconds', text: 'Clients send their account ID to your bot and Liquex checks it with your broker.', highlight: 'No manual checks.', points: ['IB, account type and balance', 'Checked live with your broker'], art: <VerifyFlow /> },
    { icon: <Lock />, tag: 'Community Gating', title: 'Keep it for clients only', text: 'Set your rules once and Liquex handles who gets in and who gets removed.', highlight: 'Perks go to real traders.', points: ['Verified clients added for you', 'Removed when they stop trading'], art: <GatingFlow /> },
    { icon: <ArrowRightLeft />, tag: 'Moved IB Detection', title: 'Know when they move IB', text: 'The moment a client moves to another IB you’re told, and their access is handled.', highlight: 'No free rides.', points: ['Alerts the moment they move', 'Their balance when they left'], art: <MovedFlow /> },
  ],
  more: {
    title: <>Everything you need <span className="text-zinc-500">to verify.</span></>,
    sub: 'Every tool to know who’s really yours, and to keep it so.',
    items: [
      { icon: <ShieldCheck />, tone: 'blue', name: 'Auto-Verification', text: 'Account IDs checked with your broker in seconds, so you never verify by hand again.', tags: ['IB', 'Account', 'Balance'] },
      { icon: <Smartphone />, tone: 'blue', name: 'Telegram Mini App', text: 'Clients verify inside Telegram, so there’s nothing to download and no friction.', tags: ['Telegram', 'One tap'] },
      { icon: <Bot />, tone: 'blue', name: 'Branded Bot', text: 'Your own bot under your own name, so verifying feels like part of your own brand.', tags: ['Your name', 'Your VIP'] },
      { icon: <Lock />, tone: 'blue', name: 'Community Gating', text: 'Only verified clients get into your VIP, so your perks go to people who trade.', tags: ['Auto add', 'Auto remove'] },
      { icon: <KeyRound />, tone: 'blue', name: 'Access Rules', text: 'Set your balance and activity rules once, so access to your VIP manages itself.', tags: ['Balance', 'Activity'] },
      { icon: <ArrowRightLeft />, tone: 'blue', name: 'Moved IB Detection', text: 'Know the moment a client moves IB, so they never keep your VIP perks for free.', tags: ['Live', 'Auto remove'] },
      { icon: <XCircle />, tone: 'blue', name: 'Wrong Account Flags', text: 'Spot clients on the wrong account type, so you can fix it before you lose rebates.', tags: ['Account type'] },
      { icon: <Repeat />, tone: 'blue', name: 'Re-checks', text: 'Every client is re-checked over time, so your VIP stays clean without any work.', tags: ['Ongoing'] },
      { icon: <Activity />, tone: 'blue', name: 'Verification Log', text: 'Every check and access change is recorded, so you can always see what happened.', tags: ['Audit', 'Per client'] },
    ],
  },
}

const RETAIN: StagePage = {
  tone: 'emerald',
  icon: <Wallet />,
  stage: 'Retain',
  title: ['Keep your clients', 'trading longer.'],
  sub: 'See every client and every dollar live from your broker, and know who’s slipping before they leave.',
  hero: <WideHero><ClientsWide /></WideHero>,
  intro: ['Grow the book,', 'cut the churn.', 'Spot risk early, act on it fast, and keep your best clients trading.'],
  features: [
    { icon: <Wallet />, tag: 'Client Book', title: 'Every client, every dollar', text: 'Balances, deposits and lots for every client under your IB, live from your broker.', highlight: 'Know your worth.', points: ['Deposits, withdrawals and lots', 'Live from your broker'], art: <BookFlow /> },
    { icon: <BellRing />, tag: 'Retention Alerts', title: 'Catch them before they go', text: 'Liquex spots clients going quiet and tells you why, with a read on every one.', highlight: 'Win them back in time.', points: ['Inactive, at risk and moved', 'Alerts before they churn'], art: <RetainFlow /> },
    { icon: <Sparkles />, tag: 'AI Next Steps', title: 'Know who to talk to today', text: 'AI reads every client daily and tells you who to call, reward or nudge today.', highlight: 'Spend time wisely.', points: ['A short list every morning', 'The reason behind every name'], art: <AiNextFlow /> },
  ],
  more: {
    title: <>Everything you need <span className="text-zinc-500">to retain.</span></>,
    sub: 'Every tool to keep your clients funded and trading longer.',
    items: [
      { icon: <Wallet />, tone: 'emerald', name: 'Client Book', text: 'Every balance, deposit and lot, live, so you always know what your book is worth.', tags: ['Deposits', 'Withdrawals', 'Lots'] },
      { icon: <BarChart3 />, tone: 'emerald', name: 'Money In vs Out', text: 'Deposits and withdrawals day by day, so you can see your net funding at a glance.', tags: ['Daily', 'Net'] },
      { icon: <Layers />, tone: 'emerald', name: 'Client Stages', text: 'Active, churning, at risk or dormant, so you know where every client stands today.', tags: ['Active', 'At risk', 'Dormant'] },
      { icon: <BellRing />, tone: 'emerald', name: 'Retention Alerts', text: 'Get alerted when clients go quiet or move IB, so you can win them back in time.', tags: ['Inactive', 'Moved', 'Churn'] },
      { icon: <Repeat />, tone: 'emerald', name: 'Win-back', text: 'See who left you and with how much, so you know who’s worth winning back first.', tags: ['Moved', 'Balance'] },
      { icon: <Sparkles />, tone: 'emerald', name: 'AI Client Reads', text: 'A short plain-English read on every client, so you know them before you call them.', tags: ['Daily', 'Per client'] },
      { icon: <Zap />, tone: 'emerald', name: 'AI Next Steps', text: 'AI tells you who to message today and why, so your time goes where it counts most.', tags: ['Call', 'Reward', 'Nudge'] },
      { icon: <Trophy />, tone: 'emerald', name: 'Top Clients', text: 'Your most valuable clients ranked for you, so you know who to look after first.', tags: ['Volume', 'Funding'] },
      { icon: <Bell />, tone: 'emerald', name: 'Live Pop-ups', text: 'Big deposits and stage changes pop up live, so nothing important slips past you.', tags: ['Deposits', 'Stages'] },
    ],
  },
}

export function ConvertPage() { return <Stage p={CONVERT} /> }
export function VerifyPage() { return <Stage p={VERIFY} /> }
export function RetainPage() { return <Stage p={RETAIN} /> }
