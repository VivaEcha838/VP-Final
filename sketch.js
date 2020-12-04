//Create variables here

var dog, doggy, happyDog, database, foodS, foodStock, uA;

var feed, addFood;

var fedTime, lastFed;

var foodObj;


function preload()
{
  //load images here
  dog = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();

  

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  doggy = createSprite(200,250,20,20);
  doggy.addImage("dog",dog);
  doggy.addImage("happyDog", happyDog);

  doggy.scale = 0.1; 

  foodStock = database.ref('Food');
 foodStock.on("value", readStock, showError);

 foodObj = new Food();

 

  
}


function draw() {  
  background(46,139,87);



fedTime = database.ref('feedTime')
fedTime.on("value",function(data){
 lastFed=data.val();
 });
  fill(255,255,254); 
 textSize(15);
  if(lastFed>=12){
text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
}else if(lastFed==0){ 
text("Last Feed : 12 AM",350,30);
 }else{ 
text("Last Feed : "+ lastFed + " AM", 350,30); 
}

  

   
  
  textSize(16);
  fill("red");
stroke("green");
  text("Food Remaining: " + foodS, 250,125);
  

  drawSprites();
  //add styles here

  fedTime = database.ref('feedTime');
 fedTime.on("value", function(data){
   lastFed = data.val();
 })
  
 foodObj.display();


}
function readStock(data){
  foodS = data.val();
  console.log(foodS);
  foodObj.updateFoodStock(foodS);
}
function showError(){
  console.log("error")
}

function writeStock(x){

if(x<=0){
  x=0;
}else{
  x=x-1; 
}

  database.ref('/').update({
    Food : x
  })
}

function feedDog(){
  doggy.changeImage("happyDog",happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}





