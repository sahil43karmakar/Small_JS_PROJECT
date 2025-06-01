

alert("Hello,Enjoy the game!!");
let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern=[];
let userClickedPattern=[];
let started=false;
//to check game started or not 
game_started=false;
//to increase the level,we create level variable and increase 
level=0;
//when ever there is a keypresses ,then we call next sequence
$(document).keydown(function() {
    if (!game_started) {
    // $("#level-title").text("level :" + level)
    nextSequence();
    //let the game begin,until started is false
    started = true;
  }
});
function playsound(name){
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play().catch((error) =>
    {
        console.error("sounds are blocked",error.message);
    })
}
function wrongsound(){
    let audio=new Audio("sounds/wrong.mp3");
    audio.play().catch((error) =>
    {
        console.error("sounds are blocked",error.message);
    });
    $("body").addClass("game-over");

    setTimeout(() => {
        $("body").removeClass("game-over");
       
    },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");

}
function animatePress(currentColour){
    setTimeout(() => {
        $("#"+userChosenColourbutton).removeClass( "pressed" );
    },100);
    $("#"+userChosenColourbutton).addClass( "pressed" );
}

let  userChosenColourbutton= $(this).attr("id");
function checkAnswer(currentLevel){
    //whatever is the item at the last index of userclickedpattern,curentlevel get that number and we compare with last clicked 
    // checkAnswer(userClickedPattern.length-1);
    //to check last element of userclicked
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("correct");
        if(userClickedPattern.length===gamePattern.length){
            //we move on to the next level
            setTimeout(function(){
                 nextSequence();
            },1000)
        }
    }
    else{
        console.log("wrong");
        wrongsound();
        startover();

    }
}
//for user input ,we check userinput,generate input,push ibto array
 $(".btn").click(function(event){
        //we get which button is clicked from which id 
       userChosenColourbutton= $(this).attr("id")
       //storing which button is click inside the array
       userClickedPattern.push(userChosenColourbutton);
       console.log("pressed key is:"+userChosenColourbutton);
       playsound(userChosenColourbutton)
       //so above name=userchosencolourbutton
       //now giving sound to user choiced button
       console.log(userClickedPattern);
       animatePress(userChosenColourbutton);
       //this is inside userinput as wee are checking userinput only
       checkAnswer(userClickedPattern.length-1);
    });
//function for generating next colour
function nextSequence(){
    
    let randomNumber=Math.floor(Math.random()*4);
    console.log(randomNumber);  
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //we chose color randomly from button tag in  html,using random method and concatenate
    //Find the button whose id is the same as the color stored in the randomChosenColour variable, and select it using jQuery."
    //we want it randomly like this let randomChosenColour = "red";

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);     
    //so when we call next sequence level is increased and we then update the level 1->2->3 like this
    level++;
    $("#level-title").text("level : " + level);
    userClickedPattern=[];
    
}
function startover(){
    level=0;
    //for fresh choice entry
    
    game_started=false;
    gamePattern=[];//for fresh game choice entry
}
const themeToggle = document.getElementById("theme-toggle");

// Apply saved theme on load

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggle.checked = false;
} else {
  document.body.classList.add("dark-theme");
  themeToggle.checked = true;
}

// Toggle theme on checkbox change
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  }
});
