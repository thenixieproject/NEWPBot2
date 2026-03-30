// Library and Module Imports
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;

// Class Definitions
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
        this._warEffort = 0;
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
    get warEffort() { return this._warEffort }
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
    set warEffort(value) { this._warEffort = value }
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
        this._merits = 0;
        this._acquisition = 0;
        this._reinforcement = 0;
        this._undermining = 0;
    }
    // Getters
    get merits() { return this._merits }
    get acquisition() { return this._acquisition }
    get reinforcement() { return this._reinforcement }
    get undermining() { return this._undermining }
    // Setters
    set merits(value) { this._merits = value }
    set acquisition(value) { this._acquisition = value }
    set reinforcement(value) { this._reinforcement = value }
    set undermining(value) { this._undermining = value }
}

// Global Variables
const activeBgsSystems = [];
const activePowerplaySystems = [];

// Helper Functions

// Command Executions
// AddSystem command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('addsystem')
        .setDescription('Add a system to the contribution board')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('The name of the system to add')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('Is this a BGS or Powerplay system')
                .setRequired(true)),
    async execute(interaction) {
        const systemName = interaction.options.getString('name');
        const systemType = interaction.options.getString('type');

        try {
            if (systemType.toLowerCase() === 'bgs') {
                await activeBgsSystems.push(new BGSSystem(systemName));
            } else if (systemType.toLowerCase() === 'powerplay') {
                await activePowerplaySystems.push(new PowerplaySystem(systemName));
            } else {
                await interaction.reply({
                    content: `Error creating new system. System must be either BGS or Powerplay.`,
                    flags: MessageFlags.Ephemeral,
                });
            }
        } catch (error) {
            console.error(error);
        }
    },
};

// Remove System Command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('removesystem')
        .setDescription('Remove a system from contribution board')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('name of the system')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('Is this a bgs or powerplay system')
                .setRequired(true)),
    async execute (interaction) {
        const systemName = interaction.option.getString('name');
        const systemType = interaction.option.getString('type');

        // Search for the system and mark it for garbage collection
        if (systemType.toLowerCase() === 'bgs') {
            for (let i = 0; i < activeBgsSystems.length; i++) {
                if (activeBgsSystems[i].name === systemName) {
                    await activeBgsSystems[i] = null;
                    break;
                }
            }
        } else if (systemType.toLowerCase() === 'powerplay') {
            for (let i = 0; i < activePowerplaySystems.length; i++) {
                if (activePowerplaySystems[i].name === systemName) {
                    await activePowerplaySystems[i] = null;
                    break;
                }
            }
        }
    },
};

// Contribute Command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('contribute')
        .setDescription('Log your contributions')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('Name of star system')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('activity')
                .setDescription('Your contribution activity')
                .setRequired(true))
        .addNumberOption((option) =>
            option
                .setName('amount')
                .setDescription('How much you did')
                .setRequired(true)),
    async execute (interaction) {
        const systemName = interaction.option.getString('name');
        const activity = interaction.option.getString('activity');
        const contributionValue = interaction.option.getNumber('amount');

        if (activity.toLowerCase() === 'acquisition' || activity.toLowerCase() === 'reinforcement' || activity.toLowerCase() === 'undermining') {
            for (system in activePowerplaySystems) {
                if (systemName === system.name) {
                    if (activity.toLowerCase() === 'acquisition') {
                        system.acquisition += contributionValue;
                    } else if (activity.toLowerCase() === 'reinforcement') {
                        system.reinforcement += contributionValue;
                    } else {
                        system.undermining += contributionValue;
                    }
                    system.merits += contributionValue;
                    break;
                }
            }
        } else {
            for (system in activeBgsSystems) {
                if (systemName === system.name) {
                    if (activity.toLowerCase() === 'bonds') {
                        await system.bonds += contributionValue;
                    } else if (activity.toLowerCase() === 'bounties') {
                        await system.bounties += contributionValue;
                    } else if (activity.toLowerCase() === 'exploration') {
                        await system.exploration += contributionValue;
                    } // War Effort calculations
                    else if (activity.toLowerCase() === 'lcz') {
                        await system.warEffort += contributionValue;
                    } else if (activity.toLowerCase() === 'mcz') {
                        await system.warEffort += (contributionValue * 2);
                    } else if (activity.toLowerCase() === 'hcz') {
                        await system.warEffort += (contributionValue * 4);
                    } else if (activity.toLowerCase() === 'glcz') {
                        await system.warEffort += (contributionValue / 4);
                    } else if (activity.toLowerCase() === 'gmcz') {
                        await system.warEffort += (contributionValue / 2);
                    } else if (activity.toLowerCase() === 'ghcz') {
                        await system.warEffort += contributionValue;
                    } // Continue other non-War Effort calculations
                    else if (activity.toLowerCase() === 'influence') {
                        await system.influence += contributionValue
                    } else if (activity.toLowerCase() === 'installationdefense') {
                        await system.installationDefense += contributionValue;
                    } else if (activity.toLowerCase() === 'murder') {
                        await system.murder += contributionValue;
                    } else if (activity.toLowerCase() === 'paxfails') {
                        await system.paxFails += contributionValue;
                    } else if (activity.toLowerCase() === 'trade') {
                        await system.trade += contributionValue;
                    } else if (activity.toLowerCase() === 'warband') {
                        await system.warband += contributionValue;
                    } else if (acitivity.toLowerCase() === 'blackmarket') {
                        await system.blackMarket += contributionValue;
                    } else {
                        await interaction.reply({
                            content: 'You did not enter a valid activity. Check the pins for syntax',
                            flags: MessageFlags.Ephemeral
                        });
                    }
                    break;
                }
            }
        }
    }
};

// Display contribution board
module.exports = {
    data: new SlashCommandBuilder()
        .setName('displayeffortboard')
        .setDescription('Display current systems'),
    async execute(interaction) {

    },
};