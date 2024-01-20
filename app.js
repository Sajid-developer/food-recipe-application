const searchBox = document.querySelector('header .searchBox');
searchBtn = document.querySelector('header .searchBtn'),
dishContainer = document.querySelector('.dish_container');

    dishContainer.innerHTML=`
    <div class="loading_Card">
    <img src="Images/loading_image.webp" alt="loading image">
    <h2>Loading dishes...</h2>
    </div>`;
    dishContainer.style.height="auto";
    dishContainer.style.background="white";

    const getDish = async (search)=>{
        try{
          let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
          let data = await response.json();
          console.log(data);
          // dishContainer.innerHTML="";
          let resultFound=data.meals.length;
          console.log(resultFound);
          dishContainer.innerHTML=`
          <div class="resultsFound">
            <h3>Results found : <span style="font-size:22px;margin-left:5px;">${resultFound}</span></h3>
          </div>`
        data.meals.forEach((dish) => {
          dishContainer.style.height="auto";
          dishContainer.style.background="rgb(37, 41, 105)";
          dishContainer.innerHTML+=`
          <div class="dishCard">
          <img src="${dish.strMealThumb}" alt="${dish.strMeal}">
          <h3>${dish.strMeal}</h3>
          <p>${dish.strArea} dish</p>
          <p>Belongs to <strong>${dish.strCategory}</strong> category</p>
          <a class="youtube" href="${dish.strYoutube}"><i class="fa-brands fa-youtube"></i> Watch on YouTube</a>
          </div>`;

          // if(!dish.strYoutube){
          //   alert("Video is unavailable !");
          //   getDish(search);
          // }
       }); 
    }
          catch(error){
            dishContainer.innerHTML=`
            <div class="loading_Card" style=" margin-top: 26px;">
            <img src="Images/error.webp" alt="loading image" style="width:90%;opacity: 0.8;">
            <h2 style="margin-top: 10px;">Dish not found, search another dish !</h2>
            </div>`;
            searchBox.focus();
            }
      }
      
    searchBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        const searchInput=searchBox.value.trim(); 
        if(searchInput){
          console.log(searchInput);
          dishContainer.innerHTML=`
          <div class="loading_Card">
            <img src="Images/loading_image.jpg" alt="loading image">
            <h2>Loading dishes...</h2>
          </div>`;
          dishContainer.style.height="auto";
          dishContainer.style.background="white";
          setTimeout(()=>{
            getDish(searchInput);
          },600);
            searchBox.value="";
        }else{
          // getRandDish("chicken");
          alert("Please enter a dish to find !");
          searchBox.focus();
        }
      }); 
      
  const getRandDish = async (d)=>{
     let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${d}`);
     let data= await response.json();
     console.log(data);
    //  const{strMealThumb,strMeal}=data.meals[0];
    //  dishContainer.innerHTML="";
     let resultFound=data.meals.length;
     dishContainer.innerHTML=`
        <div class="resultsFound">
          <h3>Results found : <span style="font-size:22px;margin-left:5px;">${resultFound}</span></h3>
       </div>`
     console.log(resultFound);
      dishContainer.style.height="auto";
      dishContainer.style.background="rgb(37, 41, 105)";

    //   const showRecipe=(dish)=>{
    //     recipeBtn.addEventListener("click", ()=>{

    //       const fetchIngredients=(dish)=>{
    //           let ingredientList="";
    //           // const ingredientList=document.querySelector('ingredientList');
    //           for(let i=0;i<=20;i++){
    //             const ingredient=dish[`strIngredient${i}`];
    //             if(ingredient){
    //               const measure=dish[`strMeasure${i}`];
    //               ingredientList+=`<li>${measure} ${ingredient}</li>`;
    //             }else{
    //               break;
    //             }
    //           }
    //           return ingredientList;
    //      }
    //       dishContainer.innerHTML+=`
    //       <div class="recipe_Card">
    //       <h2>${dish.strMeal}</h2>
    //       <h3 class="Ingredients">Ingredients :</h3>
    //       <ul>${fetchIngredients(dish)}</ul>
    //       <h3 class="instructions">Instructions :</h3>
    //       <p>${dish.strInstructions}</p>
    //       </div>`;
           
    //       document.querySelector('.recipe_Card').style.display="flex";

    //   });
    // }

      data.meals.forEach((dish) => {
      dishContainer.innerHTML+=`
      <div class="dishCard">
      <img src="${dish.strMealThumb}" alt="${dish.strMeal}">
      <h3>${dish.strMeal}</h3>
      <p>${dish.strArea} dish</p>
      <p>Belongs to <strong>${dish.strCategory}</strong> category</p>
      <a class="youtube" href="${dish.strYoutube}"><i class="fa-brands fa-youtube"></i> Watch on YouTube</a>
      </div>`;

      recipeBtn=document.querySelector('.dishCard .view_recipe');
      // console.log(recipeBtn.innerText);
      // showRecipe(dish);
    
      });
      
  }; 

  const Dishes=['cheese','cake','chicken','fish','soup'];
  let randDish=Math.floor(Math.random()*Dishes.length);
  console.log(randDish);
  let dishName=Dishes[randDish];
  console.log(dishName);

  setTimeout(()=>{
    getRandDish(dishName);  
  },1500);
