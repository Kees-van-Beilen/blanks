import {VariableType} from "https://deno.inpolen.nl/NanoPack/mod.ts"
import {BlanksGameState} from "./state.ts"
export type T = typeof eventMap;
export const eventMap = {
    "ping":{
        
    },
    "pong":{
        
    },
    
    "error":{
        "code":VariableType.UInt8,
        "msg":VariableType.String
    },
    // server in
    "createRoom":{
        "user":VariableType.String,
    },
    "joinRoom":{
        "user":VariableType.String,
        "room":VariableType.UInt16
    },
    "startRound":{
        "room":VariableType.UInt16,
    },
    "submitAnswer":{
        "room":VariableType.UInt16,
        "user":VariableType.String,
        "answer":VariableType.String
    },
    "chooseFunny":{
        "room":VariableType.UInt16,
        "answerId":VariableType.UInt8
    },
    "revealAnswer":{
        "room":VariableType.UInt16,
        "answerId":VariableType.UInt8
    },
    // client in
    "sync":{
        "room":VariableType.UInt16,
        "state":VariableType.UInt8,
        "scores":VariableType.ArrayUInt8,
        "users":VariableType.ArrayString,
        "electus":VariableType.UInt8,
        "cardOrder":VariableType.ArrayUInt8,
        "revealedCard":VariableType.ArrayUInt8,
        "revealedCardContent":VariableType.ArrayString,
        "picked":VariableType.UInt8,
        "sentence":VariableType.String
    },
    "userJoined":{
        "user":VariableType.String,
    },
    "answerRevealed":{
        "answerId":VariableType.UInt8,
        "content":VariableType.String
    },
    "startChoosing":{
        // electus is choosing
        "cardOrder":VariableType.ArrayUInt8//de volgorde van de kaarten
    },
    "endChoosing":{
        "picked":VariableType.UInt8,
        "users":VariableType.ArrayString,
        "scores":VariableType.ArrayUInt8,
        "electus":VariableType.UInt8
    },
    "roundStarted":{
        "sentence":VariableType.String,
    }
}

export interface EventRoomSync {
    "room":number,
    "state":BlanksGameState,
    "scores":number[],
    "users":string[],
    "electus":number,
    "cardOrder":number[],
    "revealedCard":number[],
    "revealedCardContent":string[],
    "picked":number,
    "sentence":string
}