import {NestedObject, NPServer,VariableType} from "https://deno.inpolen.nl/NanoPack/server/mod.ts";
import {eventMap} from "../shared/maps.ts";

let games: NestedObject[];

function getRandomInt(min = 1, max = 1) : number{
	min = Math.ceil(1000);
	max = Math.floor(9999);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

const server = new NPServer();
server.addStructFromMap(eventMap);

server.on("error",(client,o)=>{
    console.log('%c ' + o.message, 'color:red;');
});

server.on("createRoom", (client,o)=>{
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
        picked: 0,
        lastInteraction: Date.now()
    }
    
    client.reply("sync", games[code]);
});

server.on("joinRoom", (client,o)=>{
    //fuck dit.
    const code: number = o.room;
    const user = o.user;
    games[code].users[] = user;


});

server.run();