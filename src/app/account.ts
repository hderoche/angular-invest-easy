import { Share, ShareRecord } from './product';

export interface UserRecord {
    name: string;
    firstname: string;
    email: string;
    password: string;
    telephone: string;
    birthDate: string;
    adress: string;
    nationality: string;
}

export interface WalletRecord {
    user_id: string;
    portefolio: Share[];
}
export interface WalletListRecord{
    danger: string;
    wallets: Wallet[];
}


export class Wallet implements WalletRecord {
    // tslint:disable-next-line: variable-name
    user_id: string = null;
    portefolio: Share[] = null;
    constructor(input: any = {}) {
        // Prends les attributs de la classe et les map avec les champs du Json correspondant
        Object.keys(this).forEach(p => this[p] = (input as any)[p]);
        // Si le tableau de transaction est de type tableau et de longueur > 0
        // Appelle chaque constructeur de la classe Transaction pour faire la meme chose (recursivite)
        this.portefolio = [];
        if (toString.call(input.portefolio) === '[object Array]' && input.portefolio.length > 0) {
            input.portefolio.forEach((e: ShareRecord) => this.portefolio.push(new Share(e)));
        }
    }
}
export class WalletList implements WalletListRecord {
    danger: string = null;
    wallets: Wallet[] = null;
}

export class User implements UserRecord {
    name: string = null;
    firstname: string = null;
    email: string = null;
    password: string = null;
    telephone: string = null;
    birthDate: string = null;
    adress: string = null;
    nationality: string = null;

    constructor(input: any = {}) {
        // Prends les attributs de la classe et les map avec les champs du Json correspondant
        Object.keys(this).forEach(p => {
            if (p === 'password') {
                const pwd: string = (input as any)[p];
                this[p] = pwd.slice(8, 16);
            } else {
                this[p] = (input as any)[p];
            }});
    }
}

