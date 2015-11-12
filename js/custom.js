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
    var playerBoatCounter = 0;
    var cpuShootingArray = [];
    var audio = new Audio('audio/explosion.mp3'); //sound hit
    var audio2 = new Audio('audio/splash.wav');     //sound miss
    var audio3 = new Audio('audio/sunk.mp3');           //sound ship sunk
    var boat1 = [];
    var boat2 = [];
    var boat3 = [];
    var boat4 = [];
    var boat5 = [];
    var cpuCantShootHere = [];
    var playerBoatsSunk = [boat1, boat2, boat3, boat4, boat5];
    var cpuShotsFired = false;
    
    // GENERATE FIELDS
    // PLAYER FIELD
    for (var i = 0; i < numbers.length; i++) {
        var temp = [];
        for (var j = 0; j < numbers.length; j++) {
            temp.push(chars[i] + numbers[j]);

        }
        playerArray.push(temp);
        cpuShootingArray.push(temp);

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
    var cpuField = document.getElementById("cpufield");
    // ^GENERATE FIELDS^





    //CPU RANDOM POSITION PICK
    function cpuRandomPick() {

        for (var i = 0; i < 5; i++) {
            var cpurandomArray = Math.floor(Math.random() * cpuArray.length);
            var cpuRandomNumber = Math.floor(Math.random() * cpuArray[cpurandomArray].length);

            // cpuArray[cpurandomArray][cpuRandomNumber];

            //console.log(cpuArray[cpurandomArray][cpuRandomNumber]);

            // Check for before && after, vertically and horizontally



            var passed = 0;

            if ($.inArray(cpuArray[cpurandomArray][cpuRandomNumber], cpuUsedPos) === -1)
                passed++;

            var orientation = Math.random();
            console.log("Orientation: " + orientation);

            console.log("Click: " + cpuArray[cpurandomArray][cpuRandomNumber]);

            if (orientation > 0.5) {
                
                console.log("Orientation is over 0.5");
                
                console.log(parseInt(cpuArray[cpurandomArray][cpuRandomNumber].substr(1)));
                
                var tempLetter = String.fromCharCode(cpuArray[cpurandomArray][cpuRandomNumber].charCodeAt(0) - 1) + parseInt(cpuArray[cpurandomArray][cpuRandomNumber].substr(1));

                if ($.inArray(tempLetter, cpuUsedPos) === -1)
                    passed++;

                tempLetter = String.fromCharCode(cpuArray[cpurandomArray][cpuRandomNumber].charCodeAt(0) + 1) + parseInt(cpuArray[cpurandomArray][cpuRandomNumber].substr(1));

                if ($.inArray(tempLetter, cpuUsedPos) === -1)
                    passed++;
            }
            else {
                
                console.log("Orientation is below 0.5");
                var tempNumber = parseInt(cpuArray[cpurandomArray][cpuRandomNumber].substr(1)) + 1;

                if ($.inArray(tempNumber, cpuUsedPos) === -1)
                    passed++;

                var tempNumber = parseInt(cpuArray[cpurandomArray][cpuRandomNumber].substr(1)) - 1;

                if ($.inArray(tempNumber, cpuUsedPos) === -1)
                    passed++;
            }

            //console.log(passed);
            
            if (passed === 3) {
                var temp = cpuArray[cpurandomArray][cpuRandomNumber];
                
                cpuUsedPos.push("cpu" + temp);

                console.log("Checking orientation before pushing");

                if (orientation > 0.5) {
                    /*
                    cpuUsedPos.push("cpu" + String.fromCharCode(temp.charCodeAt(0) + parseInt(temp.substr(1, temp.length - 1)) - 1));
                    cpuUsedPos.push("cpu" + String.fromCharCode(temp.charCodeAt(0) + parseInt(temp.substr(1, temp.length - 1)) + 1));
                    */
                    cpuUsedPos.push("cpu" + temp.charAt(0) + (parseInt(temp.substr(1), 10) + 1));
                    cpuUsedPos.push("cpu" + temp.charAt(0) + (parseInt(temp.substr(1), 10) - 1));
                }
                else {
                    // cpuUsedPos.push("cpu" + String.fromCharCode(cpuArray[cpurandomArray][cpuRandomNumber].charCodeAt(0) + 1) + cpuArray[cpurandomArray][cpuRandomNumber].substr(1, cpuArray[cpurandomArray][cpuRandomNumber].length - 1));
                    // cpuUsedPos.push("cpu" + String.fromCharCode(cpuArray[cpurandomArray][cpuRandomNumber].charCodeAt(0) - 1) + cpuArray[cpurandomArray][cpuRandomNumber].substr(1, cpuArray[cpurandomArray][cpuRandomNumber].length - 1));
                
                    cpuUsedPos.push("cpu" + String.fromCharCode(temp.charCodeAt(0) + 1) + temp.substr(1));
                    cpuUsedPos.push("cpu" + String.fromCharCode(temp.charCodeAt(0) - 1) + temp.substr(1));
                    /*
                    cpuUsedPos.push(
                        "cpu" + String.fromCharCode(temp.charCodeAt(0) + 1
                        + temp.substr(1)
                        )
                    );
                    
                    cpuUsedPos.push(
                        "cpu" + String.fromCharCode(temp.charCodeAt(0) - 1
                        + temp.substr(1)
                        )
                    );
                    */
                }
            }
            else {
                i--;
            }

            console.log(cpuUsedPos);
        }

        /*
        if ( $.inArray( cpuArray[cpurandomArray][cpuRandomNumber], cpuUsedPos ) !== -1)
        {
            var tempValue = Math.floor(Math.random());
            cpuUsedPos.push( cpuArray[cpurandomArray][cpuRandomNumber] );
        }
        else
        {
            // Re-run function
            cpuRandomPick();
            return;
        }
        */



        // cpuUsedPos.push( cpuArray[cpurandomArray][cpuRandomNumber] );

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

    $("#cpuRandomPick").click(function() {

        cpuRandomPick();

    });

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



    cpuField.addEventListener("mousedown", function(e) {
        var target = $(e.target);
        if (target.attr("class") == "square") /*(och det är spelarens tur?)*/ {
            for (var i = 0; i < cpuUsedPos.length; i++) { //cpuboatsarray är cpun's utplacerade båtar i en array
                if ($.inArray(target.attr("id"), cpuUsedPos) !== -1) {
                    target.css("background-image", "url('../img/hit.gif')");
                    audio.play();
                }
                else {
                    target.css("background-image", "url('../img/miss.gif')");
                    audio2.play();
                }

            }
            console.log(target.attr("id"));
        }
         // $("html, body").animate({ scrollTop: ($(document).height() -800)  }, 1000);
          //setTimeout(function(){
        cpuShot();
          //}, 15);
    });




    function cpuShot() {
        cpuShotsFired = false;
        while(cpuShotsFired === false){
        var cpurandomArray = Math.floor(Math.random() * cpuShootingArray.length);
        var cpuRandomNumber = Math.floor(Math.random() * cpuShootingArray[cpurandomArray].length);
        if($.inArray(cpuShootingArray[cpurandomArray][cpuRandomNumber], cpuCantShootHere) == -1){
        cpuCantShootHere.push(cpuShootingArray[cpurandomArray][cpuRandomNumber]);
        console.log(cpuShootingArray[cpurandomArray][cpuRandomNumber]);
        if ($.inArray(cpuShootingArray[cpurandomArray][cpuRandomNumber], playerPlacedBoats) !== -1) {
            console.log("hit!");
                    $("#"+cpuShootingArray[cpurandomArray][cpuRandomNumber]).css("background-image", "url('../img/hit.gif')");
                    audio.play();
                    for(var i=0; i<playerBoatsSunk.length; i++){
                        //console.log("inside i");
                        for(var j=0; j<playerBoatsSunk[i].length; j++){
                            //console.log("inside j");
                            //console.log(cpuShootingArray[cpurandomArray][cpuRandomNumber]);
                            //console.log(playerBoatsSunk[i][j]);
                        if(cpuShootingArray[cpurandomArray][cpuRandomNumber] == playerBoatsSunk[i][j]){
                            //console.log(removeThisIndex);
                           // audio4.play();
                            alert("Nice hit!");
                            
                            //console.log(playerBoatsSunk[i][j]);
                            //console.log(cpuShootingArray[cpurandomArray][cpuRandomNumber]);
                            playerBoatsSunk[i][3] -= 1;
                            if(playerBoatsSunk[i][3] === 0){
                                audio3.play();
                                alert("You sunk my boat!");
                            }
                            else{
                            //alert(playerBoatsSunk[i])
                            }
                        }
                            
                        }
                    }
        }
                else {
                    $("#"+cpuShootingArray[cpurandomArray][cpuRandomNumber]).css("background-image", "url('../img/miss.gif')");
                    audio2.play();
                }
        //$(playerArray[cpurandomArray][cpuRandomNumber]).css("background-image", "url('../img/hit.gif')");
        /*for(var i=0; i<cpuShootingArray.length; i++){
            $(playerArray[cpurandomArray][cpuRandomNumber]).css("background-image", "url('../img/hit.gif')");
            
        }*/
        cpuShotsFired = true;
        }
        }
    }




    playerField.addEventListener("mousedown", function(e) {
        //LOGIK FÖR ATT SPELARE SKA PLACERA BÅT
        var target = $(e.target);
        if (target.attr("class") == "square" && playerBoatCounter < 5) {
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
                            (playerArray[i][originalPos] !== undefined || playerArray[i][oneDown] !== undefined || playerArray[i][oneUp] !== undefined)) {
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
                            
                            
                            switch(playerBoatCounter){
                                case 0:
                                    boat1.push(playerArray[i][oneDown], playerArray[i][oneUp], playerArray[i][originalPos], 3);
                                break;
                                case 1:
                                    boat2.push(playerArray[i][oneDown], playerArray[i][oneUp], playerArray[i][originalPos], 3);
                                break;
                                case 2:
                                    boat3.push(playerArray[i][oneDown], playerArray[i][oneUp], playerArray[i][originalPos], 3);
                                break;
                                case 3:
                                    boat4.push(playerArray[i][oneDown], playerArray[i][oneUp], playerArray[i][originalPos], 3);
                                break;
                                case 4:
                                    boat5.push(playerArray[i][oneDown], playerArray[i][oneUp], playerArray[i][originalPos], 3);
                                break;
                                default:
                                console.log("ERROR");
                                break;
                            }
                            playerBoatCounter += 1;
                            console.log(boat1, boat2, boat3, boat3, boat4, boat5);
                        }
                    }
                    else {
                        var originalPos = playerArray[i].indexOf(target.attr("id"));
                        if ((playerArray[i] !== undefined && playerArray[i - 1] !== undefined && playerArray[i + 1] !== undefined)) {
                            var elementOfOneRight = document.getElementById(playerArray[i + 1][originalPos]);
                            var elementOfOneLeft = document.getElementById(playerArray[i - 1][originalPos]);
                            if ($.inArray(playerArray[i + 1][originalPos], playerPlacedBoats) !== -1 ||
                                $.inArray(playerArray[i - 1][originalPos], playerPlacedBoats) !== -1 ||
                                $.inArray(playerArray[i][originalPos], playerPlacedBoats) !== -1) {
                                alert("ERROR: overlapping or outside the field!☻");
                            }
                            else {
                                target.css("background-image", "url('../img/mid.gif')");
                                $(elementOfOneRight).css("background-image", "url('../img/akter.gif')");
                                $(elementOfOneLeft).css("background-image", "url('../img/for.gif')");
                                playerPlacedBoats.push(playerArray[i + 1][originalPos], playerArray[i - 1][originalPos], playerArray[i][originalPos]);
                                console.log(playerPlacedBoats);
                                
                                
                                switch(playerBoatCounter){
                                case 0:
                                    boat1.push(playerArray[i + 1][originalPos], playerArray[i - 1][originalPos], playerArray[i][originalPos], 3);
                                break;
                                case 1:
                                    boat2.push(playerArray[i + 1][originalPos], playerArray[i - 1][originalPos], playerArray[i][originalPos], 3);
                                break;
                                case 2:
                                    boat3.push(playerArray[i + 1][originalPos], playerArray[i - 1][originalPos], playerArray[i][originalPos], 3);
                                break;
                                case 3:
                                    boat4.push(playerArray[i + 1][originalPos], playerArray[i - 1][originalPos], playerArray[i][originalPos], 3);
                                break;
                                case 4:
                                    boat5.push(playerArray[i + 1][originalPos], playerArray[i - 1][originalPos], playerArray[i][originalPos], 3);
                                break;
                                default:
                                console.log("ERROR");
                                break;
                            }
                            playerBoatCounter += 1;
                            }
                        }
                        else {
                            alert("ERROR: overlapping or outside the field!☻");
                        }
                    }
                }
            }

        }
        //LOGIK FÖR ATT SPELARE SKA PLACERA BÅT^


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