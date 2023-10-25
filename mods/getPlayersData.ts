import * as fs from 'fs';
import Player from './Interfaces';

const getRandomElement = (array: any[]) => {
    let pickedValue: number = 0;
    let randomNumber: number = Math.random();
    let threshold: number = 0;
    let defaultPlayer: any = {};

    for (let i: number = 0; i < array.length; i++) {
        if (array[i].probability === 0) {
            continue;
        }

        threshold += array[i].probability;

        if (threshold > randomNumber) {
                pickedValue = array[i].id;
                break;
        }

        if (!pickedValue) {
            defaultPlayer = array.find((item) => item.probability === 0);
            pickedValue = defaultPlayer.id;
        }
    }

    return pickedValue;
}

export default function getPlayer(filePath: string): Player {
    let players : Player[] = [];
    let player : Player;
    let newPlayersList: any[] = [];
    let newPlayer: any = {};
    const checkFile: boolean = fs.existsSync(filePath);

    if(!checkFile) {

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
    
    const playerId: number = getRandomElement(newPlayersList);

    console.log(playerId);

    // player = players.find((item) => item.id === playerId);

    return player;
}