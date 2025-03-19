const calculateCalories = (
  gender,
  age,
  weight,
  height,
  activityLevel,
  goal
) => {
  let bmr;

  // Calculate BMR using Mifflin-St Jeor Equation
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  // Adjust for activity level
  let dailyCalories = bmr * (activityMultipliers[activityLevel] || 1.2);

  // Adjust for goal
  if (goal === "weight_loss") {
    dailyCalories -= 500;
  } else if (goal === "weight_gain") {
    dailyCalories += 500;
  }

  return Math.round(dailyCalories); // Round to nearest integer
};

module.exports = calculateCalories;
