warn("Trigger script is working");

{
    let difficulty = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger).GetDifficulty();
}

Trigger.prototype.MyAction = function(data)
{
    // Ask a different function to calculate something, or execute some sub-action
    // var entities = this.GetRelevantEntities(data.player);
    // Do something with those entities
    const oBear = "gaia/fauna_bear";
    const oWolf = "gaia/fauna_wolf";
    const oSkirmisher = "units/gaul_infantry_javelinist_b";
    const oFemale = "units/gaul_support_female_citizen";
    const oDog = "units/brit_war_dog_b";

    let spawnEnt = TriggerHelper.GetPlayerEntitiesByClass(0, "CivCentre")[0];
    let ents = TriggerHelper.SpawnUnits(spawnEnt, oSkirmisher, 30, 0);
    for (let ent of ents) {
        TriggerHelper.SetUnitStance(ent, "violent");
    }

    let activePlayers = Engine.QueryInterface(SYSTEM_ENTITY, IID_PlayerManager).GetActivePlayers();
    let civCenterEnt = TriggerHelper.GetPlayerEntitiesByClass(pickRandom(activePlayers), "CivCentre")[0];
    let targetPos = TriggerHelper.GetEntityPosition2D(civCenterEnt);

    // warn(pickRandom(activePlayers));
    // ProcessCommand(0, {
    //     "type": "attack",
    //     "entities": ents,
    //     "target": civCenterEnt,
    //     "queued": true,
    //     "allowCapture": false
    // });
    ProcessCommand(0, {
        "type": "patrol",
        "entities": ents,
        "x": targetPos.x,
        "z": targetPos.y,
        "targetClasses": {
            "attack": "Unit+!Ship"
        },
        "queued": true,
        "allowCapture": false
    });


};

Trigger.prototype.GetRelevantEntities = function(player)
{
    // calculate something
    return relevantEntities;
};

{
    // Get the cmpTrigger object
    let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);

    // Register the trigger directly
    cmpTrigger.RegisterTrigger("OnInterval", "MyAction", { "delay": 5000, "interval": 10000, "enabled": true });

    // Add data to it
    cmpTrigger.executedTriggers = 0;
    cmpTrigger.killedUnits = 0;
    cmpTrigger.state = "initialising";
}