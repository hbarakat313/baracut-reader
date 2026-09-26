// Progressive enhancement only: the site works without JavaScript. This adds the mobile menu and the copy button.
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    nav.addEventListener('click', function (event) { if (event.target.closest('a')) setOpen(false); });
    window.matchMedia('(min-width: 881px)').addEventListener('change', function (query) { if (query.matches) setOpen(false); });
  }

  var status = document.createElement('p');
  status.className = 'visually-hidden';
  status.setAttribute('role', 'status');
  document.body.appendChild(status);
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (button) {
    button.addEventListener('click', function () {
      var source = document.getElementById(button.getAttribute('data-copy'));
      if (!source || !navigator.clipboard) return;
      navigator.clipboard.writeText(source.textContent.trim()).then(function () {
        var label = button.querySelector('span');
        var original = label.textContent;
        label.textContent = 'Copied';
        status.textContent = 'Checksum copied to the clipboard';
        setTimeout(function () { label.textContent = original; status.textContent = ''; }, 2000);
      });
    });
  });
})();
