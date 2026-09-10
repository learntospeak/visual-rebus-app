(function () {
  'use strict';

  var STORAGE_KEY = 'cluecanvas.visualReasoningLab.v1';
  var app = document.getElementById('app');
  var liveRegion = document.getElementById('live-region');
  var toastTimer = 0;
  var shouldFocusHeading = true;
  var pendingFocusSelector = '';
  var modalReturnFocusSelector = '';

  var GAMES = {
    connection: {
      title: 'Live Current',
      family: 'Connection Board',
      duration: '4–6 min',
      reward: 'Arc Cell',
      number: '01',
      strapline: 'Twelve scenes. Three hidden groups. One deeper field.',
      introClass: 'vr-intro-visual--connection',
      flows: [
        ['Inspect', 'Open any evidence plate for a clear close-up and literal caption.'],
        ['Connect', 'Build three groups of four scenes that share one word in different ways.'],
        ['Go deeper', 'Name the field that connects all three group labels.']
      ]
    },
    logic: {
      title: 'The Meridian Matrix',
      family: 'Visual Logic',
      duration: '4–5 min',
      reward: 'Meridian Rotor',
      number: '02',
      strapline: 'Separate three visual rules, then prove the missing panel.',
      introClass: 'vr-intro-visual--logic',
      flows: [
        ['Observe', 'Read the eight precision tiles as rows, not as decoration.'],
        ['Construct', 'Choose the one panel that satisfies all three changing attributes.'],
        ['Prove it', 'Identify the rules and watch the matrix explain itself.']
      ]
    },
    room: {
      title: 'The Conservator’s Study',
      family: 'Investigation Room',
      duration: '5–7 min',
      reward: 'Obsidian Key',
      number: '03',
      strapline: 'Read one coherent room, use its evidence, and open the sealed safe.',
      introClass: 'vr-intro-visual--room',
      flows: [
        ['Survey', 'Inspect four clearly marked areas in one continuous environment.'],
        ['Use evidence', 'Collect a tool, reveal the damaged note, and restore the chart.'],
        ['Recover', 'Use the resulting code to open the safe and identify the real folio.']
      ]
    }
  };

  var PLATES = [
    { id: 0, group: 'light', caption: 'A feather barely tips a precision balance.', position: '0% 0%' },
    { id: 1, group: 'light', caption: 'A traveller carries one slim cabin bag.', position: '33.333% 0%' },
    { id: 2, group: 'light', caption: 'The palest ivory pigment swatch in a sample book.', position: '66.667% 0%' },
    { id: 3, group: 'light', caption: 'A match touches the wick of an unlit candle.', position: '100% 0%' },
    { id: 4, group: 'current', caption: 'Autumn leaves are visibly carried downstream.', position: '0% 50%' },
    { id: 5, group: 'current', caption: 'Tonight’s newspaper edition rolls off the press.', position: '33.333% 50%' },
    { id: 6, group: 'current', caption: 'A personal bank account statement lies open.', position: '66.667% 50%' },
    { id: 7, group: 'current', caption: 'An ammeter records flow through a live wire.', position: '100% 50%' },
    { id: 8, group: 'charge', caption: 'A bull drives forward toward a barrier.', position: '0% 100%' },
    { id: 9, group: 'charge', caption: 'An itemised restaurant bill waits beside a card reader.', position: '33.333% 100%' },
    { id: 10, group: 'charge', caption: 'A court accusation file rests beside a gavel.', position: '66.667% 100%' },
    { id: 11, group: 'charge', caption: 'A battery indicator gains another illuminated bar.', position: '100% 100%' }
  ];
  var PLATE_ORDER = [7, 0, 10, 5, 2, 9, 4, 11, 1, 8, 3, 6];
  var GROUP_LABEL_OPTIONS = {
    light: ['LIGHT', 'WEIGHT', 'TRAVEL'],
    current: ['CURRENT', 'FLOW', 'TODAY'],
    charge: ['CHARGE', 'POWER', 'COST']
  };
  var GROUP_EXPLANATIONS = {
    light: 'weight, travel with little luggage, pale intensity, and ignite',
    current: 'water flow, present news, a bank account, and electrical flow',
    charge: 'rush forward, add a cost, accuse formally, and replenish a battery'
  };

  var MATRIX = [
    { frame: 'circle', spokes: ['N', 'E'], contacts: 1 },
    { frame: 'diamond', spokes: ['E', 'S'], contacts: 1 },
    { frame: 'triangle', spokes: ['N', 'S'], contacts: 2 },
    { frame: 'diamond', spokes: ['S', 'W'], contacts: 1 },
    { frame: 'triangle', spokes: ['N', 'S'], contacts: 2 },
    { frame: 'circle', spokes: ['N', 'W'], contacts: 3 },
    { frame: 'triangle', spokes: ['N', 'W'], contacts: 2 },
    { frame: 'circle', spokes: ['N', 'E'], contacts: 1 },
    null
  ];
  var MATRIX_OPTIONS = [
    { id: 'A', frame: 'diamond', spokes: ['W', 'E'], contacts: 3 },
    { id: 'B', frame: 'diamond', spokes: ['N', 'S'], contacts: 3 },
    { id: 'C', frame: 'diamond', spokes: ['W', 'E'], contacts: 1 },
    { id: 'D', frame: 'triangle', spokes: ['W', 'E'], contacts: 3 },
    { id: 'E', frame: 'diamond', spokes: ['N', 'E', 'W'], contacts: 3 },
    { id: 'F', frame: 'circle', spokes: ['N', 'S'], contacts: 2 }
  ];
  var RULES = [
    { id: 'frame', valid: true, text: 'The outer frame cycles circle → diamond → triangle, shifted one place per row.' },
    { id: 'contacts', valid: true, text: 'In each row, the third contact count is the sum of the first two.' },
    { id: 'xor', valid: true, text: 'The third spoke set is an XOR: a spoke shared by both inputs cancels.' },
    { id: 'copy', valid: false, text: 'The third tile copies every spoke from the first tile.' },
    { id: 'rise', valid: false, text: 'Contact counts always rise by one from left to right.' }
  ];

  function loadProgress() {
    try {
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        completed: {
          connection: !!(parsed.completed && parsed.completed.connection),
          logic: !!(parsed.completed && parsed.completed.logic),
          room: !!(parsed.completed && parsed.completed.room)
        },
        bonusComplete: !!parsed.bonusComplete
      };
    } catch (error) {
      return { completed: { connection: false, logic: false, room: false }, bonusComplete: false };
    }
  }

  var progress = loadProgress();
  var view = { screen: 'hub', mode: null };
  var connection = freshConnection();
  var logic = freshLogic();
  var room = freshRoom();
  var vault = freshVault(false);

  function freshConnection() {
    return {
      stage: 'groups',
      selected: [],
      archived: [],
      pendingGroup: null,
      choice: null,
      feedback: '',
      feedbackType: '',
      hint: 0,
      inspected: null
    };
  }

  function freshLogic() {
    return {
      stage: 'panel',
      option: null,
      rules: [],
      feedback: '',
      feedbackType: '',
      hint: 0,
      tracing: false
    };
  }

  function freshRoom() {
    return {
      modal: null,
      inventory: [],
      selectedItem: null,
      deskSeen: false,
      ashRevealed: false,
      chartTurns: 0,
      chartSolved: false,
      safeCode: [0, 0, 0],
      safeOpen: false,
      focusMode: false,
      feedback: '',
      hint: 0,
      complete: false
    };
  }

  function freshVault(preview) {
    return {
      preview: !!preview,
      keyUsed: false,
      cellUsed: false,
      rotorUsed: false,
      routers: [false, false, false],
      routeSolved: false,
      open: false,
      feedback: '',
      feedbackType: '',
      hint: 0
    };
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function completedCount() {
    return Object.keys(progress.completed).filter(function (key) { return progress.completed[key]; }).length;
  }

  function allGamesComplete() {
    return completedCount() === 3;
  }

  function esc(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function announce(message) {
    liveRegion.textContent = '';
    window.setTimeout(function () { liveRegion.textContent = message; }, 20);
  }

  function showToast(message) {
    var old = document.querySelector('.vr-toast');
    if (old) old.remove();
    var toast = document.createElement('div');
    toast.className = 'vr-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('is-visible'); });
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
      window.setTimeout(function () { toast.remove(); }, 180);
    }, 2200);
    announce(message);
  }

  function brand() {
    return [
      '<div class="vr-brand" aria-label="Clue Canvas visual reasoning lab">',
      '<span class="vr-brand-mark" aria-hidden="true">C</span>',
      '<span class="vr-brand-copy"><span class="vr-brand-name">CLUE CANVAS</span>',
      '<span class="vr-brand-sub">Visual reasoning lab</span></span></div>'
    ].join('');
  }

  function backButton(label) {
    return '<button class="vr-icon-btn" type="button" data-action="back" aria-label="' + esc(label || 'Back') + '">←</button>';
  }

  function topbar(right, backLabel) {
    if (backLabel) {
      return '<header class="vr-play-head">' + backButton(backLabel) +
        '<div class="vr-play-meta"><p class="vr-play-title">' + esc(right.title) + '</p>' +
        '<p class="vr-play-step">' + esc(right.step || '') + '</p></div>' +
        '<span class="vr-local-pill">Local</span></header>';
    }
    return '<header class="vr-topbar">' + brand() + (right || '<span class="vr-local-pill">Private prototype</span>') + '</header>';
  }

  function progressBar(current, total) {
    var bars = [];
    for (var i = 1; i <= total; i += 1) {
      bars.push('<span class="' + (i < current ? 'is-done' : (i === current ? 'is-active' : '')) + '"></span>');
    }
    return '<div class="vr-progress" role="progressbar" aria-label="Game progress" aria-valuemin="1" aria-valuemax="' + total + '" aria-valuenow="' + current + '">' + bars.join('') + '</div>';
  }

  function gameCard(id) {
    var game = GAMES[id];
    var done = progress.completed[id];
    var thumb;
    if (id === 'logic') {
      thumb = '<span class="vr-game-thumb vr-game-thumb--logic" aria-hidden="true">' +
        '<span class="vr-thumb-cell"></span><span class="vr-thumb-cell"></span><span class="vr-thumb-cell"></span>' +
        '<span class="vr-thumb-cell"></span><span class="vr-thumb-cell"></span><span class="vr-thumb-cell"></span>' +
        '<span class="vr-thumb-cell"></span><span class="vr-thumb-cell"></span><span class="vr-thumb-cell"></span></span>';
    } else {
      thumb = '<span class="vr-game-thumb vr-game-thumb--' + (id === 'connection' ? 'connection' : 'room') + '" aria-hidden="true"></span>';
    }
    return [
      '<button class="vr-game-card ' + (done ? 'is-complete' : '') + '" type="button" data-action="open-intro" data-mode="' + id + '">',
      thumb,
      '<span class="vr-game-card-body"><span class="vr-card-kicker">' + game.number + ' · ' + game.family + '</span>',
      '<span class="vr-card-title">' + game.title + '</span>',
      '<span class="vr-card-copy">' + game.strapline + '</span>',
      '<span class="vr-card-meta"><span>' + game.duration + '</span><span class="' + (done ? 'vr-complete-text' : '') + '">' + (done ? 'Complete · Replay' : 'Not tried') + '</span></span>',
      '</span></button>'
    ].join('');
  }

  function toolStrip() {
    var tools = [
      ['connection', 'ARC', 'Arc Cell'],
      ['logic', 'MR', 'Meridian Rotor'],
      ['room', 'OK', 'Obsidian Key']
    ];
    return '<div class="vr-tool-strip" aria-label="' + completedCount() + ' of 3 vault components earned">' +
      tools.map(function (tool) {
        var earned = progress.completed[tool[0]];
        return '<div class="vr-tool-slot ' + (earned ? 'is-earned' : '') + '">' +
          '<span class="vr-tool-icon" aria-hidden="true">' + (earned ? tool[1] : '—') + '</span>' +
          '<span>' + tool[2] + '</span></div>';
      }).join('') + '</div>';
  }

  function renderHub() {
    var unlocked = allGamesComplete();
    var bonusDone = progress.bonusComplete;
    app.innerHTML = [
      '<main class="vr-screen" aria-labelledby="hub-title">',
      topbar(),
      '<section class="vr-hero"><p class="vr-eyebrow">Three new ways to think</p>',
      '<h1 class="vr-display" id="hub-title" tabindex="-1">Beyond the rebus.</h1>',
      '<p class="vr-lede">Three deeper visual games built for an adult puzzle audience. Each earns a working component for one weekly bonus.</p></section>',
      toolStrip(),
      '<div class="vr-section-head"><h2>Choose a case</h2><span>' + completedCount() + ' of 3 complete</span></div>',
      '<section class="vr-game-list" aria-label="Prototype games">',
      gameCard('connection'), gameCard('logic'), gameCard('room'),
      '</section>',
      '<section class="vr-bonus-card ' + (bonusDone ? 'is-complete' : '') + '" aria-labelledby="bonus-title">',
      '<div class="vr-bonus-art" aria-hidden="true"></div>',
      '<div class="vr-bonus-content"><span class="vr-bonus-lock">' + (bonusDone ? 'Archive recovered' : (unlocked ? 'Access granted' : 'Weekly bonus · ' + completedCount() + '/3 components')) + '</span>',
      '<h2 class="vr-card-title" id="bonus-title">The Midnight Vault</h2>',
      '<p>One cinematic mechanism that uses the cell, rotor and key you earned—then opens a numbered archive artefact.</p>',
      unlocked
        ? '<button class="vr-btn vr-btn--brass" type="button" data-action="open-vault">' + (bonusDone ? 'Replay the vault' : 'Enter the vault') + '</button>'
        : '<button class="vr-btn vr-btn--secondary" type="button" disabled>Complete all three cases</button>',
      '</div></section>',
      '<footer class="vr-lab-footer"><p>This is a private, local-only concept. Nothing here changes the live app.</p>',
      '<div class="vr-footer-actions"><button class="vr-text-btn" type="button" data-action="preview-vault">Preview bonus</button>',
      '<button class="vr-text-btn" type="button" data-action="reset">Reset prototype</button></div></footer>',
      '</main>'
    ].join('');
    focusHeading();
  }

  function renderIntro(mode) {
    var game = GAMES[mode];
    app.innerHTML = [
      '<main class="vr-screen" aria-labelledby="intro-title">',
      topbar({ title: game.family, step: game.duration }, 'Back to games'),
      '<p class="vr-eyebrow">' + game.number + ' · ' + game.family + '</p>',
      '<h1 class="vr-title" id="intro-title" tabindex="-1">' + game.title + '</h1>',
      '<p class="vr-lede">' + game.strapline + '</p>',
      '<div class="vr-intro-visual ' + game.introClass + '" role="img" aria-label="Premium visual preview for ' + esc(game.title) + '"><span class="vr-intro-number">' + game.number + '</span></div>',
      '<div class="vr-flow-list" aria-label="How this prototype flows">',
      game.flows.map(function (flow, index) {
        return '<div class="vr-flow-row"><span class="vr-flow-number">0' + (index + 1) + '</span><div><strong>' + flow[0] + '</strong><p>' + flow[1] + '</p></div></div>';
      }).join(''),
      '</div>',
      '<div class="vr-actions vr-actions--single"><button class="vr-btn vr-btn--teal vr-btn--wide" type="button" data-action="start-mode" data-mode="' + mode + '">' + (progress.completed[mode] ? 'Replay prototype' : 'Begin prototype') + '</button></div>',
      '</main>'
    ].join('');
    focusHeading();
  }

  function focusHeading() {
    var focusNewScreen = shouldFocusHeading;
    var requestedSelector = pendingFocusSelector;
    shouldFocusHeading = false;
    pendingFocusSelector = '';
    window.setTimeout(function () {
      var overlay = app.querySelector('.vr-sheet-overlay');
      if (overlay) {
        var screen = overlay.parentElement;
        Array.prototype.forEach.call(screen.children, function (child) {
          if (child !== overlay) child.inert = true;
        });
      }
      var target = focusNewScreen
        ? app.querySelector('h1[tabindex="-1"], [data-focus-heading]')
        : (requestedSelector ? app.querySelector(requestedSelector) : null);
      if (!target && overlay) target = overlay.querySelector('button[data-action="close-sheet"]');
      if (!target && requestedSelector) target = app.querySelector('[data-focus-heading]');
      if (target) target.focus({ preventScroll: true });
    }, 0);
  }

  function actionSelector(element) {
    if (!element || !element.dataset.action) return '';
    var selector = '[data-action="' + element.dataset.action + '"]';
    ['mode', 'id', 'value', 'zone', 'item', 'tool', 'index', 'delta'].forEach(function (key) {
      if (typeof element.dataset[key] !== 'undefined') {
        selector += '[data-' + key + '="' + element.dataset[key] + '"]';
      }
    });
    return selector;
  }

  function setView(screen, mode, focus) {
    view.screen = screen;
    view.mode = mode || null;
    shouldFocusHeading = focus !== false;
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    if (view.screen === 'hub') return renderHub();
    if (view.screen === 'intro') return renderIntro(view.mode);
    if (view.screen === 'connection') return renderConnection();
    if (view.screen === 'logic') return renderLogic();
    if (view.screen === 'room') return renderRoom();
    if (view.screen === 'vault') return renderVault();
    renderHub();
  }

  function connectionStep() {
    if (connection.stage === 'groups') return connection.archived.length + 1;
    if (connection.stage === 'label') return connection.archived.length + 1;
    if (connection.stage === 'field') return 4;
    return 5;
  }

  function connectionHint() {
    var hints = [
      'Each set is one word used four different ways.',
      'The feather and traveller share LIGHT; the river and bank statement share CURRENT.',
      'Anchor the remaining sets with the bull for CHARGE and the ammeter for CURRENT.'
    ];
    return connection.hint ? '<div class="vr-clue"><strong>Clue ' + connection.hint + ' of 3</strong>' + hints[connection.hint - 1] + '</div>' : '';
  }

  function feedbackBlock(text, type) {
    if (!text) return '';
    return '<div class="vr-feedback vr-feedback--' + (type === 'correct' ? 'correct' : 'wrong') + '" role="status">' + text + '</div>';
  }

  function plateMarkup(id) {
    var plate = PLATES[id];
    var selected = connection.selected.indexOf(id) !== -1;
    var archived = connection.archived.some(function (entry) { return entry.ids.indexOf(id) !== -1; });
    return [
      '<div class="vr-plate ' + (selected ? 'is-selected ' : '') + (archived ? 'is-archived' : '') + '">',
      '<button class="vr-plate-select" type="button" data-action="toggle-plate" data-id="' + id + '" aria-pressed="' + selected + '" ' + (archived ? 'disabled' : '') + '>',
      '<span class="vr-plate-image" style="background-position:' + plate.position + '" aria-hidden="true"></span>',
      '<span class="vr-plate-caption">' + esc(plate.caption) + '</span>',
      '<span class="vr-plate-index" aria-hidden="true">' + String(id + 1).padStart(2, '0') + '</span></button>',
      '<button class="vr-inspect-btn" type="button" data-action="inspect-plate" data-id="' + id + '" aria-label="Inspect plate ' + (id + 1) + ': ' + esc(plate.caption) + '">Inspect</button>',
      '</div>'
    ].join('');
  }

  function archiveMarkup() {
    if (!connection.archived.length) return '';
    return '<div class="vr-archive" aria-label="Solved groups">' + connection.archived.map(function (entry) {
      return '<div class="vr-archive-row"><strong>' + entry.group.toUpperCase() + '</strong><div><div class="vr-archive-thumbs" aria-hidden="true">' +
        entry.ids.map(function (id) {
          return '<span style="background-position:' + PLATES[id].position + '"></span>';
        }).join('') + '</div><span class="vr-small-copy">' + GROUP_EXPLANATIONS[entry.group] + '</span></div></div>';
    }).join('') + '</div>';
  }

  function connectionGroupScreen() {
    var availableCount = 12 - connection.archived.length * 4;
    return [
      '<section class="vr-surface" aria-labelledby="connection-board-title">',
      '<div class="vr-surface-head"><h2 class="vr-subtitle" id="connection-board-title">' + (connection.archived.length ? 'Build the next group' : 'Build a group of four') + '</h2>',
      '<p class="vr-copy">Select four plates that share one word in four different senses. Inspect any image if its literal subject is unclear.</p></div>',
      archiveMarkup(),
      '<div class="vr-board" aria-label="' + availableCount + ' evidence plates remaining">' + PLATE_ORDER.map(plateMarkup).join('') + '</div>',
      feedbackBlock(connection.feedback, connection.feedbackType),
      connectionHint(),
      '<div class="vr-selection-tray"><span class="vr-selection-count">' + connection.selected.length + ' of 4 selected</span>',
      '<button class="vr-btn vr-btn--brass" type="button" data-action="test-group" ' + (connection.selected.length === 4 ? '' : 'disabled') + '>Test group</button></div>',
      '</section>',
      '<div class="vr-actions"><button class="vr-btn vr-btn--secondary" type="button" data-action="connection-hint" ' + (connection.hint >= 3 ? 'disabled' : '') + '>Clue</button>',
      '<button class="vr-btn vr-btn--secondary" type="button" data-action="clear-selection" ' + (connection.selected.length ? '' : 'disabled') + '>Clear selection</button></div>'
    ].join('');
  }

  function connectionLabelScreen() {
    var group = connection.pendingGroup;
    var choices = GROUP_LABEL_OPTIONS[group];
    return [
      '<section class="vr-surface" aria-labelledby="group-label-title">',
      '<div class="vr-surface-head"><p class="vr-eyebrow">Connection found</p><h2 class="vr-subtitle" id="group-label-title">Name the shared word</h2>',
      '<p class="vr-copy">All four plates belong together. Choose the exact word that works in every scene.</p></div>',
      '<div class="vr-archive"><div class="vr-archive-row"><strong>4 PLATES</strong><div class="vr-archive-thumbs" aria-hidden="true">' +
      connection.selected.map(function (id) { return '<span style="background-position:' + PLATES[id].position + '"></span>'; }).join('') +
      '</div></div></div>',
      '<div class="vr-option-list">' + choices.map(function (choice) {
        var selected = connection.choice === choice;
        return '<button class="vr-option ' + (selected ? 'is-selected' : '') + '" type="button" data-action="choose-group-label" data-value="' + choice + '" aria-pressed="' + selected + '"><span class="vr-option-mark">✓</span>' + choice + '</button>';
      }).join('') + '</div>',
      feedbackBlock(connection.feedback, connection.feedbackType),
      connectionHint(),
      '</section>',
      '<div class="vr-actions"><button class="vr-btn vr-btn--secondary" type="button" data-action="connection-hint" ' + (connection.hint >= 3 ? 'disabled' : '') + '>Clue</button>',
      '<button class="vr-btn vr-btn--teal" type="button" data-action="confirm-group-label" ' + (connection.choice ? '' : 'disabled') + '>Confirm label</button></div>'
    ].join('');
  }

  function connectionFieldScreen() {
    var fields = ['ELECTRICITY', 'MOVEMENT', 'FINANCE', 'ENERGY'];
    return [
      '<section class="vr-surface" aria-labelledby="field-title">',
      '<div class="vr-surface-head"><p class="vr-eyebrow">Final connection</p><h2 class="vr-subtitle" id="field-title">What single field links the three group words?</h2>',
      '<p class="vr-copy">The groups are solved. Now use their labels as a new set of evidence.</p></div>',
      archiveMarkup(),
      '<div class="vr-option-list">' + fields.map(function (field) {
        var selected = connection.choice === field;
        return '<button class="vr-option ' + (selected ? 'is-selected' : '') + '" type="button" data-action="choose-field" data-value="' + field + '" aria-pressed="' + selected + '"><span class="vr-option-mark">✓</span>' + field + '</button>';
      }).join('') + '</div>',
      feedbackBlock(connection.feedback, connection.feedbackType),
      connectionHint(),
      '</section>',
      '<div class="vr-actions"><button class="vr-btn vr-btn--secondary" type="button" data-action="connection-hint" ' + (connection.hint >= 3 ? 'disabled' : '') + '>Clue</button>',
      '<button class="vr-btn vr-btn--teal" type="button" data-action="confirm-field" ' + (connection.choice ? '' : 'disabled') + '>Make connection</button></div>'
    ].join('');
  }

  function rewardScreen(mode, symbol, description) {
    var game = GAMES[mode];
    var objectClass = mode === 'connection' ? ' vr-reward-object--cell' : (mode === 'room' ? ' vr-reward-object--key' : '');
    return [
      '<section class="vr-surface vr-reward" aria-labelledby="reward-title">',
      '<div class="vr-surface-head"><p class="vr-eyebrow">Case resolved</p><h1 class="vr-title" id="reward-title" tabindex="-1">' + game.reward + '</h1>',
      '<p class="vr-copy">' + description + '</p></div>',
      '<div class="vr-reward-object' + objectClass + '" aria-hidden="true">' + symbol + '</div>',
      '<p class="vr-reward-meta">Vault component earned</p>',
      '<div class="vr-surface-head"><p class="vr-small-copy">This is not a decorative badge. It becomes a working part of The Midnight Vault.</p></div>',
      '</section>',
      '<div class="vr-actions vr-actions--single"><button class="vr-btn vr-btn--teal vr-btn--wide" type="button" data-action="return-hub">Return to the lab</button></div>'
    ].join('');
  }

  function renderConnection() {
    var content = connection.stage === 'groups' ? connectionGroupScreen() :
      (connection.stage === 'label' ? connectionLabelScreen() :
        (connection.stage === 'field' ? connectionFieldScreen() :
          rewardScreen('connection', 'ARC', 'LIGHT, CURRENT and CHARGE converge on electricity. The recovered cell now supplies the vault’s optical network.')));
    app.innerHTML = [
      '<main class="vr-screen vr-screen--play" aria-labelledby="connection-title">',
      topbar({ title: 'Live Current', step: connection.stage === 'reward' ? 'Complete' : 'Connection Board' }, 'Back to game overview'),
      progressBar(connectionStep(), 5),
      '<div class="vr-objective"><span class="vr-objective-label">Objective</span><strong id="connection-title" data-focus-heading tabindex="-1">Resolve three groups, then find their common field.</strong></div>',
      content,
      connection.inspected !== null ? inspectPlateSheet(connection.inspected) : '',
      '</main>'
    ].join('');
    focusHeading();
  }

  function inspectPlateSheet(id) {
    var plate = PLATES[id];
    return '<div class="vr-sheet-overlay" data-action="close-sheet" role="presentation"><section class="vr-sheet" role="dialog" aria-modal="true" aria-labelledby="inspect-title" data-sheet>' +
      '<header class="vr-sheet-head"><h2 id="inspect-title">Evidence plate ' + String(id + 1).padStart(2, '0') + '</h2><button class="vr-icon-btn" type="button" data-action="close-sheet" aria-label="Close inspection">×</button></header>' +
      '<div class="vr-sheet-body"><div class="vr-inspect-image" style="background-position:' + plate.position + '" role="img" aria-label="' + esc(plate.caption) + '"></div>' +
      '<p class="vr-copy"><strong>Literal read:</strong> ' + esc(plate.caption) + '</p><p class="vr-small-copy">The caption describes only what is visibly present; it does not identify the hidden group.</p></div></section></div>';
  }

  function handleTogglePlate(id) {
    var index = connection.selected.indexOf(id);
    connection.feedback = '';
    if (index !== -1) {
      connection.selected.splice(index, 1);
    } else if (connection.selected.length < 4) {
      connection.selected.push(id);
    } else {
      showToast('Four plates are already selected. Remove one before adding another.');
    }
    shouldFocusHeading = false;
    renderConnection();
  }

  function testConnectionGroup() {
    if (connection.selected.length !== 4) return;
    var groups = connection.selected.map(function (id) { return PLATES[id].group; });
    var unique = groups.filter(function (group, index) { return groups.indexOf(group) === index; });
    if (unique.length === 1) {
      connection.pendingGroup = unique[0];
      connection.choice = null;
      connection.feedback = '';
      connection.stage = 'label';
      shouldFocusHeading = false;
      renderConnection();
      announce('Connection found. Now name the shared word.');
      return;
    }
    var counts = groups.reduce(function (result, group) {
      result[group] = (result[group] || 0) + 1;
      return result;
    }, {});
    var best = Math.max.apply(null, Object.keys(counts).map(function (key) { return counts[key]; }));
    connection.feedback = best === 3
      ? '<strong>Very close.</strong> One plate is misplaced. Your selection has been preserved.'
      : '<strong>Not a complete set.</strong> These scenes do not all share the same word. Nothing moved.';
    connection.feedbackType = 'wrong';
    shouldFocusHeading = false;
    renderConnection();
    announce(best === 3 ? 'Very close. One plate is misplaced.' : 'Not a complete set. Nothing moved.');
  }

  function confirmGroupLabel() {
    if (!connection.choice) return;
    if (connection.choice.toLowerCase() !== connection.pendingGroup) {
      connection.feedback = '<strong>The scenes fit, but that label does not.</strong> Try the word that changes meaning in all four captions.';
      connection.feedbackType = 'wrong';
      shouldFocusHeading = false;
      renderConnection();
      return;
    }
    connection.archived.push({ group: connection.pendingGroup, ids: connection.selected.slice() });
    connection.selected = [];
    connection.pendingGroup = null;
    connection.choice = null;
    connection.feedback = '';
    connection.stage = connection.archived.length === 3 ? 'field' : 'groups';
    shouldFocusHeading = false;
    renderConnection();
    announce('Group archived. ' + (3 - connection.archived.length) + ' groups remain.');
  }

  function confirmField() {
    if (connection.choice !== 'ELECTRICITY') {
      connection.feedback = '<strong>That field does not use all three words precisely.</strong> Look for a field with light, current and charge as native terms.';
      connection.feedbackType = 'wrong';
      shouldFocusHeading = false;
      renderConnection();
      return;
    }
    progress.completed.connection = true;
    saveProgress();
    connection.stage = 'reward';
    connection.feedback = '';
    shouldFocusHeading = true;
    renderConnection();
    announce('Connection Board complete. Arc Cell earned.');
  }

  function matrixSvg(tile) {
    if (!tile) return '<span aria-hidden="true">?</span>';
    var frame = tile.frame === 'circle'
      ? '<circle cx="50" cy="50" r="30"></circle>'
      : (tile.frame === 'diamond'
        ? '<path d="M50 16 L84 50 L50 84 L16 50 Z"></path>'
        : '<path d="M50 15 L85 80 L15 80 Z"></path>');
    var points = { N: [50, 24], E: [76, 50], S: [50, 76], W: [24, 50] };
    var spokes = tile.spokes.map(function (direction) {
      return '<line x1="50" y1="50" x2="' + points[direction][0] + '" y2="' + points[direction][1] + '"></line>';
    }).join('');
    var contactPoints = [[50, 9], [88, 68], [12, 68]];
    var contacts = contactPoints.slice(0, tile.contacts).map(function (point) {
      return '<circle class="contact" cx="' + point[0] + '" cy="' + point[1] + '" r="4"></circle>';
    }).join('');
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="#17323f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
      frame + spokes + '<circle cx="50" cy="50" r="5" fill="#17323f"></circle></g><g fill="#b5894b" stroke="#7c5b2d" stroke-width="1">' + contacts + '</g></svg>';
  }

  function logicHint() {
    var hints = [
      'Read each row left-to-right; the third panel is constructed from the first two.',
      'Track the outer frame, gold contacts and black spokes as three separate systems.',
      'Add the contacts. For spokes, anything shared by both inputs disappears.'
    ];
    return logic.hint ? '<div class="vr-clue"><strong>Clue ' + logic.hint + ' of 3</strong>' + hints[logic.hint - 1] + '</div>' : '';
  }

  function logicPanelScreen() {
    return [
      '<section class="vr-surface" aria-labelledby="matrix-title">',
      '<div class="vr-surface-head"><h2 class="vr-subtitle" id="matrix-title">Complete the matrix</h2>',
      '<p class="vr-copy">Choose the missing bottom-right panel. Each tile carries three independent attributes.</p></div>',
      '<div class="vr-matrix-wrap"><div class="vr-matrix" role="img" aria-label="Three by three visual matrix with the bottom-right tile missing">',
      MATRIX.map(function (tile, index) {
        return '<div class="vr-matrix-cell ' + (!tile ? 'vr-matrix-cell--missing' : '') + ' ' + (logic.tracing ? 'is-tracing' : '') + '">' + matrixSvg(tile) + '<span class="vr-sr-only">Tile ' + (index + 1) + (tile ? ': ' + tile.frame + ', ' + tile.contacts + ' contacts, spokes ' + tile.spokes.join(' and ') : ': missing') + '</span></div>';
      }).join(''),
      '</div></div>',
      '<div class="vr-matrix-options" aria-label="Missing panel choices">' + MATRIX_OPTIONS.map(function (option) {
        var selected = logic.option === option.id;
        return '<button class="vr-matrix-option ' + (selected ? 'is-selected' : '') + '" type="button" data-action="choose-matrix" data-value="' + option.id + '" aria-pressed="' + selected + '" aria-label="Option ' + option.id + ': ' + option.frame + ', ' + option.contacts + ' contacts, spokes ' + option.spokes.join(' and ') + '"><span class="vr-matrix-letter">' + option.id + '</span>' + matrixSvg(option) + '</button>';
      }).join('') + '</div>',
      feedbackBlock(logic.feedback, logic.feedbackType),
      logicHint(),
      '</section>',
      '<div class="vr-actions"><button class="vr-btn vr-btn--secondary" type="button" data-action="logic-hint" ' + (logic.hint >= 3 ? 'disabled' : '') + '>Clue</button>',
      '<button class="vr-btn vr-btn--teal" type="button" data-action="confirm-matrix" ' + (logic.option ? '' : 'disabled') + '>Confirm panel</button></div>'
    ].join('');
  }

  function logicRuleScreen() {
    return [
      '<section class="vr-surface" aria-labelledby="rule-title">',
      '<div class="vr-surface-head"><p class="vr-eyebrow">Panel accepted</p><h2 class="vr-subtitle" id="rule-title">Prove all three rules</h2>',
      '<p class="vr-copy">Select exactly three statements that hold across every row.</p></div>',
      '<div class="vr-matrix-wrap"><div class="vr-matrix">' + MATRIX.map(function (tile) {
        return '<div class="vr-matrix-cell ' + (logic.tracing ? 'is-tracing' : '') + '">' + matrixSvg(tile || MATRIX_OPTIONS[0]) + '</div>';
      }).join('') + '</div></div>',
      '<div class="vr-rule-list">' + RULES.map(function (rule) {
        var selected = logic.rules.indexOf(rule.id) !== -1;
        return '<button class="vr-rule-button ' + (selected ? 'is-selected' : '') + '" type="button" data-action="toggle-rule" data-value="' + rule.id + '" aria-pressed="' + selected + '"><span class="vr-rule-check">✓</span><span>' + rule.text + '</span></button>';
      }).join('') + '</div>',
      feedbackBlock(logic.feedback, logic.feedbackType),
      logicHint(),
      '</section>',
      '<div class="vr-actions"><button class="vr-btn vr-btn--secondary" type="button" data-action="logic-hint" ' + (logic.hint >= 3 ? 'disabled' : '') + '>Clue</button>',
      '<button class="vr-btn vr-btn--teal" type="button" data-action="confirm-rules" ' + (logic.rules.length === 3 ? '' : 'disabled') + '>Prove rules</button></div>'
    ].join('');
  }

  function renderLogic() {
    var content = logic.stage === 'panel' ? logicPanelScreen() :
      (logic.stage === 'rules' ? logicRuleScreen() :
        rewardScreen('logic', '◇', 'The missing diamond—with a horizontal channel and three contacts—becomes the rotor that controls the vault’s final junction.'));
    app.innerHTML = [
      '<main class="vr-screen vr-screen--play" aria-labelledby="logic-title">',
      topbar({ title: 'The Meridian Matrix', step: logic.stage === 'reward' ? 'Complete' : 'Visual Logic' }, 'Back to game overview'),
      progressBar(logic.stage === 'panel' ? 1 : (logic.stage === 'rules' ? 2 : 3), 3),
      '<div class="vr-objective"><span class="vr-objective-label">Objective</span><strong id="logic-title" data-focus-heading tabindex="-1">Construct the missing panel, then prove every rule.</strong></div>',
      content,
      '</main>'
    ].join('');
    focusHeading();
  }

  function confirmMatrix() {
    if (logic.option !== 'A') {
      var messages = {
        B: 'The frame and contact count fit, but the spoke construction conflicts.',
        C: 'The frame and spokes fit, but the contact total conflicts.',
        D: 'The spokes and contacts fit, but the frame cycle conflicts.',
        E: 'The frame and contacts fit, but shared spokes should cancel.',
        F: 'The frame, spoke result and contact total each conflict with the row.'
      };
      logic.feedback = '<strong>That panel breaks the system.</strong> ' + messages[logic.option];
      logic.feedbackType = 'wrong';
      shouldFocusHeading = false;
      renderLogic();
      return;
    }
    logic.stage = 'rules';
    logic.feedback = '';
    logic.tracing = true;
    shouldFocusHeading = false;
    renderLogic();
    announce('Panel accepted. Now prove the three rules.');
    window.setTimeout(function () {
      logic.tracing = false;
      if (view.screen === 'logic') {
        shouldFocusHeading = false;
        renderLogic();
      }
    }, 700);
  }

  function toggleRule(id) {
    var index = logic.rules.indexOf(id);
    logic.feedback = '';
    if (index !== -1) logic.rules.splice(index, 1);
    else if (logic.rules.length < 3) logic.rules.push(id);
    else showToast('Choose exactly three rules. Remove one before adding another.');
    shouldFocusHeading = false;
    renderLogic();
  }

  function confirmRules() {
    var valid = RULES.filter(function (rule) { return rule.valid; }).map(function (rule) { return rule.id; });
    var correct = valid.every(function (id) { return logic.rules.indexOf(id) !== -1; });
    if (!correct) {
      logic.feedback = '<strong>At least one claim fails.</strong> A valid rule must survive all three rows, not just the final one.';
      logic.feedbackType = 'wrong';
      shouldFocusHeading = false;
      renderLogic();
      return;
    }
    progress.completed.logic = true;
    saveProgress();
    logic.stage = 'reward';
    logic.tracing = true;
    shouldFocusHeading = true;
    renderLogic();
    announce('Visual Logic complete. Meridian Rotor earned.');
  }

  function roomHint() {
    var hints = [
      'Begin at the desk. The ledger records an order, and a brass viewing lens is there to take.',
      'Use the lens on the ash. The surviving instruction tells you how far to rotate the framed chart.',
      'Two right turns reveal 4–7–2 in the ledger’s crescent, spire, ember order. Use that on the safe.'
    ];
    return room.hint ? '<div class="vr-clue"><strong>Clue ' + room.hint + ' of 3</strong>' + hints[room.hint - 1] + '</div>' : '';
  }

  function roomScene() {
    var sceneClasses = 'vr-room-scene' + (room.focusMode ? ' is-focus-mode' : '');
    var zones = [
      { id: 'desk', label: 'Desk', x: 36, y: 66, done: room.inventory.indexOf('lens') !== -1 },
      { id: 'ash', label: 'Ash', x: 82, y: 82, done: room.ashRevealed },
      { id: 'chart', label: 'Chart', x: 62, y: 30, done: room.chartSolved },
      { id: 'safe', label: 'Safe', x: 87, y: 55, done: room.safeOpen }
    ];
    return [
      '<section class="vr-surface" aria-labelledby="study-title">',
      '<div class="vr-surface-head"><h2 class="vr-subtitle" id="study-title">Survey the study</h2>',
      '<p class="vr-copy">Every marked area has a matching text control below. Select the brass lens in your inventory before applying it to evidence.</p></div>',
      '<div class="' + sceneClasses + '" aria-label="A rain-darkened Art Deco study with desk, fireplace, framed chart, wall clock and brass safe">',
      zones.map(function (zone, index) {
        return '<button class="vr-hotspot ' + (zone.done ? 'is-complete' : '') + '" style="left:' + zone.x + '%;top:' + zone.y + '%" type="button" data-action="open-room-zone" data-zone="' + zone.id + '" aria-label="Inspect ' + zone.label + '">' + (zone.done ? '✓' : (index + 1)) + '</button>';
      }).join(''),
      '</div>',
      '<div class="vr-zone-list" aria-label="Study areas">' + zones.map(function (zone, index) {
        return '<button class="vr-zone-button ' + (zone.done ? 'is-complete' : '') + '" type="button" data-action="open-room-zone" data-zone="' + zone.id + '">' + (zone.done ? '✓ ' : (index + 1) + ' ') + zone.label + '</button>';
      }).join('') + '</div>',
      '</section>',
      '<div class="vr-inventory" aria-label="Evidence inventory"><span class="vr-inventory-label">Inventory</span>' +
      (room.inventory.length
        ? '<button class="vr-inventory-item ' + (room.selectedItem === 'lens' ? 'is-selected' : '') + '" type="button" data-action="select-inventory" data-item="lens" aria-pressed="' + (room.selectedItem === 'lens') + '"><span aria-hidden="true">◎</span><span>Viewing lens</span></button>'
        : '<span class="vr-small-copy">Empty — inspect the desk first.</span>') +
      '</div>',
      feedbackBlock(room.feedback, 'wrong'),
      roomHint(),
      '<div class="vr-actions"><button class="vr-btn vr-btn--secondary" type="button" data-action="room-hint" ' + (room.hint >= 3 ? 'disabled' : '') + '>Clue</button>',
      '<button class="vr-btn vr-btn--secondary" type="button" data-action="room-focus" aria-pressed="' + room.focusMode + '">' + (room.focusMode ? 'Hide focus' : 'Focus targets') + '</button></div>'
    ].join('');
  }

  function symbolRow(order) {
    var symbols = { crescent: '☾', spire: '△', ember: '✦' };
    return '<span class="vr-symbols" aria-label="' + order.join(', ') + '">' + order.map(function (item) {
      return '<span class="vr-symbol" aria-hidden="true">' + symbols[item] + '</span>';
    }).join('') + '</span>';
  }

  function roomSheet() {
    if (!room.modal) return '';
    var title = '';
    var body = '';
    if (room.modal === 'desk') {
      title = 'The conservator’s desk';
      body = [
        '<div class="vr-closeup"><div class="vr-ledger"><div class="vr-ledger-line"><span>Provenance sequence</span><span>Verified</span></div>',
        '<div class="vr-ledger-line"><span>Crescent</span><span>First</span></div><div class="vr-ledger-line"><span>Spire</span><span>Second</span></div><div class="vr-ledger-line"><span>Ember</span><span>Third</span></div>',
        symbolRow(['crescent', 'spire', 'ember']), '</div></div>',
        '<p class="vr-copy"><strong>Observation:</strong> The ledger fixes the authentication order: crescent, spire, ember. A brass viewing lens rests beside it.</p>',
        room.inventory.indexOf('lens') === -1
          ? '<button class="vr-btn vr-btn--brass vr-btn--wide" type="button" data-action="take-lens">Take viewing lens</button>'
          : '<div class="vr-feedback vr-feedback--correct"><strong>Collected</strong>The viewing lens is now in your inventory.</div>'
      ].join('');
    }
    if (room.modal === 'ash') {
      title = 'The ash table';
      body = room.ashRevealed
        ? '<div class="vr-closeup"><div class="vr-charred-note"><strong>TWO TURNS CLOCKWISE</strong><br>restore true north</div></div><p class="vr-copy"><strong>Recovered instruction:</strong> Rotate the framed chart two clockwise turns from its resting position.</p>'
        : '<div class="vr-closeup"><div class="vr-charred-note">The surviving ink is buried beneath soot.</div></div><p class="vr-copy"><strong>Observation:</strong> A charred instruction remains, but normal sight cannot separate the ink from the ash.</p>' +
          (room.inventory.indexOf('lens') !== -1
            ? '<button class="vr-btn vr-btn--brass vr-btn--wide" type="button" data-action="apply-lens-ash">Apply viewing lens</button>'
            : '<div class="vr-feedback vr-feedback--wrong"><strong>A tool is missing.</strong>Something on the desk may reveal the damaged writing.</div>');
    }
    if (room.modal === 'chart') {
      title = 'The meridian chart';
      body = [
        '<div class="vr-closeup"><div class="vr-chart" style="--chart-rotation:' + (room.chartTurns * 45) + 'deg">',
        '<span class="vr-chart-mark" style="--mark-angle:0deg">☾</span><span class="vr-chart-mark" style="--mark-angle:120deg">△</span><span class="vr-chart-mark" style="--mark-angle:240deg">✦</span>',
        room.chartSolved ? '<div class="vr-chart-digits" aria-label="Crescent 4, spire 7, ember 2">4 · 7 · 2</div>' : '',
        '</div></div>',
        '<p class="vr-copy"><strong>Observation:</strong> The chart rotates in measured stops. ' + (room.ashRevealed ? 'Use the recovered instruction.' : 'Its correct orientation is not recorded here.') + '</p>',
        '<div class="vr-control-row"><button class="vr-control" type="button" data-action="rotate-chart" data-delta="-1" aria-label="Rotate chart left">↶ Left</button>',
        '<button class="vr-control" type="button" data-action="rotate-chart" data-delta="1" aria-label="Rotate chart right">Right ↷</button></div>',
        room.chartSolved ? '<div class="vr-feedback vr-feedback--correct"><strong>Alignment restored.</strong>The marks read crescent 4, spire 7, ember 2.</div>' : ''
      ].join('');
    }
    if (room.modal === 'safe') {
      title = 'The sealed archive safe';
      body = room.safeOpen ? folioMarkup() : [
        '<div class="vr-closeup"><div><div class="vr-code-dials" aria-label="Three digit safe code">',
        room.safeCode.map(function (value, index) {
          return '<div class="vr-code-dial"><button type="button" data-action="dial" data-index="' + index + '" data-delta="1" aria-label="Increase digit ' + (index + 1) + '">▲</button><span class="vr-code-value">' + value + '</span><button type="button" data-action="dial" data-index="' + index + '" data-delta="-1" aria-label="Decrease digit ' + (index + 1) + '">▼</button></div>';
        }).join(''),
        '</div></div></div>',
        '<p class="vr-copy"><strong>Observation:</strong> Three mechanical dials guard the conservation archive.</p>',
        '<button class="vr-btn vr-btn--brass vr-btn--wide" type="button" data-action="unlock-safe">Release lock</button>',
        room.feedback ? '<div class="vr-feedback vr-feedback--wrong"><strong>Lock unchanged.</strong>' + room.feedback + '</div>' : ''
      ].join('');
    }
    return '<div class="vr-sheet-overlay" data-action="close-sheet" role="presentation"><section class="vr-sheet vr-sheet--dark" role="dialog" aria-modal="true" aria-labelledby="room-sheet-title" data-sheet>' +
      '<header class="vr-sheet-head"><h2 id="room-sheet-title">' + title + '</h2><button class="vr-icon-btn" type="button" data-action="close-sheet" aria-label="Close inspection">×</button></header>' +
      '<div class="vr-sheet-body">' + body + '</div></section></div>';
  }

  function folioMarkup() {
    var folios = [
      { id: 'A', order: ['spire', 'crescent', 'ember'] },
      { id: 'B', order: ['crescent', 'spire', 'ember'] },
      { id: 'C', order: ['crescent', 'ember', 'spire'] }
    ];
    return '<div class="vr-closeup"><div><p class="vr-eyebrow">Archive drawer released</p><div class="vr-folio-grid" aria-label="Three sealed folios">' +
      folios.map(function (folio) {
        return '<button class="vr-folio" type="button" data-action="choose-folio" data-value="' + folio.id + '" aria-label="Folio ' + folio.id + ': ' + folio.order.join(', ') + '"><strong>Folio ' + folio.id + '</strong>' + symbolRow(folio.order) + '</button>';
      }).join('') + '</div></div></div><p class="vr-copy"><strong>Final deduction:</strong> Recover the folio whose provenance marks match the ledger’s exact order.</p>' +
      (room.feedback ? '<div class="vr-feedback vr-feedback--wrong"><strong>Seal rejected.</strong>' + room.feedback + '</div>' : '');
  }

  function renderRoom() {
    var content = room.complete
      ? rewardScreen('room', 'KEY', 'The authentic folio’s spine held an obsidian service key. It will open the Midnight Vault’s sealed grille and final control.')
      : roomScene();
    var step = room.complete ? 6 : 1 + [room.inventory.indexOf('lens') !== -1, room.ashRevealed, room.chartSolved, room.safeOpen].filter(Boolean).length;
    app.innerHTML = [
      '<main class="vr-screen vr-screen--dark vr-screen--play" aria-labelledby="room-title">',
      topbar({ title: 'The Conservator’s Study', step: room.complete ? 'Complete' : 'Investigation Room' }, 'Back to game overview'),
      progressBar(step, 6),
      '<div class="vr-objective"><span class="vr-objective-label">Objective</span><strong id="room-title" data-focus-heading tabindex="-1">Open the sealed safe and recover the authentic folio.</strong></div>',
      content,
      roomSheet(),
      '</main>'
    ].join('');
    focusHeading();
  }

  function openRoomZone(zone) {
    room.feedback = '';
    room.modal = zone;
    if (zone === 'desk') room.deskSeen = true;
    if (zone === 'ash' && room.selectedItem === 'lens' && room.inventory.indexOf('lens') !== -1) {
      room.ashRevealed = true;
      if (room.chartTurns === 2) room.chartSolved = true;
      announce('The lens reveals a charred instruction: two turns restore true north.');
    }
    shouldFocusHeading = false;
    renderRoom();
  }

  function takeLens() {
    if (room.inventory.indexOf('lens') === -1) room.inventory.push('lens');
    room.selectedItem = 'lens';
    shouldFocusHeading = false;
    renderRoom();
    announce('Viewing lens collected and selected.');
  }

  function rotateChart(delta) {
    room.chartTurns = (room.chartTurns + delta + 8) % 8;
    if (room.ashRevealed && room.chartTurns === 2) {
      room.chartSolved = true;
      announce('Chart aligned. The marks reveal 4, 7, 2.');
    } else {
      room.chartSolved = false;
    }
    shouldFocusHeading = false;
    renderRoom();
  }

  function changeDial(index, delta) {
    room.safeCode[index] = (room.safeCode[index] + delta + 10) % 10;
    room.feedback = '';
    shouldFocusHeading = false;
    renderRoom();
  }

  function unlockSafe() {
    if (room.safeCode.join('') === '472') {
      room.safeOpen = true;
      room.feedback = '';
      announce('The archive safe opens. Three folios are inside.');
    } else {
      room.feedback = 'The three digits must follow the provenance order recorded in the ledger.';
      announce('The safe remains locked.');
    }
    shouldFocusHeading = false;
    renderRoom();
  }

  function chooseFolio(value) {
    if (value !== 'B') {
      room.feedback = 'Its marks contain the right symbols, but not in the recorded order.';
      shouldFocusHeading = false;
      renderRoom();
      return;
    }
    room.complete = true;
    room.modal = null;
    room.feedback = '';
    progress.completed.room = true;
    saveProgress();
    shouldFocusHeading = true;
    renderRoom();
    announce('Investigation Room complete. Obsidian Key earned.');
  }

  function vaultToolStrip() {
    var sockets = [
      ['keyUsed', 'Obsidian key'],
      ['cellUsed', 'Arc cell'],
      ['rotorUsed', 'Meridian rotor']
    ];
    return '<div class="vr-vault-sockets" aria-label="Vault components">' + sockets.map(function (socket) {
      return '<div class="vr-vault-socket">' + (vault[socket[0]] ? '✓ ' : '○ ') + socket[1] + '</div>';
    }).join('') + '</div>';
  }

  function vaultToolControls() {
    return '<div class="vr-vault-console"><div class="vr-tool-action-grid">' +
      '<button class="vr-tool-action ' + (vault.keyUsed ? 'is-used' : '') + '" type="button" data-action="use-vault-tool" data-tool="key">' + (vault.keyUsed ? 'Key fitted' : 'Use key') + '</button>' +
      '<button class="vr-tool-action ' + (vault.cellUsed ? 'is-used' : '') + '" type="button" data-action="use-vault-tool" data-tool="cell">' + (vault.cellUsed ? 'Cell live' : 'Seat cell') + '</button>' +
      '<button class="vr-tool-action ' + (vault.rotorUsed ? 'is-used' : '') + '" type="button" data-action="use-vault-tool" data-tool="rotor">' + (vault.rotorUsed ? 'Rotor fitted' : 'Fit rotor') + '</button>' +
      '</div></div>';
  }

  function applySwap(order, a, b) {
    var copy = order.slice();
    if (copy) {
      var temp = copy[a];
      copy[a] = copy[b];
      copy[b] = temp;
    }
    return copy;
  }

  function routeOutput() {
    var order = ['teal', 'gold', 'violet'];
    if (vault.routers[0]) order = applySwap(order, 0, 1);
    if (vault.routers[1]) order = applySwap(order, 1, 2);
    if (vault.routers[2]) order = applySwap(order, 0, 1);
    return order;
  }

  function beamPath(color) {
    var positions = [45, 98, 151];
    var order = ['teal', 'gold', 'violet'];
    var originalIndex = order.indexOf(color);
    var currentIndex = originalIndex;
    var points = [[8, positions[currentIndex]]];
    var swaps = [[0, 1], [1, 2], [0, 1]];
    var xs = [92, 184, 276];
    for (var i = 0; i < 3; i += 1) {
      points.push([xs[i] - 18, positions[currentIndex]]);
      if (vault.routers[i]) {
        if (currentIndex === swaps[i][0]) currentIndex = swaps[i][1];
        else if (currentIndex === swaps[i][1]) currentIndex = swaps[i][0];
      }
      points.push([xs[i] + 18, positions[currentIndex]]);
    }
    points.push([352, positions[currentIndex]]);
    return 'M ' + points.map(function (point) { return point[0] + ' ' + point[1]; }).join(' L ');
  }

  function routingMarkup() {
    var labels = ['R1 · upper pair', 'R2 · lower pair', 'Rotor · upper pair'];
    var output = routeOutput();
    var target = ['violet', 'teal', 'gold'];
    return [
      '<section class="vr-surface vr-routing" aria-labelledby="routing-title">',
      '<div class="vr-surface-head"><p class="vr-eyebrow">Optical network live</p><h2 class="vr-subtitle" id="routing-title">Route every beam to its matching receptor</h2>',
      '<p class="vr-copy">A crossed router swaps only the pair named on its plate. Changes redraw immediately.</p></div>',
      '<div class="vr-routing-board">',
      '<svg viewBox="0 0 360 205" preserveAspectRatio="none" role="img" aria-label="Current beam order ' + output.join(', ') + '; required order ' + target.join(', ') + '">',
      '<path class="vr-beam vr-beam--teal" d="' + beamPath('teal') + '"></path>',
      '<path class="vr-beam vr-beam--gold" d="' + beamPath('gold') + '"></path>',
      '<path class="vr-beam vr-beam--violet" d="' + beamPath('violet') + '"></path>',
      '<g fill="#d9c397" font-size="10" font-family="Inter, sans-serif"><text x="8" y="19">INPUTS</text><text x="296" y="19">RECEPTORS</text>',
      '<text x="314" y="48">VIOLET</text><text x="325" y="101">TEAL</text><text x="320" y="154">GOLD</text></g></svg>',
      '<div class="vr-router-row">' + labels.map(function (label, index) {
        return '<button class="vr-router ' + (vault.routers[index] ? 'is-crossed' : '') + '" type="button" data-action="toggle-router" data-index="' + index + '" aria-pressed="' + vault.routers[index] + '">' + label + '<br>' + (vault.routers[index] ? 'Crossed' : 'Straight') + '</button>';
      }).join('') + '</div></div>',
      feedbackBlock(vault.feedback, vault.feedbackType),
      vaultHint(),
      '<div class="vr-actions"><button class="vr-btn vr-btn--secondary" type="button" data-action="vault-hint" ' + (vault.hint >= 3 ? 'disabled' : '') + '>Clue</button>',
      vault.routeSolved
        ? '<button class="vr-btn vr-btn--brass" type="button" data-action="turn-vault-key">Turn the obsidian key</button>'
        : '<button class="vr-btn vr-btn--brass" type="button" data-action="confirm-route">Test alignment</button>',
      '</div></section>'
    ].join('');
  }

  function vaultHint() {
    var hints = [
      'Work backwards from the receptors. Each crossed router swaps only its etched pair.',
      'Cross the lower pair at R2, then the upper pair at the Meridian Rotor.',
      'The three settings are Straight · Crossed · Crossed.'
    ];
    return vault.hint ? '<div class="vr-clue"><strong>Clue ' + vault.hint + ' of 3</strong>' + hints[vault.hint - 1] + '</div>' : '';
  }

  function vaultEpilogue() {
    return '<section class="vr-surface"><div class="vr-surface-head"><p class="vr-eyebrow">Midnight Archive · No. 001</p><h2 class="vr-subtitle">The Black Glass Index</h2>' +
      '<p class="vr-copy">The three beams merge to white. Mechanical tumblers retract around the same door, and the recovered key completes the opening.</p>' +
      '<p class="vr-small-copy">In a weekly release, this would be the collectible payoff: a numbered archive artefact with a small story fragment—not coins, confetti or another answer box.</p></div></section>' +
      '<div class="vr-actions vr-actions--single"><button class="vr-btn vr-btn--brass vr-btn--wide" type="button" data-action="return-hub">Return to the lab</button></div>';
  }

  function renderVault() {
    var allTools = vault.keyUsed && vault.cellUsed && vault.rotorUsed;
    app.innerHTML = [
      '<main class="vr-screen vr-screen--dark vr-screen--play" aria-labelledby="vault-title">',
      topbar({ title: 'The Midnight Vault', step: vault.preview ? 'Lab preview · progress untouched' : 'Weekly bonus' }, 'Back to lab'),
      progressBar(vault.open ? 4 : (allTools ? (vault.routeSolved ? 3 : 2) : 1), 4),
      '<div class="vr-objective"><span class="vr-objective-label">Bonus objective</span><strong id="vault-title" data-focus-heading tabindex="-1">Install the three recovered components and open the archive.</strong></div>',
      '<section class="vr-vault-stage" aria-label="Blackened brass Art Deco archive vault">',
      vaultToolStrip(),
      vaultToolControls(),
      '<div class="vr-vault-open ' + (vault.open ? 'is-open' : '') + '" aria-hidden="' + (!vault.open) + '"><div class="vr-artefact">MI</div></div>',
      '</section>',
      !allTools ? feedbackBlock(vault.feedback, vault.feedbackType) : '',
      !allTools ? '<div class="vr-clue"><strong>One mechanism, three earned parts.</strong>The key opens the service grille; the cell powers the beams; the rotor completes the junction.</div>' : '',
      allTools && !vault.open ? routingMarkup() : '',
      vault.open ? vaultEpilogue() : '',
      '</main>'
    ].join('');
    focusHeading();
  }

  function useVaultTool(tool) {
    if (tool === 'key') {
      if (vault.keyUsed) return showToast('The service grille is already open.');
      vault.keyUsed = true;
      vault.feedback = '<strong>Service grille open.</strong> The empty power cradle is now exposed.';
      vault.feedbackType = 'correct';
    }
    if (tool === 'cell') {
      if (!vault.keyUsed) {
        vault.feedback = '<strong>The cradle is sealed.</strong> Open the service grille with the obsidian key first.';
        vault.feedbackType = 'wrong';
      } else {
        vault.cellUsed = true;
        vault.feedback = '<strong>Arc Cell energised.</strong> Three coloured inputs illuminate, but the central junction is incomplete.';
        vault.feedbackType = 'correct';
      }
    }
    if (tool === 'rotor') {
      if (!vault.cellUsed) {
        vault.feedback = '<strong>The junction is dormant.</strong> The Arc Cell must supply power before the rotor can calibrate.';
        vault.feedbackType = 'wrong';
      } else {
        vault.rotorUsed = true;
        vault.feedback = '';
        vault.feedbackType = '';
        announce('All three components are fitted. The optical network is live.');
      }
    }
    shouldFocusHeading = false;
    renderVault();
  }

  function testRoute() {
    var output = routeOutput();
    var correct = output.join(',') === 'violet,teal,gold';
    if (correct) {
      vault.routeSolved = true;
      vault.feedback = '<strong>Alignment locked.</strong> Violet, teal and gold reach their matching receptors. The beams merge to white.';
      vault.feedbackType = 'correct';
      announce('Optical network aligned. Turn the obsidian key.');
    } else {
      vault.routeSolved = false;
      vault.feedback = '<strong>A beam stops at a mismatch.</strong> Current receptor order: ' + output.join(' · ') + '.';
      vault.feedbackType = 'wrong';
      announce('The routing is not aligned. Your settings have been preserved.');
    }
    shouldFocusHeading = false;
    renderVault();
  }

  function openVault() {
    if (!vault.routeSolved) return;
    vault.open = true;
    if (!vault.preview) {
      progress.bonusComplete = true;
      saveProgress();
    }
    shouldFocusHeading = false;
    renderVault();
    announce('The Midnight Vault opens. Black Glass Index recovered.');
  }

  function handleAction(actionEl, event) {
    var action = actionEl.dataset.action;
    if (action === 'back') {
      if (view.screen === 'intro' || view.screen === 'vault') setView('hub');
      else setView('intro', view.screen);
      return;
    }
    if (action === 'return-hub') return setView('hub');
    if (action === 'open-intro') return setView('intro', actionEl.dataset.mode);
    if (action === 'start-mode') {
      var mode = actionEl.dataset.mode;
      if (mode === 'connection') connection = freshConnection();
      if (mode === 'logic') logic = freshLogic();
      if (mode === 'room') room = freshRoom();
      return setView(mode, mode);
    }
    if (action === 'open-vault') {
      vault = freshVault(false);
      return setView('vault');
    }
    if (action === 'preview-vault') {
      vault = freshVault(true);
      return setView('vault');
    }
    if (action === 'reset') {
      if (!window.confirm('Reset all local prototype progress?')) return;
      localStorage.removeItem(STORAGE_KEY);
      progress = loadProgress();
      connection = freshConnection();
      logic = freshLogic();
      room = freshRoom();
      vault = freshVault(false);
      showToast('Prototype progress reset.');
      return setView('hub');
    }
    if (action === 'toggle-plate') return handleTogglePlate(Number(actionEl.dataset.id));
    if (action === 'inspect-plate') {
      connection.inspected = Number(actionEl.dataset.id);
      shouldFocusHeading = false;
      return renderConnection();
    }
    if (action === 'close-sheet') {
      if (actionEl.classList.contains('vr-sheet-overlay') && event.target !== actionEl) return;
      connection.inspected = null;
      room.modal = null;
      shouldFocusHeading = false;
      return render();
    }
    if (action === 'clear-selection') {
      connection.selected = [];
      connection.feedback = '';
      shouldFocusHeading = false;
      return renderConnection();
    }
    if (action === 'test-group') return testConnectionGroup();
    if (action === 'choose-group-label') {
      connection.choice = actionEl.dataset.value;
      connection.feedback = '';
      shouldFocusHeading = false;
      return renderConnection();
    }
    if (action === 'confirm-group-label') return confirmGroupLabel();
    if (action === 'choose-field') {
      connection.choice = actionEl.dataset.value;
      connection.feedback = '';
      shouldFocusHeading = false;
      return renderConnection();
    }
    if (action === 'confirm-field') return confirmField();
    if (action === 'connection-hint') {
      connection.hint = Math.min(3, connection.hint + 1);
      shouldFocusHeading = false;
      return renderConnection();
    }
    if (action === 'choose-matrix') {
      logic.option = actionEl.dataset.value;
      logic.feedback = '';
      shouldFocusHeading = false;
      return renderLogic();
    }
    if (action === 'confirm-matrix') return confirmMatrix();
    if (action === 'toggle-rule') return toggleRule(actionEl.dataset.value);
    if (action === 'confirm-rules') return confirmRules();
    if (action === 'logic-hint') {
      logic.hint = Math.min(3, logic.hint + 1);
      shouldFocusHeading = false;
      return renderLogic();
    }
    if (action === 'open-room-zone') return openRoomZone(actionEl.dataset.zone);
    if (action === 'room-focus') {
      room.focusMode = !room.focusMode;
      shouldFocusHeading = false;
      return renderRoom();
    }
    if (action === 'room-hint') {
      room.hint = Math.min(3, room.hint + 1);
      shouldFocusHeading = false;
      return renderRoom();
    }
    if (action === 'select-inventory') {
      room.selectedItem = room.selectedItem === actionEl.dataset.item ? null : actionEl.dataset.item;
      shouldFocusHeading = false;
      return renderRoom();
    }
    if (action === 'take-lens') return takeLens();
    if (action === 'apply-lens-ash') {
      room.ashRevealed = true;
      if (room.chartTurns === 2) room.chartSolved = true;
      room.selectedItem = 'lens';
      shouldFocusHeading = false;
      announce('The lens reveals a charred instruction: two turns restore true north.');
      return renderRoom();
    }
    if (action === 'rotate-chart') return rotateChart(Number(actionEl.dataset.delta));
    if (action === 'dial') return changeDial(Number(actionEl.dataset.index), Number(actionEl.dataset.delta));
    if (action === 'unlock-safe') return unlockSafe();
    if (action === 'choose-folio') return chooseFolio(actionEl.dataset.value);
    if (action === 'use-vault-tool') return useVaultTool(actionEl.dataset.tool);
    if (action === 'toggle-router') {
      var routerIndex = Number(actionEl.dataset.index);
      vault.routers[routerIndex] = !vault.routers[routerIndex];
      vault.routeSolved = false;
      vault.feedback = '';
      shouldFocusHeading = false;
      return renderVault();
    }
    if (action === 'confirm-route') return testRoute();
    if (action === 'turn-vault-key') return openVault();
    if (action === 'vault-hint') {
      vault.hint = Math.min(3, vault.hint + 1);
      shouldFocusHeading = false;
      return renderVault();
    }
  }

  document.addEventListener('click', function (event) {
    var actionEl = event.target.closest('[data-action]');
    if (!actionEl || actionEl.disabled) return;
    var action = actionEl.dataset.action;
    if (action === 'inspect-plate' || action === 'open-room-zone') {
      modalReturnFocusSelector = actionSelector(actionEl);
      pendingFocusSelector = 'button[data-action="close-sheet"]';
    } else if (action === 'close-sheet') {
      pendingFocusSelector = modalReturnFocusSelector;
      modalReturnFocusSelector = '';
    } else {
      pendingFocusSelector = actionSelector(actionEl);
    }
    handleAction(actionEl, event);
  });

  document.addEventListener('keydown', function (event) {
    var dialog = app.querySelector('.vr-sheet[role="dialog"]');
    if (event.key === 'Tab' && dialog) {
      var focusable = Array.prototype.filter.call(
        dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])'),
        function (element) { return element.offsetParent !== null; }
      );
      if (focusable.length) {
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    if (event.key === 'Escape' && (connection.inspected !== null || room.modal)) {
      pendingFocusSelector = modalReturnFocusSelector;
      modalReturnFocusSelector = '';
      connection.inspected = null;
      room.modal = null;
      shouldFocusHeading = false;
      render();
    }
  });

  window.addEventListener('storage', function (event) {
    if (event.key === STORAGE_KEY) {
      progress = loadProgress();
      if (view.screen === 'hub') renderHub();
    }
  });

  render();
}());
