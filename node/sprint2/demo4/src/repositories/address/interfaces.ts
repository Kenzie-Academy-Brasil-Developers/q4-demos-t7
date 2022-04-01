interface IAddress {
  id: string;
  street: string;
  neighborHood: string;
  zipCode: string;
}

interface IAddressRepo {
  saveAddress: (addres: IAddress) => Promise<IAddress>;
}

export { IAddress, IAddressRepo };
