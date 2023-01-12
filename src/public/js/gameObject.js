
const startScreen=document.querySelector('.start-screen');
const gameScreen=document.querySelector('.game-screen');
const gameOverScreen=document.querySelector('.game-over');
const scoreElement=document.querySelector('.score');

function initGameObject(){
   return {
    startScreen,
    gameScreen,
    gameOverScreen,
    scoreElement,
     createWizard(initialState){
       let wizardElement=document.createElement('div');
       wizardElement.classList.add('wizard');
       wizardElement.style.width=initialState.width+'px';
       wizardElement.style.height=initialState.height+'px';
       wizardElement.style.left=initialState.positionX +'px'
       wizardElement.style.top=initialState.positionY +'px'
       this.wizardElement=wizardElement;
       gameScreen.appendChild(wizardElement);
       return wizardElement;
     },
     createFireball(wizard,fireball){
        let fireballElement=document.createElement('div');
        fireballElement.classList.add('fireball');
        fireballElement.style.left=wizard.positionX + wizard.width + 'px';
        fireballElement.style.top=wizard.positionY  + wizard.height/3  + 'px';
        fireballElement.style.width=fireball.width + 'px' ;
        fireballElement.style.height=fireball.height + 'px';
        gameScreen.appendChild(fireballElement);
        return fireballElement
     },
     createBug(stats){
       let bugElement=document.createElement('div');
       bugElement.classList.add('bug');
       bugElement.style.width=stats.width + 'px';
       bugElement.style.height=stats.height + 'px';
       bugElement.style.left=gameScreen.offsetWidth - stats.width + 'px';
       bugElement.style.top=Math.floor(Math.random()*(gameScreen.offsetHeight - stats.height)) + 'px';
       gameScreen.appendChild(bugElement);
       return bugElement;
     },
     createError(stats){
      let errorElement=document.createElement('div');
      errorElement.classList.add('error');
      errorElement.style.width=stats.width + 'px';
      errorElement.style.height=stats.height + 'px';
      errorElement.style.left=gameScreen.offsetWidth - stats.width + 'px';
      errorElement.style.top=Math.floor(Math.random()*(gameScreen.offsetHeight - stats.height)) + 'px';
      gameScreen.appendChild(errorElement);
      return errorElement;
    },
     createCloud(stats){
      let cloudElement=document.createElement('div');
      cloudElement.classList.add('cloud');
      cloudElement.style.width=stats.width + 'px';
      cloudElement.style.height=stats.height + 'px';
      cloudElement.style.left=gameScreen.offsetWidth - stats.width + 'px';
      cloudElement.style.top=Math.floor(Math.random()*(gameScreen.offsetHeight - stats.height)) + 'px';
      gameScreen.appendChild(cloudElement);
      return cloudElement;
    }
   }
}