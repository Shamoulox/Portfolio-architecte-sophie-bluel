// // Appel de la promess récuperation des élements
let works = [];
async function loadingWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
  // console.log(works);
  return works; //retour des données recupérées
}

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
async function loadanddisplay() {
  await loadingWorks();
  createItemsHtml(works);
}
loadanddisplay();
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




// Suppression filter bouton et ajout du  button all
const buttonAll = document.createElement("button");
buttonAll.innerText = "Tous";
buttonAll.classList.add("btn-category", "btn-all");
buttonFilter.appendChild(buttonAll);

// Ajout event listener bouton tous
buttonAll.addEventListener("click", function () {
  createItemsHtml(works);
});


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

  //ajouter la catégories en fonction du clic  (event listener)
  categoryButtonFilter.addEventListener("click", function () {
    console.log(categoryElement);
    const filterWorks = works.filter(
      (work) => categoryElement.id === work.categoryId
    );
    console.log(filterWorks);
    createItemsHtml(filterWorks);
  });

  //changer la galerie selon les filters

  //changer la couleur des boutons et taille des boutons
});

// .then(response => console.log(respponse))
//   .then(response => {

//     // gerer la réponse de la requete
//     if (!response.ok) {
//       throw new Error("erreur reseau");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     //faire qqchose avec les données
//     console.log(data);
//   })

//   .catch((error) => {
//     //gerer les erreurs eventuelles
//     console.error("Pb requete fectch", error);
//   });

// loadWork ( )
