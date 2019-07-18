var gameInfo = ['Hi.', 'Welcome to this simple puzzle.', 'Choose one of the puzzle painting youd like to play', 'Enjoy.'];
var popupInfo = ['<- Look to your left', 'Again :)']
var j = 0; i = 0;
var delay = 50;
var gameInfoPointers = ['element-1', 'element-2', 'element-3', 'element-4'];
var gamePopupsPointers = ['direction-text', 'again-text']

var btn = document.getElementById('playButton');


function typeWriter(textContent, pointer) {
    if (i < textContent[j].length) {
        document.getElementById(pointer[j]).innerHTML += textContent[j].charAt(i);
        i++;
        setTimeout(typeWriter, delay, textContent, pointer);
    } else {
        j++;
        i = 0;
    }
}
var keyPressed = 0;
btn.onclick = function () {
    keyPressed++;
    switch (keyPressed) {
        case 1:
            document.getElementById(gamePopupsPointers[0]).innerHTML = popupInfo[0]; //look left
            break;
        case 2:
            document.getElementById(gamePopupsPointers[1]).innerHTML = popupInfo[1]; // again
            break;
        case 3:
            document.getElementById(gamePopupsPointers[0]).innerHTML = "";
            document.getElementById(gamePopupsPointers[1]).innerHTML = "";
            document.getElementById(gamePopupsPointers[0]).innerHTML = popupInfo[1];
            break;
        case 4:
                document.getElementById(gamePopupsPointers[0]).innerHTML = "";
            break;

        default:
            break;
    }
    typeWriter(gameInfo, gameInfoPointers);
}

