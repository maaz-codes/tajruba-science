Build a small polished 2D educational mini-game in Phaser JS.

IMPORTANT PRIORITY:
You will receive a generated reference image for the game. Use it as a visual guide only. If there is any conflict between the image and these written instructions, the WRITTEN INSTRUCTIONS OVERRIDE THE IMAGE.

GOAL:
Create a beginner-friendly Phaser project that teaches Grade 4 children that matter is made of particles, that spacing changes, and that the amount/density of particles affects the state of matter. The game is free-play only. There is no win state, no lose state, no timer, no score, no lives, and no end screen.

GENERAL RULES:
- Keep the game small, clean, and polished.
- Do not invent extra mechanics.
- Use placeholder assets first.
- Make code modular and easy to understand.
- Make asset swapping easy later.
- Support mouse and touch.
- Desktop landscape first, 16:9 layout.
- Use simple animation and feedback, not complex physics systems.
- Prefer predictable scripted motion over chaotic simulation.
- Keep all game state in memory only.
- No background music.
- Add a mute/unmute audio control.
- Only use these sound hooks/placeholders: start click, particle drop pop, slider tick, new-state discovery chime.

GAME STRUCTURE:
Use a very small scene structure:
1. StartScene
2. GameScene

A simple, readable project structure is preferred, for example:
- index.html
- src/main.js
- src/scenes/StartScene.js
- src/scenes/GameScene.js
- src/data/gameData.js

Do not overengineer. Keep the architecture simple enough for a beginner to follow.

START SCENE:
- Show a lightweight overlay with a child-friendly button such as “Start Experiment”.
- This screen exists mainly to begin interaction cleanly and unlock audio.
- On click/tap, play a soft start click and move into GameScene.

GAME SCENE OVERVIEW:
Main screen layout:
- Small top title/instruction area.
- Small helper bubble near the main interaction zone.
- Three tiny discovery badges near the top that represent Gas, Liquid, and Solid.
- Mute/unmute button.
- Main top gameplay row from left to right:
  1. Draggable particle cube area (conceptually a cube, visually 2D)
  2. Reactive matter view box character
  3. Plus sign
  4. Vertical looping icon slider
  5. Equals sign
  6. Example output box with label
- Fixed bottom particle tray

INITIAL STATE:
- Cube starts with 0 particles.
- Tray starts with all 12 particles.
- Slider starts on earth.
- Current state is neutral/empty at start.
- No explicit “empty” label is required.
- Output box should show a neutral placeholder when state is empty.

PARTICLE SYSTEM:
- There are exactly 12 particle tokens total.
- Each particle is an individual draggable object.
- The child can drag particles from the tray into the cube.
- The child can drag specific particles back out from the cube into the tray.
- Since the tray depletes as particles move into the cube, there is no separate overfill case needed.
- Do not leave particles where they were dropped. When a particle is added or removed, all particles currently in the cube should smoothly animate into a predefined centered arrangement.

CUBE ARRANGEMENT RULE:
- The cube is visually 2D.
- Use predefined centered layout coordinates for counts 1 through 12.
- As count increases, formations should become denser and gaps should reduce.
- Example behavior:
  - 1 particle: centered
  - 2 particles: centered pair with gap
  - 3 particles: small centered triangle
  - Higher counts: fill outward in neat centered formations
- The arrangement should visually teach density, not realism.
- Make the snap/rearrangement animation short and polished.

STATE LOGIC:
- 0 particles = neutral/empty
- 1 to 4 = gas
- 5 to 8 = liquid
- 9 to 12 = solid

STATE FEEDBACK:
- On any state change among gas, liquid, and solid:
  - update the state label visually
  - show a tiny sparkle/pop effect
  - animate transitions simply and clearly
- No fail feedback exists because there is no fail state.

FIRST-TIME DISCOVERY SYSTEM:
- Track whether the player has discovered gas, liquid, and solid at least once.
- A state counts as discovered instantly when the cube particle count enters that state range for the first time.
- On first-time discovery of a state:
  - light up that state’s badge
  - play the new-state discovery chime
  - show a subtle state label pop
  - add a small sparkle burst
- Do not add a full celebration after all three are discovered.
- After all three are discovered, the game continues normally.

HELPER BUBBLE:
- Show lightweight exploration prompts only, not formal tasks or levels.
- Prompt options are:
  - “Make gas”
  - “Drag more to make liquid”
  - “Drag more to make solid”
