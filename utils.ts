import * as rl from 'readline-sync';
import * as fs from 'fs';

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

export function displayStatistics(
    enemy: Player, 
    player: Player, 
    floor: number, 
    fight: number,
    enemyMaxHp: number,
    playerMaxHp: number,
    playerExperience: number
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
    console.log('\x1b[033m\x1b[39m', 'EXP:', playerExperience);
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

export function getInput(question: string) {
    return rl.question(`${question}\n`);
}

export function attack(enemy: Player, player: Player): any {
    const enemyDamage: number = enemy.str;
    const playerDamage: number = player.str;

    enemy.hp -= playerDamage;
    player.hp -= enemyDamage;

    return {enemyDamage: enemyDamage, playerDamage: playerDamage};
}

export function heal(enemy: Player, player: Player, playerMaxHp): number {
    const enemyDamage: number = enemy.str;
    const playerHeal: number = Math.round(playerMaxHp / 2);

    if(player.hp + playerHeal <= playerMaxHp) {
        player.hp += (playerHeal - enemyDamage);
    } else {
        console.error("You are not able to use this!");
    }

    return enemyDamage;
}

export function getDataFromFile(filePath): any[] | null {
    let players: Player[];
    const checkFile: boolean = fs.existsSync(filePath);

    if(!checkFile) {
        console.error("File not found.");
        return null;
    } else {
        players = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return players;
    }
}