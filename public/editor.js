document.getElementById("fileLoader").onchange = function(){
    var file = document.getElementById("fileLoader").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(e){
        var text = e.target.result;
        document.getElementById("myCode").value = text;
    };
    fileReader.readAsText(file, "UTF-8");
};

//Serve para salvar arquivo o no computador
function saveFile(){
    var saveText = document.getElementById("myCode").value;
    var textBLOB = new Blob([saveText], {type:"text/"});
    var fileName = prompt("Nome:");
    var link = document.createElement("a");
    link.download = fileName+".py";
    link.innerHTML = "Download File";
    if(window.URL != null)
    {
        link.href = window.URL.createObjectURL(textBLOB);
    }
    else{
        link.href = window.URL.createObjectURL(textBLOB);
        link.onclick = destroy;
        link.style.display = "none";
        document.body.appendChild(link);
    }
    link.click();

}

function destroy(e){
    document.body.removeChild(e.target);
}
