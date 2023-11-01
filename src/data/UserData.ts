import { Data } from "../../f/decorators";

class UserData extends Data {
  data = {
    userName: "user1",
  };
}

export const userData = new UserData();
