// import {BlanksGameState } from "./api.js"



const currentRoomCode = document.getElementById("currentRoomCode");
const currentPlayerName = document.getElementById("currentPlayerName");
const currentState = document.getElementById("currentState");

/**
 * @param {BlanksGameState} api 
 */
export function stateChange(api){
    api.on("stateChange", (state) => {
        currentRoomCode.innerHTML = state.roomCode;
        currentPlayerName.innerHTML = state.playerName;
        currentState.innerHTML = state.state;
    });
}