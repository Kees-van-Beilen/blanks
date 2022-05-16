///De client is een bundle dus alles waar de client bij moet komen wordt geexport in mod.ts
import {NPClient} from "https://deno.inpolen.nl/NanoPack/client/mod.ts"
import {eventMap,T,EventRoomSync} from "../shared/maps.ts"
import {BlanksGameState,BlanksAPIEventStateChange,User,Card,BlanksAPIEvent,BlanksAPIEventMap} from "./types.ts"



export class BlanksAPI{

    private readonly connection:NPClient;
    private gameStateChangeCallbacks: BlanksAPIEventStateChange[] = [];
    private _state:BlanksGameState = BlanksGameState.notConnected 
    public get state(){return this._state}
    public get room(){return this._room}
    public get users():User[]{
        let arr:User[] = [];
        const len = this._users.length;
        for(let i=0;i<len;++i){
            arr.push({
                "name":this._users[i],
                "score":this._scores[i],
                "isElectus":this._electus === i
            })
        }
        return arr;
    }
    public get cards():Card[]{
        let arr:Card[] = [];
        for(const i of this._cardOrder){
            const cIndex = this._revealedCards.indexOf(i);
            arr.push({
                "id":i,
                "revealed":this._revealedCards.includes(i),
                "content":(cIndex===-1)?"":this._revealedCardContent[cIndex]
            })
        }
        return arr;
    }
    public get pickedCard():Card{
        const i = this._pickedCard;
        const cIndex = this._revealedCards.indexOf(i);
        return {
            "content":(cIndex===-1)?"":this._revealedCardContent[cIndex],
            "id":i,
            "revealed":true,//duh
        }
    }
    public get isLocalPlayerElectus():boolean{
        return this._users.indexOf(this._thisUser) === this._electus;
    }

    ///GameRoom
    private _room:number = -1;
    private _users:string[] = [];
    private _scores:number[] = [];
    private _thisUser:string = "";
    private _electus:number = -1;
    private _cardOrder:number[] = []
    private _pickedCard:number = -1;
    private _revealedCards:number[] = [];
    private _revealedCardContent:string[] = [];

    public constructor(url:string){
        this.connection = new NPClient(url);
        this.connection.addStructFromMap(eventMap);
        this.connection.on<T>("sync",((game:EventRoomSync)=>{
            const previous = this._state;
            this._state = game.state
            for(const a of this.gameStateChangeCallbacks){
                a(this._state,previous);
            }
            this._users                  = game.users;
            this._electus                = game.electus;
            this._room                   = game.room;
            this._cardOrder              = game.cardOrder;
            this._pickedCard             = game.picked;
            this._revealedCards          = game.revealedCard;
            this._revealedCardContent    = game.revealedCardContent;
            this._scores                 = game.scores;
        }) as (value:unknown)=>void)
    }

    
    public async connect(){
        await this.connection.ready();
        this._state = BlanksGameState.notInGame;
    }

    ///Api methods
    public joinRoom(user:string,roomcode:string|number){
        if(this._state === BlanksGameState.notConnected)throw "not connected";
        let room = (typeof roomcode === "string")?parseInt(roomcode):roomcode;
        this._thisUser = user;
        this.connection.send<T>("joinRoom",{
            "user":user,
            "room":room
        })
    }

    public makeRoom(user:string){
        if(this._state === BlanksGameState.notConnected)throw "not connected";
        this._thisUser = user;
        this.connection.send<T>("createRoom",{
            "user":user
        })
    }

    public submit(blank:string){
        if(this._state === BlanksGameState.notConnected)throw "not connected";
        this.connection.send<T>("submitAnswer",{
            room:this._room,
            user:this._thisUser,
            answer:blank
        })
    }

    public pick(cardId:number){
        if(this._state === BlanksGameState.notConnected)throw "not connected";
        this.connection.send<T>("chooseFunny",{
            room:this._room,
            answerId:cardId,
        })
    }

    ///Basically wanneer je van scherm moet veranderen
    public on<K extends keyof BlanksAPIEventMap>(event:K,callback:BlanksAPIEventMap[K]){
        switch(event){
            case "stateChange":{
                this.gameStateChangeCallbacks.push(callback);
                return;
            }
        }
    }
}