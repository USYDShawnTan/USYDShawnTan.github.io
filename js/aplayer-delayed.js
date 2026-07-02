(function () {
  if (window.__aplayerDelayedLoader) return;
  window.__aplayerDelayedLoader = true;

  var config = {
    css: 'https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css',
    aplayer: 'https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js',
    meting: '/js/meting.min.js',
    id: '13582149382',
    server: 'netease',
    type: 'playlist'
  };

  function loadCss(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function loadScript(src, callback) {
    var existing = document.querySelector('script[src="' + src + '"]');
    if (existing) {
      if (callback) callback();
      return;
    }

    var script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = callback || null;
    document.body.appendChild(script);
  }

  function ensurePlayerContainer() {
    var player = document.querySelector('.aplayer.no-destroy');
    if (player) return player;

    player = document.createElement('div');
    player.className = 'aplayer no-destroy';
    player.dataset.id = config.id;
    player.dataset.server = config.server;
    player.dataset.type = config.type;
    player.dataset.fixed = 'true';
    player.dataset.autoplay = 'false';
    player.dataset.order = 'random';
    player.setAttribute('data-pjax', '');
    document.body.appendChild(player);
    return player;
  }

  function start() {
    if (window.__aplayerDelayedStarted) return;
    window.__aplayerDelayedStarted = true;

    ensurePlayerContainer();
    loadCss(config.css);
    loadScript(config.aplayer, function () {
      loadScript(config.meting, function () {
        if (typeof window.loadMeting === 'function') window.loadMeting();
      });
    });
  }

  function schedule() {
    window.addEventListener('pointerdown', start, { once: true, passive: true });
    window.addEventListener('keydown', start, { once: true, passive: true });
    window.addEventListener('load', function () {
      window.setTimeout(start, 3500);
    }, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  } else {
    schedule();
  }
})();
