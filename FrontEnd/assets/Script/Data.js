
// variable global
// recupération du token
const token = window.sessionStorage.getItem("token");
// // Appel de la promess récuperation des élements
let worksData = [];


async function loadingFetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  worksData = await response.json();
  // console.log(works);
  return worksData; //retour des données recupérées
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fonction pour créer la galerie dans le HTML
function createItemsHtml(filterWorks) {
  // pour récupérer la  galerie et integrer Les differentes balises
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  filterWorks.forEach((Element) => {
    //creation des  constantes du html
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // ajout de la galerie
    gallery.appendChild(figure);

    //ajout des élements
    figure.appendChild(img);
    figure.appendChild(figcaption);

    // //configuration des attributs
    figure.dataset.categoryId = Element.categoryId;
    figure.dataset.projet = Element.id;
    img.src = Element.imageUrl;
    img.alt = Element.title;
    figcaption.innerText = Element.title;
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadanddisplay() {
  await loadingFetchWorks();
  createItemsHtml(worksData);
}
loadanddisplay();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function  loadandDisplayCategories(){

  //appel de la promesse et récupération des catégory
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  console.log(categories);
  
  
  
  // Récupération des constantes
  const portfolio = document.getElementById("portfolio");
  const gallery = document.querySelector(".gallery");
  
  // Creation des boutons et de la div
  const buttonFilter = document.createElement("div");
  buttonFilter.classList.add("buttonFilter");
  // Placement de  la div apres le portfolio
  portfolio.insertBefore(buttonFilter, gallery);
  
  
  if (!token ) {
    // Suppression filter bouton et ajout du  button all
    const buttonAll = document.createElement("button");
    buttonAll.innerText = "Tous";
    buttonAll.classList.add("btn-category");
    buttonFilter.appendChild(buttonAll);
    
    // Ajout event listener bouton tous
    buttonAll.addEventListener("click", function () {
      createItemsHtml(worksData);
    });
    // ajout styles css
    const categoriesButtons = buttonFilter.querySelectorAll(".btn-category");
    
    buttonFilter.style.display = "flex";
    buttonFilter.style.gap = "10px";
    
    //ajouter les differentes catégories de boutons
    categories.forEach((categoryElement, i) => {
      //création d'un bouton par catégorie
      const categoryButtonFilter = document.createElement("button");
      categoryButtonFilter.innerText = categoryElement.name;
      categoryButtonFilter.value = categoryElement.id;
      categoryButtonFilter.classList.add("btn-category");
      
      // ajout de la classe selected
      if (i === 0) {
        categoryButtonFilter.classList.add("btn_selected");
      }
      // ajout des boutons dans la div
      buttonFilter.appendChild(categoryButtonFilter);
      
      ////////////ajouter la catégories en fonction du clic  (event listener)/////////////////////////////////////////////////
      categoryButtonFilter.addEventListener("click", function () {
        console.log(categoryElement);
        const filterWorks = worksData.filter(
          (work) => categoryElement.id === work.categoryId
          );
          console.log(filterWorks);
          createItemsHtml(filterWorks);
        });
      });
  }
}
loadandDisplayCategories()

  
  
  