"use strict";
//
const nome = 'cauan';
const idade = 23;
const preco = 3.5;
const booleano = true;
const dataAtual = new Date();
const dataAtual2 = new Date().toISOString();
// arrays
const numeros = [1, 2, 3, 4];
const numeros2 = [1, 2, 3, 4];
// objects
const userObj = { name: ':edu:', age: 75 };
const userObj2 = { name: ':edu:', age: 75 };
const userObj3 = { name: ':edu:', age: 75 };
const userObj4 = { name: ':edu:', age: 75 };
const userObj5 = { name: ':edu:', age: 75 };
const userObj6 = { name: ':edu:' };
const userAddress = {
    username: 'lucira',
    age: 84,
    address: [
        {
            street: 'aquela lá',
            number: 1234,
        },
    ],
};
// functions
const returnNameAgeString = ({ name, age }) => `Nome ${name} - Idade ${age}`;
const nameAgeString = returnNameAgeString({ name: 'cauan', age: 23 });
const returnNameOrAgeString = ({ name, age, }) => {
    /*
      toda vez que um valor for igual null, undefined, 0 ou menor que 0 vão ser False
    */
    if (!age) {
        return `Name: ${name}`;
    }
    return `Name: ${name} - Idade ${age}`;
};
const nameOrAgeString = returnNameOrAgeString({ name: ':edu:' });
const returnAddress = (data) => data.address;
const address = returnAddress({});
