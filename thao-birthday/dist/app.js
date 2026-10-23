const $ = (selector) => document.querySelector(selector);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const dialogs = [...document.querySelectorAll('dialog')];
let lastFocus = null;
let toastTimer;

function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 4500);
}

function openDialog(dialog) {
  if (dialog.open) return;
  lastFocus = document.activeElement;
  dialog.showModal();
  document.body.classList.add('modal-open');
}

for (const dialog of dialogs) {
  dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
  });
}

const gifts = {
  hug: { icon: '♡', title: 'Một cái ôm thật lâu.', message: 'Tặng em một cái ôm không giới hạn thời gian.\nNhững ngày vui, ôm một cái để vui hơn.\nNhững ngày mệt, ôm một cái để thấy mình không một mình.\n\nAnh ở đây, Thảo nhé.' },
  flower: { icon: '✿', title: 'Một vườn dịu dàng.', message: 'Mong cuộc đời đối xử với em thật dịu dàng.\nMong em gặp những người tử tế, đi qua những ngày bình yên, và luôn tìm thấy một lý do để mỉm cười.\n\nEm xứng đáng với những điều đẹp đẽ nhất.' },
  star: { icon: '✦', title: 'May mắn tìm đến em.', message: 'Gửi em một ngôi sao may mắn cho tuổi mới.\nMong những dự định nho nhỏ dần thành sự thật, những cánh cửa mới luôn rộng mở.\n\nCứ tỏa sáng theo cách của em.\nAnh sẽ luôn là người cổ vũ nhiệt tình nhất.' }
};
const openedGifts = new Set();
document.querySelectorAll('[data-gift]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.gift;
    const gift = gifts[key];
    $('#gift-modal-icon').textContent = gift.icon;
    $('#gift-modal-title').textContent = gift.title;
    $('#gift-modal-message').textContent = gift.message;
    openDialog($('#gift-modal'));
    if (!openedGifts.has(key)) burst(48, innerWidth / 2, innerHeight * .4);
    openedGifts.add(key);
    button.classList.add('opened');
    button.querySelector('.gift-status').textContent = 'Đã nhận yêu thương · Mở lại ♡';
    button.querySelector('.gift-open').textContent = '✓';
    $('#gift-progress').textContent = openedGifts.size === 3 ? '♡ Em đã nhận đủ ba món quà. Còn một lá thư đang chờ phía dưới.' : `♡ Em đã mở ${openedGifts.size}/3 món quà nhỏ. Vẫn còn yêu thương đang chờ!`;
  });
});

$('#hero-surprise').addEventListener('click', () => {
  $('#surprises').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  setTimeout(() => {
    const firstGift = document.querySelector('[data-gift]');
    firstGift.focus({ preventScroll: true });
  }, reducedMotion.matches ? 0 : 650);
});

for (const selector of ['#open-letter', '#letter-shortcut']) {
  $(selector).addEventListener('click', () => openDialog($('#letter-modal')));
}

let candlesBlown = false;
$('#cake-button').addEventListener('click', () => {
  if (candlesBlown) {
    candlesBlown = false;
    $('#cake').classList.remove('candles-out');
    $('#mini-candles').classList.remove('blown');
    $('#candle-modal').classList.remove('celebrated');
    $('#candle-modal-title').innerHTML = 'Thảo ơi, <em>ước đi nào.</em>';
    $('#candle-modal-eyebrow').textContent = 'KHOẢNH KHẮC CỦA RIÊNG EM';
    $('#candle-modal-message').textContent = 'Nhắm mắt một chút, nghĩ về điều em mong nhất.\nKhi sẵn sàng, hãy thổi nến nhé!';
    $('#blow-candles').innerHTML = 'Phù… thổi nến thôi! <span aria-hidden="true">✧</span>';
  }
  openDialog($('#candle-modal'));
});

$('#blow-candles').addEventListener('click', () => {
  if (candlesBlown) { $('#candle-modal').close(); return; }
  candlesBlown = true;
  $('#mini-candles').classList.add('blown');
  $('#cake').classList.add('candles-out');
  $('#candle-modal').classList.add('celebrated');
  $('#candle-modal-eyebrow').textContent = 'VŨ TRỤ ĐÃ NGHE THẤY RỒI';
  $('#candle-modal-title').innerHTML = 'Sinh nhật vui vẻ, <em>Thảo yêu!</em>';
  $('#candle-modal-message').textContent = 'Mong điều ước của em sẽ sớm thành sự thật.\nTuổi mới, cứ rực rỡ và hạnh phúc theo cách của em nhé.\nThương em thật nhiều! ♡';
  $('#blow-candles').innerHTML = 'Giữ lấy yêu thương <span aria-hidden="true">♡</span>';
  $('#cake-button').innerHTML = '<span class="candle-icon" aria-hidden="true">♡</span> Thêm một điều ước nữa nhé? <span aria-hidden="true">↗</span>';
  burst(160);
  setTimeout(() => burst(90, innerWidth * .2, innerHeight * .3), 450);
  setTimeout(() => burst(90, innerWidth * .8, innerHeight * .3), 850);
  playChime();
});

