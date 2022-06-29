const meals = document.querySelector(".meals");
const favorite = document.querySelector(".favorite__content");

function addMeal(randomMeal, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
    <header class="meal__header">
      ${random ? `<span class="random">Random Recipe</span>` : ``}
      <img
        src="${randomMeal.strMealThumb}"
        alt="${randomMeal.strMeal}"
      />
    </header>
    <section class="meal__body">
      <h4>${randomMeal.strMeal}</h4>
      <button class="meal__btn">
        <i class="fa fa-heart"></i>
      </button>
    </section>
  `;

  const btn = meal.querySelector(".meal__body .meal__btn");
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("active")) {
      removeMealFromLs(randomMeal.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToLs(randomMeal.idMeal);
      btn.classList.add("active");
    }
  });

  meals.appendChild(meal);
}

function getMealsFromLs() {
  const mealsId = localStorage.getItem("mealsId");
  return mealsId === null ? [] : mealsId;
}

function addMealToLs(mealId) {
  const mealsId = getMealsFromLs();
  localStorage.setItem("mealsId", JSON.stringify([...mealsId, mealId]));
}

function removeMealFromLs(mealId) {
  const mealsId = JSON.parse(getMealsFromLs());
  localStorage.setItem(
    "mealsId",
    JSON.stringify(mealsId.filter((id) => id !== mealId))
  );
}

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const random = await resp.json();
  const randomMeal = random.meals[0];
  console.log(randomMeal);

  addMeal(randomMeal, true);
}

getRandomMeal();

async function getMealById(id) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const meal = await resp.json();

  console.log(meal);
}

async function getMealsBySearch(term) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
}
