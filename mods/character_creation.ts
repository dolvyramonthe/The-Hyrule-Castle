import { Player, Classe, Race } from '../Interfaces';
import { getInput, getDataFromFile } from '../utils';

function setString(): string {
    let name: string;
    do {
        name = getInput("Enter a name (at least 3 characters):") || "";
    } while (name.length < 3);
    return name;
}

function setNumber(attribute: string, min: number, max: number): number {
    let value: number;
    do {
        value = parseInt(getInput(`Enter ${attribute} (${min}-${max}):`) || "");
    } while (isNaN(value) || value < min || value > max);
    return value;
}

function generatePlayer(classePath: string, racePath: string): Player {
    let classes: Classe[] | null;
    let races: Race[] | null;
    const id = 1;
    const name = setString();
    const hp = setNumber("HP", 45, 80);
    const mp = setNumber("MP", 30, 300);
    const str = setNumber("Strength (str)", 8, 25);
    const int = setNumber("Intelligence (int)", 5, 20);
    const def = setNumber("Defense (def)", 1, 10);
    const res = setNumber("Resistance (res)", 1, 10);
    const spd = setNumber("Speed (spd)", 1, 15);
    const luck = setNumber("Luck", 5, 30);

    try {
        races = getDataFromFile(racePath);
    } catch (error) {
        console.error("race not found.");
    }

    console.log("********** Enter your Race **********");
    let race: number;

    if(races) {
        for (const race of races) {
            console.log(race.id, race.name)
        }

        race = setNumber("Race", races[0].id, races[races.length - 1].id);
    } else {
        race = setNumber("Race", 1, 17);
    }

    try {
        classes = getDataFromFile(classePath);
    } catch (error) {
        console.error("classe not found.");
    }

    console.log("********** Enter your Classe **********");
    let playerClass: number;

    if(classes) {
        for (const classe of classes) {
            console.log(classe.id, classe.name)
        }

        playerClass = setNumber("Class", classes[0].id, classes[classes.length - 1].id);
    } else {
        playerClass = setNumber("Class", 1, 9);
    }

    const rarity = 0;

    return {
        id,
        name,
        hp,
        mp,
        str,
        int,
        def,
        res,
        spd,
        luck,
        race,
        class: playerClass,
        rarity,
    }
}

// function confirmPlayer(player: Player) {
//     for (let key in player) {
//         let value = player[key];
        
//         console.log(`${key}:`, value);
//     }

//     let validatePlayer: string = getInput('Do you confirm this Player? (Y / N)');

//     while(!(validatePlayer.toLowerCase() === 'n' || validatePlayer.toLowerCase() === 'y')) {
//         validatePlayer = getInput('Enter a valid option');
//     }

//     if(validatePlayer.toLowerCase() === 'y') {
//         return player;
//     } else if(validatePlayer.toLowerCase() === 'n') {
//         player = generatePlayer(classesPath, racesPath);
//     }
// }

export default function setUpPlayer(classesPath: string, racesPath: string): Player {
    let player: Player;
    let validating: boolean = false;

    while(! validating) {
        player = generatePlayer(classesPath, racesPath);

        console.log("********** Your Statistics **********");

        for (let key in player) {
            let value = player[key];
            
            if(key != 'id' && key != 'rarity') {
                console.log(`${key}:`, value);
            }
        }

        let validatePlayer: string = getInput('Do you confirm this Player? (Y / N)');

        while(!(validatePlayer.toLowerCase() === 'n' || validatePlayer.toLowerCase() === 'y')) {
            validatePlayer = getInput('Enter a valid option');
        }

        if(validatePlayer.toLowerCase() === 'y') {
            validating = true;
        } else if(validatePlayer.toLowerCase() === 'n') {
            validating = false;
        }
    }

    return player;
}