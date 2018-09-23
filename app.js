import {
    get
} from './profile';

const users = process.argv.slice(2);
users.forEach(get);