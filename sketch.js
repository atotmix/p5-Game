var highScore;
var score = 0;
var inGame = false;
var runOnce = false;
var menuPage = 1;
var stats = []
var boxtext = []
var lastOnTrack;
var endScreen = false;
function preload(){
  highScore = getItem('highScore');
   if (highScore === null) {
     highScore = 0;
   }
   carImg = loadImage("assets/Car.png");
   boxImg = loadImage("assets/Emoji/1F7E5.png");
   treeImg = loadImage("assets/Emoji/1F334.png");
   crossImg = loadImage("assets/Emoji/274C.png");
   tickImg = loadImage("assets/Emoji/2714.png");
   endFlagImg = loadImage("assets/Emoji/1F3C1.png");
   startImg = [loadImage("assets/Buttons/start1.png"),loadImage("assets/Buttons/start2.png")]
   helpImg = [loadImage("assets/Buttons/help1.png"),loadImage("assets/Buttons/help2.png")]
   optionsImg = [loadImage("assets/Buttons/opt1.png"),loadImage("assets/Buttons/opt2.png")]
   retryImg = [loadImage("assets/Buttons/retry1.png"),loadImage("assets/Buttons/retry2.png")]
   trackImg = loadImage("assets/Road/track1.png");
   engineSound = loadSound("assets/Sounds/Engine.ogg")
   boxSound = [loadSound("assets/Sounds/Correct.ogg"),loadSound("assets/Sounds/Incorrect.ogg")]
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
function setup() {
  menuButtons = Group();
  cactus = Group();
  boxes = Group();
  correctBoxes = Group();
  incorrectBoxes = Group();
  createCanvas(windowWidth - 20,windowHeight - 20);
  // put setup code here
}

function draw() {
  stats = [];
  if (inGame){
    game();
  } else if (endScreen) {
    fEndScreen();
  }
  else{
    menu();
  }
  drawSprites();
  showBoxText();
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
          allSprites.removeSprites();
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
          allSprites.removeSprites();
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
          allSprites.removeSprites();
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

function fEndScreen(){
  background(50);
  fill(255);
  textSize(90);
  textAlign(CENTER, CENTER);
  textFont("Arial");
  text("Whoops!",width/2-10,90);
  if(runOnce == false){
      tryAgian = createSprite(width/2, height-400);
      tryAgian.addImage("unpressed",retryImg[0]);
      tryAgian.addImage("pressed",retryImg[1]);
      tryAgian.onMousePressed = function() {
        this.changeImage("pressed");
      }
      tryAgian.onMouseReleased = function() {
        this.changeImage("unpressed");
        endScreen = false;
        runOnce = false;
        allSprites.removeSprites();
      }
    }
    runOnce = true;
  }
function capMomentum(sprite){
  if (sprite.angularMomentum > 0){
    sprite.angularMomentum /=1.12;//0.2
  }else{
    if(sprite.angularMomentum < 0){
      sprite.angularMomentum /= 1.12;//0.2
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
    player.angularMomentum += 0.3;

  }
  if (keyDown("a")){
    player.angularMomentum -= 0.3;

  }
  if (keyDown("w")){
  player.setSpeed(sqrt(player.velocity.y**2+player.velocity.x**2)+0.2,player.rotation);
  }
  if (keyDown("space")){
  player.setSpeed(sqrt(player.velocity.y**2+player.velocity.x**2)+0.1,player.rotation +180);
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
function showBoxText(){
  if(boxtext.length > 0 && boxtext != null){
    for (var i = 0; i < boxtext.length; i++) {
      textAlign(boxtext[i][0], boxtext[i][1]);
      fill(boxtext[i][4]);
      textSize(boxtext[i][5]);
      textFont(boxtext[i][6]);
      text(boxtext[i][7], boxtext[i][2], boxtext[i][3]);
    }
  }
}
function addStats(allignmentX,allignmentY,positionX,positionY,color,fontSize,font,text){
  temp = [allignmentX,allignmentY,positionX,positionY,color,fontSize,font,text];
  stats.push(temp);
   //The 2 part add /show stats is needed to allow me to show text from within the game func
  //This is because otherwise the text will show behind sprites, which is not ideal
}
function genAnsArray(diff){
  question = questionGen(diff);
  answer = eval(question);
  question = question.replace("/","÷");
  question = question.replace("*","×");
  (Math.round(Math.random())) ? fakeAns1 = answer - (Math.floor(Math.random() * 6)+1) : fakeAns1 = answer + (Math.floor(Math.random() * 6)+1);
  (Math.round(Math.random())) ? fakeAns2 = answer + (Math.floor(Math.random() * 6)+1) : fakeAns2 = answer - (Math.floor(Math.random() * 6)+1);

  switch (Math.floor(Math.random()*3)){
    case 0: return [answer,fakeAns1,fakeAns2,0,question];
    break;
    case 1: return [fakeAns1,answer,fakeAns2,1,question];
    break;
    case 2: return [fakeAns1,fakeAns2,answer,2,question];
    break;
  }
}
function correctAns(){
  console.log("collided with correct answer")
}
function spawnBoxes(x,y,side){
  array = genAnsArray(3);
  for(i = 0; i < 3; i++){
    spr = createSprite(x+(i+1)*95,y);
    spr.addImage(boxImg);
    spr.runOver = false;
    boxtext.push([CENTER,CENTER,(x+(i+1)*95), y,255,20,"Arial",array[i]]);
    if (array[3] == i){
      correctBoxes.add(spr);
    } else {
      incorrectBoxes.add(spr);
    }
    boxes.add(spr);
  }
  if( side==BOTTOM ){
    boxtext.push([CENTER,CENTER,x+190,y+70,255,18,"Arial",array[4]]);
  } else if (side == TOP) {
    boxtext.push([CENTER,CENTER,x+190,y-70,255,18,"Arial",array[4]]);
  }
}
function onBoxHit(goodOrBad){
  for(i = 0; i < 3; i++){
    boxes[0].remove();
  }
  boxtext=boxtext.slice(4)
  if(goodOrBad == 0){
    score++;
  }else{
    //show cross on screen or something idk
  }
  boxSound[goodOrBad].play();
}
function respawnBoxes(){
      spawnBoxes(width/2 - 185, height/2 - 100,BOTTOM);//DUE TO THE WAY I HAVE CODED THIS, THESE NEED TO BE IN ORDER OF WHEN YOU HIT THEM.
      spawnBoxes(width/2 - 185, height/2 - 950,BOTTOM);
      spawnBoxes(width/2 + 2060, height/2 - 900,TOP);
      spawnBoxes(width/2 + 2060, height/2 - 50,TOP);
      spawnBoxes(width/2 + 1630, height/2 - 400,BOTTOM);
      spawnBoxes(width/2 + 755, height/2 - 700,BOTTOM);
}
function game(){
  background(233,221,181);
  if(runOnce == false){
    laps = 0;
    score = 0;
    halfwayPointHit = false;
    camera.on();
    track = createSprite(1120 + (width/2),-500 + (height/2));
    track.addImage(trackImg);
    player = createSprite(width/2, height/2 + 200);
    player.addImage(carImg);
    player.friction = 0.02;
    player.scale = 0.2;
    player.angularMomentum = 0;
    player.rotation = -90;
    halfwayPoint = createSprite(width/2 + 2260, height/2 - 500,350,50)
    halfwayPoint.shapeColor = color(0,0,0,0)
    flag1 = createSprite(width/2 - 185, height/2 +100);
    flag1.addImage(endFlagImg);
    flag2 = createSprite(width/2 + 190, height/2 +100);
    flag2.addImage(endFlagImg);
    flag2.mirrorX(-1);
    finishLine = createSprite(width/2, height/2 +120,380,50);
    finishLine.shapeColor = color(0,0,0,0);
    respawnBoxes();

    runOnce=true;
  }
  for(i = 0; i < correctBoxes.length; i++){
    if(correctBoxes[i].overlapPixel(player.position.x,player.position.y) && correctBoxes[i].runOver == false){
      correctBoxes[i].runOver = true;
      console.log("ye");
      onBoxHit(0);
    }
  }
  for(i = 0; i < incorrectBoxes.length; i++){
    if(incorrectBoxes[i].overlapPixel(player.position.x,player.position.y) && incorrectBoxes[i].runOver == false){
      incorrectBoxes[i].runOver = true;
      onBoxHit(1);
      console.log("no");
    }
  }
  camera.position = player.position
  capMomentum(player);
  keyInput();
  if(player.overlap(halfwayPoint)){
    halfwayPointHit = true;
  }
  if(player.overlap(finishLine) && halfwayPointHit == true){
    respawnBoxes();
    halfwayPointHit = false;
    laps++;

  }

  if(!track.overlapPixel(player.position.x,player.position.y)){
    if(Date.now() - lastOnTrack > 34){
      if(player.friction < 0.2){
        player.friction += 0.005
      }
      addStats(CENTER, CENTER, (width/2), (height/2),color(255,0,0),24,"Arial", "Get back on the track!");
      countdown = 11 + Math.floor((lastOnTrack - Date.now()) / 1000)
      addStats(CENTER, CENTER, (width/2), (height/2) + 30,color(255,0,0),24,"Arial", "Restarting in: " +  countdown);
      if(countdown == -1){
        endGame();
      }
    }
  }
  else{
    player.friction = 0.02;
    lastOnTrack = Date.now();
  }
  addStats(RIGHT, TOP, width-10, 10,255,12,"Arial", "X: " +Math.floor(player.position.x)+ " Y: "+ Math.floor(player.position.y));
  addStats(LEFT, TOP, 10, 10,0,22,"Arial", "Score: " + score);
  addStats(LEFT, TOP, 10, 40,0,22,"Arial",  laps + "/3 Laps");

}
function endGame(){
  camera.position.x = width/2;
  camera.position.y = height/2;
  inGame = false;
  runOnce = false;
  endScreen = true;
  boxtext = []
  allSprites.removeSprites();//dead
  return "Ended :)"
}
function windowResized() {
  resizeCanvas(windowWidth - 20,windowHeight - 20);
}
