// deno-lint-ignore-file
import {NestedObject, NPServer,VariableType} from "https://deno.inpolen.nl/NanoPack/server/mod.ts";
import {eventMap} from "../shared/maps.ts";

let games: NestedObject[];
let clients: NestedObject[];

function getRandomInt(min = 1, max = 1) : number{
	min = Math.ceil(1000);
	max = Math.floor(9999);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

const server = new NPServer();
server.addStructFromMap(eventMap);

server.on("error",(client:any,o:any)=>{
    console.log('%c ' + o.message, 'color:red;');
});

server.on("createRoom", (client:any,o:any)=>{
    console.log('%c ' + o.message, 'color:blue;');
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
        answers: [],
        picked: 0,
        lastInteraction: Date.now()
    }
    
    let newGameClients = {0: client};
    clients[code] = newGameClients;
    client.reply("sync", games[code]);
});

server.on("joinRoom", (client:any,o:any)=>{
    console.log('%c ' + o.message, 'color:blue;');
    const code: number = o.room;
    const user = o.user;

    if (games[code] == null || games[code] == undefined) {
        client.reply("error", { msg: "Game does not exist" });
    }
    else {
        let users:any = games[code].users;
        users.push(user);
        games[code].users = users;
    
        client.reply("sync", games[code]);
        // fullSync(code);
        broadcast(user, code, "userJoined");
    }
});

server.on("startRound", (client, o)=>{
    console.log('%c ' + o.message, 'color:blue;');
    const code: any = o.room;
    games[code].state = 3;

    fullSync(code);
});

server.on("submitAnswer", (client, o) => {
    const code: any = o.room;
    const user: any = o.user;
    const answer: any = o.answer;

    const users = games[code].users;
    const key: any = getKeyByValue(users, user);
    let answers: any = games[code].answers;
    answers[key] = answer;
    games[code].answers = answers;

    fullSync(code);
});

server.on("chooseFunny", (client, o) => {
    const code: any = o.room;
    const answerId: any = o.answerId;
    let scores: any = games[code].scores;
    scores[answerId] += 1;
    games[code].scores = scores;

    const users: any = games[code].users;
    const userCount = users.length;

    let electus: any = games[code].electus;
    if (electus == userCount - 1) {
        electus = 0;
    }
    else {
        electus += 1;
    }

    broadcast({picked: answerId, users: games[code].users, scores: scores, electus: electus}, code, "endChoosing");
});

server.on("revealAnswer", (client, o) => {
    const answer: any = o.answerId;
    const code: any = o.room;
    const allAnswers: any = games[code].answers;
    const answerContent: any = allAnswers[answer];

    broadcast({answerId: answer, content: answerContent}, code, "answerRevealed")
});

server.run();

function broadcast(data: any, code: any, type: any) {
    let currentList: any = clients[code];
    currentList.forEach((client: any) => {
        client.reply(type, data);
    });
}

function fullSync(code: any) {
    let currentList: any = clients[code];
    currentList.forEach((client: any) => {
        client.reply("sync", games[code]);
    });
}

function getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => object[key] === value);
}