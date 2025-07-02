const cards = {
  dominion: {
    list: ["cellar", "chapel", "moat", "village", "workshop", "bureaucrat", "gardens", "militia", "moneylender", "remodel", "smithy", "throne room", "council room", "festival", "laboratory", "library", "market", "mine", "witch"],
    costs: [2,2,2,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5]
  },
  prosperity: {
    list: ["watchtower", "bishop", "monument", "quarry", "worker's village", "mint", "rabble", "vault", "city", "grand market", "hoard", "bank", "expand", "forge", "king's court", "peddler"],
    costs: [3,4,4,4,4,5,5,5,5,6,6,7,7,7,7,8]
  },
  plunder: {
    list: ["cage", "grotto", "jeweled egg", "search", "shaman", "secluded shrine", "siren", "stowaway", "taskmaster", "abundance", "mapmaker", "tools", "cutthroat", "pendant", "frigate", "wealthy village", "king's cache"],
    costs: [2,2,2,2,2,3,3,2,4,4,5,5,5,5,6,4,7]
  }
};

const traits = ["cheap","cursed","fated","fawning","friendly","hasty","inherited","inspiring","nearby","patient","pious","reckless","rich","shy","tireless"];
const events = ["bury","avoid","deliver","peril","rush","foray","launch","mirror","prepare","scrounge","journey","maelstrom","looting","invasion","prosper"];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getSelectedCardPool() {
  let all = [];
  const sets = ["dominion", "prosperity", "plunder"];
  sets.forEach(set => {
    if (document.getElementById(set).checked) {
      const names = cards[set].list;
      const costs = cards[set].costs;
      names.forEach((name, i) => all.push({ name, cost: costs[i] }));
    }
  });
  return all;
}

function generateKingdom() {
  const pool = getSelectedCardPool();
  const desiredCosts = [2, 3, 4, 5, 6, 7].map(n => parseInt(document.getElementById("cost" + n).value));
  const kingdom = [];

  const byCost = cost =>
    shuffle(pool).find(c => c.cost === cost && !kingdom.includes(c));

  [2, 3, 4, 5, 6, 7].forEach((cost, idx) => {
    for (let i = 0; i < desiredCosts[idx]; i++) {
      const card = byCost(cost);
      if (card) kingdom.push(card);
    }
  });

  const eventCount = parseInt(document.getElementById("eventCount").value);
  const traitCount = parseInt(document.getElementById("traitCount").value);

  const selectedEvents = shuffle(events).slice(0, eventCount);
  const selectedTraits = shuffle(traits).slice(0, traitCount);

  let output = `<h2>🃏 Kingdom (${kingdom.length} cards)</h2><ul>`;
  kingdom.forEach(c => output += `<li>${c.name} ($${c.cost})</li>`);
  output += `</ul><h3>🌟 Events</h3><ul>${selectedEvents.map(e => `<li>${e}</li>`).join("")}</ul>`;
  output += `<h3>🧬 Traits</h3><ul>${selectedTraits.map(t => `<li>${t}</li>`).join("")}</ul>`;

  document.getElementById("output").innerHTML = output;
}
