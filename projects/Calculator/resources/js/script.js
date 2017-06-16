$(document).ready(function () {

    /* Define Variables */
    var history = "";
    var valuesBtn, operationsBtn, clearsBtn, equalsBtn, num;
    var temp = [];
    var number = [];
    var totals = [];
    var operations = [];
    var runningTotal = 0;

    /* Create Opprator functions */
    var mathOperators = {
        'plus': function (a, b) {
            return a + b;
        },
        'minus': function (a, b) {
            return a - b;
        },
        'divide': function (a, b) {
            return a / b;
        },
        'multiply': function (a, b) {
            return a * b;
        }
    };

    /* Clicking Numbers */
    $(".value").click(function () {
        num = this.textContent;
        if (temp.indexOf(".") > 0 && num === ".") {} else {
            temp.push(num);
            console.log(num);
            number.push(num);
            history=temp.join("");
            $("#history").text(history);
        }
    });

    // Clicking Math Operations
    $(".operation").click(function () {
        var opDisplay = this.textContent;
        var opMath = this.id;
        if (isNaN(Number(temp[temp.length - 1]))) {
            temp[temp.length - 1] = opDisplay;
            operations[operations.length - 1] = opMath;
        } else {
            temp.push(opDisplay);
            operations.push(opMath);
            var tempValue = parseFloat(number.join(""));
            totals.push(tempValue);
            number = [];
        }
        if (isNaN(totals[1]) && totals.length > 1) {
            totals.pop();
        }
        if (temp.length === 0) {
            history = "0";
            $("#history").text(history);
        }
        if (totals.length === 2) {
            var totalsTemp = mathOperators[operations[0]](totals[0], totals[1]);
            totals[0] = totalsTemp;
            totals.pop();
            operations.shift();
        }
        history = temp.join("");
        $("#history").text(history);
    });


    // Clicking "Clear"
    $("#clear").click(function () {
        number = [];
        totals = [];
        temp = [];
        operations = [];
        history = "0";
        runningTotal = 0;
        $("#input").text(runningTotal);
        $("#history").text(history);
    });

    // Clicking "Equals"
    $("#equal").click(function () {
        if (!isNaN(Number(temp[temp.length - 1])) && operations.length > 0) {
            temp.push("=");
            history = temp.join("");
            var tempValue = parseFloat(number.join(""));
            totals.push(tempValue);
            number = [];
            runningTotal = mathOperators[operations[0]](totals[0], totals[1]);
            if (runningTotal.toString().length > 8 && runningTotal % 1 === 0) {
                $("#input").text("Error");
                history = "Maximum Value Exceeded";
            } else {
                $("#input").text(runningTotal);
            }
            $("#history").text(history);
            totals = [];
            temp = [];
            operations = [];
            totals.push(runningTotal);
            temp.push(runningTotal);
        }
    });
});
