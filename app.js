const searchBox = document.querySelector('header .searchBox');
searchBtn = document.querySelector('header .searchBtn'),
  dishContainer = document.querySelector('.dish_container');

dishContainer.innerHTML = `
    <div class="loading_Card">
    <img src="Images/loading_image.webp" alt="loading image">
    <h2>Loading dishes...</h2>
    </div>`;
dishContainer.style.height = "auto";
dishContainer.style.background = "white";

const getDish = async (search) => {
  try {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    let data = await response.json();
    console.log(data);
    let resultFound = data.meals.length;
    console.log(resultFound);
    dishContainer.innerHTML = `
          <div class="resultsFound">
            <h3>Results found : <span style="font-size:22px;margin-left:5px;">${resultFound}</span></h3>
          </div>`
    data.meals.forEach((dish) => {
      dishContainer.style.height = "auto";
      dishContainer.style.background = "rgb(37, 41, 105)";
      dishContainer.innerHTML += `
          <div class="dishCard">
          <img src="${dish.strMealThumb}" alt="${dish.strMeal}">
          <h3>${dish.strMeal}</h3>
          <p>${dish.strArea} dish</p>
          <p>Belongs to <strong>${dish.strCategory}</strong> category</p>
          <a class="youtube" href="${dish.strYoutube}"><i class="fa-brands fa-youtube"></i> Watch on YouTube</a>
          </div>`;
     });
  } catch (error) {
       dishContainer.innerHTML = `
            <div class="loading_Card" style=" margin-top: 26px;">
            <img src="Images/error.webp" alt="loading image" style="width:90%;opacity: 0.8;">
            <h2 style="margin-top: 10px;">Dish not found, search another dish !</h2>
            </div>`;
        searchBox.focus();
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (searchInput) {
    console.log(searchInput);
    dishContainer.innerHTML = `
          <div class="loading_Card">
            <img src="Images/loading_image.webp" alt="loading image">
            <h2>Loading dishes...</h2>
          </div>`;
    dishContainer.style.height = "auto";
    dishContainer.style.background = "white";
    setTimeout(() => {
      getDish(searchInput);
    }, 600);
    searchBox.value = "";
  } else {
    // getRandDish("chicken");
    alert("Please enter a dish to find !");
    searchBox.focus();
  }
});

const getRandDish = async (d) => {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${d}`);
  let data = await response.json();
  console.log(data);
  //  const{strMealThumb,strMeal}=data.meals[0];
  //  dishContainer.innerHTML="";
  let resultFound = data.meals.length;
  dishContainer.innerHTML = `
        <div class="resultsFound">
          <h3>Results found : <span style="font-size:22px;margin-left:5px;">${resultFound}</span></h3>
       </div>`
  console.log(resultFound);
  dishContainer.style.height = "auto";
  dishContainer.style.background = "rgb(37, 41, 105)";

  data.meals.forEach((dish) => {
    dishContainer.innerHTML += `
      <div class="dishCard">
      <img src="${dish.strMealThumb}" alt="${dish.strMeal}">
      <h3>${dish.strMeal}</h3>
      <p>${dish.strArea} dish</p>
      <p>Belongs to <strong>${dish.strCategory}</strong> category</p>
      <a class="youtube" href="${dish.strYoutube}"><i class="fa-brands fa-youtube"></i> Watch on YouTube</a>
      </div>`;

  });

};

const Dishes = ['cheese', 'cake', 'chicken', 'fish', 'soup'];
let randDish = Math.floor(Math.random() * Dishes.length);
console.log(randDish);
let dishName = Dishes[randDish];
console.log(dishName);

setTimeout(() => {
  getRandDish(dishName);
}, 1500);