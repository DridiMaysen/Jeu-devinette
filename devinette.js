let computerNumber;
let MaxTentative=5;
let tentative=MaxTentative;
const btnvalider = document.querySelector("#valider");
const btnressayer = document.querySelector("#ressayer");
const btnrejouer = document.querySelector("#rejouer");
const historiqueListe = document.querySelector("#historiqueListe");
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
            result.value="le nombre choisi est plus grand!";
            tentative --;
            
    }
        else if(userNumber<computerNumber) { 
            result.value="le nombre choisi est plus petit!";
            tentative --;
        }
       else{result.value="Bravo c'est le bon nombre!";
        document.getElementById("proposition").disabled=true;
        btnvalider.disabled=true;
        btnressayer.disabled=true;
        tentative --;
        }
        tent.value=tentative;
        let ligne = document.createElement("li");

        ligne.textContent = userNumber + " : " + result.value;

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
})