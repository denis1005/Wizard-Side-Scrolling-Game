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

  //Shooting

  if (state.keys.Space){
      game.wizardElement.style.backgroundImage=`url('./images/wizard-fire.png')`
      game.createFireball(wizard,state.fireballStats);
   
  }else{
    game.wizardElement.style.backgroundImage=`url('./images/wizard.png')`
  }

  //Render Fireballs 
  document.querySelectorAll('.fireball').forEach(fireball=>{
    let posX=parseInt(fireball.style.left);
    if (posX > game.gameScreen.offsetWidth - state.fireballStats.width-2){
      fireball.remove()
    }else {
      
      fireball.style.left=posX + state.fireballStats.speed + 'px';
    }
   
 })

  
   //Render Bugs
   document.querySelectorAll('.bug').forEach(bug=>{
      let posX=parseInt(bug.style.left);
      if (posX>0){
        bug.style.left=posX - state.bugStats.speed + 'px';
      }else {
        bug.remove()
      }
     if(detectCollision(wizardElement,bug)){
       console.log('collision')
     }
   })

  // Render Wizard
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

function detectCollision(objectA, objectB) {
  // check if objectA and objectB are DOM elements
  if (!(objectA instanceof Element) || !(objectB instanceof Element)) {
      console.error("Both objectA and objectB must be DOM elements");
      return;
  }

  let first = objectA.getBoundingClientRect();
  let second = objectB.getBoundingClientRect();

  // perform collision detection and return the result
  return !(first.top > second.bottom || 
           first.bottom < second.top || 
           first.right < second.left || 
           first.left > second.right);
}