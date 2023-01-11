function start (state,game){
  game.createWizard(state.wizard);
  window.requestAnimationFrame(gameLoop.bind(null,state,game))
}

function gameLoop (state,game){
  const {wizard}=state
  const {wizardElement}=game;
  
  // Move Wizard
   if (state.keys.KeyD){
    wizard.positionX+=4;
   }

  // Render
  wizardElement.style.left= wizard.positionX + 'px';

  window.requestAnimationFrame(gameLoop.bind(null,state,game))
}