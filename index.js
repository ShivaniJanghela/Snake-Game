// variables
const move = new Audio("move.mp3")
const music = new Audio("music.mp3")
const foodSound = new Audio("food.mp3")
const gameover = new Audio("gameover.mp3");


let inputDir = {x:0,y:0};
let board = document.querySelector(".board");
let highScore = document.querySelector("#highScore");
let yourScore = document.querySelector("#yourScore");
let hiscoreval=0;
let speed=8;
let lastPaintTime=0;
let score=0;
bonus={x:-1,y:-1};
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};
// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
     if((ctime-lastPaintTime)/1000<1/speed)
     {
        return;
     }
     lastPaintTime=ctime;
     gameEngine();
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
function gameEngine(){
    // part1 : updating snake array and food variable
    if(isCollide(snakeArr)){
        gameover.play();
        // music.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        // music.play();
        score = 0; 
    }

// when food is eaten,increment the score and regenerate the food.
if(snakeArr[0].x===food.x&&snakeArr[0].y===food.y)
{   foodSound.play();
    score+=1;
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        highScore.innerHTML = "High Score: " + hiscoreval;
    }
    yourScore.innerHTML=" Your score: "+ score;
    
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y +inputDir.y})
    let a=2;
    let b=16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}//generate random number  between a and b

}
// when bonus food is eaten,increment the score
if(snakeArr[0].x===bonus.x&&snakeArr[0].y===bonus.y)
{   foodSound.play();
    score+=4;
  
    
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        highScore.innerHTML = "High Score: " + hiscoreval;
    }
    yourScore.innerHTML=" Your score: "+ score;
    
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y +inputDir.y})
    bonus ={x:-1,y:-1};


}

//moving the snake(move each body box to its next body box)
for(let i=snakeArr.length-2;i>=0;i--)
{
    snakeArr[i+1]={...snakeArr[i]};
}
snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;


// part2 : diaplay snake and food
     // Display the snake
    
     board.innerHTML = "";
     snakeArr.forEach((e, index)=>{
       let snakeElement = document.createElement('div');
         snakeElement.style.gridRowStart = e.y;
         snakeElement.style.gridColumnStart = e.x;
 
         if(index === 0){
             snakeElement.classList.add('snakeHead');
         }
         else{
             snakeElement.classList.add('snakeBody');
         }
         board.appendChild(snakeElement);
     });
     // Display the food
     let foodElement = document.createElement('div');
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food')
     board.appendChild(foodElement);
 
//  display bonus
 let bonusElement=document.createElement('div');
 
 bonusElement.style.gridRowStart = bonus.y;
 bonusElement.style.gridColumnStart = bonus.x;
 bonusElement.classList.add('bonus')
 bonusElement.classList.add('blink')


 board.appendChild(bonusElement);


 }
  
// main logic starts here
setInterval(function(){
   if(bonus.x===-1&&bonus.y===-1)
   { a=3;
     b=15;
    bonus = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}//generate random number  between a and b
    
   }
   else{
    bonus ={x:-1,y:-1};
   }
    // board.appendChild(bonusElement)
},17000)
// music.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highScore.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir ={x:0,y:1};//game will start when any key is pressed
    move.play();
    switch(e.key)
    {
    case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x=0;
        inputDir.y=-1;
        break;

    case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x=0;
        inputDir.y=1;
        break;

    case "ArrowLeft":
        console.log("Arrow Left")
        inputDir.x=-1;
        inputDir.y=0;
        break;

    case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x=1;
        inputDir.y=0;
        break;
    }
    

}
//bonus

);

         