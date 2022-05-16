export const enum BlanksGameState {
    //niet gesynced
    notInGame=200,
    notConnected=201,
    //gesynced
    error=0,///Wanneer er een globale room error is
    roomBeforeFirstStart=1,///Waneer een room nog net is aangemaakt en iedereen nog aan het joinen is
    roomInBetweenGame=2,///Wanneer de grapigste kaart is gekozen en de tussen stand word laten zien
    roomFillInTheBlank=3,///wanneer de users een antwoord moeten invullen behalve de electus
    // roomWaitingForAllAnswers=4,///Wanneer je all een antwoord hebt ingeleverd
    roomPickingAnswers=5,//De electus is nu kaarten aan het revealen en kiezen
}