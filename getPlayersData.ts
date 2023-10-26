import * as fs from 'fs';
import Player from './Interfaces';

interface NewPlayer {
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
    rarity: number;
    probability: number;
}

function getRandomElement(array: NewPlayer[]): number | null {
    const totalProbability = array.reduce((acc, obj) => acc + obj.probability, 0);
    if (totalProbability <= 0) {
        return -1;
    }

    let randomValue = Math.random() * totalProbability;
    for (const item of array) {
        if (randomValue < item.probability) {
            return item.id;
        }
        randomValue -= item.probability;
    }

    return null;
}

export default function getPlayer(filePath: string): Player {
    let players : Player[] = [];
    let player : Player;
    let newPlayersList: any[] = [];
    let newPlayer: any = {};
    const checkFile: boolean = fs.existsSync(filePath);

    if(!checkFile) {
        console.error("File not found.");
    } else {
        players = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        for (const iterator of players) {
            if(iterator.rarity === 0) {
                newPlayer = iterator;
                newPlayer.probability = 0;
                newPlayersList.push(newPlayer);
            } else if(iterator.rarity === 1) {
                newPlayer = iterator;
                newPlayer.probability = 0.5;
                newPlayersList.push(newPlayer);
            } else if(iterator.rarity === 2) {
                newPlayer = iterator;
                newPlayer.probability = 0.3;
                newPlayersList.push(newPlayer);
            } else if(iterator.rarity === 3) {
                newPlayer = iterator;
                newPlayer.probability = 0.15;
                newPlayersList.push(newPlayer);
            } else if(iterator.rarity === 4) {
                newPlayer = iterator;
                newPlayer.probability = 0.04;
                newPlayersList.push(newPlayer);
            } else if(iterator.rarity === 5) {
                newPlayer = iterator;
                newPlayer.probability = 0.01;
                newPlayersList.push(newPlayer);
            }
        }
    }
    
    let playerId: number | null = getRandomElement(newPlayersList);

    while(!playerId) {
        playerId = getRandomElement(newPlayersList);
    }

    if(playerId != -1) {
        for (const item of players) {
            if(item.id === playerId) {
                player = item;
            }
        }
    } else {
        console.error("Players' list is not valid.");
    }
    
    return player;
}