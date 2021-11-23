export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserInformation {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddressInfo;
  phone: string;
  website: string;
  company: UserCompanyInfo;
}

interface UserCompanyInfo {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface UserAddressInfo {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeolocationUserInfo;
}

interface GeolocationUserInfo {
  lat: string;
  lng: string;
}
