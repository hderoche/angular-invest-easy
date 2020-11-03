export interface ShareRecord {
    name: string;
    ticker: string;
    description: string;
    lastPrice: number;
    isUp: boolean;
    capitalisation: string;
    tags: Array<string>;
    volume: number;
    per: number;
}


export class Share implements ShareRecord {
    name: string = null;
    ticker: string = null;
    description: string = null;
    lastPrice: number = null;
    isUp: boolean = null;
    capitalisation: string = null;
    tags: Array<string> = null;
    volume: number = null;
    per: number = null;

    constructor(input: any = {}) {
        // Prends les attributs de la classe et les map avec les champs du Json correspondant
        Object.keys(this).forEach(p => this[p] = (input as any)[p]);
        // Si le tableau de transaction est de type tableau et de longueur > 0
        // Appelle chaque constructeur de la classe Transaction pour faire la meme chose (recursivite)
    }
}


