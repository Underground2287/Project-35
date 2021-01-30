var balloon;
var database;



function preload() {
  backgroundImg=loadImage("images/Hot Air Ballon-01.png");
  balloon1=loadAnimation("images/Hot Air Ballon-02.png",);
  balloon2=loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-02.png","images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png","images/Hot Air Ballon-04.png","images/Hot Air Ballon-04.png");

}



function setup() {
  createCanvas(500,500);
  balloon=createSprite(400, 200, 50, 50);
  balloon.addAnimation("hot air balloon",balloon1);
  balloon.scale=0.5;
  database=firebase.database();
  var locnode=database.ref("balloon/position");
  locnode.on("value",readOp,showError);



}

function draw() {
  background(backgroundImg);  
  

  if(keyDown(LEFT_ARROW)){
    updatePosition(-1,0);
    balloon.addAnimation("hot air balloon",balloon2);
}
else if(keyDown(RIGHT_ARROW)){
  updatePosition(1,0);
    balloon.addAnimation("hot air balloon",balloon2);
}
else if(keyDown(UP_ARROW)){
  updatePosition(0,-10);
    balloon.addAnimation("hot air balloon",balloon2);
    balloon.scale=balloon.scale-0.005;

}
else if(keyDown(DOWN_ARROW)){
  updatePosition(0,+10);
    balloon.addAnimation("hot air balloon",balloon2);
    balloon.scale=balloon.scale+0.005;
}
drawSprites();
textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

}

function updatePosition(x,y){
database.ref("balloon/position").set({
    'x':balloon.x+x,
    'y':balloon.y+y
})
}

function readOp(data) {
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}
function showError() {
    console.log("Error with database");
}