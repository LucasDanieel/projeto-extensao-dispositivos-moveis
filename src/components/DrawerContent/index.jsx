import { View, Text, Image, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const drawerList = [
  { icon: "home", label: "Inicio", navigateTo: "Inicio" },
  {
    icon: "adduser",
    label: "Adicionar",
    navigateTo: "Adicionar",
  },
  {
    icon: "team",
    label: "Participantes",
    navigateTo: "Participantes",
  },
  {
    icon: "contacts",
    label: "Funcionarios",
    navigateTo: "Funcionarios",
  },
];

const DrawerLayout = ({ icon, label, navigateTo, navigation }) => {
  return (
    <DrawerItem
      icon={({ color, size }) => <AntDesign name={icon} size={size} color={color} />}
      label={label}
      onPress={() => navigation.navigate(navigateTo)}
    />
  );
};

const DrawerItems = ({ navigation, user }) => {
  return drawerList.map((el, i) => {
    if (user.cargo != "admin" && el.label == "Funcionarios") return;
    return (
      <DrawerLayout
        key={i}
        icon={el.icon}
        label={el.label}
        navigateTo={el.navigateTo}
        navigation={navigation}
      />
    );
  });
};

const DrawerContent = ({ props, user, setTelaLogin }) => {
  const deslogar = async () => {
    try {
      await AsyncStorage.removeItem("login");
      setTelaLogin(true);
    } catch (e) {
      setTelaLogin(false);
      Alert.alert("Erro", "Não foi possivel sair da conta");
    }
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <View>
            <Image style={styles.image} source={require("../../img/foto-perfil.png")} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{user?.nome}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        <DrawerItems navigation={props.navigation} user={user} />
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => <SimpleLineIcons name="logout" color={color} size={size} />}
          label="Sair"
          onPress={() => deslogar()}
        />
      </View>
    </View>
  );
};

export default DrawerContent;
