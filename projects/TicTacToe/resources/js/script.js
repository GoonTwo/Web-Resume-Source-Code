$(document).ready(function () {
    var human, computer;
    var winningCases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; //winning combinations (left to right, top to bottom)
    var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var myTurn, AIMove;

    function winner() {
        var counter = 0;
        for (var i = 0; i < winningCases.length; i++) {
            counter++;
            if (winningCases[i].every(function (val) {
                    return board[val] === human;
                })) {
                return [1, winningCases[i]];
            } else if (winningCases[i].every(function (val) {
                    return board[val] === computer;
                })) {
                return [-1, winningCases[i]];
            } else if ((board.every(function (val) {
                    return val !== 0;
                })) && counter === winningCases.length) {
                return [0, NaN];
            }
        }
        return [NaN, NaN]
    }

    function findOpenSpaces(tempBoard) {
        var openSpaces = []
        for (var i = 0; i < tempBoard.length; i++) {
            if (tempBoard[i] === 0) {
                openSpaces.push(i);
            }
        }
        return openSpaces;
    }

    function minimax(currentBoard, player) {
        var scores = [];
        var moves = [];
        var value, bestScore, bestMove, emptySpots;
        if (!isNaN(winner()[0])) {
            switch (winner()[0]) {
                case 1: //Human wins
                    return [1, 0];
                case 0: //Tie
                    return [0, 0];
                case -1: //AI wins
                    return [-1, 0];
            }
        }
        emptySpots = findOpenSpaces(currentBoard);
        for (var i = 0; i < emptySpots.length; i++) {
            currentBoard[emptySpots[i]] = player;
            if (player === computer) {
                value = minimax(currentBoard, human)[0];
                scores.push(value);
            } else {
                value = minimax(currentBoard, computer)[0];
                scores.push(value);
            }
            currentBoard[emptySpots[i]] = 0;
            moves.push(emptySpots[i]);
        }
        if (player === computer) {
            bestScore = Number.MAX_SAFE_INTEGER;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i] < bestScore) {
                    bestScore = scores[i];
                    bestMove = moves[i];
                }
            }
        } else {
            bestScore = -Number.MAX_SAFE_INTEGER;
            for (var i = 0; i < scores.length; i++) {
                if (scores[i] > bestScore) {
                    bestScore = scores[i];
                    bestMove = moves[i];
                }
            }
        }
        return [bestScore, bestMove];
    }

    function declareWinner(winner) {
        myTurn = false;
        $('#winner').text(winner === 1 ? "You Win!" : winner === -1 ? "AI Wins!" : winner === 0 ? "Tie!" : "");
        showWin();
        setTimeout(function () {
            $('#winner').css('display', 'inline-block');
            $('.js--winner').addClass('animated fadeIn')
        }, 1000)
        setTimeout(resetGame, 3000);
    }

    function updateBoard() {
        for (var i = 0; i < board.length; i++) {
            $('#' + i.toString()).text(board[i] === 1 ? "X" : board[i] === -1 ? "O" : "");
        }
    }

    function resetGame() {
        $('#winner').css('display', 'none');
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 10; i++) {
                $('#' + i.toString()).css("color", "#383838")
            }

        updateBoard();
        if (human === 1) {
            myTurn = true;
        } else {
            board[Math.floor(Math.random() * 4 + 1) * 2] = computer;
            setTimeout(updateBoard, 1000);
            setTimeout(function(){ myTurn = true; }, 1000)
        }
    }

    function computerMove() {
        AIMove = minimax(board, computer)[1];
        board[AIMove] = computer;
        updateBoard()
        checkWinner();
    }

    function resetAll() {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        $('#winner').css('display', 'none');
        $('table').css('display', 'none');
        $('.options').css('display', 'none');
        $('#starting-choice').css('display', 'block');
        $('#starting-choice').addClass('animated fadeIn')
        $('#reset').css('display', 'none');
        updateBoard();
    }

    function startingChoice() {
        $('#starting-choice').css('display', 'none');
        $('table').css('display', 'table');
        $('table').addClass('animated fadeIn')
        $('#reset').css('display', 'block');
        $('#reset').addClass('animated fadeIn')
    }

    function checkWinner() {
        var tempnum = winner()[0]
        if (!isNaN(tempnum)) {
            declareWinner(tempnum);
        } else {
            setTimeout(function() { myTurn = true}, 500)
        }
    }

    function showWin() {
        var winnerNum = winner()[0]
        var winnerBoard = winner()[1];
        if (winnerNum === 1) {
            for (var i = 0; i < 3; i++) {
                $('#' + winnerBoard[i].toString()).css("color", "#9be89b")
            }
        } else if (winnerNum === -1) {
            for (var i = 0; i < 3; i++) {
                $('#' + winnerBoard[i].toString()).css("color", "#dd6060")
            }
        }
    }

    $('td').on('click', function () {
        if (myTurn && board[parseInt($(this).attr('id'))] === 0) {
            myTurn = false;
            board[parseInt($(this).attr('id'))] = human;
            updateBoard();
            checkWinner();
            if (isNaN(winner()[0])) {
                setTimeout(computerMove, 500);
            }
        }
    });

    $('.player-choice-x').on('click', function () {
        myTurn = true;
        human = 1;
        computer = -1;
        startingChoice();
    });

    $('.player-choice-o').on('click', function () {
        myTurn = false;
        human = -1;
        computer = 1;
        startingChoice();
        board[Math.floor(Math.random() * 4 + 1) * 2] = computer;
        setTimeout(updateBoard, 1000);
        myTurn = true;
    });

    $('#reset').on('click', resetAll);
});
