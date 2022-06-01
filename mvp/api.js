// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function readArrayData(struct, data, formatter) {
    const arr = [];
    if (!struct.isSingleArray) {
        const length = data.readLEBase128();
        for(let i = 0; i < length; ++i){
            arr.push(formatter(data));
        }
    } else {
        try {
            while(true){
                arr.push(formatter(data));
            }
        } catch  {}
    }
    return arr;
}
function sortAlphabetically(list) {
    return list.sort((a, b)=>a == b ? 0 : a > b ? 1 : -1
    );
}
function toLEBase128(num) {
    let value = num;
    value |= 0;
    const result = [];
    while(true){
        const byte_ = value & 0x7f;
        value >>= 7;
        if (value === 0 && (byte_ & 0x40) === 0 || value === -1 && (byte_ & 0x40) !== 0) {
            result.push(byte_);
            return new Uint8Array(result);
        }
        result.push(byte_ | 0x80);
    }
}
function unpackObject(obj, pathSeparator) {
    const keys = Object.keys(obj);
    const record = {};
    for (const key of keys){
        if (typeof obj[key] === "object") {
            const l = unpackObject(obj[key], pathSeparator);
            for (const nestedKey of Object.keys(l)){
                record[key + pathSeparator + nestedKey] = l[nestedKey];
            }
        } else {
            record[key] = obj[key];
        }
    }
    return record;
}
function toCString(str) {
    const bytes = [];
    for (const cha of str){
        bytes.push(cha.charCodeAt(0));
    }
    bytes.push(0x00);
    return bytes;
}
function toUin8(num) {
    return num & (1 << 8) - 1;
}
function toUin16(num) {
    const val = num & (1 << 16) - 1;
    return [
        val & 0xFF,
        val >> 8 & 0xFF
    ];
}
function objectSetPath(o, path, to, pathSeparator = "/") {
    const parts = path.split(pathSeparator);
    let current = o;
    for(let i = 0; i < parts.length - 1; i++){
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = to;
}
function objectGetPath(o, path, pathSeparator = "/") {
    const parts = path.split(pathSeparator);
    let current = o;
    for(let i = 0; i < parts.length; i++){
        if (current[parts[i]] === undefined) return undefined;
        current = current[parts[i]];
    }
    return current;
}
var KnownStruct;
(function(KnownStruct2) {
    KnownStruct2[KnownStruct2["generalError"] = 1] = "generalError";
    KnownStruct2[KnownStruct2["staticError"] = 2] = "staticError";
    KnownStruct2[KnownStruct2["dynamicError"] = 4] = "dynamicError";
    KnownStruct2[KnownStruct2["static"] = 64] = "static";
    KnownStruct2[KnownStruct2["dynamic"] = 128] = "dynamic";
})(KnownStruct || (KnownStruct = {}));
var VariableType;
(function(VariableType2) {
    VariableType2[VariableType2["UInt8"] = 0] = "UInt8";
    VariableType2[VariableType2["UInt16"] = 1] = "UInt16";
    VariableType2[VariableType2["UInt32"] = 2] = "UInt32";
    VariableType2[VariableType2["UInt64"] = 3] = "UInt64";
    VariableType2[VariableType2["Int"] = 4] = "Int";
    VariableType2[VariableType2["String"] = 5] = "String";
    VariableType2[VariableType2["Boolean"] = 6] = "Boolean";
    VariableType2[VariableType2["ArrayUInt8"] = 7] = "ArrayUInt8";
    VariableType2[VariableType2["ArrayUInt16"] = 8] = "ArrayUInt16";
    VariableType2[VariableType2["ArrayInt"] = 9] = "ArrayInt";
    VariableType2[VariableType2["ArrayString"] = 10] = "ArrayString";
    VariableType2[VariableType2["ArrayBoolean"] = 11] = "ArrayBoolean";
})(VariableType || (VariableType = {}));
class NPStruct {
    sections;
    isSingleArray;
    constructor(struct){
        const booleans = [];
        const strings = [];
        const uint8 = [];
        const uint16 = [];
        const uint32 = [];
        const uint64 = [];
        const leInts = [];
        const stringArray = [];
        const uint8Array = [];
        const uint16Array = [];
        const leIntArrays = [];
        const t_sect = [];
        const map = unpackObject(struct, "/");
        const paths = sortAlphabetically(Object.keys(map));
        let c = 0;
        for (const path of paths){
            const value = objectGetPath(struct, path);
            if (typeof value !== "number") continue;
            switch(value){
                case VariableType.String:
                    {
                        strings.push(path);
                        break;
                    }
                case VariableType.UInt8:
                    {
                        uint8.push(path);
                        break;
                    }
                case VariableType.UInt16:
                    {
                        uint16.push(path);
                        break;
                    }
                case VariableType.UInt32:
                    {
                        uint32.push(path);
                        break;
                    }
                case VariableType.UInt64:
                    {
                        uint64.push(path);
                        break;
                    }
                case VariableType.Int:
                    {
                        leInts.push(path);
                        break;
                    }
                case VariableType.Boolean:
                    {
                        booleans.push(path);
                        break;
                    }
                case VariableType.ArrayString:
                    {
                        ++c;
                        stringArray.push(path);
                        break;
                    }
                case VariableType.ArrayUInt8:
                    {
                        ++c;
                        uint8Array.push(path);
                        break;
                    }
                case VariableType.ArrayUInt16:
                    {
                        ++c;
                        uint16Array.push(path);
                        break;
                    }
                case VariableType.ArrayInt:
                    {
                        ++c;
                        leIntArrays.push(path);
                        break;
                    }
            }
        }
        const _ = (a, t)=>a.length > 0 ? t_sect.push(...a.map((e)=>[
                    t,
                    e ?? ""
                ]
            )) : null
        ;
        _(booleans, VariableType.Boolean);
        _(strings, VariableType.String);
        _(uint8, VariableType.UInt8);
        _(uint16, VariableType.UInt16);
        _(uint32, VariableType.UInt32);
        _(uint64, VariableType.UInt64);
        _(leInts, VariableType.Int);
        _(stringArray, VariableType.ArrayString);
        _(uint8Array, VariableType.ArrayUInt8);
        _(uint16Array, VariableType.ArrayUInt16);
        _(leIntArrays, VariableType.ArrayInt);
        this.isSingleArray = c < 2;
        this.sections = t_sect;
    }
}
class ByteReader {
    data;
    pos = 0;
    maxLength;
    constructor(data){
        this.maxLength = data.length;
        this.data = data;
    }
    next() {
        if (this.pos >= this.maxLength) throw new Error("ByteReaderError");
        const value = this.data[this.pos];
        this.pos += 1;
        return value;
    }
    readString() {
        let str = "";
        while(true){
            const cha = this.next();
            if (cha === 0x00 || cha === undefined) break;
            str += String.fromCharCode(cha);
        }
        return str;
    }
    readLEBase128() {
        let result = 0;
        let shift = 0;
        while(true){
            const __byte = this.next();
            result |= (__byte & 0x7f) << shift >>> 0;
            shift += 7;
            if ((0x80 & __byte) === 0) {
                if (shift < 32 && (__byte & 0x40) !== 0) {
                    return (result | ~0 << shift) >>> 0;
                }
                return result >>> 0;
            }
        }
    }
    eof() {
        return this.pos >= this.maxLength;
    }
}
class NanoPack {
    structures = [];
    addStruct(forKey, struct) {
        this.structures[forKey] = new NPStruct(struct);
    }
    deSerializeData(forKey, raw_data) {
        let root = {};
        const data = new ByteReader(raw_data);
        const struct = this.structures[forKey];
        let lastWasBoolean = false;
        let booleanByte = 0;
        let boolpos = 0;
        for (const [type, path] of struct.sections){
            switch(type){
                case VariableType.Boolean:
                    {
                        if (!lastWasBoolean) {
                            lastWasBoolean = true;
                            booleanByte = data.next();
                            boolpos = 0;
                        }
                        if (boolpos === 7) {
                            lastWasBoolean = false;
                        }
                        const bool = (booleanByte & 1 << 7 - boolpos) >> 7 - boolpos === 1;
                        objectSetPath(root, path, bool);
                        boolpos += 1;
                        break;
                    }
                case VariableType.String:
                    {
                        const str = data.readString();
                        objectSetPath(root, path, str);
                        break;
                    }
                case VariableType.UInt8:
                    {
                        const __int = data.next();
                        objectSetPath(root, path, __int);
                        break;
                    }
                case VariableType.UInt16:
                    {
                        const hi = data.next();
                        const lo = data.next();
                        const __int = hi << 8 | lo;
                        objectSetPath(root, path, __int);
                        break;
                    }
                case VariableType.Int:
                    {
                        const __int = data.readLEBase128();
                        objectSetPath(root, path, __int);
                        break;
                    }
                case VariableType.UInt32:
                    {
                        console.log("This should not happen", path, type);
                        const __int = data.next() << 24;
                        const int2 = data.next() << 16;
                        const int3 = data.next() << 8;
                        const int4 = data.next();
                        const int5 = __int | int2 | int3 | int4;
                        objectSetPath(root, path, int5);
                        break;
                    }
                case VariableType.UInt64:
                    {
                        const __int = data.next() << 56;
                        const int2 = data.next() << 48;
                        const int3 = data.next() << 40;
                        const int4 = data.next() << 32;
                        const int5 = data.next() << 24;
                        const int6 = data.next() << 16;
                        const int7 = data.next() << 8;
                        const int8 = data.next();
                        const int9 = __int | int2 | int3 | int4 | int5 | int6 | int7 | int8;
                        objectSetPath(root, path, int9);
                        break;
                    }
                case VariableType.ArrayString:
                    {
                        const arr = readArrayData(struct, data, (d)=>d.readString()
                        );
                        objectSetPath(root, path, arr);
                        break;
                    }
                case VariableType.ArrayUInt8:
                    {
                        const arr = readArrayData(struct, data, (d)=>d.next()
                        );
                        objectSetPath(root, path, arr);
                        break;
                    }
                case VariableType.ArrayUInt16:
                    {
                        const arr = readArrayData(struct, data, (d)=>(d.next() << 8) + d.next()
                        );
                        objectSetPath(root, path, arr);
                        break;
                    }
                case VariableType.ArrayInt:
                    {
                        const arr = readArrayData(struct, data, (d)=>d.readLEBase128()
                        );
                        objectSetPath(root, path, arr);
                        break;
                    }
            }
        }
        return root;
    }
    serializeData(forKey, root) {
        const struct = this.structures[forKey];
        const data = [];
        let lastWasBoolean = false;
        let booleanByte = 0;
        let boolpos = 0;
        for (const [type, path] of struct.sections){
            const value = objectGetPath(root, path);
            if (type !== VariableType.Boolean && lastWasBoolean) {
                lastWasBoolean = false;
                data.push(booleanByte);
            }
            switch(type){
                case VariableType.Boolean:
                    {
                        if (!lastWasBoolean) {
                            lastWasBoolean = true;
                            booleanByte = 0;
                            boolpos = 0;
                        }
                        if (boolpos >= 7) {
                            lastWasBoolean = false;
                            data.push(booleanByte);
                        }
                        const val = value ? 1 : 0;
                        booleanByte = booleanByte | val << 7 - boolpos;
                        boolpos += 1;
                        break;
                    }
                case VariableType.String:
                    {
                        data.push(...toCString(value));
                        break;
                    }
                case VariableType.UInt8:
                    {
                        data.push(toUin8(value));
                        break;
                    }
                case VariableType.UInt16:
                    {
                        data.push(...toUin16(value).reverse());
                        break;
                    }
                case VariableType.Int:
                    {
                        data.push(...toLEBase128(value));
                        break;
                    }
                case VariableType.ArrayString:
                    {
                        const arr = value;
                        if (!struct.isSingleArray) {
                            data.push(...toLEBase128(arr.length));
                        }
                        for (const str of arr){
                            data.push(...toCString(str));
                        }
                        break;
                    }
                case VariableType.ArrayUInt8:
                    {
                        const arr = value;
                        if (!struct.isSingleArray) {
                            data.push(...toLEBase128(arr.length));
                        }
                        for (const num of arr){
                            data.push(toUin8(num));
                        }
                        break;
                    }
                case VariableType.ArrayUInt16:
                    {
                        const arr = value;
                        if (!struct.isSingleArray) {
                            data.push(...toLEBase128(arr.length));
                        }
                        for (const num of arr){
                            data.push(...toUin16(num).reverse());
                        }
                        break;
                    }
                case VariableType.ArrayInt:
                    {
                        const arr = value;
                        if (!struct.isSingleArray) {
                            data.push(...toLEBase128(arr.length));
                        }
                        for (const num of arr){
                            data.push(...toLEBase128(num));
                        }
                        break;
                    }
            }
        }
        return new Uint8Array(data);
    }
}
class NPClient {
    packer;
    wss;
    StructNameToNumMap = {};
    eventMap = {};
    constructor(url = "ws://localhost:42252"){
        this.packer = new NanoPack();
        this.wss = new WebSocket(url);
        this.wss.addEventListener("message", async (a)=>{
            const e = new Uint8Array(await a.data.arrayBuffer());
            const key = e[0] | e[1] << 8;
            const data = this.packer.deSerializeData(key, e.slice(2));
            if (this.eventMap[key]) {
                for (const callback of this.eventMap[key]){
                    callback(data);
                }
            }
        });
    }
    ready() {
        return new Promise((resolve)=>{
            this.wss.addEventListener("open", ()=>{
                resolve(0);
            });
        });
    }
    addStruct(forkey = 0, struct) {
        this.packer.addStruct(forkey, struct);
    }
    addStructFromMap(structMap, startNumber = 0) {
        let off = startNumber;
        for(const key in structMap){
            this.StructNameToNumMap[key] = off;
            this.addStruct(off, structMap[key]);
            ++off;
        }
    }
    encode(key, data) {
        let num = 0;
        if (typeof key === "number") {
            num = key;
        } else {
            num = this.StructNameToNumMap[key];
        }
        return new Uint8Array([
            num & 0xFF,
            num >> 8 & 0xFF,
            ...this.packer.serializeData(num, data)
        ]);
    }
    on(key, callback) {
        if (typeof key === "number") {
            if (!this.eventMap[key]) this.eventMap[key] = [];
            this.eventMap[key].push(callback);
        } else {
            const n = this.StructNameToNumMap[key];
            if (!this.eventMap[n]) this.eventMap[n] = [];
            this.eventMap[n].push(callback);
        }
    }
    send(key, object) {
        this.wss.send(this.encode(key, object));
    }
}
var KnownStruct1;
(function(KnownStruct3) {
    KnownStruct3[KnownStruct3["generalError"] = 1] = "generalError";
    KnownStruct3[KnownStruct3["staticError"] = 2] = "staticError";
    KnownStruct3[KnownStruct3["dynamicError"] = 4] = "dynamicError";
    KnownStruct3[KnownStruct3["static"] = 64] = "static";
    KnownStruct3[KnownStruct3["dynamic"] = 128] = "dynamic";
})(KnownStruct1 || (KnownStruct1 = {}));
var VariableType1;
(function(VariableType3) {
    VariableType3[VariableType3["UInt8"] = 0] = "UInt8";
    VariableType3[VariableType3["UInt16"] = 1] = "UInt16";
    VariableType3[VariableType3["UInt32"] = 2] = "UInt32";
    VariableType3[VariableType3["UInt64"] = 3] = "UInt64";
    VariableType3[VariableType3["Int"] = 4] = "Int";
    VariableType3[VariableType3["String"] = 5] = "String";
    VariableType3[VariableType3["Boolean"] = 6] = "Boolean";
    VariableType3[VariableType3["ArrayUInt8"] = 7] = "ArrayUInt8";
    VariableType3[VariableType3["ArrayUInt16"] = 8] = "ArrayUInt16";
    VariableType3[VariableType3["ArrayInt"] = 9] = "ArrayInt";
    VariableType3[VariableType3["ArrayString"] = 10] = "ArrayString";
    VariableType3[VariableType3["ArrayBoolean"] = 11] = "ArrayBoolean";
})(VariableType1 || (VariableType1 = {}));
const eventMap = {
    "ping": {},
    "pong": {},
    "error": {
        "code": VariableType1.UInt8,
        "msg": VariableType1.String
    },
    "createRoom": {
        "user": VariableType1.String
    },
    "joinRoom": {
        "user": VariableType1.String,
        "room": VariableType1.UInt16
    },
    "startRound": {
        "room": VariableType1.UInt16
    },
    "submitAnswer": {
        "room": VariableType1.UInt16,
        "user": VariableType1.String,
        "answer": VariableType1.String
    },
    "chooseFunny": {
        "room": VariableType1.UInt16,
        "answerId": VariableType1.UInt8
    },
    "revealAnswer": {
        "room": VariableType1.UInt16,
        "answerId": VariableType1.UInt8
    },
    "sync": {
        "room": VariableType1.UInt16,
        "state": VariableType1.UInt8,
        "scores": VariableType1.ArrayUInt8,
        "users": VariableType1.ArrayString,
        "electus": VariableType1.UInt8,
        "cardOrder": VariableType1.ArrayUInt8,
        "revealedCard": VariableType1.ArrayUInt8,
        "revealedCardContent": VariableType1.ArrayString,
        "picked": VariableType1.UInt8,
        "sentence": VariableType1.String
    },
    "userJoined": {
        "user": VariableType1.String
    },
    "answerRevealed": {
        "answerId": VariableType1.UInt8,
        "content": VariableType1.String
    },
    "startChoosing": {
        "cardOrder": VariableType1.ArrayUInt8
    },
    "endChoosing": {
        "picked": VariableType1.UInt8,
        "users": VariableType1.ArrayString,
        "scores": VariableType1.ArrayUInt8,
        "electus": VariableType1.UInt8
    },
    "roundStarted": {
        "sentence": VariableType1.String
    }
};
var BlanksGameState;
(function(BlanksGameState1) {
    BlanksGameState1[BlanksGameState1["notInGame"] = 200] = "notInGame";
    BlanksGameState1[BlanksGameState1["notConnected"] = 201] = "notConnected";
    BlanksGameState1[BlanksGameState1["error"] = 0] = "error";
    BlanksGameState1[BlanksGameState1["roomBeforeFirstStart"] = 1] = "roomBeforeFirstStart";
    BlanksGameState1[BlanksGameState1["roomInBetweenGame"] = 2] = "roomInBetweenGame";
    BlanksGameState1[BlanksGameState1["roomFillInTheBlank"] = 3] = "roomFillInTheBlank";
    BlanksGameState1[BlanksGameState1["roomPickingAnswers"] = 5] = "roomPickingAnswers";
})(BlanksGameState || (BlanksGameState = {}));
export { BlanksGameState as BlanksGameState };
class BlanksAPI {
    connection;
    gameStateChangeCallbacks = [];
    _state = BlanksGameState.notConnected;
    get state() {
        return this._state;
    }
    get room() {
        return this._room;
    }
    get users() {
        let arr = [];
        const len = this._users.length;
        for(let i = 0; i < len; ++i){
            arr.push({
                "name": this._users[i],
                "score": this._scores[i],
                "isElectus": this._electus === i
            });
        }
        return arr;
    }
    get cards() {
        let arr = [];
        for (const i of this._cardOrder){
            const cIndex = this._revealedCards.indexOf(i);
            arr.push({
                "id": i,
                "revealed": this._revealedCards.includes(i),
                "content": cIndex === -1 ? "" : this._revealedCardContent[cIndex]
            });
        }
        return arr;
    }
    get pickedCard() {
        const i = this._pickedCard;
        const cIndex = this._revealedCards.indexOf(i);
        return {
            "content": cIndex === -1 ? "" : this._revealedCardContent[cIndex],
            "id": i,
            "revealed": true
        };
    }
    get isLocalPlayerElectus() {
        return this._users.indexOf(this._thisUser) === this._electus;
    }
    _room = -1;
    _users = [];
    _scores = [];
    _thisUser = "";
    _electus = -1;
    _cardOrder = [];
    _pickedCard = -1;
    _revealedCards = [];
    _revealedCardContent = [];
    constructor(url){
        this.connection = new NPClient(url);
        this.connection.addStructFromMap(eventMap);
        this.connection.on("error", (msg)=>{
            console.error(msg);
        });
        this.connection.on("userJoined", (o)=>{
            this._users.push(o.user);
            const previous = this._state;
            for (const a of this.gameStateChangeCallbacks){
                a(this._state, previous);
            }
        });
        this.connection.on("sync", (game)=>{
            const previous = this._state;
            this._state = game.state;
            this._users = game.users;
            this._electus = game.electus;
            this._room = game.room;
            this._cardOrder = game.cardOrder;
            this._pickedCard = game.picked;
            this._revealedCards = game.revealedCard;
            this._revealedCardContent = game.revealedCardContent;
            this._scores = game.scores;
            for (const a of this.gameStateChangeCallbacks){
                a(this._state, previous);
            }
        });
    }
    async connect() {
        await this.connection.ready();
        this._state = BlanksGameState.notInGame;
    }
    joinRoom(user, roomcode) {
        if (this._state === BlanksGameState.notConnected) throw "not connected";
        let room = typeof roomcode === "string" ? parseInt(roomcode) : roomcode;
        this._thisUser = user;
        this.connection.send("joinRoom", {
            "user": user,
            "room": room
        });
    }
    makeRoom(user) {
        if (this._state === BlanksGameState.notConnected) throw "not connected";
        this._thisUser = user;
        this.connection.send("createRoom", {
            "user": user
        });
    }
    submit(blank) {
        if (this._state === BlanksGameState.notConnected) throw "not connected";
        this.connection.send("submitAnswer", {
            room: this._room,
            user: this._thisUser,
            answer: blank
        });
    }
    pick(cardId) {
        if (this._state === BlanksGameState.notConnected) throw "not connected";
        this.connection.send("chooseFunny", {
            room: this._room,
            answerId: cardId
        });
    }
    on(event, callback) {
        switch(event){
            case "stateChange":
                {
                    this.gameStateChangeCallbacks.push(callback);
                    return;
                }
        }
    }
}
export { BlanksAPI as BlanksAPI };