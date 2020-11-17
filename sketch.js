var highScore;
var inGame = false;
var runOnce = false;
var menuPage = 1;
var stats = []
var boxtext = []
var lastOnTrack;
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

function setup() {
  menuButtons = Group();
  cactus = Group();
  createCanvas(windowWidth - 20,windowHeight - 20);
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
function spawnBoxes(x,y,rotated, Group){
  question = questionGen(1);
  answer = eval(question);
  fakeAnswers = [answer + (Math.floor(Math.random() * 4)+1),
    answer - (Math.floor(Math.random() * 4)+1),
    answer - (Math.floor(Math.random() * 4)+1)]// do a nicer version
  for(i = 0; i < 3; i++){
    spr = createSprite(x+(i+1)*95,y);
    spr.addImage(boxImg);
    boxtext.push([CENTER,CENTER,(x+(i+1)*95), y,255,17,"Arial",fakeAnswers[i]]);

  }

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
/*    for(var i = 0; i < 64; i++){
      posx = Math.floor(random(304,3493));
      posy = Math.floor(random(-1758,1237));
      if(!track.overlapPixel(posx+151,posy+226)){
        var spr = createSprite(posx,posy);
        spr.addImage(treeImg);
        cactus.add(spr);
      }
      else{
        console.log("Skipped")
      }
    }*/
    spawnBoxes(width/2 - 180, height/2 - 100);
    runOnce=true;
  }

  camera.position = player.position
  capMomentum(player);
  keyInput();
  if(!track.overlapPixel(player.position.x,player.position.y)){
    if(Date.now() - lastOnTrack > 34){
      if(player.friction < 0.2){
        player.friction += 0.005
      }
      addStats(CENTER, CENTER, (width/2), (height/2),color(255,0,0),24,"Arial", "Get back on the track!");
      countdown = 11 + Math.floor((lastOnTrack - Date.now()) / 1000)
      addStats(CENTER, CENTER, (width/2), (height/2) + 30,color(255,0,0),24,"Arial", "Restarting in: " +  countdown);
      if(countdown == -1){
        camera.position.x = width/2;
        camera.position.y = height/2;
        inGame = false;
        runOnce = false;
        boxtext = []
        allSprites.removeSprites();//dead
      }
    }
  }
  else{
    player.friction = 0.02;
    lastOnTrack = Date.now();
  }
  addStats(RIGHT, TOP, width-10, 10,255,12,"Arial", "X: " +Math.floor(player.position.x)+ " Y: "+ Math.floor(player.position.y));
}
