
let state=initState();
let game=initGameObject();

const availableKeys=[
  'KeyA',
  'KeyW',
  'KeyD',
  'KeyS',
  'Space',
  
];

document.addEventListener('keydown',(e)=>{
    if(availableKeys.includes(e.code)){
        state.keys[e.code]=true;
    }
   
})

document.addEventListener('keyup',(e)=>{
    if(availableKeys.includes(e.code)){
        state.keys[e.code]=false;
    }
 })

game.startScreen.addEventListener('click',(e)=>{
    console.log('start');
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden')

    // Start game
   start(state,game);
})

