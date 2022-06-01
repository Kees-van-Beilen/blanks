import { setScreen } from "./screen.js";
import {BlanksAPI} from "./api.js"
import { stateChange } from "./stateTracker.js";
setScreen("main");

const api = new BlanksAPI("ws://0.0.0.0:5569");
await api.connect();
stateChange(api);


const makeRoomBTN = document.getElementById('makeRoom');
const joinRoomBTN = document.getElementById('joinRoom');

const usernameINP = document.getElementById('makeRoomPlayerName');

const makeRoomForm = document.getElementById('makeRoomForm');
const joinRoomForm = document.getElementById('joinRoomForm');


makeRoomBTN.addEventListener("click", () => {
    setScreen("make");
});

joinRoomBTN.addEventListener("click", () => {
    setScreen("join");
});

makeRoomForm.addEventListener("submit", () => {
    const username = document.getElementById('makeRoomPlayerName');
});

joinRoomForm.addEventListener("submit", () => {
    const username = document.getElementById('joinRoomPlayerName');
    const code = document.getElementById('joinRoomCode');

});