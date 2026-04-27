# Character art slots

These are the placeholder ids used by `<CharacterSlot id="..." />` throughout
the app. To replace a placeholder with real art, drop a transparent PNG or
SVG into `src/assets/characters/<id>.png` and import it in the component
that uses that slot.

Recommended size: 256–512px square, transparent background.

| id                   | Where it shows                                   |
| -------------------- | ------------------------------------------------ |
| panda-scientist      | Landing — left mascot holding a flask            |
| magnifier-bird       | Landing — right mascot with a magnifier          |
| cat-celebrating      | Landing — bottom-center cat with speech bubble   |
| cat-explorer         | Topic — right side cat with speech bubble        |
| solid-cube           | Topic — concept character (solid)                |
| liquid-droplet       | Topic — concept character (liquid)               |
| gas-cloud            | Topic — concept character (gas)                  |
| panda-with-tray      | Topic card #1 illustration                       |
| droplet-and-plant    | Topic card #2 illustration                       |
| explorer-running     | Topic card #3 illustration                       |
| owl-with-mosque      | Topic card #4 illustration                       |
| gas-particle         | Game — "Gas" particle card                       |
| liquid-particle      | Game — "Liquid" particle card                    |
| solid-particle       | Game — "Solid" particle card                     |
| hint-cat             | Game — quiz panel hint mascot                    |
| topic-coming-soon    | Landing — coming-soon card construction mascot   |
| topic-coming-flag    | Landing — coming-soon card flag mascot           |
