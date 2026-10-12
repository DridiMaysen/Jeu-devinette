let computerNumber;
let MaxTentative=5;
let tentative=MaxTentative;
const btnvalider = document.querySelector("#valider");
const btnressayer = document.querySelector("#ressayer");
const btnrejouer = document.querySelector("#rejouer");
const historiqueListe = document.querySelector("#historiqueListe");
const btnchangerJoueur =
    document.querySelector("#changerJoueur");
let joueurs = JSON.parse(
    localStorage.getItem("joueurs")
) || {};

let joueurActuel = localStorage.getItem("joueurActuel");
function sauvegarderJoueurs() {
    localStorage.setItem(
        "joueurs",
        JSON.stringify(joueurs)
    );
}
function afficherJoueur() {
    document.getElementById("prenom").textContent =
        "Bonjour " + joueurActuel + " !";
}


function afficherStatistiques() {
    let liste = document.getElementById("statistiquesJoueurs");

    liste.innerHTML = "";
    liste.className = "ranking-list";

    for (let nom in joueurs) {
        let ligne = document.createElement("li");

        ligne.textContent =
            nom + " : " + joueurs[nom].victoires + " victoire(s)";

        liste.appendChild(ligne);
    }
}

function initialiserJoueur() {
    if (!joueurActuel) {
        joueurActuel = prompt("Saisir votre nom :");

        if (joueurActuel === null || joueurActuel.trim() === "") {
            joueurActuel = "Joueur";
        }
    }

    joueurActuel = joueurActuel.trim();

    if (!joueurs[joueurActuel]) {
        joueurs[joueurActuel] = { victoires: 0 };
    }

    localStorage.setItem("joueurActuel", joueurActuel);

    sauvegarderJoueurs();
    afficherJoueur();
    afficherStatistiques();
}
btnchangerJoueur.addEventListener("click", function () {
    let nom = prompt("Saisir le nom du nouveau joueur :");

    if (nom === null || nom.trim() === "") {
        return;
    }

    joueurActuel = nom.trim();

    if (!joueurs[joueurActuel]) {
        joueurs[joueurActuel] = { victoires: 0 };
    }

    localStorage.setItem("joueurActuel", joueurActuel);

    sauvegarderJoueurs();
    afficherJoueur();
    afficherStatistiques();

    choixNumber();
    document.getElementById("proposition").disabled = false;
    btnvalider.disabled = false;
    btnressayer.disabled = false;
    document.getElementById("proposition").value = "";
    document.getElementById("msg").value = "";
    document.getElementById("tentative").value = MaxTentative;
    historiqueListe.innerHTML = "";
});
function choixNumber(){
    computerNumber=Math.round(Math.random()*100);
    console.log(computerNumber);
    tentative=MaxTentative;
    
}
function verifierCorrespondance(){
    let result=document.getElementById("msg");
    let userNumber=parseInt(document.getElementById("proposition").value);
    let tent=document.getElementById("tentative");
    if(userNumber>computerNumber){ 
            result.textContent = "Le nombre choisi est trop grand !";
            result.className = "message error";
            tentative --;
            
    }
        else if(userNumber<computerNumber) { 
            result.textContent = "Le nombre choisi est trop petit !";
            result.className = "message error";
            tentative --;
        }
       else {
        result.textContent = "Bravo, tu as trouvé le nombre !";
        result.className = "message success";

    joueurs[joueurActuel].victoires++;

    sauvegarderJoueurs();
    afficherStatistiques();

    document.getElementById("proposition").disabled = true;
    btnvalider.disabled = true;
    btnressayer.disabled = true;
}
        tent.value=tentative;
        let ligne = document.createElement("li");

        ligne.textContent = userNumber + " : " + result.textContent;
        if (historiqueListe.querySelector(".empty-state")) {
             historiqueListe.innerHTML = "";
        }

        historiqueListe.appendChild(ligne);
         if (parseInt(tent.value)===0){
                document.getElementById("proposition").disabled=true;
                result.value="vous avez atteint le maximum des tentatives !";
                btnvalider.disabled=true;
                btnressayer.disabled=true;
                return;
    }
    }

btnvalider.addEventListener("click",function(){
    verifierCorrespondance();
})
btnressayer.addEventListener("click",function(){
    document.getElementById("proposition").value="0";
    document.getElementById("msg").value="";
})
const input = document.getElementById("proposition");

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        verifierCorrespondance();
    }

});
btnrejouer.addEventListener("click",function(){
    document.getElementById("proposition").value="0";
    document.getElementById("msg").value="";
    choixNumber();
    document.getElementById("proposition").disabled=false;
    btnvalider.disabled=false;
    btnressayer.disabled=false;
    historiqueListe.innerHTML = "";
});

initialiserJoueur();