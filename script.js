var audio = new Audio('cart.mp3');
audio.addEventListener('ended', function () {
    audio.currentTime = 0;
    audio.play();
});
function startGame() {
    audio.play();
    // game initialization code here
    function moveLeft() {
        let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        left -= 100;
        if (left >= 100) {
            character.style.left = left + "px";
        }
    }
    function moveRight() {
        let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        left += 100;
        if (left < 400) {
            character.style.left = left + "px";
        }
    }
    document.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft" || event.key === "a") { moveLeft(); }
        if (event.key === "ArrowRight" || event.key === "d") { moveRight(); }
    });

    var block = document.getElementById("block");
    var counter = 0;
    block.addEventListener('animationiteration', () => {
        var random = Math.floor(Math.random() * 3);
        random++;
        left = random * 100;
        block.style.left = left + "px";
        counter += .5;
    });
    var score = document.getElementById("score");
    setInterval(function () {
        var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
        if (characterLeft == blockLeft &&
            blockTop < 450 &&
            blockTop > 300) {
             alert("GAME OVER. SCORE: " + counter + ". You ran from Todd for " + counter + " seconds before getting caught!");
            counter = 0;
        }
        score.textContent = "Score: " + counter;
    }, 1);
    document.getElementById("left").addEventListener("touchstart", moveLeft);
    document.getElementById("right").addEventListener("touchstart", moveRight);
}
var startButton1 = document.getElementById("start-button-1");
var startButton2 = document.getElementById("start-button-2");
var startScreen1 = document.getElementById("start-screen-1");
var startScreen2 = document.getElementById("start-screen-2");
var gameScreen = document.getElementById("game");

startButton1.addEventListener("click", function () {
    startScreen1.style.display = "none";
    startScreen2.style.display = "block";
    document.getElementById("start-audio-1").play(); // Play audio for start screen 2
});

startButton2.addEventListener("click", function () {
    startScreen2.style.display = "none";
    gameScreen.style.display = "block";
    document.getElementById("start-audio-1").pause(); // Pause audio for start screen 2
    startGame();
});


