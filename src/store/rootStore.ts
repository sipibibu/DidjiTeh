import UserStore from "./userAuth/userStore.ts";

class RootStore {
  userStore = UserStore;
}

export default RootStore;
