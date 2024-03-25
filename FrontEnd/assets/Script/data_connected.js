

// selection des élements
const buttonLogin = document.getElementById("button_login");
const buttonFilter = document.querySelector(".buttonFilter");

console.log("buttonFilter trouvé", buttonFilter);

// si un token est présent, cela signifie que l'utilisateur est connecté
if (token) {
  // modifier le texte du bouton
  buttonLogin.textContent = "logout";
}

/////////////////////////////////////////////////////////////////

// Sélection du bouton "Modifier"
const btnModifier = document.getElementById("btnModifier");

// Ajout d'un gestionnaire d'événements au clic sur le bouton "Modifier"
btnModifier.addEventListener("click", function () {
  afficherModale(); // Appel de la fonction pour afficher la modal
});

const btnCloseModale = document.getElementById("closeModale");

//  ajout listener
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


//   rajout des photos dans la modale

function chargerGalerieModal(filterWorks) {
  const galerieModal = document.getElementById("modale-gallery");
  galerieModal.innerHTML = ""; // Vide la galerie pour charger de nouvelles photos

  filterWorks.forEach((Element) => {
    //creation des  constantes du html
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // ajout de la galerie
    galerieModal.appendChild(figure);

    //ajout des élements
    figure.appendChild(img);
    // figure.appendChild(figcaption);

    // création de la corbeille
    const blackWindow = document.createElement("div");
    blackWindow.classList.add("blackWindow");

    // ajout du fontawesome corbeille
    const trashicon = document.createElement("i");
    trashicon.classList.add("fa-solid", "fa-trash-can");

    // déplacement de l icone dans le carré noir
    blackWindow.appendChild(trashicon);
    figure.appendChild(blackWindow);

    // //configuration des attributs
    figure.dataset.categoryId = Element.categoryId;
    figure.dataset.projet = Element.id;
    img.src = Element.imageUrl;
    img.alt = Element.title;
    figcaption.innerText = Element.title;

    ////////////////////////////////////////////////////////////////////////////////

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
      if ( response.ok){
        loadanddisplay();
        loadGalerieModal();
      }
    });
  });
}
// faire que les id correspondent aux images ??????

async function loadGalerieModal() {
  await loadingFetchWorks();
  chargerGalerieModal(worksData);
}
loadGalerieModal();