const wishStorageKey = 'thao-birthday-wish-v1';
try {
  const savedWish = localStorage.getItem(wishStorageKey);
  if (savedWish) { $('#wish-input').value = savedWish; $('#clear-wish').hidden = false; $('#wish-note').textContent = 'Điều ước của em vẫn được giữ ở đây. Có thể viết thêm một điều mới nhé. ♡'; }
} catch { /* Wishes also work when browser storage is unavailable. */ }
$('#wish-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = $('#wish-input');
  const wish = input.value.trim();
  if (!wish) { input.setCustomValidity('Viết một điều ước nhỏ trước nhé, Thảo ơi.'); input.reportValidity(); return; }
  input.setCustomValidity('');
  let saved = false;
  try { localStorage.setItem(wishStorageKey, wish); saved = true; } catch { /* Keep the message honest when persistence is blocked. */ }
  $('#clear-wish').hidden = !saved;
  $('#wish-note').textContent = saved ? 'Đã cất điều ước trong trình duyệt này. Mong mọi dịu dàng sẽ tìm đến em. ♡' : 'Điều ước đã được đón nhận. Trình duyệt này chưa cho phép lưu lại. ♡';
  toast('✦ Vũ trụ đã nhận được điều ước của Thảo!');
  const rect = input.getBoundingClientRect();
  burst(80, rect.left + rect.width / 2, rect.top);
  playChime();
});
$('#wish-input').addEventListener('input', () => $('#wish-input').setCustomValidity(''));
$('#clear-wish').addEventListener('click', () => {
  try { localStorage.removeItem(wishStorageKey); } catch { toast('Chưa xóa được điều ước. Em thử lại nhé.'); return; }
  $('#wish-input').value = '';
  $('#wish-note').textContent = 'Đã xóa điều ước khỏi trình duyệt. Em có thể viết một điều mới. ♡';
  $('#clear-wish').hidden = true;
  $('#wish-input').focus({ preventScroll: true });
});
$('#back-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));

// Soft, original synthesized tones. Audio starts only after a visitor's tap.
let audioContext;
let musicPlaying = false;
let musicTimer;
let musicGeneration = 0;
const activeVoices = new Set();
function getAudio() {
  const Audio = window.AudioContext || window.webkitAudioContext;
  if (!Audio) return null;
  audioContext ||= new Audio();
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}
function note(frequency, start, duration, volume = .07, destination = null) {
  const ctx = getAudio();
  if (!ctx) return;
  const voice = ctx.createOscillator();
  const gain = ctx.createGain();
  voice.type = 'sine';
  voice.frequency.value = frequency;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + .025);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  voice.connect(gain);
  gain.connect(destination || ctx.destination);
  voice.start(start);
  voice.stop(start + duration + .1);
  activeVoices.add(voice);
  voice.onended = () => { activeVoices.delete(voice); voice.disconnect(); gain.disconnect(); };
}
const melody = [
  [60,.5],[60,.5],[62,1],[60,1],[65,1],[64,2],
  [60,.5],[60,.5],[62,1],[60,1],[67,1],[65,2],
  [60,.5],[60,.5],[72,1],[69,1],[65,1],[64,1],[62,1.5],
  [70,.5],[70,.5],[69,1],[65,1],[67,1],[65,2.5]
];
function scheduleMelody(generation) {
  if (!musicPlaying || generation !== musicGeneration) return;
  const ctx = getAudio();
  if (!ctx) return;
  const beat = .41;
  let offset = .12;
  for (const [midi, beats] of melody) {
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    note(frequency, ctx.currentTime + offset, beats * beat * 1.35, .055);
    note(frequency * 2, ctx.currentTime + offset, beats * beat * .8, .013);
    offset += beats * beat;
  }
  musicTimer = setTimeout(() => scheduleMelody(generation), (offset + 2.5) * 1000);
}
function updateMusicUI() {
  $('#music-button').setAttribute('aria-pressed', String(musicPlaying));
  $('#music-button').setAttribute('aria-label', musicPlaying ? 'Tắt nhạc sinh nhật' : 'Bật nhạc sinh nhật');
  $('#music-label').textContent = musicPlaying ? 'Nhạc đang bật' : 'Bật chút nhạc';
}
$('#music-button').addEventListener('click', async () => {
  const ctx = getAudio();
  if (!ctx) { toast('Trình duyệt này chưa hỗ trợ phát nhạc. Em vẫn có thể mở quà nhé!'); return; }
  try { await ctx.resume(); } catch { toast('Chưa bật được nhạc. Em thử chạm lại nhé.'); return; }
  musicPlaying = !musicPlaying;
  musicGeneration++;
  clearTimeout(musicTimer);
  if (musicPlaying) scheduleMelody(musicGeneration);
  else for (const voice of activeVoices) { try { voice.stop(); } catch {} }
  updateMusicUI();
});
function playChime() {
  if (!musicPlaying) return;
  const ctx = getAudio();
  if (!ctx) return;
  [523.25,659.25,783.99,1046.5].forEach((frequency, index) => note(frequency, ctx.currentTime + index * .12, .7, .04));
}
document.addEventListener('visibilitychange', () => {
  if (!audioContext) return;
  if (document.hidden) audioContext.suspend().catch(() => {});
  else if (musicPlaying) audioContext.resume().catch(() => {});
});

