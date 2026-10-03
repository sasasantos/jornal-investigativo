(function () {
  const pages = document.querySelectorAll('.page');
  const tabs = document.querySelectorAll('.tab');
  const count = document.getElementById('count');
  let current = 0;

  function show(i) {
    current = Math.max(0, Math.min(pages.length - 1, i));
    pages.forEach((p, n) => p.classList.toggle('active', n === current));
    tabs.forEach((t, n) => t.classList.toggle('active', n === current));
    count.textContent = (current + 1) + ' / ' + pages.length;
    window.scrollTo({ top: 0 });
  }

  tabs.forEach(t => t.addEventListener('click', () => show(+t.dataset.page)));
  document.getElementById('prev').addEventListener('click', () => show(current - 1));
  document.getElementById('next').addEventListener('click', () => show(current + 1));
  document.getElementById('printBtn').addEventListener('click', () => window.print());
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  show(0);

  // Carrega as fotos de images/; se o arquivo não existir, mantém o placeholder
  document.querySelectorAll('.frame[data-img]').forEach(f => {
    const img = new Image();
    img.alt = f.textContent.trim();
    img.onload = () => { f.textContent = ''; f.appendChild(img); f.classList.add('has-img'); };
    img.src = f.dataset.img;
  });
})();