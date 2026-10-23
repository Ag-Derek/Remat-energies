// Header dropdown menus (Services, Solutions, About Us)
(function () {
  var dropdowns = document.querySelectorAll('.has-dropdown');
  if (!dropdowns.length) return;

  function setOpen(dropdown, isOpen) {
    dropdown.classList.toggle('open', isOpen);
    dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', String(isOpen));
  }

  dropdowns.forEach(function (dropdown) {
    var toggle = dropdown.querySelector('.dropdown-toggle');

    // Tap / click the arrow to open or close (only one menu open at a time)
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !dropdown.classList.contains('open');
      dropdowns.forEach(function (d) { if (d !== dropdown) setOpen(d, false); });
      setOpen(dropdown, willOpen);
    });
  });

  // Click anywhere else to close
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (d) {
      if (!d.contains(e.target)) setOpen(d, false);
    });
  });

  // Escape key closes and returns focus to the arrow
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    dropdowns.forEach(function (d) {
      if (d.classList.contains('open')) {
        setOpen(d, false);
        d.querySelector('.dropdown-toggle').focus();
      }
    });
  });
})();
