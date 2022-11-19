import {v4} from 'uuid';

export default class IdGenerator {
  generateId = () => v4();
}