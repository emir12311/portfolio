const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (revealItems.length > 0 && !reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  for (const item of revealItems) {
    if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
      item.classList.add('is-revealed');
      continue;
    }
    observer.observe(item);
  }
} else {
  for (const item of revealItems) {
    item.classList.add('is-revealed');
  }
}
