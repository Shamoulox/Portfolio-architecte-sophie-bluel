


// // Appel de la promess récuperation des élements
async function loadingWorks (){
    const response = await fetch ("http://localhost:5678/api/works")
    const works = await response.json() 
    console.log (works);
    return works; //retour des données recupérées
} 
loadingWorks()

// Fonction pour créer la galerie dans le HTML
async function createItemsHtml (){
    const works = await loadingWorks ();


// pour creer la  galerie  et integrer Les differentes balises
const gallery = document.querySelector(".gallery");

 works.forEach (Element  => {
    //creation des  constantes du html
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")

    // //configuration des attributs
    figure.dataset.categoryId= Element.categoryId;
    figure.dataset.projet = Element.id;
    img.src = Element.imageUrl;
    img.alt= Element.title ;
    figcaption.innerText= Element.title;
    
    //ajout des élements
    figure.appendChild(img);
    figure.appendChild(figcaption)

    // ajout de la galerie

    gallery.appendChild(figure);
 })


}


createItemsHtml();










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

