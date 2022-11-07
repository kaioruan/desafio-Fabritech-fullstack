interface IClientAddress {
  id?: number;
  username: string;
  email: string;
  role: string;
  relationship: string;
  address: {
    id?: number;
    cep: string;
    street: string;
    district: string;
    city: string;
    state: string;
    country: string;
  }
}
export default IClientAddress;
