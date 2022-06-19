// deno-lint-ignore-file
import {NestedObject, NPServer,VariableType,ClientRequest} from "https://deno.inpolen.nl/NanoPack/server/mod.ts";
import {eventMap,EventRoomSync} from "../shared/maps.ts";
import {zinnen} from "./zinnen.ts";

interface RoomMeta{
    answers:string[],
    lastInteraction:number,
}


let roomMeta:RoomMeta[] = [];
let games: EventRoomSync[] = [];
let clients: ClientRequest[][] = [];


interface User{
    
}

function getRandomInt(min = 1, max = 1) : number{
	min = Math.ceil(1000);
	max = Math.floor(9999);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

const server = new NPServer("localhost",5569);
server.addStructFromMap(eventMap);

server.on("error",(client:any,o:any)=>{
    console.log('%c ' + o.message, 'color:red;');
});

server.on("createRoom", (client:ClientRequest,o:any)=>{
    console.log('%c ' + JSON.stringify(o), 'color:blue;');
    const code = getRandomInt();
    const user = o.user;

    games[code] = {
        room: code,
        state: 1,
        scores: [0],
        users: [user],
        electus: 0,
        cardOrder: [],
        revealedCard: [],
        revealedCardContent: [],
        // answers: [],
        picked: 0,
        sentence:"",
        // lastInteraction: Date.now()
    }

    
    let newGameClients = [client];
    clients[code] = newGameClients;
    client.reply("sync", games[code] as unknown as NestedObject);
});

server.on("joinRoom", (client:any,o:any)=>{
    console.log('%c userjoined' + JSON.stringify(o), 'color:blue;');
    const code: number = o.room;
    const user = o.user;

    if (games[code] == null || games[code] == undefined) {
        client.reply("error", { msg: "Game does not exist" });
    }
    else {
        let users:any = games[code].users;
        users.push(user);
        (games[code].scores as number[]).push(0);
        games[code].users = users;
    
        client.reply("sync", games[code]);
        // fullSync(code);
        broadcast({"user":user}, code, "userJoined");
        clients[code].push(client);

    }
});

function arrayIncremental(end:number){
    let arr:number[] = [];
    for(let i=0;i<end;++i){
        arr.push(i);
    }
    let currentIndex = arr.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

server.on("startRound", (client, o)=>{
    console.log('%c ' + o.message, 'color:blue;');
    const code: any = o.room;
    games[code].state = 3;
    games[code].sentence = zinnen.base.nl[Math.floor(Math.random()*zinnen.base.nl.length)];
    games[code].revealedCardContent = [];
    games[code].revealedCard = [];
    games[code].cardOrder = arrayIncremental(games[code].users.length-1);
    fullSync(code);
});

server.on("submitAnswer", (client, o) => {
    const code: any = o.room;
    const user: any = o.user;
    const answer: string = o.answer as string;
    const userIndex: number = games[code].users.indexOf(user);
    games[code].revealedCardContent.push(answer);
    games[code].revealedCard.push(userIndex);

    const users = games[code].users;
    if(games[code].revealedCard.length === games[code].users.length-1){
        games[code].state = 5;
        fullSync(code);
    }
    // let answers: any = games[code].answers;
    // answers[key] = answer;
    // games[code].answers = answers;
});

server.on("chooseFunny", (client, o) => {
    const code: any = o.room;
    const answerId: any = o.answerId;

    games[code].scores[ games[code].revealedCard[answerId]] += 1
    games[code].picked = answerId;

    const users: any = games[code].users;
    const userCount = users.length;

    let electus: any = games[code].electus;
    if (electus == userCount - 1) {
        electus = 0;
    }
    else {
        electus += 1;
    }
    games[code].electus = electus;
    games[code].state = 2;
    fullSync(code);
    // broadcast({picked: answerId, users: games[code].users, scores: scores, electus: electus}, code, "endChoosing");
});

server.on("revealAnswer", (client, o) => {
    const answer: any = o.answerId;
    const code: any = o.room;
    // const allAnswers: any = games[code].answers;
    // const answerContent: any = allAnswers[answer];

    // broadcast({answerId: answer, content: answerContent}, code, "answerRevealed")
});

server.run();

function broadcast(data: any, code: any, type: any) {
    let currentList: any = clients[code];
    currentList.forEach((client: any) => {
        client.reply(type, data);
    });
}

function fullSync(code: any) {
    let currentList: ClientRequest[] = clients[code];
    console.log("ttt",currentList.length)
    currentList.forEach((client: ClientRequest) => {
        // console.log(client)
        client.reply("sync", games[code] as unknown as NestedObject);
    });
}

function getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => object[key] === value);
}