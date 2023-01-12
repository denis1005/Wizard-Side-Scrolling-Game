function start (state,game){
  game.createWizard(state.wizard);
  window.requestAnimationFrame(timestamp=>gameLoop(state,game,timestamp))
}

function gameLoop (state,game,timestamp){
  
  
  const {wizardElement}=game;
  const {wizard}=state;



  // Spawn Bugs, Errors
  spawnBugs(timestamp,state,game)
  if(state.Level>=2){
    spawnError(timestamp,state,game)
  }
 

  // Move Wizard
  modifyWizardPosition(state,game,wizard)

  //Shooting
  playerShooting(state,game,timestamp,wizard)

  //Render Fireballs 
  renderFireballs (game,state)

  //Render Bugs, Errors
  renderBugs(game,state);
  if(state.Level>=2){
    renderErrors(game,state)
  }

  // Render Wizard
  renderWizardMovement(wizardElement,wizard,wizardElement)


  if(state.isActiveGame){
    window.requestAnimationFrame(gameLoop.bind(null,state,game))
  }
  
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

function gameOver(game,state){
  state.isActiveGame=false
  game.gameOverScreen.classList.remove('hidden');
  return;
}

function playerShooting(state,game,timestamp,wizard){
  if (state.keys.Space && timestamp - state.fireballStats.lastTimeFireball > state.fireballStats.fireInterval){
    game.wizardElement.style.backgroundImage=`url('./images/wizard-fire.png')`
    game.createFireball(wizard,state.fireballStats);
    state.fireballStats.lastTimeFireball=timestamp; 
}else{
  game.wizardElement.style.backgroundImage=`url('./images/wizard.png')`
}
}

function spawnBugs(timestamp,state,game){
  if (timestamp>state.bugStats.nextSpawn){
    game.createBug(state.bugStats);
    state.bugStats.nextSpawn=timestamp + Math.random()*state.bugStats.maxSpawnPeriod;
  }
}

function spawnError(timestamp,state,game){
  if (timestamp>state.errorStats.nextSpawn){
    game.createError(state.errorStats);
    state.errorStats.nextSpawn=timestamp + Math.random()*state.errorStats.maxSpawnPeriod;
  }
}

function renderFireballs (game,state){
  document.querySelectorAll('.fireball').forEach(fireball=>{
    let posX=parseInt(fireball.style.left);
    if (posX > game.gameScreen.offsetWidth - state.fireballStats.width-2){
      fireball.remove()
    }else {
      
      fireball.style.left=posX + state.fireballStats.speed + 'px';
    }
   
 })
}

function renderBugs(game,state){
  document.querySelectorAll('.bug').forEach(bug=>{
    let posX=parseInt(bug.style.left);
    if (posX>0){
      bug.style.left=posX - state.bugStats.speed + 'px';
    }else {
      bug.remove()
    }
      if(detectCollision(game.wizardElement,bug)){
        gameOver(game,state);
      }
    
      document.querySelectorAll('.fireball').forEach(fireball=>{
       if(detectCollision(fireball,bug)){
        state.gamePoints+=state.bugKillBonus;
        levelUp(state)
        bug.remove();
        fireball.remove();
        game.scoreElement.textContent=`${state.gamePoints} pts. Level: ${state.Level}`
       }
       
     })
  
    
 })
}

function renderErrors(game,state){
  document.querySelectorAll('.error').forEach(error=>{
    let posX=parseInt(error.style.left);
    if (posX>0){
      error.style.left=posX - state.errorStats.speed + 'px';
    }else {
      error.remove()
    }
      if(detectCollision(game.wizardElement,error)){
        gameOver(game,state);
      }
    
      document.querySelectorAll('.fireball').forEach(fireball=>{
       if(detectCollision(fireball,error)){
        state.gamePoints+=state.errorKillBonus;
        levelUp(state)
        error.remove();
        fireball.remove();
        game.scoreElement.textContent=`${state.gamePoints} pts. Level: ${state.Level}`
       }
       
     })
  
    
 })
}

function levelUp(state){
  if(state.gamePoints >=300 &&  state.Level==1){
    state.Level+=1
    state.bugStats.speed+=state.Level
    state.bugStats.maxSpawnPeriod-=1000
  }
  if(state.gamePoints >=600 &&  state.Level==2){
    state.Level+=1
    state.bugStats.speed+=state.Level
    state.bugStats.maxSpawnPeriod-=500
  }

  if(state.gamePoints >=1000 &&  state.Level==3){
    state.Level+=1
    state.bugStats.speed+=state.Level
    state.bugStats.maxSpawnPeriod-=500
  }
  if(state.gamePoints >=1300 &&  state.Level==4){
    state.Level+=1
    state.bugStats.speed+=state.Level
    state.bugStats.maxSpawnPeriod-=500
  }
}

