// recupération du token
const token = window.sessionStorage.getItem("token");

// // Appel de la promess récuperation des élements
// Si un token est présent, cela signifie que l'utilisateur est connecté

let worksData = [];

async function loadingFetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  worksData = await response.json();

  console.log(worksData, "workdata");
  return worksData; //retour des données recupérées
}

///////////////////////////////////////////////////// Fonction pour créer la galerie dans le HTML////////////////////////////////////////
function createItemsHtml(filterWorks) {
  // pour récupérer la  galerie et integrer Les differentes balises
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  filterWorks.forEach((Element) => {
    //récupération des  constantes du html
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

//////////////////////////////////////////////fonction pour charger et afficher les oeuvres//////////////////////////////////////////////
async function loadanddisplay() {
  await loadingFetchWorks();
  createItemsHtml(worksData);
}
loadanddisplay();

/////////////////////////////////////////fonction pour charger et afficher les catégories////////////////////////////////////////////////
let categoriesLoaded = false;
let categories = [];

console.log(categories, "categorie çà marche");

let btnModifier = document.getElementById("btnModifier");
async function loadandDisplayCategories() {
  if (!categoriesLoaded) {
    //appel de la promesse et récupération des catégory
    const response = await fetch("http://localhost:5678/api/categories");
    categories = await response.json();
    console.log(categories, "categories");

    // Récupération des constantes
    const portfolio = document.getElementById("portfolio");
    const gallery = document.querySelector(".gallery");
    const buttonFilter = document.createElement("div");

    // Creation des boutons et de la div
    buttonFilter.classList.add("buttonFilter");
    // Placement de  la div apres le portfolio
    portfolio.insertBefore(buttonFilter, gallery);

    /////////////////////////////////// paramétrage qd NON connecté avec le token///////////////////////////////////////////////////////////

    /////Condition//////////////////////////////////////////////////
    if (!token) {
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
    // mettre à true pour indiquer que les catégories ont été chargées
    categoriesLoaded = true;
    displayCategoriesModal2();
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
loadandDisplayCategories();

// Sélection des éléments
const buttonLogin = document.getElementById("button_login");
const buttonFilter = document.querySelector(".buttonFilter");

console.log("buttonFilter trouvé", buttonFilter);

/////////////////////////////////////// Paramétrage qd connecté (token présent) ///////////////////////////////////////////////
// Condition
if (token) {
  // Création btn modifier
  btnModifier = document.createElement("span");
  btnModifier.innerHTML = "modifier";
  btnModifier.className = "btn_modifier";
  btnModifier.id = "btnModifier";

  var projectTitle = document.getElementById("projectTitle");

  projectTitle.insertAdjacentElement("afterend", btnModifier);
  if (buttonLogin) {
    buttonLogin.textContent = "Logout";
    buttonLogin.addEventListener("click", function () {
      window.sessionStorage.removeItem("token");
      window.location.href = "index.html";
    });

    // création del'icone
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");

    btnModifier.insertBefore(icon, btnModifier.firstChild);
  }

  ///////////////////////////////////////////////////////////////Modale/////////////////////////////////////////////////////////
  // Sélection des elements

  const btnCloseModale = document.getElementById("closeModale");
  const btnCloseModale2 = document.getElementById("closeModale2");
  const btnReturn = document.getElementById("returnBack");

  // Ajout d'un gestionnaire d'événements au clic sur le bouton "Modifier"
  btnModifier.addEventListener("click", function () {
    afficherModale(); // Appel de la fonction pour afficher la modal
  });

  // Ajout d'un gestionnaire d'événements pour fermer la modale1 et 2
  btnCloseModale.addEventListener("click", function () {
    closeModale();
  });
  btnCloseModale2.addEventListener("click", function () {
    closeModale2();
    document.getElementById("imageUrl").value = "";
    const selectedImageDiv = document.querySelector(".selected-image");
    if (selectedImageDiv) {
      selectedImageDiv.remove();
    }
    // Afficher le label pour ajouter une photo
    addPhotoLabel.style.display = "block";
  });
  btnReturn.addEventListener("click", function () {
    // masquer modale 2
    document.getElementById("modale2").style.display = "none";
    // afficher modele 1
    document.getElementById("modale").style.display = "block";
    document.getElementById("imageUrl").value = "";
    const selectedImageDiv = document.querySelector(".selected-image");
    if (selectedImageDiv) {
      selectedImageDiv.remove();
    }
    // Afficher le label pour ajouter une photo
    addPhotoLabel.style.display = "block";
  });

  // Fonction pour afficher la modal
  function afficherModale() {
    document.getElementById("modale").style.display = "block";
    document
      .getElementById("closeModale")
      .classList.add("closeModale--top-right");
    document
      .getElementById("closeModale2")
      .classList.add("closeModale--top-right");
  }

  // Fonction pour fermer la modal1 et 2
  function closeModale() {
    document.getElementById("modale").style.display = "none";
  }
  function closeModale2() {
    document.getElementById("modale2").style.display = "none";
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

      /////////////////////////////////////////////////////////////////////////////

      // Gestionnaire d'événements au clic sur le bouton "Corbeile" pour supprimer une œuvre
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

  /////Modale 2///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const addPhotoButton = document.querySelector("#modale input[type='submit']");
  const modale = document.getElementById("modale");
  const modale2 = document.getElementById("modale2");

  // Fonction pour gérer le clic sur le bouton "Ajouter une photo" de la première modale
  addPhotoButton.addEventListener("click", function () {
    // Si la première modale est ouverte
    if (modale.style.display !== "none") {
      // Cacher la première modale
      modale.style.display = "none";
      // Afficher la deuxième modale
      modale2.style.display = "block";
    }
  });

  // Sélection du bouton "validate" de la deuxième modale
  const validateButton2 = document.querySelector("#modale2 #validate");

  // Fonction pour gérer le clic sur le bouton "validate" de la deuxième modale
  validateButton2.addEventListener("click", async function (event) {
    event.preventDefault();
    // Récupérer les valeurs du titre et de la catégorie à l'intérieur de cette fonction
    const title = document.getElementById("selectorTitle").value;
    const category = document.getElementById("selectorCategory").value;

    // Valider le formulaire dans la deuxième modale
    console.log("Formulaire dans la modale 2 validé !");
    // Empêcher l'événement de propagation pour éviter que le clic ne se propage à la première modale
    event.stopPropagation();

    // Récupérer le fichier image sélectionné
    const imageFile = document.getElementById("imageUrl").files[0];

    // Vérifier si les champs sont vides
    if (!title || !category || !imageFile) {
      // Changer la couleur du bouton de validation
      validateButton2.style.backgroundColor = "#A7A7A7a7";
      console.error("Veuillez remplir tous les champs !");
      alert("veuillez remplir tous les champs !");
      return; // Arrêter l'exécution de la fonction si les champs sont vides
    }

    // Réinitialiser la couleur du bouton de validation
    validateButton2.style.backgroundColor = "";

    // Vérifier si une image a été sélectionnée
    if (imageFile) {
      // Créer un objet FormData pour envoyer et stocker les données du formulaire
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", imageFile);

      try {
        // Envoi de la requête POST à l'API

        const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData, // Utilisation de l'objet FormData comme corps de la requête
        });

        // Vérification de la réponse
        if (response.ok) {
          // Si la requête a réussi,  effectuer les actions supplémentaires nécessaires, par exemple recharger la galerie
          loadanddisplay();
          loadGalerieModal();
          console.log("Données envoyées avec succès !");
        } else {
          console.error(
            "Erreur lors de l'envoi des données :",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Erreur lors de la requête fetch :", error);
      }
    } else {
      console.error("Aucune image sélectionnée !");
    }
  });

  // Sélection de l'élément input de type fichier
  const inputImage = document.getElementById("imageUrl");

  // Sélection du conteneur de montagne
  const mountainContainer = document.querySelector(".mountaincontainer");

  const addPhotoLabel = document.querySelector(".AddPicturePhrase");

  // Ajout d'un gestionnaire d'événements pour détecter le changement de fichier
  inputImage.addEventListener("change", function (event) {
    // Récupérer le fichier sélectionné
    const selectedFile = event.target.files[0];

    // Vérifier si un fichier a été sélectionné
    if (selectedFile) {
      // Créer un nouvel élément div pour afficher l'image sélectionnée
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("selected-image");

      // Créer un élément img pour afficher l'image
      const imageElement = document.createElement("img");
      imageElement.classList.add("image-preview");

      // Créer un objet URL pour l'image sélectionnée
      const imageURL = URL.createObjectURL(selectedFile);

      // Définir l'attribut src de l'élément img
      imageElement.src = imageURL;

      // Ajouter l'élément img à l'élément div
      imageDiv.appendChild(imageElement);

      // Ajouter la div au conteneur de montagne
      mountainContainer.appendChild(imageDiv);

      // Masquer le label ajouter photo
      addPhotoLabel.style.display = "none";
    }
  });
}

// Récupération des catégories depuis l'API pour rajouter les selecteurs dans la modale2
function displayCategoriesModal2() {
  // Sélection de l'élément select pour les catégories
  const selectCategory = document.getElementById("selectorCategory");
  selectCategory.innerHTML = ""; // Vide le contenu du select pour éviter les doublons

  // Ajout d'une première option vide
  const emptyOption = document.createElement("option");
  emptyOption.value = ""; // Valeur vide
  emptyOption.textContent = ""; // Texte vide
  selectCategory.appendChild(emptyOption);

  // Parcours des catégories et ajout des options dans le select
  categories.forEach((category) => {
    // Création d'une nouvelle option
    const option = document.createElement("option");
    // Assignation de la valeur et du texte de l'option
    option.value = category.id; // Supposons que l'id de la catégorie soit utilisé comme valeur
    option.textContent = category.name; // Supposons que 'name' soit le nom de la catégorie
    // Ajout de l'option dans le select
    selectCategory.appendChild(option);
  });
}