// Confetti is drawn in one canvas; no external scripts or media are required.
const canvas = $('#confetti');
const context = canvas.getContext('2d');
let particles = [];
let animationFrame = null;
let lastFrame = 0;
const confettiColors = ['#b794ce','#edb5c5','#e5c47c','#a5b895','#d2bfe3','#d99cab'];
function resizeCanvas() {
  const scale = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * scale;
  canvas.height = innerHeight * scale;
  context?.setTransform(scale, 0, 0, scale, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
function burst(count = 100, x = innerWidth / 2, y = innerHeight * .4) {
  if (reducedMotion.matches || !context) return;
  const amount = Math.min(count, innerWidth < 600 ? 100 : 180);
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 8;
    particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 4, rotation: Math.random() * 6.28, spin: (Math.random() - .5) * .2, size: 4 + Math.random() * 6, life: 0, maxLife: 150 + Math.random() * 70, color: confettiColors[Math.floor(Math.random() * confettiColors.length)], shape: Math.random() > .65 ? 'circle' : 'rect' });
  }
  particles = particles.slice(-350);
  if (!animationFrame) { lastFrame = 0; animationFrame = requestAnimationFrame(drawConfetti); }
}
function drawConfetti(time) {
  const step = lastFrame ? Math.min((time - lastFrame) / 16.67, 2) : 1;
  lastFrame = time;
  context.clearRect(0, 0, innerWidth, innerHeight);
  particles = particles.filter(particle => particle.life < particle.maxLife && particle.y < innerHeight + 20);
  for (const p of particles) {
    p.life += step; p.vy += .1 * step; p.vx *= Math.pow(.994, step); p.x += p.vx * step; p.y += p.vy * step; p.rotation += p.spin * step;
    context.save();
    context.translate(p.x, p.y);
    context.rotate(p.rotation);
    context.globalAlpha = Math.min(1, (p.maxLife - p.life) / 35);
    context.fillStyle = p.color;
    if (p.shape === 'circle') { context.beginPath(); context.arc(0, 0, p.size / 2, 0, Math.PI * 2); context.fill(); }
    else context.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * .65);
    context.restore();
  }
  if (particles.length) animationFrame = requestAnimationFrame(drawConfetti);
  else { context.clearRect(0, 0, innerWidth, innerHeight); animationFrame = null; }
}

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: .08, rootMargin: '0px 0px 20px 0px' });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

let sparkleTime = 0;
document.addEventListener('pointermove', (event) => {
  if (reducedMotion.matches || event.pointerType !== 'mouse' || performance.now() - sparkleTime < 110) return;
  sparkleTime = performance.now();
  const sparkle = document.createElement('span');
  sparkle.className = 'cursor-sparkle';
  sparkle.textContent = Math.random() > .5 ? '✧' : '·';
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;
  $('#sparkles').append(sparkle);
  setTimeout(() => sparkle.remove(), 850);
}, { passive: true });

window.addEventListener('pagehide', () => {
  clearTimeout(musicTimer);
  for (const voice of activeVoices) { try { voice.stop(); } catch {} }
});
