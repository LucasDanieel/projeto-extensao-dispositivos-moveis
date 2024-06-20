import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { salvarLoginLocal } from "../../services/localStorage";
import { login } from "../../services/database";

const Login = ({ setTelaLogin, setContaInvalida, navigation, route }) => {
  const [carregando, setCarregando] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    carregarContaLocalStorage();
  }, [route.params]);

  const onLogin = async (data) => {
    Keyboard.dismiss();
    setCarregando(true);

    if (data.email.trim() == "") {
      setCarregando(false);
      return Alert.alert("Error", "Dirige o email");
    }
    if (data.senha.trim() == "") {
      setCarregando(false);
      return Alert.alert("Error", "Digite a senha");
    }

    try {
      let { nome, cargo, aceito } = await login(data);

      data.nome = nome;
      data.cargo = cargo;
      data.aceito = aceito;
      await salvarLoginLocal(data);

      if (data.aceito == false) {
        setContaInvalida(true);
        return;
      }
      setTelaLogin(false);
    } catch (err) {
      setCarregando(false);
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/missing-email":
          Alert.alert("Error", "E-mail invalido");
          break;
        case "auth/missing-password":
          Alert.alert("Error", "Digite a senha");
          break;
        case "auth/invalid-login-credentials":
          Alert.alert("Error", "E-mail ou senha invalido");
          break;
        case "auth/too-many-requests":
          Alert.alert("Error", "Aguarde alguns minutos antes de tentar novamente!");
          break;
        case "Usuario não encontrado!":
          Alert.alert("Error", "Usuario não encontrado!");
          break;
        default:
          Alert.alert("Error", err.code);
          break;
      }
    }
  };

  const carregarContaLocalStorage = async () => {
    try {
      setCarregando(true);
      const savedValue = await AsyncStorage.getItem("login");
      if (savedValue !== null) {
        const data = JSON.parse(savedValue);
        if (data.aceito == false) {
          setContaInvalida(true);
        }
        setEmail(data.email);
        setSenha(data.senha);
      } else setCarregando(false);
    } catch (error) {
      Alert.alert("Error", err.code);
    }
  };

  return (
    <View style={styles.container}>
      {carregando && (
        <View style={styles.carregando}>
          <ActivityIndicator style={styles.carregandoIcone} size={80} />
        </View>
      )}

      <View style={styles.messageBox}>
        <Text style={styles.message}>Entrar</Text>
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Digite seu email..."
          onChangeText={(e) => setEmail(e)}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          value={senha}
          style={styles.input}
          placeholder="Digite sua senha..."
          onChangeText={(e) => setSenha(e)}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.buttomLogin} onPress={() => onLogin({ email, senha })}>
          <Text style={styles.buttomLoginText}>Acessar</Text>
        </TouchableOpacity>
        <View style={styles.cadastrar}>
          <Text>Não possui uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Create")}>
            <Text style={styles.buttomCreateText}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Login;
