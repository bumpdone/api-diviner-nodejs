import { Header } from './header';
import { Payment } from './payment';
export interface Block {
    header: Header;
    payments: Payment[];
    hashes: string[];
}
