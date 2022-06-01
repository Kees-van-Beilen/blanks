import {BlanksAPI,BlanksGameState} from "./mod.ts"


const api = new BlanksAPI("ws://localhost:42252");

await api.connect();

while(true){
    const evt = prompt("type [join] to join room [make] to make room");
    if(!["join","make"].includes(evt??""))break;
    const name = prompt("type your username") ?? "";
    if(evt==="join"){
        const code = prompt("type the room code") ?? "";
        api.joinRoom(name,parseInt(code));
        break;
    }
    api.makeRoom(name)
    break;
    
}


function clearLines(count=0){
    for(let i=0;i<count;++i){
        console.log("\r\x1b[K");
    }
}

api.on("stateChange",(s:BlanksGameState,prev:BlanksGameState)=>{
    // console.log("statechange",BlanksGameState[s])
    console.log(`=== state: ${BlanksGameState[s]}===`)
    switch(s){
        case BlanksGameState.roomBeforeFirstStart:
            if(s===prev)clearLines(api.isLocalPlayerElectus?4:3);
            console.log("code:",api.room)
            console.log(api.users.map(e=>`${e.isElectus?"%c":""}${e.name}${e.isElectus?"%c":""}`).join(", "),"color:yellow","color:white");
            if(api.isLocalPlayerElectus){
                console.log("press anything to start")
            }
            break;
    }

})

// await api.connect();

// api.makeRoom("keszas");


// function block(ms=10){
//     return new Promise((res,rej)=>{
//         setTimeout(res,ms)
//     })
// }

// while(true){
//     await block(1000);
//     api.makeRoom("keszas");
// }

