export interface SeedDocument {
  id: string;
  title: string;
  content: string;
  metadata: Record<string, string>;
}

export const ORBITDESK_SEED: SeedDocument[] = [
  {
    id: 'onboarding',
    title: 'New teammate onboarding',
    content:
      'OrbitDesk onboarding takes two working days. New hires get a workspace, a starter project template, and a 30-minute walkthrough with their team lead. SSO is enabled on day one. Ask People Ops in #onboarding if anything is missing.',
    metadata: { topic: 'people', audience: 'new-hire' },
  },
  {
    id: 'time-off',
    title: 'Time off and leave policy',
    content:
      'Full-time OrbitDesk staff receive 20 days of paid vacation plus local public holidays. Submit leave in the People portal at least five days ahead. Sick leave is uncapped with a manager note after three consecutive days.',
    metadata: { topic: 'people', audience: 'all' },
  },
  {
    id: 'pricing',
    title: 'OrbitDesk pricing plans',
    content:
      'Starter is $12 per user each month and includes 10 projects. Growth is $29 per user and adds unlimited projects, guest access, and audit logs. Enterprise is custom priced and includes SSO, SCIM, and a dedicated success manager.',
    metadata: { topic: 'sales', audience: 'customer' },
  },
  {
    id: 'billing',
    title: 'Invoices and billing cycle',
    content:
      'OrbitDesk bills monthly on the date the workspace was created. Invoices are emailed to billing admins as PDF. You can switch to annual billing for two months free. Failed cards retry for seven days before the workspace is paused.',
    metadata: { topic: 'finance', audience: 'admin' },
  },
  {
    id: 'boards',
    title: 'Boards, cycles, and issue types',
    content:
      'Every OrbitDesk project has a board with Backlog, Ready, In progress, Review, and Done. Cycles are two weeks long. Use bugs, stories, and chores. Story points are optional and only show on Growth and Enterprise plans.',
    metadata: { topic: 'product', audience: 'user' },
  },
  {
    id: 'automation',
    title: 'Automation rules',
    content:
      'Growth workspaces can auto-assign issues when a label is added, move cards when a PR is merged, and ping Slack when a cycle starts. Enterprise can run custom webhooks. Automations are limited to 200 runs per day on Growth.',
    metadata: { topic: 'product', audience: 'user' },
  },
  {
    id: 'security',
    title: 'Security and data retention',
    content:
      'OrbitDesk encrypts data at rest with AES-256 and in transit with TLS 1.3. Workspace exports are available to admins. Deleted issues stay in the recycle bin for 30 days. Enterprise customers can request a 90-day retention window.',
    metadata: { topic: 'security', audience: 'admin' },
  },
  {
    id: 'sso',
    title: 'Single sign-on setup',
    content:
      'Enterprise workspaces support SAML 2.0 with Okta, Azure AD, and Google Workspace. Map groups to OrbitDesk roles. SCIM provisioning is optional. After SSO is enforced, password login is disabled for that workspace.',
    metadata: { topic: 'security', audience: 'admin' },
  },
  {
    id: 'support',
    title: 'Customer support hours',
    content:
      'Starter and Growth get email support from Monday to Friday, 09:00-18:00 UTC, with a one-business-day target. Enterprise gets a shared Slack channel and 4-hour response on severity-1 incidents, 24/7.',
    metadata: { topic: 'support', audience: 'customer' },
  },
  {
    id: 'mobile',
    title: 'Mobile apps and offline mode',
    content:
      'OrbitDesk iOS and Android apps can triage issues, comment, and log time. Offline mode stores the last opened board for 24 hours and syncs when the phone is back online. Push notifications can be muted per project.',
    metadata: { topic: 'product', audience: 'user' },
  },
  {
    id: 'api',
    title: 'Public API and rate limits',
    content:
      'The OrbitDesk REST API uses personal tokens or OAuth apps. Growth allows 600 requests per minute. Enterprise allows 2,000. Webhooks retry three times. API docs live at https://developers.orbitdesk.example.',
    metadata: { topic: 'developers', audience: 'user' },
  },
  {
    id: 'roadmap',
    title: 'Near-term product roadmap',
    content:
      'The next OrbitDesk release adds AI sprint summaries, a timeline view, and guest comment-only links. Dark mode is already in beta. A desktop app is not planned this year.',
    metadata: { topic: 'product', audience: 'all' },
  },
];
