var playing =  false;
var score;
var trialsLeft;
var fruits = ['apple', 'mango', 'banana', 'grapes', 'pear', 'watermelon', 'orange', 'cherry', 'pineapple']
var step;
var action; // used for settimeout function only

$(function() {
    // click on start button

  $("#start-btn").click(function(){
    // we are playing

        if(playing == true) {
             // reload page
            location.reload();
        }
        else {

            // we are not playing 
            playing = true; // game initiated

            score = 0; // set score to zero
            $("#score").html(score);

            // show trials left
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();

            //hide game over box
            $("#gameOver").hide();

            // change button text to "reset game"
            $("#start-btn").html("Reset Game");

            startAction();
        }
  });

$("#fruit1").mouseover(() => {
    score++;
    $("#score").html(score); // update score

    // document.getElementById("sliceSound").play();
    $("#sliceSound")[0].play(); // play sound

    //stop fruit
    clearInterval(action);

    // hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit

    // send new fruit
    setTimeout( startAction, 500);
})
// slice a fruit
    //  play sound
    //  explode fruit


function addHearts(){
    $("#trialsLeft").empty();
    for(i=0; i<trialsLeft; i++){
        $("#trialsLeft").append('<i class="fa-solid fa-heart heart" style="color: #ff0000;"></i>');
    }
}   

function startAction(){
    $("#fruit1").show();
    chooseFruit(); // choose a random fruit
     // random position 
     $("#fruit1").css({'top' : -50 , 'left' : Math.round(Math.random()*550)});

    //  generate a random step
    step = 1+Math.round(Math.random()*5);

    // move fruit down by one step every 10ms
    action = setInterval(() => {

        // move fruit by one step
        $("#fruit1").css('top', $("#fruit1").position().top+ step);

        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            // check if we have trials left
            if(trialsLeft > 1) {
                $("#fruit1").show();
                chooseFruit(); // generate a random fruit
                $("#fruit1").css({'top' : -50 , 'left' : Math.round(Math.random()*550)});
                // random position 

                //  generate a random step
                step = 1+Math.round(Math.random()*5);

                // reduce trials by one
                trialsLeft--;

                // add hearts
                addHearts();

            }else{// game over
                playing = false; // we are not playing anymore 

                $("#start-btn").html("Start Game"); // change button to start game

                // show game over message
                $("#gameOver").show();
                $("#alert-score").html(score);
                $("#trialsLeft").hide();
                stopAction();
            }
        }

    }, 10);
    }

// generate a random fruit
function chooseFruit(){
    // choose a random fruit
    $("#fruit1").attr('src', 'images/'+fruits[Math.round(Math.random()*8)]+'.png');
   }

 // stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
 }
});