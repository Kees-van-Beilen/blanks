import {VariableType} from "https://deno.inpolen.nl/NanoPack/mod.ts"

export const map = {
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
        "electus":VariableType.UInt8
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
    },
    "endChoosing":{
        "picked":VariableType.UInt8
    },
    "scoreScreen":{
        "users":VariableType.ArrayString,
        "scores":VariableType.ArrayUInt8
    }
    
}