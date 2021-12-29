const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;


var bg_img;
var food;
var basket;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

var star_image
var star_1
var star_2

var balloon

var empty_star, one_star, two_star

var score

var tree


function preload()
{
  bg_img = loadImage('meadow_bg.jpg');
  food = loadImage('mango.png');

  


  tree = loadImage('tree.jpg');



  star_image = loadImage('star.png');

  basket = loadImage('basket.jpg');




}



function setup() 
{
  createCanvas(1000,1000);
  frameRate(80);


  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('sisscor_btn.jpg');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);


   score = createSprite(50, 20, 30, 30)
   score.scale = 0.2
   score.addAnimation('empty', empty_star)

   score.addAnimation('one', one_star)

   score.addAnimation('two', two_star)

   score.changeAnimation('empty')
 
   rope = new Rope(1,{x:110,y:90});
   

   star_1 = createSprite(280, 50, 20, 20);
   star_1.addImage(star_image);
   star_1.scale = 0.02

   star_2 = createSprite(50, 390, 20, 20);
   star_2.addImage(star_image);
   star_2.scale = 0.02

  
  ground = new Ground(250,950,2000,20);
 

  
  fruit = Bodies.circle(300,500,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
 
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,basket, 80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
  }

  if(fruit!=null && fruit.position.y>=950)
  {
    fruit=null;
   }
  if(collide(fruit, star_1, 20)==true) {
star_1.visible = false
score.changeAnimation('one')
  } 

  if(collide(fruit, star_2, 20)==true) {
    star_2.visible = false
    score.changeAnimation('two')
      } 
}

function drop()
{
  
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}


function collide(body,sprite, x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

