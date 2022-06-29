const meals = document.querySelector(".meals");
const favorite = document.querySelector(".favorite__content");
const search = document.querySelector(".recipe__searchTerm");
const searchBtn = document.querySelector(".recipe__search");
const closeBtn = document.querySelector(".close");
const popup = document.querySelector(".meal-info");

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

  meal.addEventListener("click", () => {
    popup.querySelector(".popup__header h2").innerHTML = randomMeal.strMeal;
    popup
      .querySelector(".popup__img img")
      .setAttribute("src", randomMeal.strMealThumb);
    popup.querySelector(".popup__description").innerHTML =
      randomMeal.strInstructions;
    popup.classList.remove("hidden");
  });

  const btn = meal.querySelector(".meal__body .meal__btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
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
  const mealsId = JSON.parse(getMealsFromLs());
  localStorage.setItem("mealsId", JSON.stringify([...mealsId, mealId]));
  renderFavorite();
}

function removeMealFromLs(mealId) {
  const mealsId = JSON.parse(getMealsFromLs());
  localStorage.setItem(
    "mealsId",
    JSON.stringify(mealsId.filter((id) => id !== mealId))
  );
  renderFavorite();
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
  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
}

async function getMealsBySearch(term) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const respData = await resp.json();
  const meals = respData.meals;
  return meals;
}

async function fetchFavoriteById() {
  favorite.innerHTML = "";

  const res = [];
  const mealsId = JSON.parse(getMealsFromLs());
  for (mealId of mealsId) {
    let meal = await getMealById(mealId);
    res.push(meal);
  }
  return res;
}

async function renderFavorite() {
  const favorites = await fetchFavoriteById();

  favorites.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("favorite__item");
    li.innerHTML = `
      <img
        class="favorite__img"
        src="${item.strMealThumb}"
        alt=""
      />
      <span class="favorite__name">${item.strMeal}</span>
    `;

    li.addEventListener("click", () => {
      removeMealFromLs(item.idMeal);
    });
    favorite.appendChild(li);
  });
}

renderFavorite();

searchBtn.addEventListener("click", async () => {
  const val = search.value;
  meals.innerHTML = "";
  if (val) {
    meals.innerHTML = "";
    const searchRes = await getMealsBySearch(val);
    searchRes.forEach((item) => {
      addMeal(item, false);
    });
  } else {
    await getRandomMeal();
  }
});

closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});
