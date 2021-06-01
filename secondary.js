let lastPaintTime = 0;
let speed = 5;
let snakePosition = [{ x: 13, y: 12 }];
let foodPosition = { x: 3, y: 5 };
let board = document.getElementById('board');
let inputDir = { x: 0, y: 0 };
let score = 0 ;
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

function main(timestamp) {
    window.requestAnimationFrame(main);
    if ((timestamp - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = timestamp;
    // console.log(timestamp);
    gameEngine();
}
function isCollide(){
    if(snakePosition[0].x >= 18 || snakePosition[0].y >= 18 || snakePosition[0].x <=0 || snakePosition[0].y <=0){
        return true ;
    }

    for(let i = 1 ; i < snakePosition.length ; i++){
        if(snakePosition[0].x === snakePosition[i].x && snakePosition[0].y === snakePosition[i].y){
            return true ;
        }
    }
    return  false ;

}
function gameEngine() {  
    // game over or collision condition
    if(isCollide()){
        gameOverSound.play() ;
        musicSound.pause() ;
        alert('GAME OVER!!!')
        score  = 0 ;
        inputDir = {x: 0 , y: 0};
        snakePosition = [{ x: 10 , y: 10}];
    }

    // ab snake ko khana kilao
    if(foodPosition.x == snakePosition[0].x && foodPosition.y == snakePosition[0].y){
        // foodSound.play();
        foodSound.play() ;
        score++ 
        snakePosition.unshift({x: snakePosition[0].x+inputDir.x  , y: snakePosition[0].y+inputDir.y});
        foodPosition.x = Math.round(Math.random() * (16 - 2) + 2);
        foodPosition.y = Math.round(Math.random() * (16 - 2) + 2);

        console.log(foodPosition) ;
        console.log(snakePosition[0]);
    }
    //moving snake 
    for (let i = snakePosition.length - 2; i >= 0; i--) {
        snakePosition[i + 1] = { ...snakePosition[i] };
    }
    snakePosition[0].x = snakePosition[0].x + inputDir.x;
    snakePosition[0].y = snakePosition[0].y + inputDir.y;



    //display sanke ki mundii ;
    board.innerHTML = "";
    snakePosition.forEach((e, i) => {
        var element = document.createElement('div');
        element.style.gridRowStart = e.y;
        element.style.gridColumnStart = e.x;
        if (i === 0) {
            element.classList.add('head');
        } else {
            element.classList.add('snake');
        }

        board.appendChild(element);
    });
    // display food 

    var foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// var element = document.createElement('div') ;






//main logic 


window.requestAnimationFrame(main);
window.addEventListener('keydown', function (event) {
    
    moveSound.play();
    musicSound.play() ;
    switch (event.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});