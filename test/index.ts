import { isString } from '@vanyamate/types-kit';
import { TestService } from './service/test/TestService';


const a: string = 'string;';
const move = new TestService();

if (isString(a)) {
    move.moveTo(10, 10);
    console.log("TEST" + a);
} else {
    move.moveTo(0, 0);
    console.log('a is not a string');
}
