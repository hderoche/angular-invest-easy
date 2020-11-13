
import { Share, ShareAmount, ShareRecord } from './product';

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

export interface CredentialsRecord {
    token: string;
    userId: string;
}

export interface WalletRecord {
    user_id: string;
    portefolio: ShareAmount[];
}
export interface WalletListRecord{
    danger: string;
    wallets: Wallet[];
}


export class Wallet implements WalletRecord {
    // tslint:disable-next-line: variable-name
    user_id: string = null;
    portefolio: ShareAmount[] = null;
    constructor(input: any = {}) {
        // Prends les attributs de la classe et les map avec les champs du Json correspondant
        // Object.keys(this).forEach(p => this[p] = (input as any)[p]);
        Object.keys(this).map(p =>  this[p] = (input as any)[p]);
        // Si le tableau de transaction est de type tableau et de longueur > 0
        // Appelle chaque constructeur de la classe Transaction pour faire la meme chose (recursivite)
    }
}
export class WalletList implements WalletListRecord {
    danger: string = null;
    wallets: Wallet[] = null;
}

export class Credentials implements CredentialsRecord {
    token: string = null;
    userId: string = null;
    constructor(input: any = {}) {
        Object.keys(this).map(p =>  this[p] = (input as any)[p]);
    }
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
                this[p] = ((input as any)[p]).slice(8, 16);
            } else {
                this[p] = (input as any)[p];
            }});
    }
}

