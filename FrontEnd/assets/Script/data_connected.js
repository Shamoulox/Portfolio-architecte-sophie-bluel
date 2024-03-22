// recupération du token
const token = window.sessionStorage.getItem("token")

// selection des élements
const buttonLogin = document.getElementById ("button_login");
const buttonFilter = document.querySelector (".buttonFilter");

console.log("buttonFilter trouvé", buttonFilter)


// si un token est présent, cela signifie que l'utilisateur est connecté
if (token) {
    // modifier le texte du bouton 
    buttonLogin.textContent = "logout";
    //supprimer la div ButtonFilter
if (buttonFilter) {
    buttonFilter.remove()
    }

}

/////////////////////////////////////////////////////////////////

// // Modale gpt: 

// Sélection du bouton "Modifier"
const btnModifier = document.getElementById("btnModifier");

// Ajout d'un gestionnaire d'événements au clic sur le bouton "Modifier"
btnModifier.addEventListener("click", function() {
    afficherModale(); // Appel de la fonction pour afficher la modal
});

// Fonction pour afficher la modal
function afficherModale() {
    document.getElementById('modale').style.display = "block";
  }
  
//   fonction pour fermer la modale 

  
 
// // Appel de la promess récuperation des élements
let worksData2 = [];

async function loadingFetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  worksData2 = await response.json();
  console.log(worksData2);
  return worksData2; //retour des données recupérées
}
//   rajout des photos dans la modale 


  function chargerGalerieModal(filterWorks) {
    const galerieModal = document.getElementById("modale-gallery");
    galerieModal.innerHTML = ''; // Vide la galerie pour charger de nouvelles photos

   filterWorks.forEach((Element) => {
    //creation des  constantes du html
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    // ajout de la galerie
    galerieModal.appendChild(figure);

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
       

        // // Ajouter la classe pour permettre la suppression si nécessaire
        // img.classList.add('aSupprimer');

        // // Ajouter l'événement de clic pour la suppression si nécessaire
        // img.addEventListener('click', function() {
        //     this.parentNode.removeChild(this); // Supprimer l'image lorsque cliquée
        // });

        
    

      }

      async function loadGalerieModal () {
        await loadingFetchWorks();
        chargerGalerieModal(worksData2)
  

}
loadGalerieModal();
