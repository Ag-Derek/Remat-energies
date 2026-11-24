/* ============================================================
   Contact drawer
   Opens a slide-in contact form when a link with href="#contact"
   or any element with [data-contact-open] is clicked.
   Include contact-drawer.css + this script on a page to enable it.
   ============================================================ */
(function () {
  'use strict';

  var COUNTRIES = [
    'Nigeria', 'Ghana', 'Benin', 'Burkina Faso', "Côte d'Ivoire", 'Gambia',
    'Guinea', 'Liberia', 'Mali', 'Niger', 'Senegal', 'Sierra Leone', 'Togo',
    'Cameroon', 'Egypt', 'Kenya', 'Morocco', 'South Africa', 'Tanzania',
    'Canada', 'France', 'Germany', 'India', 'Netherlands', 'Norway',
    'Saudi Arabia', 'United Arab Emirates', 'United Kingdom', 'United States',
    'Other'
  ];

  var DIAL_CODES = [
    ['+234', 'Nigeria'], ['+233', 'Ghana'], ['+229', 'Benin'], ['+226', 'Burkina Faso'],
    ['+225', "Côte d'Ivoire"], ['+220', 'Gambia'], ['+224', 'Guinea'], ['+231', 'Liberia'],
    ['+223', 'Mali'], ['+227', 'Niger'], ['+221', 'Senegal'], ['+232', 'Sierra Leone'],
    ['+228', 'Togo'], ['+237', 'Cameroon'], ['+20', 'Egypt'], ['+254', 'Kenya'],
    ['+212', 'Morocco'], ['+27', 'South Africa'], ['+255', 'Tanzania'],
    ['+1', 'United States / Canada'], ['+33', 'France'], ['+49', 'Germany'],
    ['+91', 'India'], ['+31', 'Netherlands'], ['+47', 'Norway'], ['+966', 'Saudi Arabia'],
    ['+971', 'United Arab Emirates'], ['+44', 'United Kingdom']
  ];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var dialOptions = DIAL_CODES.map(function (d) {
    return '<option value="' + d[0] + '" title="' + esc(d[1]) + '">(' + d[0] + ')</option>';
  }).join('');

  var countryOptions = COUNTRIES.map(function (c) {
    return '<option value="' + esc(c) + '">' + esc(c) + '</option>';
  }).join('');

  var html =
    '<div class="cd-backdrop" data-cd-close></div>' +
    '<aside class="cd-panel" role="dialog" aria-modal="true" aria-labelledby="cdTitle" aria-hidden="true">' +
      '<div class="cd-scroll">' +
        '<div class="cd-head">' +
          '<h2 id="cdTitle">See how we can support your plant</h2>' +
          '<button type="button" class="cd-close" data-cd-close aria-label="Close contact form">' +
            '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          '</button>' +
        '</div>' +
        '<form class="cd-form" novalidate>' +
          '<p class="cd-intro">Fill out the form and our team will be in touch to discuss your requirements and the solution that fits your operation.</p>' +

          '<div class="cd-field">' +
            '<label for="cdEmail">Email Address<span class="cd-req">*</span></label>' +
            '<input class="cd-input" id="cdEmail" name="email" type="email" placeholder="Work email address" autocomplete="email" required>' +
            '<span class="cd-error">Please enter a valid email address.</span>' +
          '</div>' +

          '<div class="cd-field">' +
            '<label for="cdFirst">First Name<span class="cd-req">*</span></label>' +
            '<input class="cd-input" id="cdFirst" name="firstName" type="text" placeholder="Enter your first name" autocomplete="given-name" required>' +
            '<span class="cd-error">Please enter your first name.</span>' +
          '</div>' +

          '<div class="cd-field">' +
            '<label for="cdLast">Last Name<span class="cd-req">*</span></label>' +
            '<input class="cd-input" id="cdLast" name="lastName" type="text" placeholder="Enter your last name" autocomplete="family-name" required>' +
            '<span class="cd-error">Please enter your last name.</span>' +
          '</div>' +

          '<div class="cd-field">' +
            '<label for="cdCompany">Company<span class="cd-req">*</span></label>' +
            '<input class="cd-input" id="cdCompany" name="company" type="text" placeholder="Your company / institution" autocomplete="organization" required>' +
            '<span class="cd-error">Please enter your company name.</span>' +
          '</div>' +

          '<div class="cd-field">' +
            '<label for="cdPhone">Phone Number</label>' +
            '<div class="cd-phone">' +
              '<select class="cd-select" name="dialCode" aria-label="Country dialling code">' + dialOptions + '</select>' +
              '<input class="cd-input" id="cdPhone" name="phone" type="tel" placeholder="Enter mobile number" autocomplete="tel-national">' +
            '</div>' +
          '</div>' +

          '<div class="cd-field">' +
            '<label for="cdCountry">Country<span class="cd-req">*</span></label>' +
            '<select class="cd-select" id="cdCountry" name="country" required>' +
              '<option value="" disabled selected>Select your country</option>' + countryOptions +
            '</select>' +
            '<span class="cd-error">Please select your country.</span>' +
          '</div>' +

          '<div class="cd-field">' +
            '<label for="cdMessage">Message</label>' +
            '<textarea class="cd-textarea" id="cdMessage" name="message" placeholder="Tell us a bit about what you\'re looking for"></textarea>' +
          '</div>' +

          '<button type="submit" class="btn btn-primary cd-submit">Submit</button>' +
          '<p class="cd-note">We\'ll only use your details to respond to this enquiry.</p>' +
        '</form>' +
        '<div class="cd-success" role="status" aria-live="polite">' +
          '<div class="cd-success-mark"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>' +
          '<h3>Thank you!</h3>' +
          '<p>Your request has been received. A member of our team will be in touch shortly.</p>' +
          '<button type="button" class="btn btn-primary" data-cd-close>Close</button>' +
        '</div>' +
      '</div>' +
    '</aside>';

  var root = document.createElement('div');
  root.className = 'cd-root';
  root.innerHTML = html;
  document.body.appendChild(root);

  var panel = root.querySelector('.cd-panel');
  var form = root.querySelector('.cd-form');
  var submitBtn = root.querySelector('.cd-submit');
  var lastFocus = null;

  function open(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    root.classList.remove('cd-done');
    root.classList.add('cd-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cd-lock');
    setTimeout(function () { root.querySelector('#cdEmail').focus(); }, 120);
  }

  function close() {
    root.classList.remove('cd-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cd-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('a[href="#contact"], [data-contact-open]');
    if (trigger) { open(e); return; }
    if (e.target.closest('[data-cd-close]')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!root.classList.contains('cd-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'Tab') {
      // Keep focus inside the drawer while it is open.
      var f = panel.querySelectorAll('button, input, select, textarea, a[href]');
      var visible = Array.prototype.filter.call(f, function (el) { return el.offsetParent !== null; });
      if (!visible.length) return;
      var first = visible[0], last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  function validateField(el) {
    var field = el.closest('.cd-field');
    var ok = el.checkValidity() && (!el.required || el.value.trim() !== '');
    if (field) field.classList.toggle('cd-has-error', !ok);
    return ok;
  }

  form.addEventListener('input', function (e) {
    var field = e.target.closest('.cd-field');
    if (field && field.classList.contains('cd-has-error')) validateField(e.target);
  });
  form.addEventListener('change', function (e) {
    if (e.target.required) validateField(e.target);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var required = form.querySelectorAll('[required]');
    var firstBad = null;
    Array.prototype.forEach.call(required, function (el) {
      if (!validateField(el) && !firstBad) firstBad = el;
    });
    if (firstBad) { firstBad.focus(); return; }

    // TODO: connect to a form backend (e.g. Formspree, Netlify Forms or an API endpoint).
    // var data = Object.fromEntries(new FormData(form));
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    setTimeout(function () {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
      root.classList.add('cd-done');
    }, 600);
  });

  if (location.hash === '#contact') open();
})();
