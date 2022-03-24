// types
type NumOrStr = string | number;

// interfaces
interface UserObj5 {
  name: string;
  age: number;
}

interface UserObj6 {
  [key: string]: NumOrStr;
}

interface Address {
  street: string;
  number: number;
}

interface UserAddress {
  username: string;
  age: number;
  address: Address[];
}

interface ReturnNameAgeString {
  name: string;
  age: number;
}

interface ReturnNameOrAgeString {
  name?: string;
  age?: number;
}

//
const nome: string = 'cauan';
const idade: number = 23;
const preco: number = 3.5;
const booleano: boolean = true;
const dataAtual: Date = new Date();
const dataAtual2: string = new Date().toISOString();

// arrays
const numeros: Array<number> = [1, 2, 3, 4];
const numeros2: number[] = [1, 2, 3, 4];

// objects
const userObj: object = { name: ':edu:', age: 75 };
const userObj2: Object = { name: ':edu:', age: 75 };
const userObj3: { [key: string]: NumOrStr } = { name: ':edu:', age: 75 };
const userObj4: { [key: string]: string | number } = { name: ':edu:', age: 75 };
const userObj5: UserObj5 = { name: ':edu:', age: 75 };
const userObj6: UserObj6 = { name: ':edu:' };
const userAddress: UserAddress = {
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
const returnNameAgeString = ({ name, age }: ReturnNameAgeString): string =>
  `Nome ${name} - Idade ${age}`;

const nameAgeString: string = returnNameAgeString({ name: 'cauan', age: 23 });

const returnNameOrAgeString = ({
  name,
  age,
}: ReturnNameOrAgeString): string => {
  /*
    toda vez que um valor for igual null, undefined, 0 ou menor que 0 vão ser False
  */
  if (!age) {
    return `Name: ${name}`;
  }

  return `Name: ${name} - Idade ${age}`;
};

const nameOrAgeString = returnNameOrAgeString({ name: ':edu:' });

const returnAddress = (data: Partial<UserAddress>): Address[] | undefined =>
  data.address;

const address = returnAddress({});
