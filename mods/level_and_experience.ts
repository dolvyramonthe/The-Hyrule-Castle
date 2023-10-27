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

function getExperience(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getStatistics(array: string[]) {
    const statIndex: number = Math.floor(Math.random() * array.length);

    return array[statIndex];
}

export default function levelAndExperienceUp(player: Player, experience: number, floorTracker: number): any {
    const exp: number = getExperience(15, 50);

    if(experience + exp < 150) {
        experience += exp;
    } else {
        experience = 0;
        floorTracker++;
    }

    const statTab = ["hp", "mp", "str", "int", "def", "res", "spd", "luck"];
    const stat: string = getStatistics(statTab);

    if(stat === "hp") {
        player.hp++;
    }

    if(stat === "mp") {
        player.mp++;
    }

    if(stat === "str") {
        player.str++;
    }

    if(stat === "int") {
        player.int++;
    }

    if(stat === "def") {
        player.def++;
    }

    if(stat === "res") {
        player.res++;
    }

    if(stat === "spd") {
        player.spd++;
    }

    if(stat === "luck") {
        player.luck++;
    }

    const returnedObject: any = {
        'player': player,
        'experience': experience,
        'floorTracker': floorTracker
    }

    return returnedObject;
}