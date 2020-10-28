var highScore;
var inGame = false;
var runOnce = false;
var menuPage = 1;
function preload(){
  highScore = getItem('highScore');
   if (highScore === null) {
     highScore = 0;
   }
   carImg = loadImage("assets/Car.png");
   boxImg = loadImage("assets/Emoji/1F7E5.png");
   treeImg = [loadImage("assets/Emoji/1F333.png"),loadImage("assets/Emoji/1F334.png")];
   crossImg = loadImage("assets/Emoji/274C.png");
   tickImg = loadImage("assets/Emoji/2714.png");
   startImg = [loadImage("assets/Buttons/start1.png"),loadImage("assets/Buttons/start2.png")]
   helpImg = [loadImage("assets/Buttons/help1.png"),loadImage("assets/Buttons/help2.png")]
   optionsImg = [loadImage("assets/Buttons/opt1.png"),loadImage("assets/Buttons/opt2.png")]
}

function questionGen(difficulty) {
  operator = ["+","-","*","/"][Math.floor(Math.random()*4)];
  if (operator == "/"){
    a = Math.floor(Math.random() * (10+difficulty)) + 1;
    b = a * Math.floor(Math.random() * 10) + a;
    return (b + operator + a);
  }
  else{
    a = Math.floor(Math.random() * (10+difficulty)) + 1;
    b = Math.floor(Math.random() * (10+difficulty)) + 1;
    return (a + operator + b);
  }
}
function removeSprites(){
  for (var i = 0; i <= allSprites.length + 1; i++) {
    menuButtons[0].remove();
  }
}
function setup() {
  menuButtons = Group();
  createCanvas(windowWidth - 20,windowHeight - 20)
  // put setup code here
}

function draw() {
  if (inGame){
    background(50);
  }
  else{
    menu();
  }
  drawSprites();
}
function menu(){
  background(50);
  if(menuPage == 1){
    fill(255);
    textSize(90);
    textAlign(CENTER, CENTER);
    textFont("Faster One");
    text("MathRacer",width/2-10,90);
    if(runOnce == false){
        console.log("please dont tell me");
        startButton = createSprite(width/2, height-400);
        startButton.addImage("unpressed",startImg[0]);
        startButton.addImage("pressed",startImg[1]);
        startButton.onMousePressed = function() {
          this.changeImage("pressed");
        }
        startButton.onMouseReleased = function() {
          this.changeImage("unpressed");
          inGame = true;
          runOnce = false;
          removeSprites();
        }
        menuButtons.add(startButton);
        infoButton = createSprite(width/2, height-300);
        infoButton.addImage("unpressed",helpImg[0]);
        infoButton.addImage("pressed",helpImg[1]);
        infoButton.onMousePressed = function() {
          this.changeImage("pressed");
        }
        infoButton.onMouseReleased = function() {
          this.changeImage("unpressed");
          menuPage = 2;
          runOnce = false;
          removeSprites();
        }
        menuButtons.add(infoButton);
        optionsButton = createSprite(width/2, height-200);
        optionsButton.addImage("unpressed",optionsImg[0]);
        optionsButton.addImage("pressed",optionsImg[1]);
        optionsButton.onMousePressed = function() {
          this.changeImage("pressed");
        }
        optionsButton.onMouseReleased = function() {
          this.changeImage("unpressed");
          menuPage = 3;
          runOnce = false;
          removeSprites();
        }
        menuButtons.add(optionsButton);
        runOnce = true;

    }
  } else if(menuPage == 2){
      background(70);
  } else if(menuPage == 3){
      background(150);
  }
}
