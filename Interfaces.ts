interface Bosse {
    id: number,
    name: string,
    hp: number,
    mp: number,
    str: number,
    int: number,
    def: number,
    res: number,
    spd: number,
    luck: number,
    race: number,
    class: number,
    rarity: number
}

interface Classe {
    id: number,
    name: string,
    strengths: number[],
    weaknesses: number[],
    attack_type: string,
    alignment: string,
    rarity: number
}

interface Enemy {
    id: number,
    name: string,
    hp: number,
    mp: number,
    str: number,
    int: number,
    def: number,
    res: number,
    spd: number,
    luck: number,
    race: number,
    class: number,
    rarity: number
}

interface Player {
    id: number,
    name: string,
    hp: number,
    mp: number,
    str: number,
    int: number,
    def: number,
    res: number,
    spd: number,
    luck: number,
    race: number,
    class: number,
    rarity: number
}

interface Race  {
    id: number,
    name: string,
    strength: number[],
    weakness: number[],
    rarity: string
}

interface Spell {
    id: number,
    name: string,
    cost: number,
    dmg: number,
    effect: string,
    cooldown: number,
    race: string
    class: string,
    rarity: number
}

interface Trap { 
    id: number, 
    name: string, 
    requirement: string, 
    rarity: number 
}

export { Bosse, Classe, Enemy, Player, Race, Spell, Trap};