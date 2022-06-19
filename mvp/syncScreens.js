import { BlanksAPI ,BlanksGameState} from "./api.js";
import { docById } from "./doc.mjs";
import { setScreen } from "./screen.js";

const {
    scoreboardStart:scoreboardStartBTN,
    scoreboardUsers,
    fitbZin,
    cardsCardsHolder,
    cardsZin
} = docById()


/** @type {BlanksAPI} */
let api;

function updatePlayers(){
    // console.log(scoreboardUsers.children)
    [...scoreboardUsers.children].forEach(e=>e.remove());
    for(const user of api.users){
        const p = document.createElement("p");
        const str = document.createElement(user.isElectus ?"strong" : "span");
        const score = document.createElement("span");
        score.innerText = `(${user.score ?? 0})`;
        str.innerText = user.name
        p.appendChild(str);
        p.appendChild(score);
        scoreboardUsers.appendChild(p);
    }
}

/**
 * 
 * @param {BlanksAPI} t_api 
 */
export function syncScreens(t_api){
    api = t_api
    api.on("stateChange", (currentState, previousState) => {
        //verandering in kamer
        if (currentState == previousState){
            if(currentState == BlanksGameState.roomBeforeFirstStart || currentState == BlanksGameState.roomInBetweenGame){
                updatePlayers();
            }
            return;
        }
        //verwisseling van kamer
        switch(currentState) {
            case BlanksGameState.notConnected:
                setScreen('main');
                return;
            case BlanksGameState.notInGame:
                setScreen('main');
                return;
            case BlanksGameState.roomInBetweenGame:
            case BlanksGameState.roomBeforeFirstStart:
                setScreen('scoreboard');
                scoreboardStartBTN.setAttribute('hidden', api.isLocalPlayerElectus ? 'false' : 'true');
                updatePlayers();
                return;
            case BlanksGameState.roomFillInTheBlank:
                if (!api.isLocalPlayerElectus) {
                    setScreen('fillInTheBlank');
                    fitbZin.innerText = api.sentence
                }
                else {
                    setScreen('electusWaiting');
                }
                return;
            case BlanksGameState.roomPickingAnswers:
                setScreen('cards');
                cardsZin.innerText = api.sentence;
                [...cardsCardsHolder.children].forEach(e=>e.remove());
                for(const card of api.cards){
                    const ef = document.createElement("div");
                    const c = document.createElement("span");
                    const b = document.createElement("button");
                    c.innerText = card.content;
                    b.innerText = "Kies";
                    const id = card.id;
                    b.addEventListener("click",()=>{
                        setScreen("wait")
                        api.pick(id);
                    });
                    ef.appendChild(c);
                    if(api.isLocalPlayerElectus)ef.appendChild(b);
                    cardsCardsHolder.appendChild(ef);
                }
                return;
        }
    });
    
}