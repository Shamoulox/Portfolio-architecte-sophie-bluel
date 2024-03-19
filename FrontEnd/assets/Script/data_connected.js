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
