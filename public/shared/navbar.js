function createNavbar() {
  const currentPath = window.location.pathname;

  const links = [
    { href: '/front-desk', label: 'Front Desk' },
    { href: '/race-control', label: 'Race Control' },
    { href: '/lap-line-tracker', label: 'Lap Tracker' },
    { href: '/leader-board', label: 'Leader Board' },
    { href: '/next-race', label: 'Next Race' },
    { href: '/race-countdown', label: 'Countdown' },
    { href: '/race-flags', label: 'Flags' }
  ];

  const nav = document.createElement('nav');
  nav.className = 'top-nav';

  nav.innerHTML = `
    <div class="top-nav-inner">
      ${links.map(link => `
        <a
          href="${link.href}"
          class="top-nav-link ${currentPath === link.href ? 'active' : ''}"
        >
          ${link.label}
        </a>
      `).join('')}
    </div>
  `;

  document.body.prepend(nav);
}