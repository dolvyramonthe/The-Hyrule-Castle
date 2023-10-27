import { getInput, displayStatistics, attack, heal } from './utils';
import getPlayer from './getPlayersData';
import levelAndExperienceUp from './mods/level_and_experience';
import setUpPlayer from './mods/character_creation';

interface Player {
    id: number;
    name: string;
    hp: number;
    mp: number;
    str: number;
    int: number;
    def: number;
    res: number;
    spd: number;
    luck: number;
    race: number;
    class: number;
    rarity: number
}

let player : Player;
let enemy : Player;
let bosse : Player;
const playerPath: string = './json/players.json';
const enemyPath: string = './json/enemies.json';
const bossePath: string = './json/bosses.json';
const classePath: string = './json/classes.json';
const racePath: string = './json/races.json';
let setPlayerOption: string = getInput('Do you want to setUp your player yes or no? (Y / N)');
 
while(!(setPlayerOption.toLowerCase() === 'n' || setPlayerOption.toLowerCase() === 'y')) {
    setPlayerOption = getInput('Enter a valid option');
}

if(setPlayerOption.toLowerCase() === 'y') {
    try {
        player = setUpPlayer(classePath, racePath);
    } catch (error) {
        console.error(error.message);
    }
} else if(setPlayerOption.toLowerCase() === 'n') {
    try {
        player = getPlayer(playerPath);
    } catch (error) {
        console.error(error.message);
    }
}

try {
    enemy = getPlayer(enemyPath);
} catch (error) {
    console.error(error.message);
}

try {
    bosse = getPlayer(bossePath);
} catch (error) {
    console.error(error.message);
}

let playing: boolean = true;

while(playing) {
    let floorTracker: number = 1;
    let experience: number = 0;
    let fightTracker: number = 1;
    const playerMaxHp: number = player.hp;
    let result: string = '';

    while(floorTracker < 10) {
        const enemyMaxHp: number = enemy.hp;

        while(player.hp > 0 && enemy.hp > 0) {
            displayStatistics(enemy, player, floorTracker, fightTracker, enemyMaxHp, playerMaxHp, experience);

            let question: string = '';
            let inputValue: number = parseInt(getInput(question), 10);

            while(!(inputValue === 1 || inputValue === 2)) {
                let question: string = 'Please enter a valid Option';
                inputValue = parseInt(getInput(question), 10);
            }

            if(inputValue === 1) {
                const { enemyDamage, playerDamage} = attack(enemy, player);

                if(player.hp > 0) {
                    console.log("You attacked and dealt", playerDamage, "damages!");
                } else {
                    console.log(player.name, "died!");
                    result = 'You LOSE!'
                }

                if(enemy.hp > 0) {
                    console.log(enemy.name, "attacked and dealt", enemyDamage, "damages!");
                } else {
                    if(player.hp > 0) {
                        console.log(enemy.name, "died!");
                        const levelExp: any = levelAndExperienceUp(player, experience, floorTracker);

                        player = levelExp.player;
                        experience = levelExp.experience;
                        floorTracker = levelExp.floorTracker;

                        let question: string = '=== Press any key to continue ===';
                        getInput(question);
                    } else {
                        continue;
                    }
                }
            } else if(inputValue === 2) {
                const enemyDamage: number = heal(enemy, player, playerMaxHp);

                console.log("You used heal!");
                console.log(enemy.name, "attacked and dealt", enemyDamage, "damages!");
            }
    
            fightTracker++;
        }

        try {
            enemy = getPlayer(enemyPath);
        } catch (error) {
            console.error(error.message);
        }
        
        fightTracker = 1;
        floorTracker++;
    }

    const enemyMaxHp: number = bosse.hp;

    while(player.hp > 0 && bosse.hp > 0) {
        displayStatistics(bosse, player, floorTracker, fightTracker, enemyMaxHp, playerMaxHp, experience);

        let question: string = '';
        let inputValue: number = parseInt(getInput(question), 10);

        while(!(inputValue === 1 || inputValue === 2)) {
            let question: string = 'Please enter a valid Option';
            inputValue = parseInt(getInput(question), 10);
        }

        if(inputValue === 1) {
            const { enemyDamage, playerDamage} = attack(bosse, player);

                if(player.hp > 0) {
                    console.log("You attacked and dealt", playerDamage, "damages!");
                } else {
                    console.log(player.name, "died!");
                    result = 'You LOSE!'
                }

                if(bosse.hp > 0) {
                    console.log(bosse.name, "attacked and dealt", enemyDamage, "damages!");
                } else {
                    if(player.hp > 0) {
                        console.log(bosse.name, "died!");
                        result = 'You WIN!'
                    } else {
                        result = 'You LOSE!';
                    }
                }
        } else if(inputValue === 2) {
            const enemyDamage: number = heal(bosse, player, playerMaxHp);

            if(bosse.hp > 0) {
                console.log("You used heal!");
                console.log(bosse.name, "attacked and dealt", enemyDamage, "damages!");
            } else {
                console.log("You used heal!");
                console.log(bosse.name, "died!");
                result = 'You WIN!'
            }  
        }

        fightTracker++;
    }

    console.log('End of the game', result);
    playing = false;
}