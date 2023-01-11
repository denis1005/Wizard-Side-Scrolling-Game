function start (state,game){
  window.requestAnimationFrame(gameLoop.bind(null,state,game))
}

function gameLoop (state,game){
  console.log('frame')

  window.requestAnimationFrame(gameLoop.bind(null,state,game))
}