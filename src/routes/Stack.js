import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Fragment, useEffect, useState } from "react";

import { apagarLoginLocal, buscarLoginLocal, salvarLoginLocal } from "../services/localStorage";
import { login } from "../services/database";

import Login from "../pages/Login";
import Create from "../pages/Create";
import DrawerNav from "./DrawerNav";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const Routes = () => {
  const [carregando, setCarregando] = useState(true);
  const [telaLogin, setTelaLogin] = useState(true);
  const [contaInvalida, setContaInvalida] = useState(false);

  useEffect(() => {
    carregarConta();
  }, []);

  const carregarConta = async () => {
    try {
      const data = await buscarLoginLocal();
      if (data == undefined) {
        setCarregando(false);
        return;
      }
      const dados = await login(data);
      if (dados.aceito == false) {
        setContaInvalida(true);
      } else {
        data.aceito = dados.aceito;
        await salvarLoginLocal(data);
        setTelaLogin(false);
      }
      setCarregando(false);
    } catch (err) {
      outroLogin();
    }
  };

  const outroLogin = async () => {
    let result = await apagarLoginLocal();
    if (result) {
      setCarregando(false);
      setTelaLogin(true);
      setContaInvalida(false);
    }
  };

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={80} />
      </View>
    );
  }

  if (contaInvalida) {
    return (
      <View style={styles.container}>
        <View style={styles.wrapperTexto}>
          <Text style={styles.titulo}>CONTA NÂO AUTORIZADA</Text>
          <Text style={styles.texto}>Espere a autorização do responsavel</Text>
          <Text style={styles.textoMeio}>ou</Text>
          <Pressable onPress={() => outroLogin()}>
            <Text style={styles.textoBotao}>Faça login com outra conta</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <Fragment>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {telaLogin ? (
          <Fragment>
            <Stack.Screen name="Login">
              {(props) => (
                <Login {...props} setTelaLogin={setTelaLogin} setContaInvalida={setContaInvalida} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Create" component={Create} />
          </Fragment>
        ) : (
          <Stack.Screen name="Home">
            {(props) => <DrawerNav {...props} setTelaLogin={setTelaLogin} outroLogin={outroLogin} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperTexto: {
    width: "90%",
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 16,
    marginTop: 20,
  },
  textoMeio: {
    marginVertical: 10,
  },
  textoBotao: {
    color: "#0368c8",
  },
});

export default Routes;
