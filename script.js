// PROVIDED: use this collection to generate the entries.
const $creatures = [
  {
    "name": "Moss Dragon",
    "description": "A gentle gardener who grows tiny forests wherever it naps.",
    "image": "assets/moss-dragon.svg",
    "alt": "A green dragon with leafy horns and small wings."
  },
  {
    "name": "Cloud Fox",
    "description": "A sky wanderer collecting soft clouds and lost daydreams.",
    "image": "assets/cloud-fox.svg",
    "alt": "A pale blue fox with pointed ears and a fluffy tail."
  },
  {
    "name": "Ember Salamander",
    "description": "A warm little companion that keeps campfires glowing.",
    "image": "assets/ember-salamander.svg",
    "alt": "An orange salamander with a flame at the end of its tail."
  },
  {
    "name": "Moon Owl",
    "description": "A quiet navigator who reads the stories written in stars.",
    "image": "assets/moon-owl.svg",
    "alt": "A purple owl with a crescent moon on its forehead."
  },
  {
    "name": "Crystal Turtle",
    "description": "A patient explorer carrying a sparkling crystal garden.",
    "image": "assets/crystal-turtle.svg",
    "alt": "A mint green turtle with purple crystals on its shell."
  },
  {
    "name": "Mushroom Sprite",
    "description": "A woodland storyteller with a spotted cap and muddy boots.",
    "image": "assets/mushroom-sprite.svg",
    "alt": "A small cream sprite wearing a red spotted mushroom cap."
  }
]

// YOUR WORK: build these features using the supplied HTML, CSS, and data.
// 1. Select the collection and preference controls.
// 2. Use a loop to generate the creature entries. See START-HERE.md for markup.
// 3. Listen for changes to each preference control and update the appearance.
// 4. Save both selected preferences to Local Storage.
// 5. Check for saved data on load and restore the controls and appearance.
// Add short pseudocode comments before writing each feature.

// Find the collection, both controls, and the status message.
const collection = document.getElementById("collection");
const themeControl = document.getElementById("theme");
const layoutControl = document.getElementById("layout");
const status = document.getElementById("status");
const storageKey = "mtm6302-a4-creature-preferences";

// Loop through the dataset and add one entry for each creature.
function renderCollection() {
  for (const creature of $creatures) {
    const entry = document.createElement("li");
    entry.className = "creature";

    const image = document.createElement("img");
    image.src = creature.image;
    image.alt = creature.alt;

    const info = document.createElement("div");
    info.className = "creature-info";

    const name = document.createElement("h3");
    name.textContent = creature.name;

    const description = document.createElement("p");
    description.className = "creature-description";
    description.textContent = creature.description;

    info.append(name, description);
    entry.append(image, info);
    collection.append(entry);
  }
}

// Apply the selected theme and layout using the CSS data attributes.
function applyPreferences() {
  document.body.dataset.theme = themeControl.value;
  collection.dataset.layout = layoutControl.value;
}

// Read both controls, update the page, and save the choices together.
function savePreferences() {
  const preferences = {
    theme: themeControl.value,
    layout: layoutControl.value
  };

  applyPreferences();
  localStorage.setItem(storageKey, JSON.stringify(preferences));
  status.textContent = "Your preferences were saved.";
}

// Check for saved data before parsing. Keep the defaults on a first visit.
function restorePreferences() {
  const savedPreferences = localStorage.getItem(storageKey);

  if (savedPreferences === null) {
    status.textContent = "Choose a habitat and layout to make this collection yours.";
    return;
  }

  const preferences = JSON.parse(savedPreferences);
  themeControl.value = preferences.theme;
  layoutControl.value = preferences.layout;
  applyPreferences();
  status.textContent = "Your saved preferences were restored.";
}

// Build the entries once, restore any saved choices, and listen for changes.
renderCollection();
restorePreferences();

themeControl.addEventListener("change", savePreferences);
layoutControl.addEventListener("change", savePreferences);