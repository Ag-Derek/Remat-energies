// Solutions dropdown menu
(function () {
  var dropdown = document.querySelector('.has-dropdown');
  if (!dropdown) return;

  var toggle = dropdown.querySelector('.dropdown-toggle');

  function setOpen(isOpen) {
    dropdown.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  }

  // Tap / click the arrow to open or close
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!dropdown.classList.contains('open'));
  });

  // Click anywhere else to close
  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) setOpen(false);
  });

  // Escape key closes and returns focus to the arrow
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dropdown.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });
})();
