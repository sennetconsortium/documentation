/* Shared collapse/expand for Allowable Values and Description
   - Wraps content in a measured container and adds a toggle
   - Reusable for any table column index and max line count
*/
(function(){
  'use strict';

  var descriptionMap = new WeakMap();
  var bypassFormatting = false;

  // Testing bypass: if Ctrl is held while the page loads, skip all formatting.
  window.addEventListener('keydown', function(e) {
    if (e && e.ctrlKey) bypassFormatting = true;
  }, true);
  window.addEventListener('keyup', function(e) {
    if (!e || !e.ctrlKey) bypassFormatting = false;
  }, true);
  window.addEventListener('blur', function() {
    bypassFormatting = false;
  }, true);

  function normalizeText(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function setupSchemaTypeLegend() {
    var firstTable = document.querySelector('.altStyle table');
    if (!firstTable || !firstTable.querySelector('td:nth-child(2) .fa-solid')) return;
    if (document.querySelector('.schema-type-legend')) return;

    var schemaTypes = [
      { icon: 'fa-font', label: 'Text field' },
      { icon: 'fa-hashtag', label: 'Numeric' },
      { icon: 'fa-circle-nodes', label: 'Allowable value' },
      { icon: 'fa-calendar', label: 'Date/time' },
      { icon: 'fa-circle-dot', label: 'Radio' }
    ];
    var typesOnPage = schemaTypes.filter(function(type) {
      return document.querySelector('.altStyle table td:nth-child(2) .' + type.icon);
    });

    var legend = document.createElement('details');
    legend.className = 'schema-type-legend';

    var summary = document.createElement('summary');
    summary.textContent = 'Schema type legend';
    legend.appendChild(summary);

    var list = document.createElement('ul');
    list.setAttribute('aria-label', 'Schema types');
    typesOnPage.forEach(function(type) {
      var item = document.createElement('li');
      var icon = document.createElement('i');
      icon.className = 'fa-solid ' + type.icon;
      icon.setAttribute('aria-hidden', 'true');
      item.appendChild(icon);
      item.appendChild(document.createTextNode(type.label));
      list.appendChild(item);
    });
    legend.appendChild(list);

    firstTable.parentNode.insertBefore(legend, firstTable);
  }

  function getUsableCellWidth(cell, extraPx) {
    var rect = cell.getBoundingClientRect();
    var cs = window.getComputedStyle(cell);
    var paddingLeft = parseFloat(cs.paddingLeft) || 0;
    var paddingRight = parseFloat(cs.paddingRight) || 0;
    var borderLeft = parseFloat(cs.borderLeftWidth) || 0;
    var borderRight = parseFloat(cs.borderRightWidth) || 0;
    var safety = 1;
    var width = rect.width - paddingLeft - paddingRight - borderLeft - borderRight - (extraPx || 0) - safety;

    if (width <= 0 || isNaN(width)) {
      width = (cell.clientWidth || 300) - (extraPx || 0) - safety;
    }

    return Math.max(1, Math.floor(width));
  }

  function getLineHeightPx(el) {
    var cs = window.getComputedStyle(el);
    var lh = parseFloat(cs.lineHeight);
    if (!lh || isNaN(lh)) {
      var fs = parseFloat(cs.fontSize) || 16;
      lh = fs * 1.2;
    }
    return lh;
  }

  function measureTextHeight(cell, text) {
    var probe = document.createElement('span');
    var cs = window.getComputedStyle(cell);
    var innerWidth = getUsableCellWidth(cell, 0);

    probe.style.position = 'fixed';
    probe.style.left = '-100000px';
    probe.style.top = '0';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.whiteSpace = 'normal';
    probe.style.wordBreak = 'break-word';
    probe.style.overflowWrap = 'anywhere';
    probe.style.display = 'inline-block';
    probe.style.width = innerWidth + 'px';
    probe.style.fontFamily = cs.fontFamily;
    probe.style.fontSize = cs.fontSize;
    probe.style.fontWeight = cs.fontWeight;
    probe.style.fontStyle = cs.fontStyle;
    probe.style.letterSpacing = cs.letterSpacing;
    probe.style.lineHeight = cs.lineHeight;
    probe.textContent = text;

    document.body.appendChild(probe);
    var h = probe.getBoundingClientRect().height;
    document.body.removeChild(probe);
    return h;
  }

  function measureTextHeightWithToggle(cell, text, toggleLabel) {
    var probe = document.createElement('span');
    var cs = window.getComputedStyle(cell);
    var innerWidth = getUsableCellWidth(cell, 10);

    probe.style.position = 'fixed';
    probe.style.left = '-100000px';
    probe.style.top = '0';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.whiteSpace = 'normal';
    probe.style.wordBreak = 'break-word';
    probe.style.overflowWrap = 'anywhere';
    probe.style.display = 'inline-block';
    probe.style.width = innerWidth + 'px';
    probe.style.fontFamily = cs.fontFamily;
    probe.style.fontSize = cs.fontSize;
    probe.style.fontWeight = cs.fontWeight;
    probe.style.fontStyle = cs.fontStyle;
    probe.style.letterSpacing = cs.letterSpacing;
    probe.style.lineHeight = cs.lineHeight;

    var textNode = document.createTextNode(text);
    probe.appendChild(textNode);

    var suffix = document.createElement('span');
    suffix.className = 'av-inline-toggle';
    suffix.style.whiteSpace = 'nowrap';
    suffix.style.marginLeft = '10px';
    suffix.textContent = '\u00A0' + toggleLabel;
    probe.appendChild(suffix);

    document.body.appendChild(probe);
    var h = probe.getBoundingClientRect().height;
    document.body.removeChild(probe);
    return h;
  }

  function truncateToTwoLines(cell, fullText, suffixText, maxLines) {
    var lineHeight = getLineHeightPx(cell);
    var maxH = Math.round(lineHeight * maxLines);
    var expandedHeight = measureTextHeight(cell, fullText);

    if (expandedHeight <= maxH + 1) {
      return { needsToggle: false, collapsedText: fullText };
    }

    var lo = 0;
    var hi = fullText.length;
    var best = '';

    while (lo <= hi) {
      var mid = Math.floor((lo + hi) / 2);
      var candidate = fullText.slice(0, mid).replace(/\s+$/, '');
      candidate = candidate.replace(/[\s,;:.!?-]+$/, '');
      var measured = measureTextHeightWithToggle(cell, candidate, suffixText);

      if (measured <= maxH + 1) {
        best = candidate;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    while (best && measureTextHeightWithToggle(cell, best, suffixText) > maxH + 1) {
      best = best.slice(0, -1).replace(/\s+$/, '');
      best = best.replace(/[\s,;:.!?-]+$/, '');
    }

    // Extra safety buffer to avoid occasional 3rd-line wraps caused by
    // browser font/rendering differences after real DOM insertion.
    var reserveChars = 2;
    if (best.length > reserveChars) {
      best = best.slice(0, best.length - reserveChars).replace(/\s+$/, '');
      best = best.replace(/[\s,;:.!?-]+$/, '');
    }

    // Re-validate after reserve trim.
    while (best && measureTextHeightWithToggle(cell, best, suffixText) > maxH + 1) {
      best = best.slice(0, -1).replace(/\s+$/, '');
      best = best.replace(/[\s,;:.!?-]+$/, '');
    }

    return { needsToggle: true, collapsedText: best };
  }

  function renderDescriptionCell(cell, state) {
    cell.innerHTML = '';

    if (!state.needsToggle) {
      cell.textContent = state.fullText;
      return;
    }

    var textNode = document.createElement('span');
    textNode.textContent = state.expanded ? state.fullText : state.collapsedText;
    cell.appendChild(textNode);

    var toggle = document.createElement('span');
    toggle.className = 'av-inline-toggle';
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.setAttribute('aria-expanded', state.expanded ? 'true' : 'false');
    toggle.textContent = state.expanded ? '\u00A0...less' : '\u00A0...more';

    function onToggle(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      state.expanded = !state.expanded;
      renderDescriptionCell(cell, state);
    }

    toggle.addEventListener('click', onToggle);
    toggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        onToggle(e);
      }
    });

    cell.appendChild(toggle);
  }

  function setupDescriptionInlineClamp() {
    var cells = document.querySelectorAll('.altStyle table tr td:nth-child(3)');

    cells.forEach(function(cell) {
      var state = descriptionMap.get(cell);
      if (!state) {
        var fullText = normalizeText(cell.textContent || cell.innerText || '');
        if (!fullText) return;
        state = {
          fullText: fullText,
          collapsedText: fullText,
          expanded: false,
          needsToggle: false
        };
        descriptionMap.set(cell, state);
      }

      var trunc = truncateToTwoLines(cell, state.fullText, '...more', 2);
      state.collapsedText = trunc.collapsedText;
      state.needsToggle = trunc.needsToggle;

      renderDescriptionCell(cell, state);
    });
  }

  function setupCollapsible(colIndex, maxLines, showText, hideText, extraPx, options) {
    extraPx = extraPx || 0;
    options = options || {};
    var iconToggle = !!options.iconToggle;
    var tables = document.querySelectorAll('.altStyle table');
    tables.forEach(function(table){
      var rows = table.querySelectorAll('tr');
      rows.forEach(function(row){
        var tds = row.querySelectorAll('td');
        if (!tds || tds.length <= colIndex) return;
        var cell = tds[colIndex];
        if (!cell) return;
        if (cell.querySelector('.av-wrapper')) return; // already processed
        var raw = cell.innerHTML.trim();
        if (!raw) return;

        // Create wrapper and content container
        var wrapper = document.createElement('div');
        wrapper.className = 'av-wrapper';
        var content = document.createElement('div');
        content.className = 'av-content';
        content.innerHTML = raw;
        wrapper.appendChild(content);
        // Replace cell contents
        cell.innerHTML = '';
        cell.appendChild(wrapper);

        // Measure line-height
        var computed = window.getComputedStyle(content);
        var lineHeight = parseFloat(computed.lineHeight);
        if (!lineHeight || isNaN(lineHeight)) {
          var span = document.createElement('span');
          span.style.visibility = 'hidden';
          span.style.whiteSpace = 'nowrap';
          span.textContent = 'A';
          content.appendChild(span);
          lineHeight = span.getBoundingClientRect().height || 16;
          content.removeChild(span);
        }

        var maxH = Math.round(lineHeight * maxLines) + extraPx;

        // allow content to fully render to measure full height
        wrapper.style.maxHeight = 'none';
        var fullH = wrapper.scrollHeight;
        if (fullH <= maxH + 4) {
          // short content — no toggle needed
          wrapper.style.maxHeight = 'none';
          return;
        }

        // Collapse by default
        wrapper.style.maxHeight = maxH + 'px';
        wrapper.classList.add('collapsed');

        // Create toggle button
        var btn = document.createElement('button');
        btn.className = 'av-toggle';
        btn.setAttribute('aria-expanded', 'false');
        if (iconToggle) {
          btn.classList.add('av-toggle-icon');
          btn.setAttribute('aria-label', 'Expand allowable values');
          btn.setAttribute('title', 'View More');
          btn.innerHTML = '<i class="fa-solid fa-angles-down" aria-hidden="true"></i>';
        } else {
          btn.textContent = showText || 'Show more';
        }
        var icon = iconToggle ? btn.querySelector('i') : null;
        btn.addEventListener('click', function(){
          var expanded = btn.getAttribute('aria-expanded') === 'true';
          if (!expanded) {
            // expand: animate to measured height, then clear to allow natural height
            var full = wrapper.scrollHeight;
            wrapper.style.maxHeight = full + 'px';
            btn.setAttribute('aria-expanded','true');
            if (iconToggle) {
              btn.classList.add('expanded');
              btn.setAttribute('aria-label', 'Collapse allowable values');
              btn.setAttribute('title', 'View Less');
              if (icon) {
                icon.classList.remove('fa-angles-down');
                icon.classList.add('fa-angles-up');
              }
            } else {
              btn.textContent = hideText || 'Show less';
            }
            // after the transition completes, remove the max-height limit
            var onEnd = function(e) {
              if (e.propertyName === 'max-height') {
                wrapper.style.maxHeight = 'none';
                wrapper.removeEventListener('transitionend', onEnd);
              }
            };
            wrapper.addEventListener('transitionend', onEnd);
          } else {
            // collapse: ensure we start from a numeric height so the transition eases
            var currentFull = wrapper.scrollHeight;
            // If maxHeight is 'none' or unset, set it to the current full pixel height first
            var computed = window.getComputedStyle(wrapper).maxHeight;
            if (computed === 'none' || !computed) {
              wrapper.style.maxHeight = currentFull + 'px';
              // force a reflow so the browser recognizes the start height
              wrapper.getBoundingClientRect();
            }
            // then animate down to collapsed height
            wrapper.style.maxHeight = maxH + 'px';
            btn.setAttribute('aria-expanded','false');
            if (iconToggle) {
              btn.classList.remove('expanded');
              btn.setAttribute('aria-label', 'Expand allowable values');
              btn.setAttribute('title', 'View More');
              if (icon) {
                icon.classList.remove('fa-angles-up');
                icon.classList.add('fa-angles-down');
              }
            } else {
              btn.textContent = showText || 'Show more';
            }
          }
        });

        cell.appendChild(btn);
      });
    });
  }

  function init() {
    if (bypassFormatting) {
      return;
    }
    
    setupSchemaTypeLegend();

    // Description: 3rd column (index 2) — hard clamp to 2 lines using text replacement + inline suffix
    setupDescriptionInlineClamp();

    // Allowable Values: 4th column (index 3)
    setupCollapsible(3, 1, '...more', '...less', 0);

    // Add classes to the first and second tables on the page (if present).
    try {
      var allTables = document.querySelectorAll('table');
      if (allTables && allTables.length >= 1) {
        allTables[0].classList.add('currentMeta');
        allTables[0].classList.add('hmTable');
      }
      if (allTables && allTables.length >= 2) {
        allTables[1].classList.add('deprecated');
        allTables[1].classList.add('hmTable');
      }
    } catch (e) {
      // harmless if DOM isn't as expected
    }

    // Recompute description truncation after layout settles and on resize.
    window.requestAnimationFrame(function(){
      window.requestAnimationFrame(setupDescriptionInlineClamp);
    });

    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupDescriptionInlineClamp, 120);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
