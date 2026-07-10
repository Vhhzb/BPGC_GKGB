// Campus Dogs — shared logic for the homepage grid and the detail page.
// Everything reads from data/dogs.json, so adding a dog never requires
// touching this file.

async function loadDogs() {
  const res = await fetch('data/dogs.json');
  if (!res.ok) throw new Error('Could not load data/dogs.json');
  return res.json();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- Homepage grid ----------

function renderGrid(dogs) {
  const grid = document.getElementById('grid');
  if (!dogs.length) {
    grid.innerHTML = `<div class="empty-state">No dogs added yet — add one in data/dogs.json.</div>`;
    return;
  }

  grid.innerHTML = dogs.map(dog => `
    <a class="dog-card" href="dog.html?id=${encodeURIComponent(dog.id)}">
      <span class="stamp">spotted</span>
      <img class="thumb" src="${escapeHtml(dog.cover)}" alt="${escapeHtml(dog.name)}" loading="lazy" />
      <div class="info">
        <h2>${escapeHtml(dog.name)}</h2>
        <div class="nickname">${escapeHtml(dog.nickname)}</div>
        <p class="summary">${escapeHtml(dog.summary)}</p>
        <div class="location">${escapeHtml(dog.spottedAt)}</div>
      </div>
    </a>
  `).join('');
}

// ---------- Detail page ----------

function renderDetail(dog) {
  const detail = document.getElementById('detail');

  if (!dog) {
    detail.innerHTML = `<div class="empty-state">Couldn't find that dog. <a href="index.html" style="color:var(--sage)">Back to the grid &rarr;</a></div>`;
    return;
  }

  const tags = dog.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  const gallery = dog.photos.map(src => `<img src="${escapeHtml(src)}" alt="${escapeHtml(dog.name)}" loading="lazy" />`).join('');

  detail.innerHTML = `
    <div class="detail-header">
      <div class="eyebrow">Field file · ${escapeHtml(dog.spottedAt)}</div>
      <h1>${escapeHtml(dog.name)}</h1>
      <div class="nickname">${escapeHtml(dog.nickname)}</div>
      <div class="tag-row">${tags}</div>
    </div>

    <img class="hero-photo" src="${escapeHtml(dog.cover)}" alt="${escapeHtml(dog.name)}" />
    <p class="hero-caption">${escapeHtml(dog.name)}, most recently spotted at ${escapeHtml(dog.spottedAt)}</p>

    <div class="field-notes">
      <p>${escapeHtml(dog.story)}</p>
    </div>

    <div class="paw-divider">&bull; &bull; &bull;</div>

    <div class="gallery">
      <h3>More sightings</h3>
      <div class="gallery-grid">${gallery}</div>
    </div>
  `;
}

// ---------- Router ----------

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const dogs = await loadDogs();

    if (document.getElementById('grid')) {
      renderGrid(dogs);
    }

    if (document.getElementById('detail')) {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const dog = dogs.find(d => d.id === id);
      renderDetail(dog);
    }
  } catch (err) {
    console.error(err);
    const target = document.getElementById('grid') || document.getElementById('detail');
    if (target) {
      target.innerHTML = `<div class="empty-state">
        Something went wrong loading the dog data.<br/>
        If you're opening this file directly (double-clicking the .html file), that won't work —
        browsers block local file loading for security reasons.<br/><br/>
        Run a local server instead, e.g. <code>python -m http.server</code> in this folder, then visit
        <code>http://localhost:8000</code>. This won't be an issue once it's hosted on GitHub Pages.
      </div>`;
    }
  }
});
