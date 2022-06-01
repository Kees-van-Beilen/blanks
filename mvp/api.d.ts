{"version":3,"file":"maps.js","sourceRoot":"","sources":["maps.ts"],"names":[],"mappings":"AAAA,OAAO,EAAC,YAAY,EAAC,MAAM,yCAAyC,CAAA;AAGpE,MAAM,CAAC,MAAM,QAAQ,GAAG;IACpB,MAAM,EAAC,EAEN;IACD,MAAM,EAAC,EAEN;IAED,OAAO,EAAC;QACJ,MAAM,EAAC,YAAY,CAAC,KAAK;QACzB,KAAK,EAAC,YAAY,CAAC,MAAM;KAC5B;IAED,YAAY,EAAC;QACT,MAAM,EAAC,YAAY,CAAC,MAAM;KAC7B;IACD,UAAU,EAAC;QACP,MAAM,EAAC,YAAY,CAAC,MAAM;QAC1B,MAAM,EAAC,YAAY,CAAC,MAAM;KAC7B;IACD,YAAY,EAAC;QACT,MAAM,EAAC,YAAY,CAAC,MAAM;KAC7B;IACD,cAAc,EAAC;QACX,MAAM,EAAC,YAAY,CAAC,MAAM;QAC1B,MAAM,EAAC,YAAY,CAAC,MAAM;QAC1B,QAAQ,EAAC,YAAY,CAAC,MAAM;KAC/B;IACD,aAAa,EAAC;QACV,MAAM,EAAC,YAAY,CAAC,MAAM;QAC1B,UAAU,EAAC,YAAY,CAAC,KAAK;KAChC;IACD,cAAc,EAAC;QACX,MAAM,EAAC,YAAY,CAAC,MAAM;QAC1B,UAAU,EAAC,YAAY,CAAC,KAAK;KAChC;IAED,MAAM,EAAC;QACH,MAAM,EAAC,YAAY,CAAC,MAAM;QAC1B,OAAO,EAAC,YAAY,CAAC,KAAK;QAC1B,QAAQ,EAAC,YAAY,CAAC,UAAU;QAChC,OAAO,EAAC,YAAY,CAAC,WAAW;QAChC,SAAS,EAAC,YAAY,CAAC,KAAK;QAC5B,WAAW,EAAC,YAAY,CAAC,UAAU;QACnC,cAAc,EAAC,YAAY,CAAC,UAAU;QACtC,qBAAqB,EAAC,YAAY,CAAC,WAAW;QAC9C,QAAQ,EAAC,YAAY,CAAC,KAAK;QAC3B,UAAU,EAAC,YAAY,CAAC,MAAM;KACjC;IACD,YAAY,EAAC;QACT,MAAM,EAAC,YAAY,CAAC,MAAM;KAC7B;IACD,gBAAgB,EAAC;QACb,UAAU,EAAC,YAAY,CAAC,KAAK;QAC7B,SAAS,EAAC,YAAY,CAAC,MAAM;KAChC;IACD,eAAe,EAAC;QAEZ,WAAW,EAAC,YAAY,CAAC,UAAU;KACtC;IACD,aAAa,EAAC;QACV,QAAQ,EAAC,YAAY,CAAC,KAAK;QAC3B,OAAO,EAAC,YAAY,CAAC,WAAW;QAChC,QAAQ,EAAC,YAAY,CAAC,UAAU;QAChC,SAAS,EAAC,YAAY,CAAC,KAAK;KAC/B;IACD,cAAc,EAAC;QACX,UAAU,EAAC,YAAY,CAAC,MAAM;KACjC;CACJ,CAAA"}import { VariableType } from "./types.ts";
import { unpackObject, sortAlphabetically, objectGetPath } from "./helper.ts";
export class NPStruct {
    sections;
    isSingleArray;
    constructor(struct) {
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
        for (const path of paths) {
            const value = objectGetPath(struct, path);
            if (typeof value !== "number")
                continue;
            switch (value) {
                case VariableType.String: {
                    strings.push(path);
                    break;
                }
                case VariableType.UInt8: {
                    uint8.push(path);
                    break;
                }
                case VariableType.UInt16: {
                    uint16.push(path);
                    break;
                }
                case VariableType.UInt32: {
                    uint32.push(path);
                    break;
                }
                case VariableType.UInt64: {
                    uint64.push(path);
                    break;
                }
                case VariableType.Int: {
                    leInts.push(path);
                    break;
                }
                case VariableType.Boolean: {
                    booleans.push(path);
                    break;
                }
                case VariableType.ArrayString: {
                    ++c;
                    stringArray.push(path);
                    break;
                }
                case VariableType.ArrayUInt8: {
                    ++c;
                    uint8Array.push(path);
                    break;
                }
                case VariableType.ArrayUInt16: {
                    ++c;
                    uint16Array.push(path);
                    break;
                }
                case VariableType.ArrayInt: {
                    ++c;
                    leIntArrays.push(path);
                    break;
                }
            }
        }
        const _ = (a, t) => a.length > 0 ? t_sect.push(...a.map(e => [t, e ?? ""])) : null;
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
//# sourceMappingURL=struct.js.mapimport { VariableType } from "https://deno.inpolen.nl/NanoPack/mod.ts";
export const eventMap = {
    "ping": {},
    "pong": {},
    "error": {
        "code": VariableType.UInt8,
        "msg": VariableType.String
    },
    "createRoom": {
        "user": VariableType.String,
    },
    "joinRoom": {
        "user": VariableType.String,
        "room": VariableType.UInt16
    },
    "startRound": {
        "room": VariableType.UInt16,
    },
    "submitAnswer": {
        "room": VariableType.UInt16,
        "user": VariableType.String,
        "answer": VariableType.String
    },
    "chooseFunny": {
        "room": VariableType.UInt16,
        "answerId": VariableType.UInt8
    },
    "revealAnswer": {
        "room": VariableType.UInt16,
        "answerId": VariableType.UInt8
    },
    "sync": {
        "room": VariableType.UInt16,
        "state": VariableType.UInt8,
        "scores": VariableType.ArrayUInt8,
        "users": VariableType.ArrayString,
        "electus": VariableType.UInt8,
        "cardOrder": VariableType.ArrayUInt8,
        "revealedCard": VariableType.ArrayUInt8,
        "revealedCardContent": VariableType.ArrayString,
        "picked": VariableType.UInt8,
        "sentence": VariableType.String
    },
    "userJoined": {
        "user": VariableType.String,
    },
    "answerRevealed": {
        "answerId": VariableType.UInt8,
        "content": VariableType.String
    },
    "startChoosing": {
        "cardOrder": VariableType.ArrayUInt8
    },
    "endChoosing": {
        "picked": VariableType.UInt8,
        "users": VariableType.ArrayString,
        "scores": VariableType.ArrayUInt8,
        "electus": VariableType.UInt8
    },
    "roundStarted": {
        "sentence": VariableType.String,
    }
};
//# sourceMappingURL=maps.js.map/// <amd-module name="https://deno.inpolen.nl/NanoPack/mod.ts" />
export * from "./struct.ts";
export * from "./types.ts";
export * from "./classes/nanoPack.ts";
export * from "./classes/byteReader.ts";
export * from "../mod.ts";
export * from "../client.ts";
//# sourceMappingURL=mod.js.mapexport var KnownStruct;
(function (KnownStruct) {
    KnownStruct[KnownStruct["generalError"] = 1] = "generalError";
    KnownStruct[KnownStruct["staticError"] = 2] = "staticError";
    KnownStruct[KnownStruct["dynamicError"] = 4] = "dynamicError";
    KnownStruct[KnownStruct["static"] = 64] = "static";
    KnownStruct[KnownStruct["dynamic"] = 128] = "dynamic";
})(KnownStruct || (KnownStruct = {}));
export var VariableType;
(function (VariableType) {
    VariableType[VariableType["UInt8"] = 0] = "UInt8";
    VariableType[VariableType["UInt16"] = 1] = "UInt16";
    VariableType[VariableType["UInt32"] = 2] = "UInt32";
    VariableType[VariableType["UInt64"] = 3] = "UInt64";
    VariableType[VariableType["Int"] = 4] = "Int";
    VariableType[VariableType["String"] = 5] = "String";
    VariableType[VariableType["Boolean"] = 6] = "Boolean";
    VariableType[VariableType["ArrayUInt8"] = 7] = "ArrayUInt8";
    VariableType[VariableType["ArrayUInt16"] = 8] = "ArrayUInt16";
    VariableType[VariableType["ArrayInt"] = 9] = "ArrayInt";
    VariableType[VariableType["ArrayString"] = 10] = "ArrayString";
    VariableType[VariableType["ArrayBoolean"] = 11] = "ArrayBoolean";
})(VariableType || (VariableType = {}));
//# sourceMappingURL=types.js.map/// <amd-module name="https://deno.inpolen.nl/NanoPack/classes/byteReader.ts" />
export declare class ByteReader {
    private readonly data;
    private pos;
    private maxLength;
    constructor(data: Uint8Array);
    next(): number;
    readString(): string;
    readLEBase128(): number;
    eof(): boolean;
}
export class ByteReader {
    data;
    pos = 0;
    maxLength;
    constructor(data) {
        this.maxLength = data.length;
        this.data = data;
    }
    next() {
        if (this.pos >= this.maxLength)
            throw new Error("ByteReaderError");
        const value = this.data[this.pos];
        this.pos += 1;
        return value;
    }
    readString() {
        let str = "";
        while (true) {
            const cha = this.next();
            if (cha === 0x00 || cha === undefined)
                break;
            str += String.fromCharCode(cha);
        }
        return str;
    }
    readLEBase128() {
        let result = 0;
        let shift = 0;
        while (true) {
            const byte = this.next();
            result |= ((byte & 0x7f) << shift) >>> 0;
            shift += 7;
            if ((0x80 & byte) === 0) {
                if (shift < 32 && (byte & 0x40) !== 0) {
                    return (result | (~0 << shift)) >>> 0;
                }
                return result >>> 0;
            }
        }
    }
    eof() {
        return this.pos >= this.maxLength;
    }
}
//# sourceMappingURL=byteReader.js.mapimport { NanoPack } from "./mod.ts";
export class NPClient {
    packer;
    wss;
    StructNameToNumMap = {};
    eventMap = {};
    constructor(url = "ws://localhost:42252") {
        this.packer = new NanoPack();
        this.wss = new WebSocket(url);
        this.wss.addEventListener("message", async (a) => {
            const e = new Uint8Array(await a.data.arrayBuffer());
            const key = e[0] | e[1] << 8;
            const data = this.packer.deSerializeData(key, e.slice(2));
            if (this.eventMap[key]) {
                for (const callback of this.eventMap[key]) {
                    callback(data);
                }
            }
        });
    }
    ready() {
        return new Promise((resolve) => {
            this.wss.addEventListener("open", () => {
                resolve(0);
            });
        });
    }
    addStruct(forkey = 0, struct) {
        this.packer.addStruct(forkey, struct);
    }
    addStructFromMap(structMap, startNumber = 0) {
        let off = startNumber;
        for (const key in structMap) {
            this.StructNameToNumMap[key] = off;
            this.addStruct(off, structMap[key]);
            ++off;
        }
    }
    encode(key, data) {
        let num = 0;
        if (typeof key === "number") {
            num = key;
        }
        else {
            num = this.StructNameToNumMap[key];
        }
        return new Uint8Array([num & 0xFF, num >> 8 & 0xFF, ...this.packer.serializeData(num, data)]);
    }
    on(key, callback) {
        if (typeof key === "number") {
            if (!this.eventMap[key])
                this.eventMap[key] = [];
            this.eventMap[key].push(callback);
        }
        else {
            const n = this.StructNameToNumMap[key];
            if (!this.eventMap[n])
                this.eventMap[n] = [];
            this.eventMap[n].push(callback);
        }
    }
    send(key, object) {
        this.wss.send(this.encode(key, object));
    }
}
//# sourceMappingURL=client.js.mapexport var BlanksGameState;
(function (BlanksGameState) {
    BlanksGameState[BlanksGameState["notInGame"] = 200] = "notInGame";
    BlanksGameState[BlanksGameState["notConnected"] = 201] = "notConnected";
    BlanksGameState[BlanksGameState["error"] = 0] = "error";
    BlanksGameState[BlanksGameState["roomBeforeFirstStart"] = 1] = "roomBeforeFirstStart";
    BlanksGameState[BlanksGameState["roomInBetweenGame"] = 2] = "roomInBetweenGame";
    BlanksGameState[BlanksGameState["roomFillInTheBlank"] = 3] = "roomFillInTheBlank";
    BlanksGameState[BlanksGameState["roomPickingAnswers"] = 5] = "roomPickingAnswers";
})(BlanksGameState || (BlanksGameState = {}));
//# sourceMappingURL=state.js.map/// <amd-module name="file:///Users/kbeilen/Desktop/BiNaS/blanks/api/shared/state.ts" />
export declare const enum BlanksGameState {
    notInGame = 200,
    notConnected = 201,
    error = 0,
    roomBeforeFirstStart = 1,
    roomInBetweenGame = 2,
    roomFillInTheBlank = 3,
    roomPickingAnswers = 5
}
/// <amd-module name="https://deno.inpolen.nl/NanoPack/classes/nanoPack.ts" />
import { Struct, NestedObject } from "../mod.ts";
export declare class NanoPack {
    private structures;
    addStruct(forKey: number, struct: Struct): void;
    deSerializeData(forKey: number, raw_data: Uint8Array): NestedObject;
    serializeData(forKey: number, root: NestedObject): Uint8Array;
}
/// <amd-module name="https://deno.inpolen.nl/NanoPack/types.ts" />
export declare enum KnownStruct {
    generalError = 1,
    staticError = 2,
    dynamicError = 4,
    static = 64,
    dynamic = 128
}
export declare enum VariableType {
    UInt8 = 0,
    UInt16 = 1,
    UInt32 = 2,
    UInt64 = 3,
    Int = 4,
    String = 5,
    Boolean = 6,
    ArrayUInt8 = 7,
    ArrayUInt16 = 8,
    ArrayInt = 9,
    ArrayString = 10,
    ArrayBoolean = 11
}
export declare type Struct = {
    [key: string]: Struct | VariableType;
};
export declare type NestedObject = {
    [key: string]: NestedObject | unknown;
};
export function readArrayData(struct, data, formatter) {
    const arr = [];
    if (!struct.isSingleArray) {
        const length = data.readLEBase128();
        for (let i = 0; i < length; ++i) {
            arr.push(formatter(data));
        }
    }
    else {
        try {
            while (true) {
                arr.push(formatter(data));
            }
        }
        catch { }
    }
    return arr;
}
export function sortAlphabetically(list) {
    return list.sort((a, b) => (a == b) ? 0 : ((a > b) ? 1 : -1));
}
export function toLEBase128(num) {
    let value = num;
    value |= 0;
    const result = [];
    while (true) {
        const byte_ = value & 0x7f;
        value >>= 7;
        if ((value === 0 && (byte_ & 0x40) === 0) ||
            (value === -1 && (byte_ & 0x40) !== 0)) {
            result.push(byte_);
            return new Uint8Array(result);
        }
        result.push(byte_ | 0x80);
    }
}
export function unpackObject(obj, pathSeparator) {
    const keys = Object.keys(obj);
    const record = {};
    for (const key of keys) {
        if (typeof obj[key] === "object") {
            const l = unpackObject(obj[key], pathSeparator);
            for (const nestedKey of Object.keys(l)) {
                record[key + pathSeparator + nestedKey] = l[nestedKey];
            }
        }
        else {
            record[key] = obj[key];
        }
    }
    return record;
}
export function toCString(str) {
    const bytes = [];
    for (const cha of str) {
        bytes.push(cha.charCodeAt(0));
    }
    bytes.push(0x00);
    return bytes;
}
export function toUin8(num) {
    return num & ((1 << 8) - 1);
}
export function toUin16(num) {
    const val = num & ((1 << 16) - 1);
    return [val & 0xFF, (val >> 8) & 0xFF];
}
export function toUin32(num) {
    const val = ((1 << 32) - 1);
    return [val & 0xFF, (val >> 8) & 0xFF, (val >> 16) & 0xFF, (val >> 24) & 0xFF];
}
export function toUin64(num) {
    const val = ((1 << 64) - 1);
    return [val & 0xFF, (val >> 8) & 0xFF, (val >> 16) & 0xFF, (val >> 24) & 0xFF, (val >> 32) & 0xFF, (val >> 40) & 0xFF, (val >> 48) & 0xFF, (val >> 56) & 0xFF];
}
export function objectSetPath(o, path, to, pathSeparator = "/") {
    const parts = path.split(pathSeparator);
    let current = o;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]])
            current[parts[i]] = {};
        current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = to;
}
export function objectGetPath(o, path, pathSeparator = "/") {
    const parts = path.split(pathSeparator);
    let current = o;
    for (let i = 0; i < parts.length; i++) {
        if (current[parts[i]] === undefined)
            return undefined;
        current = current[parts[i]];
    }
    return current;
}
//# sourceMappingURL=helper.js.map{"version":3,"file":"nanoPack.js","sourceRoot":"","sources":["nanoPack.ts"],"names":[],"mappings":"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"}/// <amd-module name="file:///Users/kbeilen/Desktop/BiNaS/blanks/api/client/mod.ts" />
import { BlanksGameState } from "../shared/state.ts";
export declare type BlanksAPIEvent = "stateChange" | "connect" | "disconnect";
declare type BlanksAPIEventStateChange = (state: BlanksGameState, previousState: BlanksGameState) => void;
export interface BlanksAPIEventMap {
    "stateChange": BlanksAPIEventStateChange;
}
export interface User {
    name: string;
    score: number;
    isElectus: boolean;
}
export interface Card {
    id: number;
    revealed: boolean;
    content: string;
}
export declare class BlanksAPI {
    private readonly connection;
    private gameStateChangeCallbacks;
    private _state;
    get state(): BlanksGameState;
    get room(): number;
    get users(): User[];
    get cards(): Card[];
    get pickedCard(): Card;
    get isLocalPlayerElectus(): boolean;
    private _room;
    private _users;
    private _scores;
    private _thisUser;
    private _electus;
    private _cardOrder;
    private _pickedCard;
    private _revealedCards;
    private _revealedCardContent;
    constructor(url: string);
    connect(): Promise<void>;
    joinRoom(user: string, roomcode: string | number): void;
    makeRoom(user: string): void;
    submit(blank: string): void;
    on<K extends keyof BlanksAPIEventMap>(event: K, callback: BlanksAPIEventMap[K]): void;
}
export {};
{"version":3,"file":"client.js","sourceRoot":"","sources":["client.ts"],"names":[],"mappings":"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"}/// <amd-module name="https://deno.inpolen.nl/NanoPack/client.ts" />
import { Struct, NestedObject } from "./mod.ts";
export declare class NPClient {
    private readonly packer;
    private readonly wss;
    private StructNameToNumMap;
    private eventMap;
    constructor(url?: string);
    ready(): Promise<unknown>;
    addStruct(forkey: number | undefined, struct: Struct): void;
    addStructFromMap(structMap: Record<string, Struct>, startNumber?: number): void;
    encode(key: string | number, data: NestedObject): Uint8Array;
    on<StructMap = Record<string, any>>(key: keyof StructMap | number, callback: (value: NestedObject) => void): void;
    send<StructMap = Record<string, any>>(key: keyof StructMap | number, object: NestedObject): void;
}
{"version":3,"file":"state.js","sourceRoot":"","sources":["state.ts"],"names":[],"mappings":"AAAA,MAAM,CAAN,IAAkB,eAWjB;AAXD,WAAkB,eAAe;IAE7B,iEAAa,CAAA;IACb,uEAAgB,CAAA;IAEhB,uDAAO,CAAA;IACP,qFAAsB,CAAA;IACtB,+EAAmB,CAAA;IACnB,iFAAoB,CAAA;IAEpB,iFAAoB,CAAA;AACxB,CAAC,EAXiB,eAAe,KAAf,eAAe,QAWhC"}{"version":3,"file":"byteReader.js","sourceRoot":"","sources":["byteReader.ts"],"names":[],"mappings":"AAEA,MAAM,OAAO,UAAU;IAIF,IAAI,CAAY;IAEzB,GAAG,GAAC,CAAC,CAAC;IAEN,SAAS,CAAQ;IAEzB,YAAY,IAAe;QACvB,IAAI,CAAC,SAAS,GAAG,IAAI,CAAC,MAAM,CAAC;QAC7B,IAAI,CAAC,IAAI,GAAG,IAAI,CAAC;IACrB,CAAC;IAGM,IAAI;QACP,IAAG,IAAI,CAAC,GAAG,IAAE,IAAI,CAAC,SAAS;YAAC,MAAM,IAAI,KAAK,CAAC,iBAAiB,CAAC,CAAC;QAC/D,MAAM,KAAK,GAAG,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,CAAC;QAClC,IAAI,CAAC,GAAG,IAAE,CAAC,CAAC;QACZ,OAAO,KAAK,CAAC;IACjB,CAAC;IAEM,UAAU;QACb,IAAI,GAAG,GAAG,EAAE,CAAC;QACb,OAAM,IAAI,EAAC;YACP,MAAM,GAAG,GAAG,IAAI,CAAC,IAAI,EAAE,CAAC;YACxB,IAAG,GAAG,KAAG,IAAI,IAAE,GAAG,KAAG,SAAS;gBAAC,MAAM;YACrC,GAAG,IAAE,MAAM,CAAC,YAAY,CAAC,GAAG,CAAC,CAAC;SACjC;QACD,OAAO,GAAG,CAAC;IACf,CAAC;IAEM,aAAa;QAChB,IAAI,MAAM,GAAG,CAAC,CAAC;QACf,IAAI,KAAK,GAAG,CAAC,CAAC;QAEd,OAAO,IAAI,EAAE;YACX,MAAM,IAAI,GAAG,IAAI,CAAC,IAAI,EAAE,CAAC;YACzB,MAAM,IAAI,CAAC,CAAC,IAAI,GAAG,IAAI,CAAC,IAAI,KAAK,CAAC,KAAK,CAAC,CAAC;YACzC,KAAK,IAAI,CAAC,CAAC;YACX,IAAI,CAAC,IAAI,GAAG,IAAI,CAAC,KAAK,CAAC,EAAE;gBACvB,IAAI,KAAK,GAAG,EAAE,IAAI,CAAC,IAAI,GAAG,IAAI,CAAC,KAAK,CAAC,EAAE;oBACrC,OAAO,CAAC,MAAM,GAAG,CAAC,CAAC,CAAC,IAAI,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC;iBACvC;gBACD,OAAO,MAAM,KAAK,CAAC,CAAC;aACrB;SACF;IAYL,CAAC;IAGM,GAAG;QACN,OAAO,IAAI,CAAC,GAAG,IAAE,IAAI,CAAC,SAAS,CAAC;IACpC,CAAC;CACJ"}/// <amd-module name="file:///Users/kbeilen/Desktop/BiNaS/blanks/api/shared/maps.ts" />
import { VariableType } from "https://deno.inpolen.nl/NanoPack/mod.ts";
import { BlanksGameState } from "./state.ts";
export declare type T = typeof eventMap;
export declare const eventMap: {
    ping: {};
    pong: {};
    error: {
        code: VariableType;
        msg: VariableType;
    };
    createRoom: {
        user: VariableType;
    };
    joinRoom: {
        user: VariableType;
        room: VariableType;
    };
    startRound: {
        room: VariableType;
    };
    submitAnswer: {
        room: VariableType;
        user: VariableType;
        answer: VariableType;
    };
    chooseFunny: {
        room: VariableType;
        answerId: VariableType;
    };
    revealAnswer: {
        room: VariableType;
        answerId: VariableType;
    };
    sync: {
        room: VariableType;
        state: VariableType;
        scores: VariableType;
        users: VariableType;
        electus: VariableType;
        cardOrder: VariableType;
        revealedCard: VariableType;
        revealedCardContent: VariableType;
        picked: VariableType;
        sentence: VariableType;
    };
    userJoined: {
        user: VariableType;
    };
    answerRevealed: {
        answerId: VariableType;
        content: VariableType;
    };
    startChoosing: {
        cardOrder: VariableType;
    };
    endChoosing: {
        picked: VariableType;
        users: VariableType;
        scores: VariableType;
        electus: VariableType;
    };
    roundStarted: {
        sentence: VariableType;
    };
};
export interface EventRoomSync {
    "room": number;
    "state": BlanksGameState;
    "scores": number[];
    "users": string[];
    "electus": number;
    "cardOrder": number[];
    "revealedCard": number[];
    "revealedCardContent": string[];
    "picked": number;
    "sentence": string;
}
{"version":3,"file":"struct.js","sourceRoot":"","sources":["struct.ts"],"names":[],"mappings":"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"}{"version":3,"file":"mod.js","sourceRoot":"","sources":["mod.ts"],"names":[],"mappings":"AAAA,cAAc,aAAa,CAAA;AAC3B,cAAc,YAAY,CAAA;AAC1B,cAAc,uBAAuB,CAAA;AACrC,cAAc,yBAAyB,CAAA"}/// <amd-module name="https://deno.inpolen.nl/NanoPack/struct.ts" />
import { VariableType, Struct as t_struct } from "./types.ts";
declare type Struct = t_struct;
declare type Section = [VariableType, string];
export declare class NPStruct {
    readonly sections: Section[];
    readonly isSingleArray: boolean;
    constructor(struct: Struct);
}
export {};
{"version":3,"file":"mod.js","sourceRoot":"","sources":["mod.ts"],"names":[],"mappings":"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"}{"version":3,"file":"mod.js","sourceRoot":"","sources":["mod.ts"],"names":[],"mappings":"AAAA,cAAc,WAAW,CAAA;AACzB,cAAc,cAAc,CAAA"}{"version":3,"file":"helper.js","sourceRoot":"","sources":["helper.ts"],"names":[],"mappings":"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"}/// <amd-module name="https://deno.inpolen.nl/NanoPack/client/mod.ts" />
export * from "../mod.ts";
export * from "../client.ts";
import { NPStruct, ByteReader, VariableType } from "../mod.ts";
import { objectGetPath, objectSetPath, toCString, toUin8, toUin16, toLEBase128, readArrayData } from "../helper.ts";
export class NanoPack {
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
        for (const [type, path] of struct.sections) {
            switch (type) {
                case VariableType.Boolean: {
                    if (!lastWasBoolean) {
                        lastWasBoolean = true;
                        booleanByte = data.next();
                        boolpos = 0;
                    }
                    if (boolpos === 7) {
                        lastWasBoolean = false;
                    }
                    const bool = ((booleanByte & (1 << (7 - boolpos))) >> (7 - boolpos)) === 1;
                    objectSetPath(root, path, bool);
                    boolpos += 1;
                    break;
                }
                case VariableType.String: {
                    const str = data.readString();
                    objectSetPath(root, path, str);
                    break;
                }
                case VariableType.UInt8: {
                    const int = data.next();
                    objectSetPath(root, path, int);
                    break;
                }
                case VariableType.UInt16: {
                    const hi = data.next();
                    const lo = data.next();
                    const int = (hi << 8) | lo;
                    objectSetPath(root, path, int);
                    break;
                }
                case VariableType.Int: {
                    const int = data.readLEBase128();
                    objectSetPath(root, path, int);
                    break;
                }
                case VariableType.UInt32: {
                    console.log("This should not happen", path, type);
                    const int = data.next() << 24;
                    const int2 = data.next() << 16;
                    const int3 = data.next() << 8;
                    const int4 = data.next();
                    const int5 = int | int2 | int3 | int4;
                    objectSetPath(root, path, int5);
                    break;
                }
                case VariableType.UInt64: {
                    const int = data.next() << 56;
                    const int2 = data.next() << 48;
                    const int3 = data.next() << 40;
                    const int4 = data.next() << 32;
                    const int5 = data.next() << 24;
                    const int6 = data.next() << 16;
                    const int7 = data.next() << 8;
                    const int8 = data.next();
                    const int9 = int | int2 | int3 | int4 | int5 | int6 | int7 | int8;
                    objectSetPath(root, path, int9);
                    break;
                }
                case VariableType.ArrayString: {
                    const arr = readArrayData(struct, data, (d) => d.readString());
                    objectSetPath(root, path, arr);
                    break;
                }
                case VariableType.ArrayUInt8: {
                    const arr = readArrayData(struct, data, (d) => d.next());
                    objectSetPath(root, path, arr);
                    break;
                }
                case VariableType.ArrayUInt16: {
                    const arr = readArrayData(struct, data, (d) => (d.next() << 8) + d.next());
                    objectSetPath(root, path, arr);
                    break;
                }
                case VariableType.ArrayInt: {
                    const arr = readArrayData(struct, data, (d) => d.readLEBase128());
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
        for (const [type, path] of struct.sections) {
            const value = objectGetPath(root, path);
            if (type !== VariableType.Boolean && lastWasBoolean) {
                lastWasBoolean = false;
                data.push(booleanByte);
            }
            switch (type) {
                case VariableType.Boolean: {
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
                    booleanByte = (booleanByte | (val << (7 - boolpos)));
                    boolpos += 1;
                    break;
                }
                case VariableType.String: {
                    data.push(...toCString(value));
                    break;
                }
                case VariableType.UInt8: {
                    data.push(toUin8(value));
                    break;
                }
                case VariableType.UInt16: {
                    data.push(...toUin16(value).reverse());
                    break;
                }
                case VariableType.Int: {
                    data.push(...toLEBase128(value));
                    break;
                }
                case VariableType.ArrayString: {
                    const arr = value;
                    if (!struct.isSingleArray) {
                        data.push(...toLEBase128(arr.length));
                    }
                    for (const str of arr) {
                        data.push(...toCString(str));
                    }
                    break;
                }
                case VariableType.ArrayUInt8: {
                    const arr = value;
                    if (!struct.isSingleArray) {
                        data.push(...toLEBase128(arr.length));
                    }
                    for (const num of arr) {
                        data.push(toUin8(num));
                    }
                    break;
                }
                case VariableType.ArrayUInt16: {
                    const arr = value;
                    if (!struct.isSingleArray) {
                        data.push(...toLEBase128(arr.length));
                    }
                    for (const num of arr) {
                        data.push(...toUin16(num).reverse());
                    }
                    break;
                }
                case VariableType.ArrayInt: {
                    const arr = value;
                    if (!struct.isSingleArray) {
                        data.push(...toLEBase128(arr.length));
                    }
                    for (const num of arr) {
                        data.push(...toLEBase128(num));
                    }
                    break;
                }
            }
        }
        return new Uint8Array(data);
    }
}
//# sourceMappingURL=nanoPack.js.mapimport { NPClient } from "https://deno.inpolen.nl/NanoPack/client/mod.ts";
import { eventMap } from "../shared/maps.ts";
import { BlanksGameState } from "../shared/state.ts";
export class BlanksAPI {
    connection;
    gameStateChangeCallbacks = [];
    _state = BlanksGameState.notConnected;
    get state() { return this._state; }
    get room() { return this._room; }
    get users() {
        let arr = [];
        const len = this._users.length;
        for (let i = 0; i < len; ++i) {
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
        for (const i of this._cardOrder) {
            const cIndex = this._revealedCards.indexOf(i);
            arr.push({
                "id": i,
                "revealed": this._revealedCards.includes(i),
                "content": (cIndex === -1) ? "" : this._revealedCardContent[cIndex]
            });
        }
        return arr;
    }
    get pickedCard() {
        const i = this._pickedCard;
        const cIndex = this._revealedCards.indexOf(i);
        return {
            "content": (cIndex === -1) ? "" : this._revealedCardContent[cIndex],
            "id": i,
            "revealed": true,
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
    constructor(url) {
        this.connection = new NPClient(url);
        this.connection.addStructFromMap(eventMap);
        this.connection.on("sync", ((game) => {
            const previous = this._state;
            this._state = game.state;
            for (const a of this.gameStateChangeCallbacks) {
                a(this._state, previous);
            }
            this._users = game.users;
            this._electus = game.electus;
            this._room = game.room;
            this._cardOrder = game.cardOrder;
            this._pickedCard = game.picked;
            this._revealedCards = game.revealedCard;
            this._revealedCardContent = game.revealedCardContent;
            this._scores = game.scores;
        }));
    }
    async connect() {
        await this.connection.ready();
        this._state = BlanksGameState.notInGame;
    }
    joinRoom(user, roomcode) {
        if (this._state === BlanksGameState.notConnected)
            throw "not connected";
        let room = (typeof roomcode === "string") ? parseInt(roomcode) : roomcode;
        this._thisUser = user;
        this.connection.send("joinRoom", {
            "user": user,
            "room": room
        });
    }
    makeRoom(user) {
        if (this._state === BlanksGameState.notConnected)
            throw "not connected";
        this._thisUser = user;
        this.connection.send("createRoom", {
            "user": user
        });
    }
    submit(blank) {
        if (this._state === BlanksGameState.notConnected)
            throw "not connected";
        this.connection.send("submitAnswer", {
            room: this._room,
            user: this._thisUser,
            answer: blank
        });
    }
    on(event, callback) {
        switch (event) {
            case "stateChange": {
                this.gameStateChangeCallbacks.push(callback);
                return;
            }
        }
    }
}
//# sourceMappingURL=mod.js.map/// <amd-module name="https://deno.inpolen.nl/NanoPack/helper.ts" />
import { NestedObject } from "./types.ts";
import { NPStruct, ByteReader } from "./mod.ts";
export declare function readArrayData<T>(struct: NPStruct, data: ByteReader, formatter: (d: ByteReader) => T): T[];
export declare function sortAlphabetically(list: string[]): string[];
export declare function toLEBase128(num: number): Uint8Array;
export declare function unpackObject(obj: NestedObject, pathSeparator: string): Record<string, unknown>;
export declare function toCString(str: string): number[];
export declare function toUin8(num: number): number;
export declare function toUin16(num: number): number[];
export declare function toUin32(num: number): number[];
export declare function toUin64(num: number): number[];
export declare function objectSetPath(o: NestedObject, path: string, to: unknown, pathSeparator?: string): void;
export declare function objectGetPath(o: NestedObject, path: string, pathSeparator?: string): unknown;
export * from "./struct.ts";
export * from "./types.ts";
export * from "./classes/nanoPack.ts";
export * from "./classes/byteReader.ts";
//# sourceMappingURL=mod.js.map{"version":3,"file":"types.js","sourceRoot":"","sources":["types.ts"],"names":[],"mappings":"AACA,MAAM,CAAN,IAAY,WAYX;AAZD,WAAY,WAAW;IAEnB,6DAAmB,CAAA;IAEnB,2DAAkB,CAAA;IAElB,6DAAmB,CAAA;IAGnB,kDAAa,CAAA;IAEb,qDAAc,CAAA;AAClB,CAAC,EAZW,WAAW,KAAX,WAAW,QAYtB;AAED,MAAM,CAAN,IAAY,YAkBX;AAlBD,WAAY,YAAY;IACpB,iDAAK,CAAA;IACL,mDAAM,CAAA;IAEN,mDAAM,CAAA;IAEN,mDAAM,CAAA;IAEN,6CAAG,CAAA;IACH,mDAAM,CAAA;IACN,qDAAO,CAAA;IAEP,2DAAU,CAAA;IACV,6DAAW,CAAA;IACX,uDAAQ,CAAA;IACR,8DAAW,CAAA;IAEX,gEAAY,CAAA;AAChB,CAAC,EAlBW,YAAY,KAAZ,YAAY,QAkBvB"}