import { Address } from '../model/Address';

export class UserData {
 
    id: number;
    name: string;
    firstName: string;
    tel: string;
    email: string;
    address: Address;
    startWeight: number;
    currentWeight: number;
    targetWeight: number;
    length: number;
    gender: string;
    age: number;
    terms: boolean;
    auth: boolean;

    constructor() {
      //Constructor initialization
      //Object.assign(this, values);
    }
 
}
