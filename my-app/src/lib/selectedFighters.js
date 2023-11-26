// selectedFighters.js
import { writable } from 'svelte/store';

export const selectedFighters = writable({
  fighter1: {
    id: null,
    name: null,
    metrics: {
      significant_striking_accuracy: null,
      significant_strike_defence: null,
      takedown_accuracy: null,
      takedown_defense: null,
    },
    color: "blue", // Default color for Fighter 1
  },
  fighter2: {
    id: null,
    name: null,
    metrics: {
      significant_striking_accuracy: null,
      significant_strike_defence: null,
      takedown_accuracy: null,
      takedown_defense: null,
    },
    color: "red", // Default color for Fighter 2
  },
});
