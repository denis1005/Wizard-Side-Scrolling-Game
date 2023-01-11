function initState(){

    const state={
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