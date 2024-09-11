import AsyncStorage from "@react-native-community/async-storage";

export const setUser = (data) => {
  return new Promise(async (resolve, reject) => {
    await AsyncStorage.setItem("currentUser", JSON.stringify(data));
    try {
      resolve(200);
    } catch (error) {
      reject(500);
    }
  });
};

export const getUser = () => {
  return new Promise(async (resolve, reject) => {
    const value = await AsyncStorage.getItem("currentUser");
    try {
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });
};

export const isUserAgreed = () => {
  return new Promise(async (resolve, reject) => {
    const value = await AsyncStorage.getItem("isAgreed");
    try {
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeUser = () => {
  return new Promise(async (resolve, reject) => {
    await AsyncStorage.removeItem("currentUser");
    //@TODO REMOVE THIS ONCE ISAGREED GET FROM BACKEND
    // await AsyncStorage.removeItem("isAgreed");
    try {
      resolve(200);
    } catch (error) {
      reject(error);
    }
  });
};

export const userAgreed = async () => {
  return new Promise(async (resolve, reject) => {
    await AsyncStorage.setItem("isAgreed", "true");
    try {
      resolve(200);
    } catch (error) {
      console.log("Can't Storage Agreed Value to Storage", error);
      reject(error);
    }
  });
};
