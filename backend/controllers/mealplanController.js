const MealPlan = require("../models/MealPlan");
const Recipe = require("../models/Recipes");
const UserProfile = require("../models/UserProfile");

const generateMealPlan = async (req, res) => {
  console.log("Received request to generate meal plan");

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const userId = req.user.id;
    console.log("Extracted userId from token:", userId);

    // Fetch user profile to get daily calories
    const userProfile = await UserProfile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const { weightGoal, dietaryType, mealType, noOfDays } = req.body;
    const { dailyCalories } = userProfile;

    if (!dailyCalories) {
      return res.status(400).json({
        message: "Daily calorie intake not set. Please update profile first.",
      });
    }

    if (!mealType || !Array.isArray(mealType) || mealType.length === 0) {
      return res.status(400).json({
        message:
          "Please select at least one meal type (Breakfast, Lunch, Dinner, Snack).",
      });
    }

    if (!noOfDays || noOfDays < 1) {
      return res
        .status(400)
        .json({ message: "Please specify a valid number of days." });
    }

    //  Calorie distribution
    const distributionPercentages = {
      Breakfast: 0.25,
      Lunch: 0.3,
      Dinner: 0.3,
      Snack: 0.15,
    };

    let totalPercentage = mealType.reduce(
      (sum, type) => sum + (distributionPercentages[type] || 0),
      0
    );

    if (totalPercentage === 0) {
      return res.status(400).json({ message: "Invalid meal types selected." });
    }

    let calorieDistribution = {};
    mealType.forEach((type) => {
      calorieDistribution[type] = Math.round(
        dailyCalories * (distributionPercentages[type] / totalPercentage)
      );
    });

    let finalMealPlan = [];

    //  Generate meals for the specified number of days
    for (let day = 1; day <= noOfDays; day++) {
      let dailyMealPlan = [];
      let totalCalories = 0;

      for (const type of mealType) {
        const calorieTarget = calorieDistribution[type];

        let recipes = await Recipe.find({
          dietaryType,
          weightGoal,
          mealType: type,
          calories: { $lte: calorieTarget },
        }).sort({ calories: -1 });

        if (recipes.length === 0) {
          recipes = await Recipe.find({
            dietaryType,
            weightGoal,
            mealType: type,
          })
            .sort({ calories: 1 })
            .limit(1);
        }

        if (recipes.length === 0) {
          console.log(`No meals found for ${type}`);
          continue;
        }

        //  Select a unique meal by rotating through available recipes
        let mealIndex = (day - 1) % recipes.length;
        const selectedMeal = recipes[mealIndex];

        dailyMealPlan.push({
          mealType: selectedMeal.mealType,
          recipeId: selectedMeal._id,
          recipeName: selectedMeal.recipeName,
          mealImageURL: selectedMeal.mealImageURL,
          preparationTime: selectedMeal.preparationTime,
          calories: selectedMeal.calories,
          servings: 1, //  Initial serving set to 1
        });

        totalCalories += selectedMeal.calories; //  Add initial calories
      }

      //  Adjust servings to reach dailyCalories
      //  Ensure totalCalories is at least dailyCalories (can slightly exceed)
      if (totalCalories < dailyCalories && dailyMealPlan.length > 0) {
        let deficit = dailyCalories - totalCalories;
        let maxIterations = dailyMealPlan.length * 5;
        let iteration = 0;

        while (totalCalories < dailyCalories && iteration < maxIterations) {
          let mealsSorted = [...dailyMealPlan].sort(
            (a, b) => a.calories - b.calories
          );
          let addedServings = false;

          for (let meal of mealsSorted) {
            if (!meal.servings) meal.servings = 1;

            let extraServings = Math.ceil(deficit / meal.calories);

            if (extraServings > 0) {
              meal.servings += extraServings;
              let addedCalories = extraServings * meal.calories;

              totalCalories += addedCalories;
              deficit = dailyCalories - totalCalories;
              addedServings = true;

              //  Stop if we are within a reasonable excess (e.g., +50 kcal)
              if (
                totalCalories >= dailyCalories &&
                totalCalories <= dailyCalories + 50
              ) {
                console.log(
                  ` Total calories reached! Final: ${totalCalories} kcal`
                );
                break;
              }
            }
          }

          if (!addedServings) {
            console.log("No more servings can be added.");
            break;
          }

          iteration++;
          if (iteration >= maxIterations) {
            console.log("Max iterations reached! Exiting loop.");
            break;
          }
        }
      }

      //  Final check to ensure we don't fall short
      if (totalCalories < dailyCalories) {
        console.log(
          `Still under target by ${dailyCalories - totalCalories} calories.`
        );
        console.log("Adding a small meal/snack to reach the goal.");
      }

      //  Ensure correct `totalCalories` is stored
      dailyMealPlan = dailyMealPlan.map((meal) => ({
        ...meal,
        totalCalories: meal.servings * meal.calories,
      }));

      finalMealPlan.push({
        day,
        totalCalories,
        recipes: dailyMealPlan,
      });
    }

    if (finalMealPlan.length === 0) {
      return res.status(404).json({ message: "No suitable meal plan found." });
    }

    //  Save meal plan in MongoDB
    const newMealPlan = new MealPlan({
      userId,
      noOfDays,
      weightGoal,
      dietaryType,
      mealType,
      mealPlans: finalMealPlan,
    });

    await newMealPlan.save();

    res.status(201).json({
      success: true,
      message: "Meal plan created",
      mealPlan: newMealPlan,
    });
  } catch (error) {
    console.error("Error generating meal plan:", error);
    res.status(500).json({
      success: false,
      message: "Error generating meal plan",
      error: error.message,
    });
  }
};

module.exports = {
  generateMealPlan,
};
