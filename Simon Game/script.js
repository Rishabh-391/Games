var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userclickedpattern=[];

var started=false;
$(document).keypress(function(e){
  if(!started)
  {
  nextSequence();
  }
  started=true;
});
var level=0;

function animatepress(key2)
{
  console.log(key2);
  $("."+key2).addClass("pressed");
  setTimeout(function(){
    $("."+key2).removeClass("pressed");
},100);
}

function playsound(name){
  $("." + name).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio( name + ".mp3");
  audio.play();
}

function nextSequence() {
  $("h1").text("Level "+level);
  level++;
  userclickedpattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playsound(randomChosenColour);
  animatepress(randomChosenColour);
}

$("button").click(function(){
  var key=$(this).attr("class");
  userclickedpattern.push(key);
  playsound(key);
  animatepress(key);
  checkanswer(userclickedpattern.length-1);
});

function checkanswer(currentLevel) {
  if (gamePattern[currentLevel] === userclickedpattern[currentLevel]) 
  {
    console.log("success");
    if (userclickedpattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").text("Game over, Press any key to restart");
    $("body").addClass("wrong");
    setTimeout(function () {
      $("body").removeClass("wrong");
    }, 200);
    var audio = new Audio("wrong.mp3");
    audio.play();
      startover();
  }
}

function startover(){
  level=0;
  gamePattern=[];
  userclickedpattern=[];
  started=false;
}