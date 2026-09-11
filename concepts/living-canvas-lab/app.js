(function () {
  "use strict";

  const STORAGE_KEY = "cluecanvas.livingCanvasLab.v1";
  const app = document.getElementById("app");
  const liveRegion = document.getElementById("live-region");

  const ICONS = {
    case: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h8l4 4v9a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 4 18.5V7a1.5 1.5 0 0 1 1-1.42Z"/><path d="M13 5.5V10h4M8 14h5M8 17h3"/><circle cx="17.5" cy="17" r="3"/><path d="m19.7 19.2 1.6 1.6"/></svg>`,
    chain: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.2 14.8 14.8 9.2M7.1 16.9l-1.3 1.3a3 3 0 0 1-4.2-4.2l3.1-3.1a3 3 0 0 1 4.2 0M16.9 7.1l1.3-1.3A3 3 0 0 1 22.4 10l-3.1 3.1a3 3 0 0 1-4.2 0"/></svg>`,
    build: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="8" height="6" rx="1.5"/><rect x="13" y="14" width="8" height="6" rx="1.5"/><path d="M7 14v5M4.5 16.5 7 14l2.5 2.5M17 10V5M14.5 7.5 17 10l2.5-2.5"/></svg>`,
    thread: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="7" r="3"/><circle cx="18" cy="7" r="3"/><circle cx="12" cy="18" r="3"/><path d="m8.6 8.5 2.2 6.7M15.4 8.5l-2.2 6.7M9 7h6"/></svg>`,
    sequence: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="4" height="14" rx="1"/><rect x="8.8" y="5" width="4" height="14" rx="1"/><rect x="15.1" y="5" width="4" height="14" rx="1"/><path d="M21 9v6M18 12h6"/></svg>`,
    room: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V7l8-4 8 4v13M2 20h20"/><path d="M8 10h3v3H8zM15 10h3v3h-3zM10 20v-4h4v4"/></svg>`,
    depth: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="3"/><path d="M7 7h6v6H7zM17 8h1a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3v-1"/></svg>`,
    back: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg>`,
    check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7"/></svg>`,
    canvas: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="m7 16 3.5-4 2.5 2.5 2.3-3 2.7 4.5M8 7.5h.01"/></svg>`
  };

  function cloudSvg() {
    return `<svg viewBox="0 0 120 62" aria-hidden="true"><path d="M30 53h61c14 0 23-8 23-19 0-10-8-18-19-19C90 6 82 2 72 2 59 2 49 9 45 20a25 25 0 0 0-11-3C21 17 11 26 11 38c0 9 8 15 19 15Z"/></svg>`;
  }

  const VISUALS = {
    headOverHeels: `<div class="lc-word-stack" aria-label="The word head is placed well above the word heels"><span class="lc-rebus-word">HEAD</span><span class="lc-rebus-word">HEELS</span></div>`,
    cloudNine: `<div class="lc-cloud-nine" aria-label="The number nine is resting on a cloud"><span class="lc-nine">9</span><span class="lc-cloud">${cloudSvg()}</span></div>`,
    headInClouds: `<div class="lc-cloud-cluster" aria-label="The word head is completely enclosed by three clouds"><span class="lc-cloud lc-cloud--a">${cloudSvg()}</span><span class="lc-cloud lc-cloud--b">${cloudSvg()}</span><span class="lc-cloud lc-cloud--c">${cloudSvg()}</span><span class="lc-rebus-word">HEAD</span></div>`,
    greenLight: `<div class="lc-green-light" aria-label="The word light is coloured green">LIGHT</div>`,
    tunnelLight: `<div class="lc-tunnel" aria-label="A dark tunnel with the word light at its distant endpoint"><span>LIGHT</span></div>`,
    tunnelVision: `<div class="lc-tunnel lc-tunnel--vision" aria-label="The word vision is tightly framed inside a narrow tunnel"><span>VISION</span></div>`,
    pieceOfCake: `<div class="lc-piece-visual" aria-label="The word cake appears inside a single jigsaw piece"><svg viewBox="0 0 180 145" aria-hidden="true"><path d="M15 18h48c-2 5-3 10-1 15 4 11 18 15 27 7 6-6 7-14 3-22h49v39c8-4 17-3 23 4 8 9 4 23-7 27-5 2-11 1-16-2v41H94c4-8 3-17-4-23-9-8-23-4-27 7-2 5-1 11 2 16H15V86c5 3 11 4 16 2 11-4 15-18 7-27-6-7-15-8-23-4V18Z" fill="#f2c94c" stroke="#183b56" stroke-width="3"/></svg><span>CAKE</span></div>`,
    walkPark: `<div class="lc-park-visual" aria-label="The word walk is inside the boundary of a park"><span>WALK</span></div>`,
    brokenHeart: `<div class="lc-heart-wrap" aria-label="A red heart split by a deep crack"><svg viewBox="0 0 180 160" aria-hidden="true"><path d="M88 143C68 125 20 94 20 53 20 25 54 13 74 32l14 14 15-14c20-19 54-7 54 21 0 41-49 72-69 90Z" fill="#d95550" stroke="#183b56" stroke-width="4"/><path d="m91 43-15 27 20 10-18 29 11 34" fill="none" stroke="#fff7eb" stroke-width="6" stroke-linejoin="round"/></svg></div>`,
    sleeveHeart: `<div class="lc-sleeve-scene" aria-label="A blue jumper with a cracked red heart displayed on the outside of its sleeve"><div class="lc-sleeve-body"></div><div class="lc-sleeve-arm"></div><div class="lc-sleeve-cuff"></div><div class="lc-sleeve-heart"><svg viewBox="0 0 60 55" aria-hidden="true"><path d="M30 51C23 44 5 34 5 18 5 7 18 3 26 11l4 5 5-5c8-8 21-4 21 7 0 16-19 26-26 33Z" fill="#e05b55" stroke="#fff3dc" stroke-width="2"/><path d="m31 14-6 10 8 4-7 11 4 12" fill="none" stroke="#fff3dc" stroke-width="2.5"/></svg></div></div>`,
    keySuccess: `<div class="lc-key-success" aria-label="A gold key points toward the word success"><div class="lc-key-shape"></div><span class="lc-key-arrow">→</span><span>SUCCESS</span></div>`
  };

  const ROOM_OBJECTS = {
    ice: {
      number: 1,
      name: "Cracked ice",
      short: "Desk",
      visual: `<div class="lc-ice-block" aria-label="A block of ice being split apart"></div>`,
      answers: ["break the ice", "breaking the ice"],
      clues: ["Describe the action, not only the damage.", "The frozen block is being broken apart.", "The phrase can mean starting a conversation."],
      extraction: "Take the final letter of BREAK.",
      letter: "K"
    },
    elephant: {
      number: 2,
      name: "Unexpected guest",
      short: "Alcove",
      visual: `<div class="lc-elephant" aria-label="An elephant standing inside the library"></div>`,
      answers: ["elephant in the room", "the elephant in the room"],
      clues: ["The animal is somewhere it would not normally belong.", "An elephant is standing inside the room.", "The phrase means an obvious issue people avoid discussing."],
      extraction: "Take the first letter of ELEPHANT.",
      letter: "E"
    },
    storm: {
      number: 3,
      name: "Framed storm",
      short: "Wall",
      visual: `<div class="lc-storm-eye" aria-label="An eye at the centre of a swirling storm"></div>`,
      answers: ["eye of the storm", "eye of a storm"],
      clues: ["Look at the centre of the weather pattern.", "An eye sits in the middle of the storm.", "The phrase begins EYE OF…"],
      extraction: "Take the middle letter of EYE.",
      letter: "Y"
    }
  };

  const MODES = [
    {
      id: "canvas-case",
      title: "Canvas Case",
      caseTitle: "The Cloud Case",
      tagline: "Three clues. One final deduction.",
      duration: "3–4 min",
      icon: "case",
      accent: "#0f716c",
      soft: "#e3f5f1",
      intro: "Solve two phrases, collect their evidence words, then read the final canvas.",
      how: [
        ["Solve", "Read the position and objects in each visual clue."],
        ["Collect", "Each correct answer leaves behind one evidence word."],
        ["Deduce", "Use both words to unlock the final phrase."]
      ],
      stages: [
        { type: "answer", eyebrow: "Evidence 1", title: "Read the position", prompt: "Which familiar phrase is shown?", visual: VISUALS.headOverHeels, answers: ["head over heels"], clues: ["Position matters more than size.", "HEAD is above HEELS.", "The linking word is OVER."], success: "Evidence collected: HEAD", explanation: "HEAD sits over HEELS, making ‘head over heels’. Keep HEAD for the final canvas." },
        { type: "answer", eyebrow: "Evidence 2", title: "Read the object", prompt: "Which familiar phrase is shown?", visual: VISUALS.cloudNine, answers: ["on cloud nine", "cloud nine"], clues: ["Combine the object and the number.", "The number 9 is sitting on a cloud.", "The phrase means feeling extremely happy."], success: "Evidence collected: CLOUD", explanation: "Nine sits on a cloud: ‘on cloud nine’. CLOUD is your second evidence word." },
        { type: "answer", eyebrow: "Final deduction", title: "Use your evidence", prompt: "What final phrase does this canvas show?", visual: VISUALS.headInClouds, evidence: ["HEAD", "CLOUD"], answers: ["head in the clouds", "head in clouds"], clues: ["Both evidence words appear in the final picture.", "Notice where HEAD is now.", "The phrase describes someone lost in thought."], success: "Case closed", explanation: "HEAD is enclosed by CLOUDS: ‘head in the clouds’. The earlier answers taught you exactly what to inspect." }
      ]
    },
    {
      id: "phrase-chain",
      title: "Phrase Chain",
      caseTitle: "Follow the Light",
      tagline: "Answers unlock the next answer.",
      duration: "4–5 min",
      icon: "chain",
      accent: "#a84640",
      soft: "#fde9e5",
      intro: "Each answer lends one important word to the next. Follow the chain, then rebuild it.",
      how: [["Read", "Solve each visual phrase in order."], ["Carry", "Notice which word moves into the next answer."], ["Lock", "Place the two linking words into the finished chain."]],
      stages: [
        { type: "answer", eyebrow: "Link 1", title: "Start the chain", prompt: "Which phrase is shown?", visual: VISUALS.greenLight, answers: ["green light"], clues: ["Colour changes the word.", "LIGHT is green.", "The phrase can mean permission to proceed."], success: "First link found", explanation: "The word LIGHT is green: ‘green light’. LIGHT carries into the next clue." },
        { type: "answer", eyebrow: "Link 2", title: "Follow the shared word", prompt: "Where is LIGHT now?", visual: VISUALS.tunnelLight, answers: ["light at the end of the tunnel", "light at the end of a tunnel", "light at end of tunnel"], clues: ["Look toward the farthest point.", "The light is at the tunnel’s end.", "The phrase suggests hope after difficulty."], success: "Second link found", explanation: "LIGHT appears at the far end of a TUNNEL. Now TUNNEL becomes the linking word." },
        { type: "answer", eyebrow: "Link 3", title: "Finish the trail", prompt: "Which phrase is shown?", visual: VISUALS.tunnelVision, answers: ["tunnel vision"], clues: ["The word is confined to a narrow view.", "VISION appears inside a tunnel.", "The phrase means focusing too narrowly."], success: "Trail complete", explanation: "VISION is restricted by the TUNNEL: ‘tunnel vision’." },
        { type: "chain", eyebrow: "Chain lock", title: "Rebuild the links", prompt: "Tap two words in order to fill A, then B.", answers: ["LIGHT", "TUNNEL"], tokens: ["LIGHT", "TUNNEL", "LINE", "MOON"], clues: ["A completes GREEN ___.", "B completes ___ VISION.", "A is LIGHT and B is TUNNEL."], success: "Chain locked", explanation: "GREEN LIGHT → LIGHT AT THE END OF THE TUNNEL → TUNNEL VISION. Each answer hands one word to the next." }
      ]
    },
    {
      id: "build-rebus",
      title: "Build a Rebus",
      caseTitle: "Build the Phrase",
      tagline: "Turn language into layout.",
      duration: "3–4 min",
      icon: "build",
      accent: "#8a5b20",
      soft: "#fff1c8",
      recommended: true,
      intro: "Instead of solving a rebus, construct one. Translate the linking word into a physical position.",
      how: [["Read", "You are given the target phrase."], ["Position", "Tap a generous placement zone—no precise dragging."], ["Test", "Check whether another player could read your layout."]],
      stages: [
        { type: "build", eyebrow: "Build 1", title: "Man overboard", prompt: "Place MAN so the phrase reads correctly.", board: "board", token: "MAN", fixed: "BOARD", options: [["above", "Above"], ["middle", "On board"], ["below", "Below"]], correct: ["above"], clues: ["Translate OVER into a position.", "MAN should be higher than BOARD.", "Choose the target above BOARD."], success: "Readable at a glance", explanation: "MAN placed above BOARD turns the word OVER into a visual relationship: ‘man overboard’." },
        { type: "build", eyebrow: "Build 2", title: "Reading between the lines", prompt: "Place READING relative to the two lines.", board: "lines", token: "READING", fixed: "", options: [["above", "Above"], ["middle", "Between"], ["below", "Below"]], correct: ["middle"], clues: ["The phrase requires two lines.", "READING belongs in the space separating them.", "Choose the centre anchor."], success: "Position translated", explanation: "READING is literally between two lines: ‘reading between the lines’." },
        { type: "build", eyebrow: "Build 3", title: "Thinking outside the box", prompt: "Move THINKING to any valid outside position.", board: "box", token: "THINKING", fixed: "", options: [["left", "Left outside"], ["inside", "Inside"], ["right", "Right outside"]], correct: ["left", "right"], clues: ["Treat OUTSIDE as a physical instruction.", "The word must not overlap the box.", "Either exterior anchor is valid."], success: "More than one right answer", explanation: "THINKING is completely outside the outlined box. Both outside positions are accepted—this is about the rule, not pixel precision." }
      ]
    },
    {
      id: "common-thread",
      title: "Common Thread",
      caseTitle: "Same Meaning",
      tagline: "Solve two, then find the link.",
      duration: "3–4 min",
      icon: "thread",
      accent: "#5b6197",
      soft: "#ecebfa",
      intro: "Two different rebuses point to one shared idea. Solve both before choosing their connection.",
      how: [["Solve A", "Name the first visual expression."], ["Solve B", "Read a different expression."], ["Connect", "Compare what both expressions mean."]],
      stages: [
        { type: "answer", eyebrow: "Puzzle A", title: "One shaped clue", prompt: "Which expression is shown?", visual: VISUALS.pieceOfCake, answers: ["piece of cake", "a piece of cake"], clues: ["Name the shape containing the word.", "CAKE forms one puzzle piece.", "The expression means something is very easy."], success: "First meaning stored", explanation: "CAKE is on one jigsaw PIECE: ‘a piece of cake’." },
        { type: "answer", eyebrow: "Puzzle B", title: "Read the setting", prompt: "Which expression is shown?", visual: VISUALS.walkPark, answers: ["walk in the park", "a walk in the park"], clues: ["Combine the activity and its location.", "WALK is inside the park.", "This expression also describes an easy task."], success: "Second meaning stored", explanation: "WALK appears inside a PARK: ‘a walk in the park’." },
        { type: "choice", eyebrow: "Common thread", title: "Connect both answers", prompt: "What idea do both phrases express?", summary: ["A piece of cake", "A walk in the park"], choices: [["easy", "Easy"], ["secret", "Secret"], ["risky", "Risky"], ["rare", "Rare"]], correct: "easy", clues: ["Ignore the literal objects now.", "Think about when people use either expression.", "Both describe something simple to do."], success: "Connection found", explanation: "Both phrases describe something EASY. The mechanic tests meaning after visual decoding, rather than another positional trick." }
      ]
    },
    {
      id: "missing-panel",
      title: "Missing Panel",
      caseTitle: "Rising Star",
      tagline: "Predict the visual rule.",
      duration: "2–3 min",
      icon: "sequence",
      accent: "#91661b",
      soft: "#fff2c8",
      intro: "Track several changes across a sequence, choose the missing panel, then name the phrase it creates.",
      how: [["Compare", "Track height, size and brightness—not just one detail."], ["Predict", "Choose the only panel that continues every rule."], ["Name", "Read the completed movement as a familiar phrase."]],
      stages: [
        { type: "star-choice", eyebrow: "Panel 4", title: "Continue the pattern", prompt: "Which panel belongs in the empty space?", correct: "a", clues: ["Track more than one change.", "The star moves higher as it grows larger and brighter.", "Choose the largest, brightest star nearest the top."], success: "Every rule continued", explanation: "The star rises, grows and brightens in each panel. Only A continues all three changes." },
        { type: "answer", eyebrow: "Read the sequence", title: "Name what you saw", prompt: "Which familiar phrase does the completed sequence show?", visual: "sequence-complete", answers: ["rising star", "a rising star"], clues: ["Describe the direction of change.", "The star moves upward.", "The phrase can describe a promising newcomer."], success: "Sequence decoded", explanation: "It is a ‘rising star’: the visual rule becomes the phrase, without adding a motion trail that might imply a shooting star." }
      ]
    },
    {
      id: "puzzle-room",
      title: "Puzzle Room",
      caseTitle: "The Librarian’s Locked Drawer",
      tagline: "Explore, extract, unlock.",
      duration: "6–8 min",
      icon: "room",
      accent: "#325e7d",
      soft: "#e4eef4",
      intro: "Three objects hide phrases. Solve each one, extract its letter, then use the code to open the drawer.",
      how: [["Explore", "Use the three visible numbered hotspots—there is no pixel hunting."], ["Extract", "Each solved phrase gives one clearly instructed letter."], ["Unlock", "Enter the ordered code and solve what is inside."]],
      stages: [
        { type: "room", eyebrow: "Explore", title: "Search the library", prompt: "Open all three marked objects and solve their phrases.", clues: [], success: "Three letters recovered", explanation: "The desk, alcove and wall each hid a phrase. Their extracted letters are K, E and Y." },
        { type: "answer", eyebrow: "Locked drawer", title: "Enter the code", prompt: "The engravings fix the order: snowflake, elephant, storm.", visual: "code", answers: ["key"], clues: ["Use the three letters you extracted.", "Read them in hotspot order: 1, 2, 3.", "The code spells KEY."], success: "Drawer unlocked", explanation: "K + E + Y spells KEY. The extraction instructions remove guesswork while preserving the multi-step deduction." },
        { type: "answer", eyebrow: "Inside the drawer", title: "One final phrase", prompt: "What does the key-and-arrow rebus show?", visual: VISUALS.keySuccess, answers: ["key to success", "the key to success"], clues: ["The arrow supplies the linking word.", "The key points TO SUCCESS.", "The phrase names something essential for achievement."], success: "Room solved", explanation: "The KEY points TO SUCCESS: ‘the key to success’. Every earlier solve led to this final object." }
      ]
    },
    {
      id: "hidden-depth",
      title: "Hidden Depth",
      caseTitle: "Wear It Openly",
      tagline: "The first answer changes the clue.",
      duration: "3–4 min",
      icon: "depth",
      accent: "#a84640",
      soft: "#fde8e5",
      intro: "Solve a close-up, then watch the canvas pull back. The first answer remains true but a deeper phrase appears.",
      how: [["Focus", "Solve only what the tight crop reveals."], ["Reveal", "The wider scene changes the meaning without replacing the clue."], ["Reframe", "Use the same object inside its newly revealed context."]],
      stages: [
        { type: "answer", eyebrow: "Layer 1", title: "Read the close-up", prompt: "What simple phrase describes this image?", visual: VISUALS.brokenHeart, answers: ["broken heart", "a broken heart"], clues: ["Name the object and describe its condition.", "The heart is no longer whole.", "The first word begins with BROKEN."], success: "First answer held", explanation: "The tight crop shows a ‘broken heart’. Now the canvas can pull back without making that answer false." },
        { type: "answer", eyebrow: "Layer 2", title: "The canvas pulls back", prompt: "The first answer is still true. What wider phrase appears now?", visual: VISUALS.sleeveHeart, evidence: ["BROKEN HEART"], answers: ["wear your heart on your sleeve", "heart on your sleeve", "wearing your heart on your sleeve"], clues: ["Now focus on where the heart is displayed.", "It is visible on the sleeve rather than hidden.", "The expression means showing your feelings openly."], success: "Deeper answer found", explanation: "The same heart is worn openly on a sleeve: ‘wear your heart on your sleeve’. The reveal adds context instead of swapping in an unrelated clue." }
      ]
    }
  ];

  const MODE_BY_ID = Object.fromEntries(MODES.map((mode) => [mode.id, mode]));

  function freshState() {
    return { completed: [], runs: {} };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!parsed || !Array.isArray(parsed.completed) || typeof parsed.runs !== "object") return freshState();
      return {
        completed: parsed.completed.filter((id) => MODE_BY_ID[id]),
        runs: Object.fromEntries(Object.entries(parsed.runs || {}).filter(([id]) => MODE_BY_ID[id]))
      };
    } catch (_error) {
      return freshState();
    }
  }

  let state = loadState();
  let view = { screen: "hub", modeId: null, previewAll: false, newAward: false };
  let toastTimer = 0;

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_error) {
      // The prototype remains fully playable when browser storage is unavailable.
    }
  }

  function newRun() {
    return { stage: 0, scratch: {}, hints: {}, solved: false, feedback: null };
  }

  function getRun(modeId, create = true) {
    if (!state.runs[modeId] && create) state.runs[modeId] = newRun();
    return state.runs[modeId];
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
  }

  function answerMatches(value, answers) {
    const candidate = normalize(value);
    return answers.some((answer) => normalize(answer) === candidate);
  }

  function announce(message) {
    liveRegion.textContent = "";
    window.setTimeout(() => { liveRegion.textContent = message; }, 20);
  }

  function showToast(message) {
    const toast = document.querySelector(".lc-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  function brand() {
    return `<div class="lc-brand"><span class="lc-brand-mark" aria-hidden="true">C</span><span class="lc-brand-copy"><span class="lc-brand-name">Clue Canvas</span><span class="lc-brand-lab">Concept lab</span></span></div>`;
  }

  function backButton(label = "Back to experiments") {
    return `<button class="lc-icon-button" type="button" data-action="home" aria-label="${label}">${ICONS.back}</button>`;
  }

  function completedCount() {
    return state.completed.length;
  }

  function canvasStatus(actualCount, visualCount) {
    if (view.previewAll && visualCount === 7) return `Finished preview · ${actualCount} of 7 earned`;
    if (actualCount === 7) return "Perfect Canvas · all 7 restored";
    if (actualCount === 6) return "Canvas alive · one detail remains";
    if (actualCount >= 5) return `Canvas complete · ${actualCount} of 7 perfected`;
    return `${actualCount} of 7 details restored`;
  }

  function renderCanvasArt(full = false, clickable = false) {
    const actualCount = completedCount();
    const visualCount = view.previewAll ? 7 : actualCount;
    const layers = Math.min(visualCount, 5);
    const lifeClass = visualCount >= 6 ? " is-alive" : "";
    const perfectClass = visualCount >= 7 ? " is-perfect" : "";
    const layerMarkup = [1, 2, 3, 4, 5].map((number) =>
      `<div class="lc-canvas-layer lc-canvas-layer--${number}${layers >= number ? " is-revealed" : ""}" aria-hidden="true"></div>`
    ).join("");
    const label = visualCount === 0
      ? "The Moonlit Library shown as a muted unfinished sketch"
      : `The Moonlit Library with ${visualCount} of 7 restoration milestones shown`;

    const tag = clickable ? "button" : "div";
    const attributes = clickable ? ` type="button" data-action="view-canvas" aria-label="View The Moonlit Library canvas"` : "";
    return `<${tag} class="lc-canvas-card${full ? " lc-canvas-card--full" : ""}${clickable ? " lc-canvas-card--button" : ""}"${attributes}>
      <div class="lc-canvas-art${lifeClass}${perfectClass}" role="img" aria-label="${label}">
        <img class="lc-canvas-base" src="./assets/moonlit-library-canvas.png" alt="" aria-hidden="true" />
        ${layerMarkup}
        <div class="lc-canvas-shade" aria-hidden="true"></div>
        <div class="lc-canvas-life" aria-hidden="true"></div>
        <div class="lc-canvas-frame" aria-hidden="true"></div>
        <span class="lc-perfect-mark" aria-hidden="true">◆ Perfect Canvas</span>
      </div>
      <div class="lc-canvas-caption"><span><span class="lc-canvas-name">The Moonlit Library</span><span class="lc-canvas-status">${canvasStatus(actualCount, visualCount)}</span></span>${full ? "" : `<span class="lc-canvas-arrow" aria-hidden="true">→</span>`}</div>
    </${tag}>`;
  }

  function renderProgressDots() {
    const count = completedCount();
    return `<div class="lc-progress-dots" aria-label="${count} of 7 experiments completed">${[1, 2, 3, 4, 5, 6, 7].map((number) => {
      const earned = count >= number;
      return `<span class="lc-progress-dot${earned ? " is-complete" : ""}${number === 7 && earned ? " is-perfect" : ""}" aria-hidden="true">${earned ? "✓" : number}</span>`;
    }).join("")}</div>`;
  }

  function modeStatus(mode) {
    if (state.completed.includes(mode.id)) return `<span class="lc-complete-label">✓ Complete · Replay</span>`;
    const run = state.runs[mode.id];
    if (run) return `<span>In progress · ${Math.min(run.stage + 1, mode.stages.length)}/${mode.stages.length}</span>`;
    return `<span>Not tried</span>`;
  }

  function renderModeCard(mode) {
    return `<button class="lc-mode-card${state.completed.includes(mode.id) ? " is-complete" : ""}" type="button" data-action="open-mode" data-mode="${mode.id}" style="--mode-accent:${mode.accent};--mode-soft:${mode.soft}">
      ${mode.recommended ? `<span class="lc-recommended">Start here</span>` : ""}
      <span class="lc-mode-icon" aria-hidden="true">${ICONS[mode.icon]}</span>
      <span class="lc-card-title">${mode.title}</span>
      <span class="lc-card-copy">${mode.tagline}</span>
      <span class="lc-mode-meta"><span>${mode.duration}</span>${modeStatus(mode)}</span>
    </button>`;
  }

  function renderHub() {
    const count = completedCount();
    return `<main class="lc-screen" id="main-content">
      <header class="lc-topbar">${brand()}<span class="lc-local-pill">Local prototype</span></header>
      <section class="lc-hero" aria-labelledby="hub-title">
        <p class="lc-eyebrow">Seven deeper puzzle experiments</p>
        <h1 class="lc-display" id="hub-title" tabindex="-1">More than one quick guess.</h1>
        <p class="lc-lede">Try seven multi-step game ideas. Every completed experiment restores another part of one shared weekly artwork.</p>
      </section>
      ${renderCanvasArt(false, true)}
      ${renderProgressDots()}
      <div class="lc-section-heading"><h2>Choose an experiment</h2><span>${count}/7 tested</span></div>
      <div class="lc-mode-grid">${MODES.map(renderModeCard).join("")}</div>
      <footer class="lc-lab-note"><p>Private concept build · no account, server, analytics or production app changes</p><div class="lc-footer-actions"><button class="lc-text-button" type="button" data-action="view-canvas">Preview canvas</button><button class="lc-text-button" type="button" data-action="reset">Reset prototype</button></div></footer>
      <div class="lc-toast" role="status"></div>
    </main>`;
  }

  function renderIntro(mode) {
    const run = state.runs[mode.id];
    const complete = state.completed.includes(mode.id);
    const buttonLabel = complete ? "Replay from the beginning" : run ? `Resume stage ${run.stage + 1}` : "Start experiment";
    return `<main class="lc-screen lc-screen--play" id="main-content" style="--mode-accent:${mode.accent};--mode-soft:${mode.soft}">
      <header class="lc-topbar">${backButton()}<span class="lc-local-pill">${mode.duration}</span></header>
      <div class="lc-intro-hero" aria-hidden="true">${ICONS[mode.icon]}</div>
      <p class="lc-eyebrow">${mode.title}</p>
      <h1 class="lc-display" id="screen-title" tabindex="-1">${mode.caseTitle}</h1>
      <p class="lc-lede">${mode.intro}</p>
      <div class="lc-intro-panel">${mode.how.map((item, index) => `<div class="lc-intro-row"><span class="lc-intro-number">${index + 1}</span><span><strong>${item[0]}</strong><p>${item[1]}</p></span></div>`).join("")}</div>
      ${complete ? `<p class="lc-stage-note">Replaying will not add a second canvas layer, but every stage remains available to test.</p>` : ""}
      <div class="lc-actions lc-actions--single"><button class="lc-button lc-button--wide" type="button" data-action="start-mode" data-mode="${mode.id}">${buttonLabel} <span aria-hidden="true">→</span></button></div>
      <div class="lc-toast" role="status"></div>
    </main>`;
  }

  function renderStageTrack(mode, activeIndex) {
    return `<div class="lc-stage-track" role="progressbar" aria-label="Experiment stage" aria-valuemin="1" aria-valuemax="${mode.stages.length}" aria-valuenow="${activeIndex + 1}">${mode.stages.map((_stage, index) => `<span class="lc-stage-segment${index < activeIndex ? " is-past" : ""}${index === activeIndex ? " is-current" : ""}" aria-hidden="true"></span>`).join("")}</div>`;
  }

  function renderSequence(includeFourth) {
    const panels = [
      ["76%", "18px", "5px"],
      ["58%", "25px", "9px"],
      ["38%", "32px", "14px"]
    ];
    return `<div class="lc-sequence" aria-label="A star moves upward while becoming larger and brighter">${panels.map((star) => `<div class="lc-star-panel"><span class="lc-star" style="top:${star[0]};--star-size:${star[1]};--star-glow:${star[2]}"></span></div>`).join("")}${includeFourth ? `<div class="lc-star-panel"><span class="lc-star" style="top:18%;--star-size:40px;--star-glow:19px"></span></div>` : `<div class="lc-star-panel lc-star-panel--missing">?</div>`}</div>`;
  }

  function renderStarOptions(run) {
    const options = [
      ["a", "18%", "40px", "19px", "large bright star near the top"],
      ["b", "18%", "18px", "15px", "small bright star near the top"],
      ["c", "58%", "40px", "19px", "large bright star around the middle"],
      ["d", "82%", "40px", "19px", "large bright star near the bottom"]
    ];
    return `<div class="lc-star-options" role="group" aria-label="Choose the missing panel">${options.map((option) => `<button class="lc-star-option${run.scratch.selection === option[0] ? " is-selected" : ""}" type="button" data-action="select-choice" data-choice="${option[0]}" aria-pressed="${run.scratch.selection === option[0]}" aria-label="Option ${option[0].toUpperCase()}: ${option[4]}" ${run.solved ? "disabled" : ""}><span class="lc-option-letter">${option[0].toUpperCase()}</span><span class="lc-star" style="top:${option[1]};--star-size:${option[2]};--star-glow:${option[3]}"></span></button>`).join("")}</div>`;
  }

  function renderBuildVisual(stage, run) {
    const position = run.scratch.placement || "middle";
    const fixed = stage.board === "board" ? `<span class="lc-build-fixed">BOARD</span>` : `<span class="lc-build-fixed" aria-hidden="true"></span>`;
    return `<div class="lc-build-board lc-build-${stage.board}" aria-live="polite" aria-label="${stage.token} is currently placed ${position}">${fixed}<span class="lc-build-token" data-position="${position}">${stage.token}</span></div>`;
  }

  function renderRoomScene(run) {
    const room = ensureRoom(run);
    const positions = { ice: [27, 73], elephant: [62, 60], storm: [81, 28] };
    const hotspots = Object.entries(ROOM_OBJECTS).map(([id, object]) => {
      const solved = Boolean(room.solved[id]);
      return `<button class="lc-room-hotspot${solved ? " is-solved" : ""}" style="left:${positions[id][0]}%;top:${positions[id][1]}%" type="button" data-action="room-open" data-object="${id}" aria-label="${object.number}. ${object.name}${solved ? ", solved" : ""}">${solved ? "✓" : object.number}</button>`;
    }).join("");
    return `<div class="lc-visual lc-visual--room"><div class="lc-room-art" aria-hidden="true"><svg viewBox="0 0 400 330" preserveAspectRatio="none"><defs><linearGradient id="roomWall" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#214f67"/><stop offset="1" stop-color="#112e42"/></linearGradient><radialGradient id="roomLamp"><stop stop-color="#ffe39a" stop-opacity=".8"/><stop offset="1" stop-color="#e8a93d" stop-opacity="0"/></radialGradient></defs><rect width="400" height="330" fill="url(#roomWall)"/><path d="M0 239 400 223v107H0Z" fill="#76533e"/><path d="M0 255 400 240M0 286l400-15M44 239v91m96-96v96m120-101v101m99-104v104" stroke="#4f362b" stroke-width="3"/><path d="M22 25h124v189H22z" fill="#183749" stroke="#bb8a45" stroke-width="4"/><path d="M30 66h108M30 109h108M30 152h108" stroke="#9d7040" stroke-width="5"/><g fill="#c57d58"><rect x="37" y="37" width="12" height="27"/><rect x="52" y="32" width="17" height="32"/><rect x="76" y="39" width="11" height="25"/><rect x="95" y="30" width="19" height="34"/><rect x="42" y="76" width="21" height="31"/><rect x="68" y="83" width="12" height="24"/><rect x="88" y="72" width="15" height="35"/><rect x="108" y="79" width="23" height="28"/></g><path d="M274 27c0-35 79-35 79 0v113h-79Z" fill="#102b42" stroke="#c8a25c" stroke-width="4"/><circle cx="314" cy="75" r="25" fill="#e8d58e" opacity=".9"/><path d="m246 54 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z" fill="#f0cb69"/><rect x="180" y="176" width="184" height="22" rx="4" fill="#b17b4c"/><path d="M196 198v87M348 198v72" stroke="#795039" stroke-width="13"/><rect x="205" y="129" width="68" height="47" rx="4" fill="#77523c"/><circle cx="235" cy="145" r="43" fill="url(#roomLamp)"/><path d="M232 129V94h23M218 129h31" stroke="#d8ad54" stroke-width="5"/><path d="M152 218c33-25 74-16 98 10 20 22 51 28 77 12 18-11 39 10 33 34-7 28-42 35-66 27-43-15-84 16-125-1-38-16-45-60-17-82Z" fill="#173d53" stroke="#d09b55" stroke-width="3" opacity=".9"/><path d="M169 250c46-22 97 31 153 5M180 277c45-17 83 18 133 3" fill="none" stroke="#d09b55" stroke-width="2" opacity=".5"/></svg></div>${hotspots}</div>`;
  }

  function ensureRoom(run) {
    if (!run.scratch.room) run.scratch.room = { active: null, solved: {}, inputs: {} };
    return run.scratch.room;
  }

  function renderRoomPanel(run) {
    const room = ensureRoom(run);
    const list = `<div class="lc-hotspot-list" aria-label="Room objects">${Object.entries(ROOM_OBJECTS).map(([id, object]) => `<button class="lc-hotspot-list-button${room.active === id ? " is-active" : ""}${room.solved[id] ? " is-solved" : ""}" type="button" data-action="room-open" data-object="${id}">${room.solved[id] ? "✓ " : `${object.number}. `}${object.short}</button>`).join("")}</div>`;
    if (!room.active) return `${list}<div class="lc-room-drawer"><div class="lc-room-drawer-head"><strong>Choose a numbered object</strong><span>${Object.keys(room.solved).length}/3 solved</span></div><p class="lc-copy">The pins and matching list lead to the same three clues. Nothing is hidden in an unmarked pixel.</p></div>`;
    const object = ROOM_OBJECTS[room.active];
    const solved = Boolean(room.solved[room.active]);
    const panel = `<div class="lc-room-drawer"><div class="lc-room-drawer-head"><strong>${object.number}. ${object.name}</strong><span>${Object.keys(room.solved).length}/3 solved</span></div><div class="lc-room-mini-visual">${object.visual}</div>${solved ? `<div class="lc-letter-reward"><span>${object.extraction}</span><b>${object.letter}</b></div>` : `<label class="lc-answer-label" for="room-answer">Which phrase is hidden here?</label><input class="lc-input" id="room-answer" data-answer="room" type="text" inputmode="text" autocomplete="off" value="${escapeHtml(room.inputs[room.active] || "")}" placeholder="Type the phrase" />`}</div>`;
    return list + panel;
  }

  function renderVisual(stage, run) {
    if (stage.type === "room") return renderRoomScene(run) + renderRoomPanel(run);
    let content = stage.visual || "";
    if (stage.type === "build") content = renderBuildVisual(stage, run);
    if (stage.type === "star-choice") content = renderSequence(false);
    if (content === "sequence-complete") content = renderSequence(true);
    if (content === "code") content = `<div class="lc-code-slots" aria-label="The extracted letters K, E and Y in hotspot order"><span class="lc-code-slot">K<small>snowflake</small></span><span class="lc-code-slot">E<small>elephant</small></span><span class="lc-code-slot">Y<small>storm</small></span></div>`;
    return `<div class="lc-visual${stage.type === "answer" && stage.visual === "code" ? " lc-visual--short" : ""}"><span class="lc-visual-label">Visual clue</span>${content}</div>${stage.evidence ? `<div class="lc-evidence-row" aria-label="Collected evidence">${stage.evidence.map((word) => `<span class="lc-evidence-chip">${word}</span>`).join("")}</div>` : ""}`;
  }

  function renderInteraction(stage, run) {
    if (stage.type === "answer") {
      return `<div class="lc-answer-area"><label class="lc-answer-label" for="answer-input">Your answer</label><input class="lc-input" id="answer-input" data-answer="main" type="text" inputmode="text" autocomplete="off" autocapitalize="sentences" value="${escapeHtml(run.scratch.answer || "")}" placeholder="Type the phrase" ${run.solved ? "disabled" : ""} /></div>`;
    }
    if (stage.type === "choice") {
      return `<div class="lc-thread-summary">${stage.summary.map((answer) => `<div class="lc-thread-answer"><span>${answer}</span><span>✓ solved</span></div>`).join("")}</div><div class="lc-choice-grid lc-choice-grid--two" role="group" aria-label="Choose the common meaning">${stage.choices.map((choice) => `<button class="lc-choice${run.scratch.selection === choice[0] ? " is-selected" : ""}${run.solved && choice[0] === stage.correct ? " is-correct" : ""}" type="button" data-action="select-choice" data-choice="${choice[0]}" aria-pressed="${run.scratch.selection === choice[0]}" ${run.solved ? "disabled" : ""}><span class="lc-choice-mark">✓</span><span>${choice[1]}</span></button>`).join("")}</div>`;
    }
    if (stage.type === "star-choice") return renderStarOptions(run);
    if (stage.type === "build") {
      return `<div class="lc-placement-grid" role="group" aria-label="Choose a placement for ${stage.token}">${stage.options.map((option) => `<button class="lc-placement${run.scratch.placement === option[0] ? " is-selected" : ""}" type="button" data-action="select-placement" data-placement="${option[0]}" aria-pressed="${run.scratch.placement === option[0]}" ${run.solved ? "disabled" : ""}>${option[1]}</button>`).join("")}</div>`;
    }
    if (stage.type === "chain") {
      const selected = run.scratch.chain || [];
      return `<div class="lc-chain-board" aria-label="Phrase chain with two empty linking slots"><div class="lc-chain-line">GREEN <span class="lc-chain-slot">${selected[0] || "A"}</span></div><div class="lc-chain-line"><span class="lc-chain-slot">${selected[0] || "A"}</span> AT THE END OF THE <span class="lc-chain-slot">${selected[1] || "B"}</span></div><div class="lc-chain-line"><span class="lc-chain-slot">${selected[1] || "B"}</span> VISION</div></div><div class="lc-token-bank" role="group" aria-label="Word bank">${stage.tokens.map((token) => `<button class="lc-token${selected.includes(token) ? " is-used" : ""}" type="button" data-action="chain-token" data-token="${token}" aria-pressed="${selected.includes(token)}" ${run.solved ? "disabled" : ""}>${token}</button>`).join("")}</div>`;
    }
    return "";
  }

  function currentClue(mode, stage, run) {
    let clues = stage.clues || [];
    let key = String(run.stage);
    if (stage.type === "room") {
      const room = ensureRoom(run);
      if (!room.active || room.solved[room.active]) return null;
      clues = ROOM_OBJECTS[room.active].clues;
      key = `${run.stage}:${room.active}`;
    }
    const count = Math.min(run.hints[key] || 0, clues.length);
    return { clues, key, count, text: count ? clues[count - 1] : "" };
  }

  function renderClue(mode, stage, run) {
    const clue = currentClue(mode, stage, run);
    if (!clue || !clue.count) return "";
    return `<div class="lc-clue-card" role="note"><b>Clue ${clue.count} of ${clue.clues.length}:</b>${clue.text}</div>`;
  }

  function renderFeedback(run) {
    if (!run.feedback) return "";
    const success = run.feedback.kind === "success";
    return `<div class="lc-feedback lc-feedback--${success ? "success" : "try"}" role="status"><strong>${run.feedback.title}</strong>${run.feedback.text}</div>`;
  }

  function renderActions(mode, stage, run) {
    if (run.solved) {
      const final = run.stage === mode.stages.length - 1;
      return `<div class="lc-actions lc-actions--single"><button class="lc-button lc-button--wide" type="button" data-action="continue">${final ? "Restore canvas" : "Continue"} <span aria-hidden="true">→</span></button></div>`;
    }
    if (stage.type === "room") {
      const room = ensureRoom(run);
      if (!room.active) return `<div class="lc-actions lc-actions--single"><button class="lc-button lc-button--secondary lc-button--wide" type="button" disabled>Choose an object above</button></div>`;
      if (room.solved[room.active]) return `<div class="lc-actions lc-actions--single"><button class="lc-button lc-button--secondary lc-button--wide" type="button" data-action="room-next">Choose another object</button></div>`;
    }
    const clue = currentClue(mode, stage, run);
    const clueDisabled = !clue || clue.count >= clue.clues.length;
    return `<div class="lc-actions"><button class="lc-button lc-button--secondary" type="button" data-action="clue" ${clueDisabled ? "disabled" : ""}>${clue && clue.count ? "Another clue" : "Clue"}</button><button class="lc-button" type="button" data-action="check">Check answer</button></div>`;
  }

  function renderPlay(mode) {
    const run = getRun(mode.id);
    const stage = mode.stages[Math.min(run.stage, mode.stages.length - 1)];
    return `<main class="lc-screen lc-screen--play" id="main-content" style="--mode-accent:${mode.accent};--mode-soft:${mode.soft}">
      <header class="lc-play-topbar">${backButton()}<div class="lc-stage-meta"><p class="lc-stage-mode">${mode.title}</p><p class="lc-stage-count">Stage ${run.stage + 1} of ${mode.stages.length}</p></div><button class="lc-mini-canvas-button" type="button" data-action="view-canvas" aria-label="View canvas progress">${completedCount()}/7</button></header>
      ${renderStageTrack(mode, run.stage)}
      <section class="lc-puzzle-card" aria-labelledby="stage-title">
        <div class="lc-puzzle-copy"><p class="lc-eyebrow">${stage.eyebrow}</p><h1 class="lc-puzzle-title" id="stage-title" tabindex="-1">${stage.title}</h1><p class="lc-instruction">${stage.prompt}</p></div>
        ${renderVisual(stage, run)}
        ${renderInteraction(stage, run)}
        ${renderClue(mode, stage, run)}
        ${renderFeedback(run)}
      </section>
      ${renderActions(mode, stage, run)}
      <p class="lc-stage-note">No timer and no speed score. Progress is saved only in this browser.</p>
      <div class="lc-toast" role="status"></div>
    </main>`;
  }

  function renderResult(mode) {
    const count = completedCount();
    const replayCopy = view.newAward ? `Your solve restored detail ${count} of 7 in The Moonlit Library.` : "Replay complete. Your original canvas progress stays intact.";
    const milestone = count === 7 ? "Perfect Canvas earned: the fine gold frame is now complete." : count === 6 ? "The finished canvas is now alive with a subtle sweep of moonlight." : count === 5 ? "The full-colour canvas is complete. Two optional perfection details remain." : `${Math.max(0, 5 - count)} more experiment${5 - count === 1 ? "" : "s"} to finish the full painting.`;
    return `<main class="lc-screen lc-screen--play" id="main-content">
      <div class="lc-result-badge" aria-hidden="true">${ICONS.check}</div>
      <div class="lc-result-copy"><p class="lc-eyebrow">Experiment complete</p><h1 class="lc-title" id="screen-title" tabindex="-1">${mode.caseTitle} solved</h1><p class="lc-lede">${replayCopy}</p></div>
      ${renderCanvasArt(true)}
      <div class="lc-reveal-note"><span class="lc-reveal-swatch">${view.newAward ? "+" : "✓"}</span><span>${milestone}</span></div>
      <div class="lc-actions"><button class="lc-button lc-button--secondary" type="button" data-action="view-canvas">View canvas</button><button class="lc-button" type="button" data-action="home">Try another</button></div>
      <div class="lc-toast" role="status"></div>
    </main>`;
  }

  function renderCanvasPage() {
    const actual = completedCount();
    const milestones = [
      [5, "Full painting", "All colour and core details restored"],
      [6, "Living detail", "Firelight and moonlight begin to move"],
      [7, "Perfect Canvas", "Fine gold frame and completion mark"]
    ];
    return `<main class="lc-screen" id="main-content">
      <header class="lc-topbar">${backButton()}<span class="lc-local-pill">Weekly canvas</span></header>
      ${view.previewAll ? `<div class="lc-preview-banner"><span>Finished-canvas preview · progress unchanged</span><button type="button" data-action="toggle-preview">Exit preview</button></div>` : ""}
      ${renderCanvasArt(true)}
      <section class="lc-canvas-page-copy" aria-labelledby="canvas-title"><p class="lc-eyebrow">Shared weekly reward</p><h1 class="lc-title" id="canvas-title" tabindex="-1">One artwork, seven ways to earn it.</h1><p class="lc-copy">Complete five experiments to finish the canvas. Six adds a subtle living detail; all seven perfect it. Missed games never erase progress.</p></section>
      <div class="lc-milestone-list">${milestones.map((item) => `<div class="lc-milestone${actual >= item[0] ? " is-earned" : ""}"><span class="lc-milestone-count">${item[0]}</span><span><strong>${item[1]}</strong><p>${item[2]}</p></span><span class="lc-milestone-state">${actual >= item[0] ? "Earned" : "Locked"}</span></div>`).join("")}</div>
      <div class="lc-actions lc-actions--single"><button class="lc-button ${view.previewAll ? "lc-button--secondary" : "lc-button--teal"} lc-button--wide" type="button" data-action="toggle-preview">${view.previewAll ? "Return to earned canvas" : "Preview finished canvas"}</button></div>
      <p class="lc-stage-note">Preview is a lab-only visual check. It does not complete experiments or change saved progress.</p>
      <div class="lc-toast" role="status"></div>
    </main>`;
  }

  function render(options = {}) {
    const mode = view.modeId ? MODE_BY_ID[view.modeId] : null;
    if (view.screen === "intro" && mode) app.innerHTML = renderIntro(mode);
    else if (view.screen === "play" && mode) app.innerHTML = renderPlay(mode);
    else if (view.screen === "result" && mode) app.innerHTML = renderResult(mode);
    else if (view.screen === "canvas") app.innerHTML = renderCanvasPage();
    else app.innerHTML = renderHub();
    if (options.focusHeading) window.requestAnimationFrame(() => document.querySelector("#stage-title, #screen-title, #hub-title, #canvas-title")?.focus({ preventScroll: true }));
  }

  function setWrong(run, title, text) {
    run.feedback = { kind: "try", title, text };
    saveState();
    render();
    announce(`${title}. ${text}`);
  }

  function setSolved(run, stage) {
    run.solved = true;
    run.feedback = { kind: "success", title: stage.success, text: stage.explanation };
    saveState();
    render();
    announce(`${stage.success}. ${stage.explanation}`);
  }

  function checkRoom(mode, stage, run) {
    const room = ensureRoom(run);
    if (!room.active || room.solved[room.active]) return;
    const object = ROOM_OBJECTS[room.active];
    const value = room.inputs[room.active] || "";
    if (!value.trim()) return setWrong(run, "Add an answer", "Type the phrase shown by this object first.");
    if (!answerMatches(value, object.answers)) return setWrong(run, "Not quite yet", "The objects and their relationship matter. Try a clue if you want a nudge.");
    room.solved[room.active] = true;
    run.feedback = null;
    const allSolved = Object.keys(ROOM_OBJECTS).every((id) => room.solved[id]);
    if (allSolved) {
      run.solved = true;
      run.feedback = { kind: "success", title: stage.success, text: stage.explanation };
      announce("All three objects solved. The extracted letters are K, E and Y.");
    } else {
      announce(`${object.name} solved. Extracted letter ${object.letter}.`);
    }
    saveState();
    render();
  }

  function checkCurrent() {
    const mode = MODE_BY_ID[view.modeId];
    const run = getRun(mode.id);
    const stage = mode.stages[run.stage];
    if (run.solved) return;
    if (stage.type === "room") return checkRoom(mode, stage, run);

    let correct = false;
    let empty = false;
    if (stage.type === "answer") {
      empty = !String(run.scratch.answer || "").trim();
      correct = !empty && answerMatches(run.scratch.answer, stage.answers);
    } else if (stage.type === "choice" || stage.type === "star-choice") {
      empty = !run.scratch.selection;
      correct = run.scratch.selection === stage.correct;
    } else if (stage.type === "build") {
      empty = !run.scratch.placement;
      correct = stage.correct.includes(run.scratch.placement);
    } else if (stage.type === "chain") {
      const chain = run.scratch.chain || [];
      empty = chain.length < 2;
      correct = chain.length === 2 && chain[0] === stage.answers[0] && chain[1] === stage.answers[1];
    }
    if (empty) return setWrong(run, "One step missing", stage.type === "answer" ? "Type an answer before checking." : "Make your selection before checking.");
    if (!correct) return setWrong(run, "Not quite yet", stage.type === "build" ? "That layout does not translate every word in the phrase. Try another position." : "Look for the exact relationship shown. Your answer stays in place while you reconsider.");
    setSolved(run, stage);
  }

  function continueCurrent() {
    const mode = MODE_BY_ID[view.modeId];
    const run = getRun(mode.id);
    if (!run.solved) return;
    if (run.stage < mode.stages.length - 1) {
      run.stage += 1;
      run.scratch = {};
      run.solved = false;
      run.feedback = null;
      saveState();
      render({ focusHeading: true });
      announce(`Stage ${run.stage + 1} of ${mode.stages.length}`);
      return;
    }
    const newAward = !state.completed.includes(mode.id);
    if (newAward) state.completed.push(mode.id);
    delete state.runs[mode.id];
    saveState();
    view.screen = "result";
    view.newAward = newAward;
    render({ focusHeading: true });
    announce(newAward ? `Experiment complete. Canvas restored to ${completedCount()} of 7.` : "Replay complete.");
  }

  function revealClue() {
    const mode = MODE_BY_ID[view.modeId];
    const run = getRun(mode.id);
    const stage = mode.stages[run.stage];
    const clue = currentClue(mode, stage, run);
    if (!clue || clue.count >= clue.clues.length) return;
    run.hints[clue.key] = clue.count + 1;
    saveState();
    render();
    announce(`Clue ${clue.count + 1}: ${clue.clues[clue.count]}`);
  }

  function goHome() {
    view = { screen: "hub", modeId: null, previewAll: false, newAward: false };
    render({ focusHeading: true });
  }

  app.addEventListener("input", (event) => {
    const input = event.target.closest("[data-answer]");
    if (!input || view.screen !== "play") return;
    const run = getRun(view.modeId);
    if (input.dataset.answer === "room") {
      const room = ensureRoom(run);
      if (room.active) room.inputs[room.active] = input.value;
    } else {
      run.scratch.answer = input.value;
    }
    run.feedback = null;
    saveState();
  });

  app.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.matches("[data-answer]") && !event.target.disabled) {
      event.preventDefault();
      checkCurrent();
    }
  });

  app.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button || button.disabled) return;
    const action = button.dataset.action;

    if (action === "open-mode") {
      view = { screen: "intro", modeId: button.dataset.mode, previewAll: false, newAward: false };
      render({ focusHeading: true });
      return;
    }
    if (action === "start-mode") {
      const modeId = button.dataset.mode;
      if (state.completed.includes(modeId) || !state.runs[modeId]) state.runs[modeId] = newRun();
      saveState();
      view = { screen: "play", modeId, previewAll: false, newAward: false };
      render({ focusHeading: true });
      return;
    }
    if (action === "home") return goHome();
    if (action === "view-canvas") {
      view.screen = "canvas";
      view.previewAll = false;
      render({ focusHeading: true });
      return;
    }
    if (action === "toggle-preview") {
      view.previewAll = !view.previewAll;
      render();
      announce(view.previewAll ? "Finished canvas preview on. Saved progress is unchanged." : "Showing earned canvas progress.");
      return;
    }
    if (action === "reset") {
      if (!window.confirm("Reset all progress in this local prototype? This cannot affect the real Clue Canvas app.")) return;
      state = freshState();
      try { localStorage.removeItem(STORAGE_KEY); } catch (_error) { /* no-op */ }
      goHome();
      showToast("Local prototype reset");
      return;
    }
    if (view.screen !== "play") return;

    const run = getRun(view.modeId);
    const mode = MODE_BY_ID[view.modeId];
    const stage = mode.stages[run.stage];
    if (action === "select-choice" && !run.solved) {
      run.scratch.selection = button.dataset.choice;
      run.feedback = null;
      saveState();
      render();
      document.querySelector(`[data-choice="${button.dataset.choice}"]`)?.focus();
      return;
    }
    if (action === "select-placement" && !run.solved) {
      run.scratch.placement = button.dataset.placement;
      run.feedback = null;
      saveState();
      render();
      document.querySelector(`[data-placement="${button.dataset.placement}"]`)?.focus();
      announce(`${stage.token} placed ${button.textContent.trim().toLowerCase()}.`);
      return;
    }
    if (action === "chain-token" && !run.solved) {
      const token = button.dataset.token;
      const chain = run.scratch.chain || [];
      if (chain.includes(token)) run.scratch.chain = chain.filter((item) => item !== token);
      else if (chain.length < 2) run.scratch.chain = [...chain, token];
      else return showToast("Two slots are full. Remove a selected word first.");
      run.feedback = null;
      saveState();
      render();
      document.querySelector(`[data-token="${token}"]`)?.focus();
      return;
    }
    if (action === "room-open" && stage.type === "room" && !run.solved) {
      const room = ensureRoom(run);
      room.active = button.dataset.object;
      run.feedback = null;
      saveState();
      render();
      window.requestAnimationFrame(() => document.getElementById("room-answer")?.focus());
      return;
    }
    if (action === "room-next") {
      const room = ensureRoom(run);
      room.active = null;
      saveState();
      render();
      return;
    }
    if (action === "clue") return revealClue();
    if (action === "check") return checkCurrent();
    if (action === "continue") return continueCurrent();
  });

  render();
})();
