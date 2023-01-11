let state=initState();
let game=initGameObject();

game.startScreen.addEventListener('click',(e)=>{
    console.log('start');
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden')
})