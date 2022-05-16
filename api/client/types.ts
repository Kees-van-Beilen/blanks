import {BlanksGameState} from "../shared/state.ts"

export interface BlanksAPIEventMap {
    "stateChange":BlanksAPIEventStateChange
}

export interface User{
    name:string,
    score:number,
    isElectus:boolean,
}

export interface Card{
    id:number,
    revealed:boolean,
    content:string,
}

export type BlanksAPIEvent = "stateChange" | "connect" | "disconnect";
export type BlanksAPIEventStateChange = (state:BlanksGameState, previousState:BlanksGameState)=>void;
export {BlanksGameState};