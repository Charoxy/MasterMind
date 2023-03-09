const code = getcode();
var maxTentative = 14;
var tentative = 0;
var colorSelection = 1;
var score = [];
var gagnez = false;


function setScoreBoard(){

    fetch("score.txt")
        .then((response) => response.text())
        .then((data) =>{
            var scorelist = data.split(";")
            for(var i = 0; i != scorelist.length;i++){
                document.getElementById("score").innerHTML += "<p>"+scorelist[i]+"</p>"
            }
        });
}

function SaveScoreInFile(){
    if(gagnez == true){
        var pseudo = document.getElementById("pseudo").value;
        if(pseudo === ""){

        }else{
            document.location.href="modifieScore.php?score="+tentative+"&pseudo="+pseudo;
        }
    }
}

function setMaxTentative(max){
    maxTentative = max;
    document.getElementById("enable").style.display = "flex"
    document.getElementById("start").style.display = "none"
}

function getcode(){

    var codeList = [];

    for (let i = 0; i != 4;i++){
        codeList.push(Math.floor(Math.random() * 4)+1);
    }

    console.log(codeList);
    return codeList
}


function essayer(){

    if(gagnez == true || tentative == maxTentative){
        alert("tu a déjà fini")
        return;
    }

    addTentative()

    var selec = getselec()
    numberValid = 0;

    for(i = 0; i != code.length; i++){

        if(code[i] == getselec()[i]){

            numberValid++;
            document.getElementById("select-"+(i+1)).style.backgroundColor = "grey";

        }else{
            document.getElementById("select-"+(i+1)).style.backgroundColor = "grey";
        }
    }

    document.getElementById("historique").innerHTML += "<p class='textHist'>Nombre de couleur bien placé : "+numberValid+"</p>"
    var html = "";
    html += "<p class='textHist'>"

    for(let i = 0 ; i != 4 ; i++){

        if(selec[i] == 1){
            html += "<font style='color: #ff001c'> ●</font> "
        }
        if(selec[i] == 2){
            html += "<font style='color: #55ff00'> ●</font> "
        }
        if(selec[i] == 3){
            html += "<font style='color: #ff8800'> ●</font> "
        }
        if(selec[i] == 4){
            html += "<font style='color: #988eff'> ●</font> "
        }
    }
    document.getElementById("historique").innerHTML += html


    if(numberValid == 4){
        alert("GG tu a fini !")
        gagnez = true;
        return
    }
    if(tentative == maxTentative){
        alert("tu a perdu !")
    }
}

function getselec(){

    var select1 = document.getElementById("select-1")
    var select2 = document.getElementById("select-2")
    var select3 = document.getElementById("select-3")
    var select4 = document.getElementById("select-4")

    return [getColorByRBG(select1.style.backgroundColor),getColorByRBG(select2.style.backgroundColor),getColorByRBG(select3.style.backgroundColor),getColorByRBG(select4.style.backgroundColor)]
}

function setColorSelection(color){

    colorSelection = color;
    var selectionRouge = document.getElementById("selection-rouge")
    var selectionVert = document.getElementById("selection-vert")
    var selectionOrange = document.getElementById("selection-orange")
    var selectionBleu = document.getElementById("selection-bleu")

    if(color == 1){
        selectionRouge.style.border = "solid white 3px"
        selectionBleu.style.border = "none"
        selectionOrange.style.border = "none"
        selectionVert.style.border = "none"
    }
    if(color == 2){
        selectionVert.style.border = "solid white 3px"
        selectionBleu.style.border = "none"
        selectionOrange.style.border = "none"
        selectionRouge.style.border = "none"
    }
    if(color == 3){
        selectionOrange.style.border = "solid white 3px"
        selectionBleu.style.border = "none"
        selectionVert.style.border = "none"
        selectionRouge.style.border = "none"
    }
    if(color == 4){
        selectionBleu.style.border = "solid white 3px"
        selectionOrange.style.border = "none"
        selectionVert.style.border = "none"
        selectionRouge.style.border = "none"
    }
}

function getColorByRBG(rgb){

    if(rgb === "rgb(255, 0, 28)"){
        return 1;
    }
    if(rgb === "rgb(85, 255, 0)"){
        return 2;
    }
    if(rgb === "rgb(255, 136, 0)"){
        return 3;
    }
    if(rgb === "rgb(152, 142, 255)"){
        return 4;
    }
}

function setColorToCase(id){

    if(gagnez == true || tentative == maxTentative){
        alert("tu a déjà fini")
        return;
    }

    var element = document.getElementById(id);

    if(colorSelection == 1){
        element.style.backgroundColor = "#ff001c"
    }
    if(colorSelection == 2){
        element.style.backgroundColor = "#55ff00"
    }
    if(colorSelection == 3){
        element.style.backgroundColor = "#ff8800"
    }
    if(colorSelection == 4){
        element.style.backgroundColor = "#988eff"
    }



    console.log(getColorByRBG(element.style.backgroundColor))
}

function addTentative(){
    var element = document.getElementById("nb")

    tentative++;
    element.innerHTML = "Nombre de tentative : " + tentative
}