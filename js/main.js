/**
 * Intensive English Program E25 â€” Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initModal();
});

// Mobile Drawer Navigation
function initMobileMenu() {
  const toggleBtn = document.querySelector('[data-toggle="mobile-menu"]');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.querySelector('[data-toggle="close-drawer"]');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });
}

// Content Preview Modal System
let activeModalItem = null;

function initModal() {
  const backdrop = document.getElementById('contentModal');
  if (!backdrop) return;

  const closeBtn = backdrop.querySelector('[data-toggle="close-modal"]');
  const closeModal = () => {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    const modalBody = backdrop.querySelector('.modal-body');
    if (modalBody) modalBody.innerHTML = '';
    activeModalItem = null;
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

function openContentModal(item) {
  const backdrop = document.getElementById('contentModal');
  if (!backdrop) return;

  activeModalItem = item;

  const titleEl = backdrop.querySelector('#modalTitle');
  const kindEl = backdrop.querySelector('#modalKind');
  const subtitleEl = backdrop.querySelector('#modalSubtitle');
  const descEl = backdrop.querySelector('#modalDesc');
  const dateEl = backdrop.querySelector('#modalDate');
  const bodyEl = backdrop.querySelector('#modalBody');
  const actionBtn = backdrop.querySelector('#modalActionBtn');

  if (titleEl) titleEl.textContent = item.title;
  if (kindEl) kindEl.textContent = item.kind;

  const group = getGroupById(item.group_id);
  const activity = getActivityById(item.activity_id);
  const subtitleText = [group ? group.name : '', activity ? activity.title : ''].filter(Boolean).join(' Â· ');

  if (subtitleEl) {
    if (subtitleText) {
      subtitleEl.textContent = subtitleText;
      subtitleEl.style.display = 'inline-flex';
    } else {
      subtitleEl.style.display = 'none';
    }
  }

  if (descEl) {
    descEl.textContent = item.description || '';
    descEl.style.display = item.description ? 'block' : 'none';
  }

  if (dateEl) {
    dateEl.textContent = `Added ${new Date(item.created_at).toLocaleDateString()}`;
  }

  // Render media in modal body
  if (bodyEl) {
    bodyEl.innerHTML = '';
    const ytId = extractYouTubeId(item.external_url);
    if (ytId) {
      bodyEl.innerHTML = `
        <iframe src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0"
          title="${item.title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="width:100%; height:450px; border:none; background:#000;">
        </iframe>`;
    } else if (item.kind === 'image' && item.preview_image) {
      bodyEl.innerHTML = `
        <img src="${item.preview_image}" alt="${item.title}" style="max-height:70vh; max-width:100%; object-fit:contain; border-radius:0.5rem;" />
      `;
    } else if (item.kind === 'document') {
      bodyEl.innerHTML = `
        <div style="padding: 3rem; text-align:center;">
          <svg style="width:4rem; height:4rem; margin: 0 auto; color: var(--primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h4 style="margin-top:1rem; font-size:1.125rem;">${item.title}</h4>
          <p style="margin-top:0.5rem; font-size:0.875rem; color:var(--muted-foreground);">Official PDF document submitted for evaluation.</p>
        </div>
      `;
    } else {
      bodyEl.innerHTML = `
        <div style="padding: 3rem; text-align:center;">
          <svg style="width:4rem; height:4rem; margin: 0 auto; color: var(--primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
          <h4 style="margin-top:1rem; font-size:1.125rem;">${item.title}</h4>
          <p style="margin-top:0.5rem; font-size:0.875rem; color:var(--muted-foreground);">External project submission or presentation link.</p>
        </div>
      `;
    }
  }

  // Update Action Button
  if (actionBtn) {
    const targetUrl = item.external_url || item.preview_image || '#';
    actionBtn.onclick = () => {
      if (targetUrl && targetUrl !== '#') window.open(targetUrl, '_blank');
    };
    actionBtn.textContent = item.external_url ? 'Open link â†—' : 'Open original â†—';
  }

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

// Render Content Collage
function renderCollage(items, containerEl, emptyText = 'No uploads found.') {
  if (!containerEl) return;
  if (!items || items.length === 0) {
    containerEl.innerHTML = `
      <div style="border: 1px dashed var(--border); border-radius: 1rem; padding: 3rem; text-align: center; color: var(--muted-foreground); font-size: 0.875rem;">
        ${emptyText}
      </div>
    `;
    return;
  }

  const aspectRatios = ['aspect-4-5', 'aspect-square', 'aspect-3-4', 'aspect-4-3'];
  const gradientThemes = [
    'from-primary/25 to-primary/5',
    'from-accent/30 to-accent/5',
    'from-secondary to-primary/10',
    'from-primary/15 to-accent/15'
  ];

  let html = '<div class="collage-masonry">';
  items.forEach((item, idx) => {
    const aspect = aspectRatios[idx % aspectRatios.length];
    const group = getGroupById(item.group_id);
    const activity = getActivityById(item.activity_id);
    const subtitle = [group ? group.name : '', activity ? activity.title : ''].filter(Boolean).join(' Â· ');

    let previewContent = '';
    if (item.preview_image) {
      previewContent = `
        <img src="${item.preview_image}" alt="${item.title}" loading="lazy" class="collage-img" />
      `;
    } else {
      let icon = `
        <svg style="width:1.75rem; height:1.75rem; color:var(--primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      `;
      previewContent = `
        <div class="collage-card-body">
          <div>${icon}</div>
          <div>
            <p style="font-family:var(--font-display); font-size:0.875rem; font-weight:600; line-height:1.25;">${item.title}</p>
            <p style="margin-top:0.25rem; font-size:0.7rem; color:var(--muted-foreground); text-transform:uppercase;">${item.kind}</p>
          </div>
        </div>
      `;
    }

    html += `
      <div class="collage-item ${aspect}" onclick='openContentModal(${JSON.stringify(item)})' title="Open ${item.title}">
        ${previewContent}
        <div class="collage-overlay">
          <p style="font-size:0.75rem; font-weight:600; line-height:1.2; text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${item.title}</p>
          <p style="font-size:0.6875rem; opacity:0.85; text-transform:capitalize;">${item.kind}${subtitle ? ' Â· ' + subtitle : ''}</p>
        </div>
      </div>
    `;
  });
  html += '</div>';

  containerEl.innerHTML = html;
}

// Render Group Cards on Home & Groups Page
function renderGroupCards(containerEl) {
  if (!containerEl) return;
  const groups = getGroups();
  let html = '';

  groups.forEach(g => {
    const memberCount = getMembersByGroupId(g.id).length;
    const uploadCount = getContentByGroupId(g.id).length;

    html += `
      <a href="group.html?slug=${g.slug}" class="card card-rounded-2xl card-padding" style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          ${g.tagline ? `<p class="eyebrow">${g.tagline}</p>` : ""}
          <h2 style="margin-top:0.75rem; font-size:1.25rem; font-weight:600;">${g.name}</h2>
          <p class="line-clamp-3" style="margin-top:0.75rem; font-size:0.875rem; color:var(--muted-foreground); line-height:1.5;">${g.description}</p>
        </div>
        <div style="margin-top:1.25rem; display:flex; gap:0.5rem;">
          <span class="badge badge-secondary">${memberCount} students</span>
          <span class="badge badge-outline">${uploadCount} uploads</span>
        </div>
      </a>
    `;
  });

  containerEl.innerHTML = html;
}

