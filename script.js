const track = document.getElementById('track');
let maxX = () => window.innerWidth * 4;
let x = 0, target = 0;
let dragging = false, startX = 0, startTarget = 0;

function clamp(v,min,max){ return Math.min(max, Math.max(min, v)); }
function update(){
  x += (target - x) * 0.12;
  track.style.transform = `translate3d(${-x}px,0,0)`;
  requestAnimationFrame(update);
}
update();

window.addEventListener('wheel', e => {
  e.preventDefault();
  target = clamp(target + e.deltaY + e.deltaX, 0, maxX());
}, {passive:false});

window.addEventListener('pointerdown', e => {
  if (e.target.closest && e.target.closest('.video-wrap')) return;
  dragging = true;
  document.body.classList.add('dragging');
  startX = e.clientX;
  startTarget = target;
});
window.addEventListener('pointermove', e => {
  if(!dragging) return;
  target = clamp(startTarget - (e.clientX - startX), 0, maxX());
});
window.addEventListener('pointerup', () => {
  dragging = false;
  document.body.classList.remove('dragging');
  const snap = Math.round(target / window.innerWidth) * window.innerWidth;
  target = clamp(snap, 0, maxX());
});
window.addEventListener('resize', () => { target = clamp(target, 0, maxX()); });


// 3페이지: 가방에 마우스 오버했을 때만 굿즈가 팡 하고 등장
const giftPanel = document.getElementById('giftPanel');
const bag = giftPanel?.querySelector('.bag');
if (giftPanel && bag) {
  bag.addEventListener('pointerenter', () => giftPanel.classList.add('bag-active'));
  bag.addEventListener('pointerleave', () => giftPanel.classList.remove('bag-active'));
}


// 5페이지: 재생 버튼 클릭 시 영상 재생
const videoWrap = document.querySelector('.video-wrap');
const finalVideo = document.querySelector('.final-video');
const playButton = document.querySelector('.play-button');
if (videoWrap && finalVideo && playButton) {
  playButton.addEventListener('click', (e) => {
    e.stopPropagation();
    finalVideo.setAttribute('controls', 'controls');
    finalVideo.play();
  });
  finalVideo.addEventListener('play', () => videoWrap.classList.add('is-playing'));
  finalVideo.addEventListener('pause', () => videoWrap.classList.remove('is-playing'));
  finalVideo.addEventListener('ended', () => videoWrap.classList.remove('is-playing'));
}
