import { DebitsAndCredits } from './debitsAndCredits';

export interface Balance{
    account: {
        name: string;
        iban: string;
        balance: number;
    };
    currency: string;
    debitsAndCredits: DebitsAndCredits[];
}
