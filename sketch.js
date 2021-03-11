var Play = 1;
var End = 0;
var gameState = Play;
var Ape, ApeRun, ApeEnd;
var Ground, Collider, Collider2, GImg, BackGround, BGImg;
var Banana, BananaGroup, BananaImg;
var Rock, RockImg, RockGroup;
var score;
var GameOver, GameOverImg;
function preload() {
ApeRun = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
ApeEnd = loadAnimation("sprite_2.png");
GImg = loadImage("ground.png");
BananaImg = loadImage("banana.png");
RockImg = loadImage("obstacle.png");
GameOverImg = loadImage("gameover.png");
BGImg = loadImage("backgroundImg.png");
}
function setup() {
createCanvas(600, 400);
Ape = createSprite(100, 350, 20, 50);
Ape.addAnimation("running", ApeRun);
Ape.addAnimation("stopped", ApeEnd);
Ape.scale = 0.25;
Ape.setCollider("rectangle", 0, 0, Ape.width - 5, Ape.height - 5)
Ground = createSprite(200, 400, 400, 20);
Ground.addImage("Ground", GImg);
Ground.x = Ground.width / 2;
GameOver = createSprite(300, 200);
GameOver.addImage(GameOverImg);
Collider = createSprite(200, 350, 400, 10);
Collider.visible = false;
RockGroup = createGroup();
BananaGroup = createGroup();
score = 0;

}

function draw() {
background(180);
textSize(30);
text("SurvivalTime: " + score, 50, 50);
if (gameState === Play) {
GameOver.visible = false;
Ground.velocityX = -(4 + 3 * score / 100)
score = score + Math.ceil(frameCount / 60);
if (score > 0 && score % 100 === 0) {
}
if (Ground.x < 0) {
Ground.x = Ground.width / 2;
}
Ape.velocityY = Ape.velocityY + 0.8;
if ((keyDown("space") || mousePressedOver(Ape)) && Ape.y < 345) {
Ape.velocityY = -20;
}
spawnBananas();
spawnRocks();
if (RockGroup.isTouching(Ape)) {
Ape.velocityY = -12;
gameState = End;
}
Ground.depth = Ape.depth;

}
else if (gameState === End) {
GameOver.visible = true;
Ape.changeAnimation("stopped", ApeEnd);
Ground.velocityX = 0;
Ape.velocityY = 0;
RockGroup.setLifetimeEach(-1);
BananaGroup.setLifetimeEach(-1);
RockGroup.setVelocityXEach(0);
BananaGroup.setVelocityXEach(0);
Banana.depth = GameOver.depth;
GameOver.depth = GameOver.depth + 1;
}
Ape.collide(Collider);
if (mousePressedOver(GameOver)) {
reset();
}
drawSprites();
}
function reset() {
gameState = Play;
score = 0;
GameOver.visible = false;
RockGroup.destroyEach();
BananaGroup.destroyEach();
Ape.changeAnimation("running", ApeRun);
}
function spawnRocks() {
if (frameCount % 300 === 0) {
Rock = createSprite(600, 290, 10, 40);
Rock.velocityX = -(6 + score / 100);
Rock.addImage(RockImg);
Rock.scale = 0.175;
Rock.lifetime = 300;
RockGroup.add(Rock);
}
}
function spawnBananas() {
if (frameCount % 80 === 0) {
Banana = createSprite(600, 120, 40, 10);
Banana.y = Math.round(random(175, 225));
Banana.addImage(BananaImg);
Banana.scale = 0.2;
Banana.velocityX = -3;
Banana.lifetime = 200;
Banana.depth = Ape.depth;
Ape.depth = Ape.depth + 1;
BananaGroup.add(Banana);
}
}