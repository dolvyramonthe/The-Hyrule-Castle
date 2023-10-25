import * as rl from 'readline-sync';
import Player from './Interfaces';
import getPlayer from './getPlayersData';

let player : Player;
let enemy : Player;
let bosse : Player;
const playerPath: string = '../json/players.json';
const enemyPath: string = '../json/enemies.json';
const bossePath: string = '../json/bosses.json';

player = getPlayer(playerPath);

// function displayStatistics(
//     enemy: Player, 
//     player: Player, 
//     floor: number, 
//     fight: number,
//     enemyMaxHp: number,
//     playerMaxHp: number
//     ) {
//     let enemyHp: string = "";
//     let playerHp: string = "";

//     console.log(`========== FLOOR ${floor} ==========`);
//     console.log(`========== FIGHT ${fight} ==========`);
//     console.log('\x1b[033m\x1b[91m', enemy.name);

//     for(let i: number = 0; i < enemy.hp; i++){
//         enemyHp += "I";
//     }

//     console.log('\x1b[033m\x1b[39m', 'HP:', enemyHp, enemy.hp, '/', enemyMaxHp);
//     console.log('\n');
//     console.log('\x1b[033m\x1b[92m', player.name);
    
//     for(let j: number = 0; j < player.hp; j++){
//         playerHp += "I";
//     }

//     console.log('\x1b[033m\x1b[39m', 'HP:', playerHp, player.hp, '/', playerMaxHp);
//     console.log('\n');
//     console.log('---Options-----------');
//     console.log('1. Attack    2. Heal');
//     console.log('\n');
//     if(fight === 1) {
//         console.log('You encounter a', enemy.name);
//     }
// }

// const getInput = (question: string) => rl.question(`${question}\n`);

// function attack(enemy: Player, player: Player): any {
//     const enemyDamage: number = enemy.str;
//     const playerDamage: number = player.str;

//     enemy.hp -= playerDamage;
//     player.hp -= enemyDamage;

//     return {enemyDamage: enemyDamage, playerDamage: playerDamage};
// }

// function heal(enemy: Player, player: Player, playerMaxHp): number {
//     const enemyDamage: number = enemy.str;
//     const playerHeal: number = Math.round(playerMaxHp / 2);

//     if(player.hp + playerHeal <= playerMaxHp) {
//         player.hp += (playerHeal - enemyDamage);
//     } else {
//         console.error("You are not able to use this!");
//     }

//     return enemyDamage;
// }

// let floorTracker: number = 1;
// let playing: boolean = true;

// while(playing) {
//     let fightTracker: number = 1;
//     const playerMaxHp: number = Link.hp;
//     let result: string = '';

//     while(floorTracker < 10) {
//         const enemyMaxHp: number = Bokoblin.hp;

//         while(Link.hp > 0 && Bokoblin.hp > 0) {
//             displayStatistics(Bokoblin, Link, floorTracker, fightTracker, enemyMaxHp, playerMaxHp);
//             let question: string = '';
//             let inputValue: number = parseInt(getInput(question), 10);

//             while(!(inputValue === 1 || inputValue === 2)) {
//                 let question: string = 'Please enter a valid Option';
//                 inputValue = parseInt(getInput(question), 10);
//             }

//             if(inputValue === 1) {
//                 const { enemyDamage, playerDamage} = attack(Bokoblin, Link);

//                 if(Link.hp > 0) {
//                     console.log("You attacked and dealt", playerDamage, "damages!");
//                 } else {
//                     console.log(Link.name, "died!");
//                     result = 'You LOSE!'
//                 }

//                 if(Bokoblin.hp > 0) {
//                     console.log(Bokoblin.name, "attacked and dealt", enemyDamage, "damages!");
//                 } else {
//                     if(Link.hp > 0) {
//                         console.log(Bokoblin.name, "died!");
//                         let question: string = '=== Press any key to continue ===';
//                         getInput(question);
//                     } else {
//                         continue;
//                     }
//                 }
//             } else if(inputValue === 2) {
//                 const enemyDamage: number = heal(Bokoblin, Link, playerMaxHp);

//                 console.log("You used heal!");
//                 console.log(Bokoblin.name, "attacked and dealt", enemyDamage, "damages!");
//             }
    
//             fightTracker++;
//         }

//         Bokoblin.hp = 30;
//         fightTracker = 1;
//         floorTracker++;
//     }

//     const enemyMaxHp: number = Ganon.hp;

//     while(Link.hp > 0 && Ganon.hp > 0) {
//         displayStatistics(Ganon, Link, floorTracker, fightTracker, enemyMaxHp, playerMaxHp);

//         let question: string = '';
//         let inputValue: number = parseInt(getInput(question), 10);

//         while(!(inputValue === 1 || inputValue === 2)) {
//             let question: string = 'Please enter a valid Option';
//             inputValue = parseInt(getInput(question), 10);
//         }

//         if(inputValue === 1) {
//             const { enemyDamage, playerDamage} = attack(Ganon, Link);

//                 if(Link.hp > 0) {
//                     console.log("You attacked and dealt", playerDamage, "damages!");
//                 } else {
//                     console.log(Link.name, "died!");
//                     result = 'You LOSE!'
//                 }

//                 if(Ganon.hp > 0) {
//                     console.log(Ganon.name, "attacked and dealt", enemyDamage, "damages!");
//                 } else {
//                     if(Link.hp > 0) {
//                         console.log(Ganon.name, "died!");
//                         result = 'You WIN!'
//                     } else {
//                         result = 'You LOSE!';
//                     }
//                 }
//         } else if(inputValue === 2) {
//             const enemyDamage: number = heal(Ganon, Link, playerMaxHp);

//             if(Ganon.hp > 0) {
//                 console.log("You used heal!");
//                 console.log(Ganon.name, "attacked and dealt", enemyDamage, "damages!");
//             } else {
//                 console.log("You used heal!");
//                 console.log(Ganon.name, "died!");
//                 result = 'You WIN!'
//             }  
//         }

//         fightTracker++;
//     }

//     console.log('End of the game', result);
//     playing = false;
// }