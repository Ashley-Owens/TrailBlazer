/**
 * Calculates the difficulty of a trail.
 * @param {Trail} trail - The trail to calculate the difficulty for
 * @returns {string} - One of "easy", "medium", or "hard"
 */
const calculateDifficulty = (trail) => {
  let difficulty;

  // convert the Hiking Project difficulty to a TrailBlazer difficulty
  switch (trail.difficulty) {
    case "green":
      difficulty = "easy";
      break;
    case "greenBlue":
    case "blue":
      difficulty = "medium";
      break;
    case "blueBlack":
    case "black":
      difficulty = "hard";
      break;
    default:
      difficulty = "hard";
      break;
  }

  return difficulty;
};
