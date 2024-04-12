// selection du formulaire
const form = document.querySelector(".form_connection");

//   ajout d'ecouteur qui réagit à l 'envoi
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  // empeche le formulaire de se soumettre normalement pour controler les données

  // Récupèration  des données utilisateurs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // // Vérification des caractères saisi
  // function verify (user)

  // if (userData.value === "")

  // Creation de l'objet userdata
  const userData = {
    email: email,
    password: password,
  };

  console.log("données de connexion", userData);

  // Conversion des données en json
  const request = JSON.stringify(userData);

  // appel de fetch pour avoir les id
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: request,
    headers: { "Content-type": "application/json" },
  });

  if (response.ok) {
    const datalogin = await response.json();
    console.log(datalogin);

    // si token ok connecté
    sessionStorage.setItem("token", datalogin.token);
    window.location.href = "index.html";
  } else {
    alert("saisi incorrect");
  }
});

// si il y  le token :

// true or false

// sinon vider sessionstorage

// faire la modale  de suppression

// commencer par suppression

//

// attention si syntaxe email ok mot de passe et validité identifiant.

// suppression des alerts qd submit

// fonction api
