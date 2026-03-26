/* ── Typewriter on hero title (word by word, with colored words) ── */
(function () {
  const el = document.querySelector('.hero__title');
  if (!el) return;

  const words = el.textContent.trim().split(' ');
  // Word indices that get the accent gradient (0-based)
  // "Built(0) for(1) the(2) business(3) you(4) are.(5) Ready(6) for(7) the(8) business(9) you'll(10) become.(11)"
  const accented = new Set([10, 11]);

  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';
  el.appendChild(cursor);

  let i = 0;
  function typeWord() {
    if (i < words.length) {
      const spacer = i === 0 ? '' : ' ';
      if (accented.has(i)) {
        cursor.insertAdjacentText('beforebegin', spacer);
        const span = document.createElement('span');
        span.className = 'hero__accent';
        span.textContent = words[i];
        cursor.insertAdjacentElement('beforebegin', span);
      } else {
        cursor.insertAdjacentText('beforebegin', spacer + words[i]);
      }
      i++;
      setTimeout(typeWord, 160);
    } else {
      setTimeout(() => cursor.classList.add('tw-cursor--done'), 900);
    }
  }
  setTimeout(typeWord, 300);
})();

/* ── Scroll reveal ────────────────────────────────────────── */
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = +(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
})();

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".modules__tabs .tab");
  const contents = document.querySelectorAll(".modules__cards-wrapper .tab-content");

  // Helper function to show a tab's content
  function activateTab(target) {
    // Remove active state from all tabs and contents
    tabs.forEach(t => t.classList.remove("is-active"));
    contents.forEach(c => c.classList.remove("active"));

    // Activate clicked tab
    const activeTab = document.querySelector(`.modules__tabs .tab[data-tab="${target}"]`);
    if (activeTab) activeTab.classList.add("is-active");

    // Activate corresponding content
    const activeContent = document.querySelector(`.modules__cards-wrapper .tab-content[data-tab="${target}"]`);
    if (activeContent) activeContent.classList.add("active");
  }

  // Attach click event listeners to all tabs
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      activateTab(target);
    });
  });

  // Set initial active tab on page load
  const initial = document.querySelector(".modules__tabs .tab.is-active");
  if (initial) activateTab(initial.dataset.tab);
});

document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.pricing .pill');
  const prices = document.querySelectorAll('.pricing .price');

  function setPeriod(period){
    // activate pill
    pills.forEach(p => p.classList.toggle('is-active', p.dataset.period === period));
    // swap price texts
    prices.forEach(el => {
      const value = el.getAttribute(`data-${period}`);
      if (value) el.textContent = `\u20A6${value}`
    });
  }

  pills.forEach(p => p.addEventListener('click', () => setPeriod(p.dataset.period)));
  // default
  setPeriod('monthly');
});

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq__item');

  items.forEach(item => {
    const btn = item.querySelector('.faq__q');
    btn.addEventListener('click', () => {
      // close others
      items.forEach(i => {
        if (i !== item) {
          i.classList.remove('is-open');
          i.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        }
      });
      // toggle this one
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
});




