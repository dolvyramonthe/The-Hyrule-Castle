import * as rl from 'readline-sync';
interface Player {
    name: string,
    hp: number,
    str: number
}

let Link: Player = {
    "name": "Link",
    "hp": 60,
    "str": 15
}

let Bokoblin: Player = {
    "name": "Bokoblin",
    "hp": 30,
    "str": 5
}

let Ganon: Player = {
    "name": "Ganon",
    "hp": 150,
    "str": 20
}

function displayStatistics(
    enemy: Player, 
    player: Player, 
    floor: number, 
    fight: number,
    enemyMaxHp: number,
    playerMaxHp: number
    ) {
    let enemyHp: string = "";
    let playerHp: string = "";

    console.log(`========== FLOOR ${floor} ==========`);
    console.log(`========== FIGHT ${fight} ==========`);
    console.log('\x1b[033m\x1b[91m', enemy.name);

    for(let i: number = 0; i < enemy.hp; i++){
        enemyHp += "I";
    }

    console.log('\x1b[033m\x1b[39m', 'HP:', enemyHp, enemy.hp, '/', enemyMaxHp);
    console.log('\n');
    console.log('\x1b[033m\x1b[92m', player.name);
    
    for(let j: number = 0; j < player.hp; j++){
        playerHp += "I";
    }

    console.log('\x1b[033m\x1b[39m', 'HP:', playerHp, player.hp, '/', playerMaxHp);
    console.log('\n');
    console.log('---Options-----------');
    console.log('1. Attack    2. Heal');
    console.log('\n');
    if(fight === 1) {
        console.log('You encounter a', enemy.name);
    }
}

const getInput = (question: string) => rl.question(`${question}\n`);



let floorTracker: number = 1;
let playing: boolean = true;

while(playing) {
    let fightTracker: number = 1;
    const playerMaxHp: number = Link.hp;

    while(floorTracker < 10) {
        const enemyMaxHp: number = Bokoblin.hp;

        while(Link.hp > 0 && Bokoblin.hp > 0) {
            displayStatistics(Bokoblin, Link, floorTracker, fightTracker, enemyMaxHp, playerMaxHp);
            let question: string = '';
            const inputValue: number = parseInt(getInput(question), 10);

            if(inputValue) {
                if(inputValue === 1 || inputValue === 2) {
                    if(inputValue === 1) {
                        // attack
                    } else if(inputValue === 2) {
                        // Heal
                    }
                } else {
                    console.error("Option does not exist");
                }
            } else {
                console.error("Option does not exist");
            }
            fightTracker++;
            Bokoblin.hp -= 15;
        }

        Bokoblin.hp = 30;
        fightTracker = 1;
        floorTracker++;
    }

    const enemyMaxHp: number = Ganon.hp;

    while(Link.hp > 0 && Ganon.hp > 0) {
        displayStatistics(Ganon, Link, floorTracker, fightTracker, enemyMaxHp, playerMaxHp);

        let question: string = '';
        const inputValue: number = parseInt(getInput(question), 10);

        if(inputValue) {
            if(inputValue === 1 || inputValue === 2) {
                if(inputValue === 1) {
                    // attack
                } else if(inputValue === 2) {
                    // Heal
                }
            } else {
                console.error("Option does not exist");
            }
        } else {
            console.error("Option does not exist");
        }

        fightTracker++;
        Ganon.hp -= 15;
    }

    console.log('End of the game You win!');
    playing = false;
}