$(document).ready(function () {
    var playerTurn = false;
    var computerTurns = [];
    var playerGuesses = [];
    var strict = false;
    var cycleOn = false;
    var alertOn = false;

    function green() {
        $("#green").css("background-color", "green");
        var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
        audio.play();
        setTimeout(function () {
            $("#green").css("background-color", "#428F3F");
        }, 300);
    }

    function red() {
        $("#red").css("background-color", "red");
        var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
        audio.play();
        setTimeout(function () {
            $("#red").css("background-color", "#CC272C");
        }, 300);
    }

    function yellow() {
        $("#yellow").css("background-color", "yellow");
        var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
        audio.play();
        setTimeout(function () {
            $("#yellow").css("background-color", "#D1B319");
        }, 300);
    }

    function blue() {
        $("#blue").css("background-color", "blue");
        var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
        audio.play();
        setTimeout(function () {
            $("#blue").css("background-color", " #1B24CC");
        }, 300);
    }

    function cycle() {
        cycleOn = true;
        var i = 0;
        var interval = setInterval(function () {
            if (computerTurns[i] === 1) {
                green();
            } else if (computerTurns[i] === 2) {
                red();
            } else if (computerTurns[i] === 3) {
                yellow();
            } else if (computerTurns[i] === 4) {
                blue();
            }
            i++;
            if (i === computerTurns.length) {
                clearInterval(interval);
                playerTurn = true;
                updateCount();
                cycleOn = false;
            }
        }, 600);
    }

    function updateCount() {
        $("#count-number").text(computerTurns.length.toString());
    }

    function check() {
        if (
            playerGuesses[playerGuesses.length - 1] !==
            computerTurns[playerGuesses.length - 1] &&
            strict
        ) {
            alert();
            reset();
            updateCount();
        } else if (
            playerGuesses[playerGuesses.length - 1] !==
            computerTurns[playerGuesses.length - 1] &&
            !strict
        ) {
            alert(); //function that spits out warning the selection was wrong
            playerGuesses = []; //pop off last element so player can re-guess
        } else if (playerGuesses.length === computerTurns.length) {
            computerTurn();
        }
    }

    function computerTurn() {
        computerTurns.push(Math.floor(Math.random() * 4 + 1));
        cycle();
        playerGuesses = [];
    }

    function reset() {
        playerTurn = false;
        computerTurns = [];
        playerGuesses = [];
    }

    function alert() {
        alertOn = true;
        var i = 0;
        var wrongMove = setInterval(function () {
            $("#console").css("box-shadow", "0 0 20px #FF0500");
            var audio = new Audio("https://www.myinstants.com/media/sounds/incorrect.swf.mp3");
            audio.play();
            setTimeout(function () {
                $("#console").css("box-shadow", "0 0 0px #FF0500");
            }, 250);
            i++;
            if (i === 3) {
                clearInterval(wrongMove);
                cycle();
                alertOn = false;
            }
        }, 500);
    }
    $(".button").on("click", function () {
        if (
            playerTurn &&
            playerGuesses.length < computerTurns.length &&
            cycleOn === false &&
            alertOn === false
        ) {
            if ($(this).attr("id") === "green") {
                playerGuesses.push(1);
                green();
            } else if ($(this).attr("id") === "red") {
                playerGuesses.push(2);
                red();
            } else if ($(this).attr("id") === "yellow") {
                playerGuesses.push(3);
                yellow();
            } else if ($(this).attr("id") === "blue") {
                playerGuesses.push(4);
                blue();
            }
            check(); //check to see if last choice matches computer choice
        }
    });
    $("#strict-button").on("click", function () {
        if (!strict) {
            strict = true;
            $("#strict-on-button").css("background-color", "#FF0500");
            $("#strict-on-button").css("box-shadow", "0 0 10px #FF0500");
        } else {
            strict = false;
            $("#strict-on-button").css("background-color", "#FF7D7B");
            $("#strict-on-button").css("box-shadow", "0 0 0px #FF0500");
        }
    });
    $("#start-button").on("click", function () {
        reset();
        updateCount();
        computerTurn();
    });
});
