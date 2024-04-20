let body=document.querySelector("body");

let btnQurious = document.createElement("button");
btnQurious.setAttribute("id", "btnQurious");
btnQurious.addEventListener("click", doSomething);
body.appendChild(btnQurious);

// Resource(speechtotext API) :- https://www.section.io/engineering-education/speech-recognition-in-javascript/

let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-us";

let transcript = "";
speechRecognition.onresult = function(event) {
    transcript = "";
    for(let i=0; i<event.results.length; ++i){
        transcript += event.results[i][0].transcript;
    }
}

// -------------------------------------------------------

// The below written code for keyboard shortcut to enable start the extensions actual function is not working - Don't know why?

// document.addEventListener("keydown", handleKbd);
// function handleKbd (event){
//     if(event.shiftKey && event.altKey && event.key === "q"){
//         btnQurious.click();
//     }
// };

// -------------------------------------------------------


document.addEventListener("keydown", 
            function (event) { 
                if (event.key === "q" || event.key=="Q") { 
                    btnQurious.click(); 
                } 
            }); 




function doSomething(){
    if(btnQurious.hasAttribute("listening")===false){
        btnQurious.setAttribute("listening", true);
        speechRecognition.start();
    }else{
        btnQurious.removeAttribute("listening");
        speechRecognition.stop();

        // Resource for popup :- https://cdn.jsdelivr.net/npm/@simondmc/popup-js@1.4.2/popup.min.js
        const myPopup = new Popup({
            id: "my-popup",
            title: "Here is what you said:",
            content: transcript
        }) ;
        myPopup.show();
        // console.log("This is what you said - " + transcript);
    }
}