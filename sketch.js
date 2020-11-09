var highScore;
var inGame = false;
var runOnce = false;
var menuPage = 1;
var stats = []

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
   trackImg = loadImage("assets/Road/track1.png")
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
    allSprites[0].remove();
  }
}
function setup() {
  menuButtons = Group();
  createCanvas(windowWidth - 20,windowHeight - 20)
  // put setup code here
}

function draw() {
  stats = [];
  if (inGame){

    game();
  }
  else{
    menu();
  }
  drawSprites();
  showStats();
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
function capMomentum(sprite){
  if (sprite.angularMomentum > 0){
    sprite.angularMomentum -= 0.2;//0.2
  }else{
    if(sprite.angularMomentum < 0){
      sprite.angularMomentum += 0.2;//0.2
    }
  }
  if (sprite.angularMomentum > 4){
    sprite.angularMomentum = 4
  }
  if (sprite.angularMomentum < -4){
    sprite.angularMomentum = -4
  }
  sprite.rotation += sprite.angularMomentum;
}
function keyInput() {
  if (keyDown("d")){
    player.angularMomentum += 0.27;
    //spike.rotation += 3
  }
  if (keyDown("a")){
    player.angularMomentum -= 0.27;
    //spike.rotation -= 3;
  }
  if (keyDown("w")){
  player.setSpeed(sqrt(player.velocity.y**2+player.velocity.x**2)+0.2,player.rotation);
  }
  if (keyDown("space")){
  player.setSpeed(sqrt(player.velocity.y**2+player.velocity.x**2)-0.3,player.rotation);
  }

}
function showStats(){
  if(stats.length > 0 && stats != null){
    for (var i = 0; i < stats.length; i++) {
      textAlign(stats[i][0], stats[i][1]);
      fill(stats[i][4]);
      textSize(stats[i][5]);
      textFont(stats[i][6]);
      text(stats[i][7], camera.position.x - (width/2) +stats[i][2] , camera.position.y - (height/2) + stats[i][3]);
    }
  }
}
function addStats(allignmentX,allignmentY,positionX,positionY,color,fontSize,font,text){
  temp = [allignmentX,allignmentY,positionX,positionY,color,fontSize,font,text]
  stats.push(temp)
   //The 2 part add /show stats is needed to allow me to show text from within the game func
  //This is because otherwise the text will show behind sprites, which is not ideal
}
function game(){
  background(233,221,181);
  if(runOnce == false){
    camera.on();
    track = createSprite(1120 + (width/2),-500 + (height/2));
    track.addImage(trackImg);
    player = createSprite(width/2, height/2 + 200);
    player.addImage(carImg);
    player.friction = 0.02;
    player.scale = 0.2;
    player.angularMomentum = 0;
    player.rotation = -90;
    runOnce=true;
  }

  camera.position = player.position
  capMomentum(player);
  keyInput();
  if(!track.overlapPixel(player.position.x,player.position.y)){
    if(player.friction < 0.4){
      player.friction += 0.005
    }
    addStats(CENTER, CENTER, (width/2), (height/2),color(0,255,0),24,"Arial", "Off roading!");
  }
  else{
    player.friction = 0.02;
  }
  addStats(RIGHT, TOP, width-10, 10,255,12,"Arial", "X: " +Math.floor(player.position.x)+ " Y: "+ Math.floor(player.position.y));

}
