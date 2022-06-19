import { setScreen } from "./screen.js";
import {BlanksAPI, BlanksGameState} from "./api.js"
import { stateChange } from "./stateTracker.js";
import { docById } from "./doc.mjs";
import { syncScreens } from "./syncScreens.js";

setScreen("wait");
const api = new BlanksAPI("ws://192.168.0.127:5569");
window.apiref= api;
await api.connect();
setScreen("main");

stateChange(api);
syncScreens(api);

const onClick = (of_e,do_f)=>of_e.addEventListener("click",do_f);
const onSubmit = (of_e,do_f)=>of_e.addEventListener("submit",(e)=>{e.preventDefault();do_f()});


const makeRoomBTN = document.getElementById('makeRoom');
const joinRoomBTN = document.getElementById('joinRoom');
const scoreboardStartBTN = document.getElementById('scoreboardStart');

const {makeRoomForm,joinRoomForm,scoreboardRoomCode, makeRoomPlayerName,scoreboardUsers,fitbZin,joinRoomPlayerName,joinRoomCode} = docById();
const {fitbForm,fitbA} = docById();


onClick(makeRoomBTN,_=>setScreen("make"));
onClick(joinRoomBTN,_=>setScreen("join"));
onClick(scoreboardStartBTN,_=>{
    setScreen("wait");
    api.startGame();
})

onSubmit(makeRoomForm,_=>{
    const username = makeRoomPlayerName.value;
    setScreen("wait");
    api.makeRoom(username);
})
onSubmit(joinRoomForm,_=>{
    const username = joinRoomPlayerName.value;
    const code = joinRoomCode.value;
    setScreen("wait");
    api.joinRoom(username,code);
})

onSubmit(fitbForm,_=>{
    const zin = fitbA.value;
    setScreen("wait");
    api.submit(zin);
})


