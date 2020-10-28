var highScore;


function preload(){
  highScore = getItem('highScore');
   if (highScore === null) {
     highScore = 0;
   }

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
  createCanvas(windowWidth,windowHeight)
  // put setup code here
}

function draw() {
  console.log(eval(questionGen(4)));
}
