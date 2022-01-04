import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../helpers/axios";

class User {
  jwt = '';

  async setJwtLocalStorage() {
    const jwtStore = await AsyncStorage.getItem('jwt');
    if (jwtStore) {
      await this.setJwt(jwtStore);
    }
  }

  async setJwt(jwt) {
    this.jwt = jwt;
    await AsyncStorage.setItem('jwt', jwt);
    instance.defaults.headers['jwt'] = jwt;
  }
}

const user = new User();

export { user };