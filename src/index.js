
const tvcss = window.tvcss || {};

if (!window.tvcss) {
  tvcss.init = function() {
    let dpr = window.devicePixelRatio || 1;
    let minWidth = 0;
    let maxWidth = 0;
    let designWidth = 0;

    dpr = (dpr >= 3) ? 3 : ((dpr >= 2) ? 2 : 1);

    const eTvcss = document.querySelector('meta[name="tvcss"]');
    if (eTvcss) {
      const config = eTvcss.getAttribute('content');
      if (config) {
        const _initialDpr = config.match(/initial\-dpr=([\d\.]+)/);
        if (_initialDpr) {
          dpr = parseFloat(_initialDpr[1]);
        }

        const _minWidth = config.match(/min\-width=([\d\.]+)/);
        if (_minWidth) {
          minWidth = parseFloat(_minWidth[1]);
        }

        const _maxWidth = config.match(/max\-width=([\d\.]+)/);
        if (_maxWidth) {
          maxWidth = parseFloat(_maxWidth[1]);
        }

        const _designWidth = config.match(/design\-width=([\d\.]+)/);
        if (_designWidth) {
          designWidth = parseFloat(_designWidth[1]);
        }
      }
    }

    document.documentElement.setAttribute('data-dpr', dpr);
    tvcss.dpr = dpr;

    if (minWidth) {
      document.documentElement.setAttribute('min-width', minWidth);
    }
    tvcss.minWidth = minWidth;

    if (maxWidth) {
      document.documentElement.setAttribute('max-width', maxWidth);
    }
    tvcss.maxWidth = maxWidth;

    if (designWidth) {
      document.documentElement.setAttribute('design-width', designWidth);
    }
    tvcss.designWidth = designWidth;

    const scale = (1 / dpr);
    const content = `width=device-width, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=${scale}, user-scalable=no, minimal-ui`;

    let eViewport = document.querySelector('meta[name="viewport"]');
    if (eViewport) {
      eViewport.setAttribute('content', content);
    } else {
      eViewport = document.createElement('meta');
      eViewport.setAttribute('name', 'viewport');
      eViewport.setAttribute('content', content);
      document.head.appendChild(eViewport);
    }
  };

  tvcss.px2rem = function(px, designWidth) {
    if (!designWidth) {
      designWidth = parseInt(tvcss.designWidth, 10);
    }
    return (parseInt(px, 10) * 320 / designWidth / 20);
  };

  tvcss.rem2px = function(rem, designWidth) {
    if (!designWidth) {
      designWidth = parseInt(tvcss.designWidth, 10);
    }
    return (parseFloat(rem) * 20 * designWidth / 320);
  };

  tvcss.resize = function() {
    let innerWidth = document.documentElement.getBoundingClientRect().width
      || window.innerWidth;

    if (tvcss.maxWidth && (innerWidth / tvcss.dpr > tvcss.maxWidth)) {
      innerWidth = tvcss.maxWidth * tvcss.dpr;
    } else if (tvcss.minWidth && (innerWidth / tvcss.dpr < tvcss.minWidth)) {
      innerWidth = tvcss.minWidth * tvcss.dpr;
    }

    if (!innerWidth) {
      return false;
    }

    const docStyle = document.documentElement.style;
    const fontSize = `${innerWidth * 20 / 320}px`;

    if (!docStyle.fontSize || (docStyle.fontSize !== fontSize)) {
      docStyle.fontSize = fontSize;
      tvcss.callback && tvcss.callback();
    }
  };

  tvcss.update = function(e) {
    window.clearTimeout(tvcss.tid);
    tvcss.tid = window.setTimeout(tvcss.resize, 33);
  };

  tvcss.destroy = function() {};

  tvcss.init();

  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      tvcss.update();
    }
  }, false);

  window.addEventListener('resize', tvcss.update, false);
  window.addEventListener('load', tvcss.resize, false);

  if (document.readyState === 'complete') {
    tvcss.resize();
  } else {
    document.addEventListener('DOMContentLoaded', tvcss.resize, false);
  }

  tvcss.tid = window.setTimeout(tvcss.resize, 333);

  window.tvcss = tvcss;
}

export default tvcss;
