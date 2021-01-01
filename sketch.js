var tower, door, ghost, climber, invisBlock;
var towerImg, doorImg, ghostImg, climberImg;
var doorG, climberG, invisBlockG;
var gameSound;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-standing.png");
  climberImg = loadImage("climber.png");
  gameSound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  
  //gameSound.loop();
  
  tower = createSprite(300, 300, 600, 600);
  tower.addImage("tower image", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost standing", ghostImg);
  ghost.scale = 0.4;
  
  doorG = new Group();
  climberG = new Group();
  invisBlockG = new Group();
}

function draw(){
  background(0);
  
  if(gameState == "play"){
    if(tower.y > 400){
      tower.y = 300;
    }

    if(keyDown("space")){
      ghost.velocityY = -10;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 5;
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 5;
    }

    ghost.collide(climberG);

    if(invisBlockG.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();
    drawSprites();
  }
  
  if(gameState == "end"){
    textSize(100);
    fill("red");
    text("Game Over", 40, 300); 
  }
}

function spawnDoors(){
  if(frameCount % 300 == 0){
    door = createSprite(200, -50, 25, 25);
    climber = createSprite(200, 10, 10, 10);
    invisBlock = createSprite(200, 15, 50, 5);
    
    invisBlock.visible = false;
    
    invisBlock.width = climber.width;
    
    door.addImage("door image", doorImg);
    climber.addImage("climber image", climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisBlock.velocityY = 1;
    
    door.x = Math.round(random(100, 400));
    climber.x = door.x;
    invisBlock.x = door.x;
    
    door.lifetime = 800;
    climber.lifetime = 750;
    invisBlock.lifetime = 750;
    
    door.depth = ghost.depth
    ghost.depth += 1;
    
    doorG.add(door);
    climberG.add(climber);
    invisBlockG.add(invisBlock);
  }
}