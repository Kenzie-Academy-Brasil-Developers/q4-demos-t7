interface IAddress {
  id: string;
  street: string;
  nighborHood: string;
  zipCode: string;
}

interface IAddressRepo {
  saveAddress: (addres: IAddress) => Promise<IAddress>;
}

export { IAddress, IAddressRepo };
