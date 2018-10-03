import { Header } from './header';
import { Payment } from './payment';
export interface Body {
    header: Header;
    payments: Payment[];
    hashes: string[];
}
