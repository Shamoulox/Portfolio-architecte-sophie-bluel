// variable global
// recupération du token
const token = window.sessionStorage.getItem("token");

// // Appel de la promess récuperation des élements
// Si un token est présent, cela signifie que l'utilisateur est connecté

let worksData = [];

async function loadingFetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  worksData = await response.json();
  // console.log(works);
  return worksData; //retour des données recupérées
}

///////////////////////////////////////////////////// Fonction pour créer la galerie dans le HTML////////////////////////////////////////
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

//////////////////////////////////////////////fonction pour charger et afficher les oeuvres///////////////////
async function loadanddisplay() {
  await loadingFetchWorks();
  createItemsHtml(worksData);
}
loadanddisplay();

/////////////////////////////////////////fonction pour charger et afficher les catégories/////////////////////

async function loadandDisplayCategories() {
  //appel de la promesse et récupération des catégory
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  console.log(categories);

  // Récupération des constantes
  const portfolio = document.getElementById("portfolio");
  const gallery = document.querySelector(".gallery");
  const buttonFilter = document.createElement("div");

  // Creation des boutons et de la div
  buttonFilter.classList.add("buttonFilter");
  // Placement de  la div apres le portfolio
  portfolio.insertBefore(buttonFilter, gallery);

  /////////////////////////////////// paramétrage qd NON connecté avec le token////////////////////////////////

  const btnModifier = document.getElementById("btnModifier");
  const btnCloseModale = document.getElementById("closeModale");
  /////Condition//////////////////////////////////////////////////
  if (!token) {
    if (btnModifier) {
      btnModifier.style.display = "none";
    }
    // Ajout d'un gestionnaire d'événements au clic sur le bouton "Modifier"
    btnModifier.addEventListener("click", function () {
      afficherModale(); // Appel de la fonction pour afficher la modal
    });

    //  ajout gestionnaire d'évènements au clic sur le bouton "fermer"
    btnCloseModale.addEventListener("click", function () {
      closeModale();
    });

    // appel Fonction pour afficher la modal
    function afficherModale() {
      document.getElementById("modale").style.display = "block";
    }

    //  appel fonction pour fermer la modale
    function closeModale() {
      document.getElementById("modale").style.display = "none";
    }
    ///////////////parametrage bouton filtre qd NON connecté///////////////////////////////

    // Suppression filter bouton et ajout du  button all
    const buttonAll = document.createElement("button");
    buttonAll.innerText = "Tous";
    buttonAll.classList.add("btn-category");
    buttonFilter.appendChild(buttonAll);

    // Ajout gestionnaire d'évènements au clic sur le  bouton "tous"
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

      ////ajouter la catégories en fonction du clic  (event listener)/
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
loadandDisplayCategories();

// Sélection des éléments
const buttonLogin = document.getElementById("button_login");
const buttonFilter = document.querySelector(".buttonFilter");

console.log("buttonFilter trouvé", buttonFilter);

/////////////////////////////////////// Paramétrage qd connecté Si un token est présent ///////////////////////////////////////////////
// Condition
if (token) {
  // Modifier le texte du bouton
  if (buttonLogin) {
    buttonLogin.textContent = "Logout";

    buttonLogin.addEventListener("click", function () {
      window.sessionStorage.removeItem("token");

      window.location.href = "index.html";
    });
  }
}

// Ajout d'un gestionnaire d'événements au clic sur le bouton "Modifier"
btnModifier.addEventListener("click", function () {
  afficherModale(); // Appel de la fonction pour afficher la modal
});

const btnCloseModale = document.getElementById("closeModale");

// Ajout d'un gestionnaire d'événements pour fermer la modale
btnCloseModale.addEventListener("click", function () {
  closeModale();
});

// Fonction pour afficher la modal
function afficherModale() {
  document.getElementById("modale").style.display = "block";
}

// Fonction pour fermer la modal
function closeModale() {
  document.getElementById("modale").style.display = "none";
}

// Rajout des photos dans la modale
function chargerGalerieModal(filterWorks) {
  const galerieModal = document.getElementById("modale-gallery");
  galerieModal.innerHTML = ""; // Vide la galerie pour charger de nouvelles photos

  filterWorks.forEach((Element) => {
    // Création des constantes du HTML
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // Ajout de la galerie
    galerieModal.appendChild(figure);

    // Ajout des éléments
    figure.appendChild(img);

    // Création de la corbeille
    const blackWindow = document.createElement("div");
    blackWindow.classList.add("blackWindow");

    // Ajout de l'icône corbeille
    const trashicon = document.createElement("i");
    trashicon.classList.add("fa-solid", "fa-trash-can");

    // Déplacement de l'icône dans le carré noir
    blackWindow.appendChild(trashicon);
    figure.appendChild(blackWindow);

    // Configuration des attributs
    figure.dataset.categoryId = Element.categoryId;
    figure.dataset.projet = Element.id;
    img.src = Element.imageUrl;
    img.alt = Element.title;
    figcaption.innerText = Element.title;

    // Gestionnaire d'événements pour supprimer une œuvre
    trashicon.addEventListener("click", async function () {
      console.log("çà marche");
      console.log(Element.id);

      const response = await fetch(
        "http://localhost:5678/api/works/" + Element.id,
        {
          method: "delete",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        loadanddisplay();
        loadGalerieModal();
      }
    });
  });
}

// Charger la galerie modale
async function loadGalerieModal() {
  await loadingFetchWorks();
  chargerGalerieModal(worksData);
}
loadGalerieModal();
