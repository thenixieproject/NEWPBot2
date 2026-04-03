// Parent class, which will contain only a name
class StarSystem {
    constructor(name) {
        this._name = name
    }
    // Getters
    get name() { return this._name }
}
// BGS Child class, which contains data for BGS contributions
class BGSSystem extends StarSystem {
    constructor(name) {
        super(name);
        this._bonds = 0;
        this._bounties = 0;
        this._exploration = 0;
        this._spaceWarEffort = 0;
        this._groundWarEffort
        this._influence = 0;
        this._installationDefense = 0;
        this._murder = 0;
        this._paxFails = 0;
        this._trade = 0;
        this._warband = 0;
        this._blackMarket = 0;
    }
    // Getters
    get bonds() { return this._bonds }
    get bounties() { return this._bounties }
    get exploration() { return this._exploration }
    get spaceWarEffort() { return this._spaceWarEffort }
    get groundWarEffort() { return this._groundWarEffort }
    get influence() { return this._influence }
    get installationDefense() { return this._installationDefense }
    get murder() { return this._murder }
    get paxFails() { return this._paxFails }
    get trade() { return this._trade }
    get warband() { return this._warband }
    get blackMarket() { return this._blackMarket }
    // Setters
    set bonds(value) { this._bonds = value }
    set bounties(value) { this._bounties = value }
    set exploration(value) { this._exploration = value }
    set influence(value) { this._influence = value }
    set spaceWarEffort(value) { this._spaceWarEffort = value }
    set groundWarEffort(value) { this._groundWarEffort = value }
    set installationDefense(value) { this._installationDefense = value }
    set murder(value) { this._murder = value }
    set paxFails(value) { this._paxFails = value }
    set trade(value) { this._trade = value }
    set warband(value) { this._warband = value }
    set blackMarket(value) { this._blackMarket = value }
}
// Powerplay Child class, which contains data only for powerplay systems
class PowerplaySystem extends StarSystem {
    constructor (name) {
        super(name);
        this._controlPoints = 0;
        this._acquisition = 0;
        this._reinforcement = 0;
        this._undermining = 0;
    }
    // Getters
    get controlPoints() { return this._controlPoints }
    get acquisition() { return this._acquisition }
    get reinforcement() { return this._reinforcement }
    get undermining() { return this._undermining }
    // Setters
    set controlPoints(value) { this._controlPoints = value }
    set acquisition(value) { this._acquisition = value }
    set reinforcement(value) { this._reinforcement = value }
    set undermining(value) { this._undermining = value }
}
class User {
    constructor(name) {
        this.username = name;
        this.rank = "Faction Ops";
        this.bonds = 0;
        this.bounties = 0;
        this.exploration = 0;
        this.spaceWarEffort = 0;
        this.groundWarEffort = 0;
        this.influence = 0;
        this.installationDefense = 0;
        this.murder = 0;
        this.paxFails = 0;
        this.trade = 0;
        this.warband = 0;
        this.blackMarket = 0;
        this.controlPoints = 0;
    }
}
// Global Variables
const activeBgsSystems = [];
const activePowerplaySystems = [];

module.exports = { StarSystem, BGSSystem, PowerplaySystem, User, activeBgsSystems, activePowerplaySystems };