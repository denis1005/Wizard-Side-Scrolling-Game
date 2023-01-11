function start (state,game){
  game.createWizard(state.wizard);
  window.requestAnimationFrame(timestamp=>gameLoop(state,game,timestamp))
}

function gameLoop (state,game,timestamp){
  
  
  const {wizardElement}=game;
  const {wizard}=state

  // Spawn Bugs
  if (timestamp>state.bugStats.nextSpawn){
    game.createBug(state.bugStats);
    state.bugStats.nextSpawn=timestamp + Math.random()*state.bugStats.maxSpawnPeriod;
  }

 
  
  // Move Wizard
  modifyWizardPosition(state,game,wizard)
  
   //Render Bugs
   document.querySelectorAll('.bug').forEach(bug=>{
      let posX=parseInt(bug.style.left);
      if (posX>0){
        bug.style.left=posX - state.bugStats.speed + 'px';
      }else {
        bug.remove()
      }
     
   })

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