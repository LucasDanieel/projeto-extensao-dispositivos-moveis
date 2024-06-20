import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../Login/styles";
import { useState } from "react";

import { salvarLoginLocal } from "../../services/localStorage";
import { criarLogin, criarUsuario } from "../../services/database";

const Create = ({ navigation }) => {
  const [carregando, setCarregando] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const onCreate = async () => {
    Keyboard.dismiss();
    setCarregando(true);
    if (nome.trim() == "") {
      setCarregando(false);
      return Alert.alert("Error", "Dirige o nome");
    }
    if (nome.trim().length < 3) {
      setCarregando(false);
      return Alert.alert("Error", "Nome muito curto");
    }

    try {
      const uidConta = await criarLogin(email, senha);
      let dados = {
        nome: nome,
        email: email,
        cargo: "funcionario",
        aceito: false,
      };
      await criarUsuario(uidConta, dados);

      dados.senha = senha;
      let result = await salvarLoginLocal(dados);
      if (result) navigation.navigate("Login", { status: "ok" });
      setCarregando(false);
    } catch (err) {
      setCarregando(false);
      switch (err.code) {
        case "auth/email-already-in-use":
          Alert.alert("Error", "E-mail em uso");
          break;
        case "auth/invalid-email":
        case "auth/missing-email":
          Alert.alert("Error", "Esse endereço de e-mail já existe");
          break;
        case "auth/weak-password":
        case "auth/missing-password":
          Alert.alert("Error", "A senha precisa ter no minimo 6 caracteres");
          break;
        default:
          Alert.alert("Error", err.code);
          break;
      }
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
        <Text style={styles.message}>Novo usuário</Text>
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          value={nome}
          style={styles.input}
          placeholder="Digite seu nome de usuario..."
          onChangeText={(e) => setNome(e)}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Digite um email..."
          onChangeText={(e) => setEmail(e)}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          value={senha}
          style={styles.input}
          placeholder="Digite uma senha..."
          onChangeText={(e) => setSenha(e)}
        />

        <TouchableOpacity style={styles.buttomLogin} onPress={() => onCreate()}>
          <Text style={styles.buttomLoginText}>Criar</Text>
        </TouchableOpacity>
        <View style={styles.cadastrar}>
          <Text>Já possui uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttomCreateText}>Acessar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Create;