- The bubble should always ask for one currently unexplored state.
- For deterministic behavior, you may choose the first unseen state in the order gas -> liquid -> solid.
- Once all three states are discovered, change the bubble text to:
  - “Try different combinations”
- Do not show quizzes, success screens, or progression steps.

REACTIVE MATTER VIEW BOX:
This is a separate visual box from the draggable cube. Treat it as a soft character with eyes.
- Eyes stay in fixed positions.
- Add tiny blinking behavior.
- The body of the character is visually represented by animated particles/dots.

State-specific behavior:
- Empty: calm neutral face, almost no particle body
- Gas: sparse small dots, loose spacing, almost transparent, lively floating movement
- Liquid: more dots, closer together, less transparent, slower movement
- Solid: dense packed dots, opaque, very subtle movement only

The view box should visually communicate state clearly and charmingly, but remain simple enough to build fast.

STATE LABELING:
- Show readable state text for gas, liquid, or solid when appropriate.
- No explicit “empty” label is needed.
- Keep the label placement clean and child-readable.

VERTICAL ITEM SLIDER:
- Build a vertical looping slot-machine-style selector.
- Drag up/down to move it.
- Show three visible item slots at most:
  - one centered selected icon
  - one above
  - one below
- It should loop infinitely/circularly.
- Slider items are exactly:
  1. earth
  2. tree
  3. industry
- The slider cells should show tiny icons only, no text inside the slider.
- Add soft slider tick feedback when selection changes.

COMBINATION SYSTEM:
The selected slider item combines with the current matter state to generate an example output.

Exact mapping table:
- earth + solid = stone
- earth + liquid = ocean
- earth + gas = cloud
- tree + solid = wood
- tree + liquid = tree sap
- tree + gas = oxygen
- industry + solid = iron
- industry + liquid = chemicals
- industry + gas = smoke

These are child-friendly associations and do not need to be strict scientific diagrams.

EXAMPLE OUTPUT BOX:
- Show one medium-sized illustrated placeholder object.
- Show the object name below it.
- Keep it readable and visually clean.
- Do not make the result huge.
- When state is empty, show a neutral placeholder/no-result state.
- When either the slider item changes or the matter state changes, update the result automatically.
- Use a pop-in with a small bounce when the output changes.

PLACEHOLDER ART DIRECTION:
Use simple placeholder art that is easy to replace later:
- Particle tokens: simple soft circles/dots
- Slider icons: simple placeholder icons for earth, tree, industry
- Output examples: simple child-friendly illustrated placeholders for stone, ocean, cloud, wood, tree sap, oxygen, iron, chemicals, smoke
- UI: rounded soft science-lab panels

Do not hardwire the code to specific final textures. Make swapping later easy by centralizing:
- asset keys
- icon keys
- output keys
- sizing constants
- layout constants
- mapping data

ANIMATION AND MOTION:
Keep motion simple, readable, and polished.
Required motion:
- Particle drag feedback
- Particle snap/rearrangement when added/removed
- Minimal sparkle/pop on state change
- Small bounce on output change
- Tiny blinking for matter character eyes
- Gentle state-specific movement in the matter view box
Do not add flashy transitions, camera shakes, or arcade effects.

AUDIO:
Include placeholders/hooks only for:
- start click
- particle drop pop
- slider tick
- new-state discovery chime
No background music.
Add a mute/unmute button visible on the main gameplay screen.

UI COPY:
Use concise child-friendly microcopy. You may choose exact wording, but keep it minimal and clear.
Suggested pieces:
- Start button: “Start Experiment”
- Helper prompts: “Make gas”, “Make liquid”, “Make solid”
- Post-discovery helper: “Try different combinations”

VISUAL LAYOUT TARGET:
Implement a clean desktop landscape layout that matches this structure:
- Top: title/instruction + discovery badges + mute button
- Middle row: cube -> matter view box -> + -> vertical slider -> = -> output box
- Bottom: fixed particle tray

Do not add:
- score
- timer
- levels
- fail state
- results screen
- extra characters
- inventory systems
- quizzes
- text-heavy instructions
- extra science systems

DEFINITION OF DONE:
The game counts as done when:
- StartScene works and enters the game cleanly
- 12 individual particles are draggable
- Particles can move tray -> cube and cube -> tray