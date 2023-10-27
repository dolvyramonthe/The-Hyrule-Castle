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

export default function setUpPlayer(classesPath: string, racesPath: string): Player {
    let classes: Classe[] | null;
    let races: Race[];
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
        races = getDataFromFile(racesPath);
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
        classes = getDataFromFile(classesPath);
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
    };
}