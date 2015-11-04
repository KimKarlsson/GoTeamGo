window.onload = function(){
var chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o"];
var numbers =["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
var playerArray = [];
var content = document.getElementById("content");
var counter = 0;
var playerOutputString = "";





for (var i=0; i< chars.length; i++){

    for(var j=0; j<numbers.length; j++){
        playerArray.push(chars[i]+numbers[j]);
        
    }

}


console.log(playerArray);

playerOutputString += "<div id='playerfield'>";
for(var k=0; k<chars.length; k++){
    playerOutputString += "<div class='row'>";
    for(var l=0; l<chars.length; l++){
        playerOutputString += "<div class='square'> <input type='radio' class='button' id="+playerArray[k]+"/></div>" ;
    }
    playerOutputString +=  "</div>";
}
playerOutputString +=  "</div>";
content.insertAdjacentHTML("afterbegin", playerOutputString);





//var test = "<div> <input id="++"> "";
};