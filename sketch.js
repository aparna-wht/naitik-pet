//Create variables here
var dog,dogImg,dogImg1;
var food,foodStock;
var database;
var foods;
var lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  dogImg1 = loadImage("happydog.png");
}

function setup() {
  createCanvas(800, 700);
  
  database = firebase.database();

  dog = createSprite(500,200,150,150);
  dog.scale = 0.4;
  dog.addImage(dogImg);

  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed =createButton("Feed The Dog!");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  //textSize(20);
}


function draw() {  
background("pink");
foodObj.display();
fedTime = database.ref('FeedTime');
fedTime.on("value",function(data)
{
  lastFed = data.val();
});

if(lastFed>=12)
{
   text("Last Fed:"+lastFed%12+"PM",350,30);
}
else if(lastFed==0)
{
   text("Last Fed: 12AM",350,30);
}
else
{
  text("Last Fed: "+lastFed+"AM",350,30);
}

  drawSprites();
  
  //add styles here

}

function readStock(data)
{
   foods = data.val();
   foodObj.updateFoodStock(foods);
}
 
function feedDog()
{
   dog.addImage(dogImg1);
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
     Food : foodObj.getFoodStock(),
     feedTime : hour() 
   });
   
}

function addFoods()
  {
     foods++;
     database.ref('/').update({
       Food : foods
     });
  }