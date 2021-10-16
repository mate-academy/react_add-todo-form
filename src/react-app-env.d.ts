type Todos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
  address:UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
};

type UserAddress = {
  street:string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserAddressGeo;
};

 type UserAddressGeo = {
   lat: string;
   lng: string;
 };

 type UserCompany = {
   name: string;
   catchPhrase: string;
   bs: string;
 };

 type PreparedToDo = {
   name:string;
   email:string;
   tittle: string;
   status: boolean;
   id:number;
 };
