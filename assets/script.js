
let form = document.querySelector("form");

let loginbox2 = document.getElementById("login-box2");
loginbox2.style.display = "none";

form.addEventListener('submit', (event) => {

    event.preventDefault();
    
    // Clé d’API
    let subscriptionKey = "86d68b451b884281a33a2763a6ade892";

    // Image à analyser
    //let sourceImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Richard_Stallman_-_F%C3%AAte_de_l%27Humanit%C3%A9_2014_-_010.jpg/400px-Richard_Stallman_-_F%C3%AAte_de_l%27Humanit%C3%A9_2014_-_010.jpg";
    let sourceImageUrl = document.getElementById('mytextarea').value;
    // Données à envoyer
    let data = '{"url": ' + '"' + sourceImageUrl + '"}';

    const req = new XMLHttpRequest();


    req.onreadystatechange = function(event) {
        // Si la requête réussi
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                //console.log("Réponse reçue: %s", this.responseText);
                var resultat = this.responseText; 
                var resultat_json = JSON.parse(this.responseText); 
                var res = resultat_json[0];
                var faceAttributes = res.faceAttributes; console.log(faceAttributes);
                var text_age = document.getElementById('age');
                text_age.innerText = "Elle est âgée de : " + faceAttributes.age + " ans";
                var text_sourire = document.getElementById('sourire');
                if(faceAttributes.smile > 0.4){
                    text_sourire.innerText = "Elle est SOURIANTE";
                }else{
                    text_sourire.innerText = "Elle ne sourit pas";
                }
                var text_genre = document.getElementById('genre');
                if(faceAttributes.gender == 'male'){
                    text_genre.innerText = "Cette personne est un HOMME";
                }else if(faceAttributes.gender == 'female'){
                    text_genre.innerText = "Cette personne est une FEMME";
                }else{
                    text_genre.innerText = "GENRE INCONNU";
                }
                
                loginbox2.style.display = "block";
                document.getElementById('myImg').src = sourceImageUrl;
            } else {
                console.log("Statut de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req.open('POST', 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise', true);

    // On définit les headers
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);

    req.send(data); 

    

    return false;
})
