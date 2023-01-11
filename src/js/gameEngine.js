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

   if (state.keys.KeyW){
    wizard.positionY-=4;
   }

   if (state.keys.KeyS){
    wizard.positionY+=4;
   }

   if (state.keys.KeyA){
    wizard.positionX-=4;
   }

  // Render
  wizardElement.style.left= wizard.positionX + 'px';
  wizardElement.style.top= wizard.positionY + 'px';
  wizardElement.style.bottom= wizard.positionY + 'px';
  wizardElement.style.right= wizard.positionY + 'px';
  

  window.requestAnimationFrame(gameLoop.bind(null,state,game))
}