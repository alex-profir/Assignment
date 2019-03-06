import { account } from './account';
import { debitsAndCredits } from './debitsAndCredits';

export interface Balance{
    account:account;
    currency:string;
    debitsAndCredits:debitsAndCredits[];
} 