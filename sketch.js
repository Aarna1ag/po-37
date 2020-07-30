
var PLAY=1;
var END=0;

var gameState=PLAY;

var boy, boyImg;
var  invisibleGround;

var ballsGroup, ballImage;
var obstaclesGroup, obstacle1, obstacle2;

var score;

var gameOver,gameOverImage;
var restart,restartImage;
var bg;


function preload(){
  //trex_running = loadAnimation("trex running(2).jpg");
 
  backgroundImg=loadImage("background.jpeg")
 // groundImage = loadImage("ground.png");
  
  ballImage = loadImage("ball.png");
  
  obstacle1 = loadImage("sObstacle.png");
    
  obstacle2 = loadImage("bObstacle.png");
   
 // obstacle3 = loadImage("mushroom.jpg");
boyImg=loadImage("boy.png");
 
 
  
  gameOverImage = loadImage("gameOver.jpeg");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth-20,900);
  
 boy = createSprite(100,450,20,50);
  
  boy.addImage(boyImg);
  boy.scale = 0.5;
  

  //ground = createSprite(200,590,3100,20);
 //ground.shapeColor="yellow";
 // ground.x = ground.width /2;
 
  invisibleGround = createSprite(200,890,3100,10);
  invisibleGround.visible = false;


  
  ballsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(900,300,displayWidth-20,90);
  gameOver.addImage("g",gameOverImage);
  gameOver.scale=2.90;
  gameOver.visible=false;
  
  restart = createSprite(800,650);
  restart.addImage("r",restartImage);
  restart.scale=1;
  restart.visible=false;
  
  score = 0;
}

function draw() {
  if(backgroundImg)
  background(backgroundImg);
  getBackgroundImage();
  
 fill ("orange")
 textSize (28);
  text("Score: "+ score, 1540,50);
  
  
  if(gameState===PLAY){
    
     score = score + Math.round(getFrameRate()/60);
    //  ground.velocityX = -(6+3*score/100);
    
   //  if(keyDown("space")) {
    //trex.velocityY = -10;
  //}
 // camera.position.x=boy.x;
  boy.velocityY = boy.velocityY + 0.8;
 //  if (ground.x < 0){
   // ground.x = ground.width/2;
 // }
  spawnBalls();
  spawnObstacles();
   if( obstaclesGroup.isTouching(boy)){
     gameState=END;
     
   }
   if( ballsGroup.isTouching(boy)){
    gameState=END;
    
  }
  if(keyDown("space") && boy.y >= 700){
    boy.velocityY = -20 ;
  //  playSound("jump.mp3");
  }

  }
  
  else if(gameState===END){
    
  //  ground.velocityX=0;
    boy.visible=false;
   // obstacle.visible=false;
    //cloud.visible=false;
    gameOver.visible=true;
    restart.visible=true;
    //change the animation
  //  trex.changeAnimation("trex_collided",trex_collided);
    //set velocity groups to zero
    obstaclesGroup.setVelocityXEach(0);
    ballsGroup.setVelocityXEach(0);
    //set lifetime to the obstacles to never disappear
    obstaclesGroup.setLifetimeEach(-1);
    ballsGroup.setLifetimeEach(-1);


    if(mousePressedOver(restart)){
      
       reset();
      // camera.position.x=displayWidth-20;
       //camera.position.y=trex.y;
       
    }
   
  }
  
 boy.collide(invisibleGround);
  
  drawSprites();
}

function spawnBalls() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var ball = createSprite(1500,150,40,40);
    ball.y = Math.round(random(80,120));
    ball.addImage(ballImage);
    ball.scale = 1;
    ball.velocityX = -3;
    
     //assign lifetime to the variable
    //cloud.lifetime = 200;
    
    //adjust the depth
    ball.depth = boy.depth;
    boy.depth = boy.depth + 1;

   ball.debug=false;
    ball.setCollider("rectangle",0,0,70,498);
    
    //add each cloud to the group
    ballsGroup.add(ball);
  }
  
}

function spawnObstacles() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(1500,820,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacle1);
    obstacle.debug=false;
    obstacle.setCollider("rectangle",50,70);
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
     // case 3: obstacle.addImage(obstacle3);
           //   break;
   //   case 4: obstacle.addImage(obstacle4);
       //       break;
   //   case 5: obstacle.addImage(obstacle5);
     //         break;
    //  case 6: obstacle.addImage(obstacle6);
     //         break;
      default: break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
   // obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  boy.visible=true;
  obstaclesGroup.destroyEach();
  ballsGroup.destroyEach();
 // trex.changeAnimation("running",trex_running);
  score=0;

  
}
async function getBackgroundImage(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responsejson = await response.json();
  var datetime = responsejson.datetime
  var hour = datetime.slice(11,13);
if (hour>=06 && hour<=19){
  
  bg="background.jpeg"

  
}
else{

bg ="night.jpeg"

}
backgroundImg = loadImage(bg);

}

