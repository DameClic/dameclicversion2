/**
 * DAME CLIC - Master JavaScript
 * Interactive Logic: Mega Menu, Services Filter, Domain Checker, Accordion, Quote Form & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMegaMenu();
  initMobileMenu();
  initServicesFilter();
  initPortfolioFilter();
  initFaqAccordion();
  initServicePreselect();
  initBackToTop();
  initScrollSpy();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL SPY
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  const backToTop = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollPos > 400) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  }, { passive: true });
}

function initBackToTop() {
  const backToTop = document.getElementById('back-to-top-btn');
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-nav]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav') === current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   2. MEGA MENU LOGIC
   ========================================================================== */
function initMegaMenu() {
  const dropdownWrap = document.getElementById('services-dropdown-wrap');
  const megaMenu = document.getElementById('services-mega-menu');
  const triggerLink = dropdownWrap?.querySelector('.nav-link');

  if (!dropdownWrap || !megaMenu) return;

  // Click on trigger (especially for touch devices or keyboard)
  triggerLink?.addEventListener('click', (e) => {
    // If screen width > 992px, allow clicking to anchor or toggle
    if (window.innerWidth > 992) {
      const isOpen = megaMenu.classList.contains('open');
      if (isOpen) {
        megaMenu.classList.remove('open');
        triggerLink.setAttribute('aria-expanded', 'false');
      } else {
        megaMenu.classList.add('open');
        triggerLink.setAttribute('aria-expanded', 'true');
      }
    }
  });

  // Close mega menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownWrap.contains(e.target)) {
      megaMenu.classList.remove('open');
      triggerLink?.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mega menu when clicking any item inside
  megaMenu.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', () => {
      megaMenu.classList.remove('open');
      triggerLink?.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = navMenu.classList.contains('mobile-open');

    if (isExpanded) {
      navMenu.classList.remove('mobile-open');
      toggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    } else {
      navMenu.classList.add('mobile-open');
      toggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    }
  });

  // Close mobile drawer upon clicking any link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
      toggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });
}

/* ==========================================================================
   4. SERVICES FILTERING
   ========================================================================== */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. PORTFOLIO FILTERING
   ========================================================================== */
function initPortfolioFilter() {
  const portBtns = document.querySelectorAll('.filter-btn');
  const portCards = document.querySelectorAll('.portfolio-card');

  portBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      portBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-port-filter');

      portCards.forEach(card => {
        const category = card.getAttribute('data-port-cat');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. FAQ ACCORDION LOGIC
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE DOMAIN CHECKER (Simulated Costa Rica NIC / Whois lookup)
   ========================================================================== */
window.checkDomain = function() {
  const input = document.getElementById('domain-name-input');
  const tldSelect = document.getElementById('domain-tld-select');
  const resultBox = document.getElementById('domain-result-box');

  if (!input || !tldSelect || !resultBox) return;

  let domain = input.value.trim().toLowerCase();
  domain = domain.replace(/https?:\/\//, '').replace(/www\./, '').split('/')[0];
  domain = domain.split('.')[0]; // keep base name

  if (!domain) {
    alert('Por favor ingrese el nombre del dominio a consultar.');
    return;
  }

  const tld = tldSelect.value;
  const fullDomain = domain + tld;

  resultBox.style.display = 'block';
  resultBox.innerHTML = `
    <div style="display: inline-flex; align-items: center; gap: 8px;">
      <span class="pulse-dot"></span>
      <span>Consultando NIC Costa Rica y servidores DNS globales para <strong>${fullDomain}</strong>...</span>
    </div>
  `;

  setTimeout(() => {
    const isAvailable = domain.length % 2 === 0 || domain.includes('cr') || domain.length > 5;
    const priceText = tld.includes('.cr') ? '₡25,000 / año' : '$14.99 / año';

    if (isAvailable) {
      resultBox.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #10b981; padding: 12px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 12px; font-weight: 700;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>¡Buenas noticias! El dominio <u>${fullDomain}</u> está disponible (${priceText}). Incluye SSL gratis.</span>
          <a href="#contacto" onclick="window.preselectService('hosting');" style="background: #10b981; color: #fff; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; margin-left: 8px;">Reservar Ahora</a>
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #ef4444; padding: 12px 16px; border-radius: 8px; display: inline-flex; align-items: center; gap: 12px; font-weight: 700;">
          <span>El dominio <strong>${fullDomain}</strong> ya está registrado. ¿Desea que busquemos una alternativa como ${domain}.cr o ${domain}.net?</span>
          <a href="#contacto" onclick="window.preselectService('hosting');" style="background: #ef4444; color: #fff; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; margin-left: 8px;">Consultar Asesor</a>
        </div>
      `;
    }
  }, 900);
};

/* ==========================================================================
   8. SERVICE PRESELECTION & CHIP SELECTION
   ========================================================================== */
function initServicePreselect() {
  const chips = document.querySelectorAll('.service-chip-label');

  chips.forEach(chip => {
    const input = chip.querySelector('input');
    chip.addEventListener('click', () => {
      setTimeout(() => {
        if (input.checked) {
          chip.classList.add('selected');
        } else {
          chip.classList.remove('selected');
        }
      }, 10);
    });
  });

  // Preselection links
  document.querySelectorAll('[data-preselect]').forEach(link => {
    link.addEventListener('click', (e) => {
      const serviceId = link.getAttribute('data-preselect');
      window.preselectService(serviceId);
    });
  });
}

window.preselectService = function(serviceKey) {
  const chip = document.querySelector(`.service-chip-label[data-chip="${serviceKey}"]`);
  if (chip) {
    const input = chip.querySelector('input');
    if (input) {
      input.checked = true;
      chip.classList.add('selected');
    }
  }

  // Smooth scroll to contact
  const contactSec = document.getElementById('contacto');
  contactSec?.scrollIntoView({ behavior: 'smooth' });
};

/* ==========================================================================
   9. QUOTE FORM SUBMISSION
   ========================================================================== */
window.submitQuoteForm = function(event) {
  const name = document.getElementById('form-name')?.value;
  const email = document.getElementById('form-email')?.value;
  const phone = document.getElementById('form-phone')?.value;
  const company = document.getElementById('form-company')?.value || 'No indicada';
  const message = document.getElementById('form-message')?.value || 'Sin detalles adicionales';

  const selectedServices = [];
  document.querySelectorAll('input[name="services"]:checked').forEach(input => {
    selectedServices.push(input.value);
  });

  const submitBtn = document.getElementById('btn-submit-form');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="pulse-dot"></span>
      <span>Procesando su solicitud...</span>
    `;
  }

  setTimeout(() => {
    showToast(`¡Gracias ${name}! Hemos recibido su solicitud. Un especialista de Dame Clic le contactará al ${phone} en menos de 15 minutos.`);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Enviar Solicitud de Cotización</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      `;
    }

    document.getElementById('contact-quote-form')?.reset();
    document.querySelectorAll('.service-chip-label').forEach(c => c.classList.remove('selected'));
  }, 1200);
};

function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div style="width: 28px; height: 28px; border-radius: 50%; background: #10b981; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>
    <div style="font-size: 0.9rem; line-height: 1.4;">${message}</div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 6000);
}
