import Todos from "./Todos";
import Users from "./Users";

export default interface TodosWithUsers extends Todos {
  user: Users | null;
}
