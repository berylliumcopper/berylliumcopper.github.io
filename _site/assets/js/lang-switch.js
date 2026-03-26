(function() {
  const savedLang = localStorage.getItem('preferred-lang') || 'zh';
  document.documentElement.lang = savedLang;

  function updateTitle(lang) {
    const titleElement = document.querySelector('title');
    if (titleElement && titleElement.getAttribute('data-' + lang)) {
      document.title = titleElement.getAttribute('data-' + lang);
    }
  }

  function updateActiveButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langTarget === lang);
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    updateActiveButtons(savedLang);
    updateTitle(savedLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newLang = btn.dataset.langTarget;
        document.documentElement.lang = newLang;
        localStorage.setItem('preferred-lang', newLang);
        updateActiveButtons(newLang);
        updateTitle(newLang);
        
        // Update lightbox if open (for gallery)
        const lightbox = document.getElementById("lightbox");
        if (lightbox && !lightbox.hidden) {
          const activeTrigger = document.querySelector('.gallery-trigger.active-trigger');
          if (activeTrigger) {
            const langSuffix = newLang === 'zh' ? 'Zh' : 'En';
            const caption = activeTrigger.dataset['caption' + langSuffix] || activeTrigger.dataset.caption;
            document.getElementById("lightbox-caption").textContent = caption;
          }
        }
      });
    });
  });
})();
