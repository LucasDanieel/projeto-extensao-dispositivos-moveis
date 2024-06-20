import AsyncStorage from "@react-native-async-storage/async-storage";

export const buscarLoginLocal = async () => {
  try {
    const savedValue = await AsyncStorage.getItem("login");
    if (savedValue !== null) {
      const data = JSON.parse(savedValue);
      return data;
    }
  } catch (error) {
    // console.error(error);
  }
};

export const salvarLoginLocal = async (data) => {
  try {
    await AsyncStorage.setItem("login", JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
};

export const apagarLoginLocal = async () => {
  try {
    await AsyncStorage.removeItem("login");
    return true;
  } catch (error) {
    return false;
  }
};
