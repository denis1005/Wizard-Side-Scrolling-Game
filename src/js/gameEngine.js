function start (state,game){
  game.createWizard(state.wizard);
  window.requestAnimationFrame(gameLoop.bind(null,state,game))
}

function gameLoop (state,game){
  
  const {wizardElement}=game;
  const {wizard}=state

  // Spawn Bugs
  game.createBug(state.bugStats);
  
  // Move Wizard
  modifyWizardPosition(state,game,wizard)


  // Render
  renderWizardMovement(wizardElement,wizard)
  

  window.requestAnimationFrame(gameLoop.bind(null,state,game))
}


function modifyWizardPosition(state,game,wizard){
 

    if (state.keys.KeyD){
    wizard.positionX=Math.min(wizard.positionX + wizard.speed, game.gameScreen.offsetWidth - wizard.width-1)
   }

   if (state.keys.KeyW && wizard.positionY - wizard.speed>0){
    wizard.positionY-=wizard.speed;
   }

   if (state.keys.KeyS){
    wizard.positionY=Math.min(wizard.positionY + wizard.speed, game.gameScreen.offsetHeight - wizard.height)
   }

   if (state.keys.KeyA && wizard.positionX - wizard.speed>0) {
    wizard.positionX-=wizard.speed;
   }
}

function renderWizardMovement(wizardElement,wizard){
  wizardElement.style.left= wizard.positionX + 'px';
  wizardElement.style.top= wizard.positionY + 'px';
  wizardElement.style.bottom= wizard.positionY + 'px';
  wizardElement.style.right= wizard.positionX + 'px';
}