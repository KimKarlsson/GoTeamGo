window.onload = function() {
    var chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o"];
    var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];

    var playerArray = [];
    var cpuArray = [];
    var content = document.getElementById("content");
    var counter = 0;
    var playerOutputString = "";
    var cpuOutputString = "";
    var testX = [];
    var testY = [];
    var cpuUsedPos = [];
    var vertical = true;
    var playerPlacedBoats = [undefined]
    var isArrayEmpty = true;


    // GENERATE FIELDS
    // PLAYER FIELD
    for (var i = 0; i < numbers.length; i++) {
        var temp = [];
        for (var j = 0; j < numbers.length; j++) {
            temp.push(chars[i] + numbers[j]);

        }
        playerArray.push(temp);

    }



    console.log(playerArray);

    playerOutputString += "<div id='playerfield'>";
    for (var k = 0; k < chars.length; k++) {
        playerOutputString += "<div class='row'>";
        for (var l = 0; l < numbers.length; l++) {
            playerOutputString += "<div class='square' id=" + playerArray[k][l] + "> <input type='radio' class='button'/></div>";
        }
        playerOutputString += "</div>";
    }
    playerOutputString += "</div>";
    content.insertAdjacentHTML("afterbegin", playerOutputString);
    var playerField = document.getElementById("playerfield");

    // CPU FIELD

    for (var i = 0; i < numbers.length; i++) {
        var cpuTemp = [];
        for (var j = 0; j < numbers.length; j++) {
            cpuTemp.push(chars[i] + numbers[j]);
        }
        cpuArray.push(cpuTemp);
    }
    cpuOutputString += "<div id='cpufield'>";

    for (var k = 0; k < chars.length; k++) {
        cpuOutputString += "<div class='row'>";
        for (var l = 0; l < chars.length; l++) {
            cpuOutputString += "<div class='square' id=" + "cpu" + cpuArray[k][l] + "> <input type='radio' class='button' /></div>";
            counter++;
        }
        cpuOutputString += "</div>";
    }
    cpuOutputString += "</div>";
    content.insertAdjacentHTML("afterbegin", cpuOutputString);

    // ^GENERATE FIELDS^





    //CPU RANDOM POSITION PICK
    function cpuRandomPick() {
        var cpurandomArray = Math.floor(Math.random() * cpuArray.length);
        var cpuRandomNumber = Math.floor(Math.random() * cpuArray[cpurandomArray].length);
        /*if(cpuUsedPos !== []){
        for(var i = 0; i< cpuUsedPos.length; i++){
            if(cpuUsedPos[i] == cpuArray[cpurandomArray][cpuRandomNumber]){
                
            }
        }
        else{
           cpuUsedPos.push(cpuArray[cpurandomArray][cpuRandomNumber]);
        }
        }
    }*/
        /*console.log(cpuArray[cpurandomArray][cpuRandomNumber]);
        cpuUsedPos.push(cpuArray[cpurandomArray][cpuRandomNumber]);
        console.log(cpuUsedPos);*/
    }
    cpuRandomPick();

    /*function hovertest(ev){
        var target = $(ev.target);
    }*/



    /*
    // If a square 
    $('.square').click(function() {

        // If the current id exists in array
        if ($.inArray($(this).attr("id"), playerArray))
        {
            if (vertical === true)
            {

            }
            else
            {
                if ($(this).prev().attr("id")[1] !== 0 || $(this).next().attr("id")[1] !== 9)
                {
                    $(this).prev().css("opacity", "0.5");
                    $(this).next().css("opacity", "0.5");
                }
                else
                {
                    // Out of bounds
                }
            }
        }
    });
    */





    playerField.addEventListener("mousedown", function(e) {
        var target = $(e.target);
        if (target.attr("class") == "square") {
            for (var i = 0; i < playerArray.length; i++) {
                if (((playerArray[i].indexOf(target.attr("id"))) >= 0)) {



                    if (vertical === true) {
                        var originalPos = playerArray[i].indexOf(target.attr("id"));
                        var oneUp = originalPos - 1;
                        var oneDown = originalPos + 1;
                        var elementOfOneDown = document.getElementById(playerArray[i][oneDown]);
                        var elementOfOneUp = document.getElementById(playerArray[i][oneUp]);
                        console.log(playerArray[i][originalPos]);
                        if (($.inArray(playerArray[i][originalPos], playerPlacedBoats) !== -1 ||
                            $.inArray(playerArray[i][oneDown], playerPlacedBoats) !== -1 ||
                            $.inArray(playerArray[i][oneUp], playerPlacedBoats) !== -1) &&
                            (playerArray[i][originalPos] !== undefined || playerArray[i][oneDown] !== undefined || playerArray[i][oneUp] !== undefined)){
                            alert("ERROR: overlapping or outside the field!☻");
                        }
                        else {
                            $(elementOfOneUp).css("background-image", "url('../img/for.gif')");
                            $(elementOfOneUp).css("transform", "rotate(90deg)");
                            $(elementOfOneDown).css("background-image", "url('../img/akter.gif')");
                            $(elementOfOneDown).css("transform", "rotate(90deg)");
                            target.css("background-image", "url('../img/mid.gif')");
                            target.css("transform", "rotate(90deg)");
                            playerPlacedBoats.push(playerArray[i][oneDown], playerArray[i][oneUp], playerArray[i][originalPos]);
                            console.log(playerPlacedBoats);
                        }
                    }
                    else {
                        var originalPos = playerArray[i].indexOf(target.attr("id"));
                        if((playerArray[i] !== undefined && playerArray[i - 1] !== undefined && playerArray[i + 1] !== undefined)){
                        var elementOfOneRight = document.getElementById(playerArray[i + 1][originalPos]);
                        var elementOfOneLeft = document.getElementById(playerArray[i - 1][originalPos]);
                        if ($.inArray(playerArray[i + 1][originalPos], playerPlacedBoats) !== -1 ||
                            $.inArray(playerArray[i - 1][originalPos], playerPlacedBoats) !== -1 ||
                            $.inArray(playerArray[i][originalPos], playerPlacedBoats) !== -1){
                            alert("ERROR: overlapping or outside the field!☻");
                        }
                        else {
                            target.css("background-image", "url('../img/mid.gif')");
                            $(elementOfOneRight).css("background-image", "url('../img/akter.gif')");
                            $(elementOfOneLeft).css("background-image", "url('../img/for.gif')");
                            playerPlacedBoats.push(playerArray[i + 1][originalPos], playerArray[i - 1][originalPos], playerArray[i][originalPos]);
                            console.log(playerPlacedBoats);
                        }
                        }
                        else{
                            alert("ERROR: overlapping or outside the field!☻");
                        }
                    }
                }
            }

        }

        //console.log(target.attr("id")[0]+target.attr("id")[1]);

        //var second = document.getElementById(playerArray[])


        //target.css("opacity", "0.5");


    });



    $("#rotateimg").click(function() {
        if (vertical === false) {
            $("#rotate").css("transform", "rotate(90deg)");
            vertical = true;
        }
        else {
            vertical = false;
            $("#rotate").css("transform", "rotate(90deg)");
        }
        console.log(vertical);
    });


    // playerField.onmouseover = function(e) {
    //     var target = $(e.target);
    //     console.log(target);
    //     var targetId = target.attr("id");
    //     var targetClass = target.attr("class");
    //     console.log(targetId);
    //     if(targetClass == "square"){
    //     target.css("opacity", "0.5");
    //     }
    //     playerField.onmouseleave = function(){
    //         if(targetClass == "square"){
    //             target.css("opacity", "1");
    //         }
    //     };
    //     for (var i = 0; i < playerArray.length; i++) {
    //         for (var j = 0; j < playerArray[i].length; j++) {

    //         }
    //     }
    // };
};