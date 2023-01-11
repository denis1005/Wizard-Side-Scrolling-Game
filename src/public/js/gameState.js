function initState(){

    const state={
        isActiveGame:true,
        gamePoints:0,
        bugKillBonus:50,
        Level:1,
        wizard:{
            width:82,
            height:100,
            positionX:100,
            positionY:200,
            speed:4
        },
        keys:{
           KeyA:false,
           KeyS:false,
           KeyD:false,
           KeyW:false,
           Space:false,
        },
        fireballStats:{
            width:30,
            height:30,
            speed:5,
            fireInterval:500,
            lastTimeFireball:0
        },
        bugStats: {
             width:50,
             height:50,
             nextSpawn:0,
             maxSpawnPeriod:3000,
             speed:4,
        }
    }
    return state;
}