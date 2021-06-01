//game constants
var inputDir = { x: 0 , y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let snakePosition = [{ x: 10 , y: 10}] ;
let foodPosition = {x: 12 , y: 13} ;
var board = document.getElementById('board') ;
let speed = 5 ;
var score = 0 ;
let scr = document.getElementById('score');

var highScore = 0 ;
var highScr = document.getElementById('high-score') ;

if(localStorage.getItem('hs') == undefined){
    localStorage.setItem('hs' , highScore) ;
}
highScr.innerHTML = "HighScore: " + localStorage.getItem('hs') ;

let lastPaintTime = 0;

//Game functions 

function main(ctime){
    window.requestAnimationFrame(main);
   
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime = ctime ; // lasttime = 5000  ctime - 5000
    
    gameEngine() ;
}
function isCollide(sa){
    if(sa[0].x >= 18 || sa[0].x <= 0  || sa[0].y >= 18 || sa[0].y <= 0){
        return true ;
    }
    for (let i = 1; i < sa.length ; i++) {
        if(sa[0].x === sa[i].x  && sa[0].y === sa[i].y)
        {
            return true ;
        }
    } 
    return false ;
}
function gameEngine() {
    //updating sanke array 
    if(isCollide(snakePosition)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0 , y: 0};
        
        if(score > highScore){
            highScore = score ;
            localStorage.setItem('hs' , highScore) ;
        }
        alert('Game over!!');
        score = 0 ;
        scr.innerText = "Score: " + score ;
        highScr.innerText = "High-Score: " + localStorage.getItem('hs') ;
        snakePosition = [{ x: 10 , y: 10}];
        musicSound.play();
    }

    //food is eaten and regenerate food 
    if(foodPosition.x === snakePosition[0].x && foodPosition.y === snakePosition[0].y){
        foodSound.play();
        score = score + 1 ;
        scr.innerText = "Score: " + score ;
        snakePosition.unshift({x: snakePosition[0].x+inputDir.x  , y: snakePosition[0].y+inputDir.y});
        foodPosition.x = Math.round(Math.random() * (16 - 2) + 2);
        foodPosition.y = Math.round(Math.random() * (16 - 2) + 2);
    }
    ///moving the snake 
    for (let i = snakePosition.length - 2; i >= 0; i--) {
        snakePosition[i+1] = {...snakePosition[i]};
    }
    snakePosition[0].x += inputDir.x ;
    snakePosition[0].y += inputDir.y ;

    // console.log(snakePosition);


    //display snake and food
    board.innerHTML = "";
    snakePosition.forEach((e , index)=>{
        var snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y ;
        snakeElement.style.gridColumnStart = e.x ;
       
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement) ;
    });

    var foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodPosition.y ;
    foodElement.style.gridColumnStart = foodPosition.x ;
    foodElement.classList.add('food') ;
    board.appendChild(foodElement) ;
}










//main logic work
window.requestAnimationFrame(main);
window.addEventListener('keydown' , (e)=>{
    inputDir = {x: 0 , y: 1} ;
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            // console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            // console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
    
    
});