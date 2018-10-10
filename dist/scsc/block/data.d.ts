import Header from './header';
import Payment from './payment';
export default interface Data {
    header?: Header;
    payments?: Payment[];
    hashes?: string[];
}
