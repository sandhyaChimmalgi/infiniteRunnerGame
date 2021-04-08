var backImg , backgnd;
var player , player_running , player_fly , player_stop ;
var invisibleGround ;
var obstacle , obstacleImg;
var obstaclesGroup , coinsGroup , powerGroup ;
var score;
var over_text , gameOver , restart , restartButton;
var PLAY = 1;
var END = 0;
var gameState=PLAY;
var coin;
var power , booster ;
var timer = 5;
var flag = 0;


function preload(){
  backImg = loadImage("bg.jpg");
  player_running = loadAnimation("boy1.png" , "boy2.png" , "boy3.png" , "boy4.png" , "boy5.png");
  obstacleImg = loadImage("sign.png");
  over_text = loadImage("gameEnd.png");
  restartButton = loadImage("newButton.png");
  coin = loadImage("coin.png");
  player_fly = loadImage("fly.png");
  power = loadImage("booster.png");
  player_stop = loadImage("boy4.png");
  
  

}



function setup() {
  createCanvas(600,400);
  backgnd=createSprite(0,130,800,400);
  backgnd.addImage(backImg);
  backgnd.velocityX=-4;
  backgnd.x=backgnd.width/2;

  player = createSprite(80,300);
  player.addAnimation("Running",player_running);
  player.addAnimation("Dead",player_stop);
  player.addAnimation("flying",player_fly);
  player.scale= 0.5 ;
  player.setCollider("rectangle" , 0 ,0, player.width , player.height);
  //player.debug = true;


  invisibleGround = createSprite(300,350,600,20);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  coinsGroup = new Group();
  powerGroup = new Group();

  score=0;

  gameOver = createSprite(300,200);
  gameOver.addImage(over_text);
  gameOver.scale = 0.55;
  gameOver.visible = false;

  restart = createSprite(300,100);
  restart.addImage(restartButton);
  restart.scale = 0.4;
  restart.visible = false;

   

  
}

function draw() {
  background(220);  

  
  if(gameState===PLAY){
    
    if(backgnd.x<0){
      backgnd.x = backgnd.width/2;
      
    }
    if(keyDown("space")){
      player.velocityY = -15;

    }
    player.velocityY = player.velocityY+0.8;

    spawnObstacles();
    spawnCoins();
    spawnPower();

    

    if(player.isTouching(coinsGroup)){
      score = score+1
      coinsGroup.destroyEach();
    }
    if(player.isTouching(obstaclesGroup)&& flag === 0){
      gameState= END ;
      gameOver.visible = true;
      restart.visible = true;
    }

    if(player.isTouching(powerGroup)&& timer>0){
      //number();
      flag = 1;
      player.changeAnimation("flying",player_fly);
    }

    if(flag === 1){
      number();
      
    }

    if(timer<=0){
      flag=0;
      timer=5;
      player.changeAnimation("Running",player_running);
    }

 
  }

  

  

    if(gameState===END){
      player.velocityY=0;
      player.changeAnimation("Dead",player_stop);
      backgnd.velocityX=0;
      flag = 0;
      //score=0;
      //powerGroup.setLifetimeEach(0);
      //powerGroup.setVelocityXEach(0);
      //powerGroup.visible=false;
      powerGroup.destroyEach();
      //coinsGroup.setLifetimeEach(0);
      //coinsGroup.setVelocityXEach(0);
      //coinsGroup.visible=false;
      coinsGroup.destroyEach();
      //obstaclesGroup.setLifetimeEach(0);
      //obstaclesGroup.setVelocityXEach(0);
      //obstaclesGroup.visible=false;
      obstaclesGroup.destroyEach();
      //startButton.visible = false;

      if(mousePressedOver(restart)){
       
        reset();
      }
    }

    
    

    player.collide(invisibleGround);
 
  
    drawSprites();

    if(flag=== 1){
      textSize(50);
      fill("white")
      text(timer+"s",width-100,100);
    }
  
  textSize(18);
  textFont("Harlow solid italic");
  fill("#13F5A5");
  //textStyle(BOLD);
  text("Score : "+ score, 400,50);
  
}
function spawnObstacles(){
  if(frameCount % 300===0){
    var object = createSprite(700,310);
    object.addImage(obstacleImg);
    object.velocityX=-4;
    object.scale=0.14  ;
    object.lifetime=300 ;
    obstaclesGroup.add(object);
  }

}
function spawnCoins(){
  if(frameCount % 200===0){
    var money = createSprite(700,100);
    money.addImage(coin);
    money.velocityX = -4;
    money.scale = 0.1;
    money.lifetime = 200;
    coinsGroup.add(money);
    
  }
}

function spawnPower(){
  if(frameCount % 500===0){
    var boost = createSprite(600,100);
    boost.addImage(power);
    boost.velocityX = -4;
    boost.scale= 0.1;
    boost.lifetime = 200;
    powerGroup.add(boost)

  }
}
function reset(){
  
  gameState=PLAY;
  
  gameOver.visible=false;
  restart.visible=false;
  player.changeAnimation("Running",player_running);
  //player.velocityY=0;
  backgnd.velocityX=-5;
  score=0;
  
  
}

function number(){
 

  if(frameCount % 60 ==0 && timer>0){
    timer--;
  }



}