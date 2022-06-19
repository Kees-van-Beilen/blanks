import {BlanksGameState } from "./api.js"



const currentRoomCode = document.getElementById("currentRoomCode");
const currentPlayerName = document.getElementById("currentPlayerName");
const currentState = document.getElementById("currentState");

/**
 * @param {BlanksGameState} api 
 */
export function stateChange(api){
    api.on("stateChange", (state) => {
        console.log(api)
        currentRoomCode.innerHTML = api.room;
        currentPlayerName.innerHTML = api._thisUser;
        currentState.innerHTML = BlanksGameState[state];
    });
}