const CACHE_NAME = 'finger-mouth-game-cache-v1';
const FILES_TO_CACHE = [
  'index.html',
  'open.jpg',
  'close.jpg',
  'puni.wav',
  'akubi1.jpg', 'akubi2.jpg', 'akubi3.jpg', 'akubi4.jpg', 'akubi5.jpg', 'akubi6.jpg',
  'akubi1.mp3', 'akubi2.mp3', 'akubi3.mp3', 'akubi4.mp3', 'akubi5.mp3', 'akubi6.mp3',
  'bgm1.mp3', 'bgm2.mp3', 'bgm3.mp3', 'bgm4.mp3',
  'end1.mp3', 'end2.mp3', 'end3.mp3', 'end4.mp3', 'end5.mp3',
  'end6.mp3', 'end7.mp3', 'end8.mp3', 'end9.mp3', 'end10.mp3',
  'end11.mp3', 'end12.mp3', 'end13.mp3', 'end14.mp3', 'end15.mp3',
  'finger1.png', 'finger2.png', 'finger3.png', 'finger4.png', 'finger5.png',
  'finger6.png', 'finger7.png', 'finger8.png', 'finger9.png', 'finger10.png',
  'finger11.png', 'finger12.png'
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// フェッチ時のキャッシュ対応
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
