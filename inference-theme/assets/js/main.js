(function () {
  'use strict';

  var THEME_KEY = 'inference-theme';

  /* ── theme toggle ──────────────────────────────────────────────────── */
  var SUN_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  var MOON_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.body.removeAttribute('data-theme');
    }
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'light' ? MOON_ICON : SUN_ICON;
      btn.title = theme === 'light' ? 'switch to dark' : 'switch to light';
    }
    var sbTheme = document.getElementById('js-sb-theme');
    if (sbTheme) sbTheme.textContent = theme;
  }

  /* Apply saved theme immediately to avoid flash */
  var savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);

  document.addEventListener('DOMContentLoaded', function () {

    /* ── theme toggle button ─────────────────────────────────────────── */
    var themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var current = document.body.getAttribute('data-theme') || '';
        var next = current === 'light' ? 'dark' : 'light';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }

    /* ── statusbar clock ─────────────────────────────────────────────── */
    var clockEl = document.getElementById('js-sb-clock');
    if (clockEl) {
      function updateClock() {
        var now = new Date();
        var pad = function (n) { return String(n).padStart(2, '0'); };
        clockEl.textContent = pad(now.getUTCHours()) + ':' + pad(now.getUTCMinutes()) + ':' + pad(now.getUTCSeconds());
      }
      setInterval(updateClock, 1000);
      updateClock();
    }

    /* ── statusbar page path ─────────────────────────────────────────── */
    var sbPage = document.getElementById('js-sb-page');
    if (sbPage) sbPage.textContent = window.location.pathname || '/';

    /* ── nav active state ────────────────────────────────────────────── */
    var origin = window.location.origin;
    var currentPath = window.location.pathname;
    document.querySelectorAll('.nav a').forEach(function (a) {
      try {
        var linkPath = new URL(a.href, origin).pathname;
        var isHome = linkPath === '/' || linkPath === '';
        if (isHome && (currentPath === '/' || currentPath === '')) {
          a.classList.add('active');
        } else if (!isHome && currentPath.startsWith(linkPath)) {
          a.classList.add('active');
        }
      } catch (_) {}
    });

    /* ── reading progress bar ────────────────────────────────────────── */
    var progressBar = document.getElementById('js-progress');
    var postBody = document.querySelector('.post-body');
    if (progressBar && postBody) {
      function updateProgress() {
        var rect = postBody.getBoundingClientRect();
        var total = postBody.offsetHeight - window.innerHeight;
        var scrolled = -rect.top;
        var pct = total > 0 ? Math.max(0, Math.min(100, (scrolled / total) * 100)) : 0;
        progressBar.style.width = pct + '%';
      }
      window.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
    }

    /* ── TOC: build from headings ────────────────────────────────────── */
    var tocList = document.getElementById('js-toc-list');
    if (tocList && postBody) {
      var headings = Array.from(postBody.querySelectorAll('h2, h3'));
      headings.forEach(function (h, i) {
        if (!h.id) h.id = 's-' + i;
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        /* strip leading "§ 01" numbering ghost content may not have */
        a.textContent = h.textContent.replace(/^§\s*\d+\s*/, '').trim();
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var target = document.getElementById(h.id);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        li.appendChild(a);
        tocList.appendChild(li);
      });

      if (headings.length) {
        var ids = headings.map(function (h) { return h.id; });
        function updateTOC() {
          var activeId = ids[0];
          ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top - 120 <= 0) activeId = id;
          });
          tocList.querySelectorAll('li').forEach(function (li) {
            var a = li.querySelector('a');
            li.classList.toggle('active', a && a.getAttribute('href') === '#' + activeId);
          });
        }
        window.addEventListener('scroll', updateTOC, { passive: true });
        updateTOC();
      }
    }

    /* ── archive topic filter ────────────────────────────────────────── */
    var filterBtns = document.querySelectorAll('.filters .pill[data-filter]');
    if (filterBtns.length) {
      filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var filter = btn.getAttribute('data-filter');
          filterBtns.forEach(function (b) { b.classList.remove('on'); });
          btn.classList.add('on');
          document.querySelectorAll('[data-topic]').forEach(function (row) {
            var show = !filter || filter === 'all' || row.getAttribute('data-topic') === filter;
            row.style.display = show ? '' : 'none';
          });
        });
      });
    }

  });
})();
