import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import styles from "./styles";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Botao from "../Botao";

const Formulario = ({
  nomeRejeitar,
  nomeConfirmar,
  info,
  metodoSalvar,
  metodoCancelar,
  isFocused,
  carregando,
}) => {
  const [nomeTemp, setNome] = useState(info?.nome ?? "");
  const [telefoneTemp, setTelefone] = useState(info?.telefone ?? "");
  const [dataNascimentoTemp, setDataNascimento] = useState(info?.dataNascimento ?? "");
  const [CEPTemp, setCEP] = useState(info?.CEP ?? "");
  const [ruaTemp, setRua] = useState(info?.rua ?? "");
  const [numeroTemp, setNumero] = useState(info?.numero ?? "");
  const [bairroTemp, setBairro] = useState(info?.bairro ?? "");

  const [data, setData] = useState(info?.dataNascimento ? converterData() : new Date());
  const [mostrar, setMostrar] = useState(false);

  const [erroNome, setErroNome] = useState(false);
  const [erroTelefone, setErroTelefone] = useState(false);
  const [erroData, setErroData] = useState(false);
  const navigation = useNavigation();

  function converterData() {
    const [day, month, year] = info?.dataNascimento.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  useEffect(() => {
    return () => resetarForm();
  }, [isFocused]);

  const mudarData = (event, selectedDate) => {
    setMostrar(false);
    if (event.type == "dismissed") return;

    const currentDate = selectedDate || data;
    setData(currentDate);

    let fDate =
      dataCorreta(currentDate.getDate()) +
      "/" +
      dataCorreta(currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear();

    setDataNascimento(fDate);
  };

  const changeNome = (e) => {
    if (erroNome) setErroNome(false);
    setNome(e);
  };

  const changeTelefone = (e) => {
    if (erroTelefone) setErroTelefone(false);

    if (e.length > telefoneTemp.length) {
      if (e.length > 10) return;

      if (e.length > 4 && e.length < 7) e = e.slice(0, 5) + "-" + e.slice(5);
    }

    setTelefone(e);
  };

  const changeData = (e) => {
    if (erroData) setErroData(false);

    if (e.length > dataNascimentoTemp.length) {
      if (e.length > 10) return;

      if (e.length > 1 && e.length < 4) e = e.slice(0, 2) + "/" + e.slice(2);

      if (e.length > 4 && e.length < 7) e = e.slice(0, 5) + "/" + e.slice(5);
    }

    setDataNascimento(e);
  };

  const changeCEP = (e) => {
    if (e.length > CEPTemp.length) {
      if (e.length > 9) return;

      if (e.length > 4 && e.length < 7) {
        e = e.slice(0, 5) + "-" + e.slice(5);
      }
    }
    setCEP(e);
  };

  const salvar = async () => {
    let campos = validarCampos();

    if (campos.erro) {
      if (campos.nome) {
        setErroNome(true);
      }
      if (campos.telefone) {
        setErroTelefone(true);
      }
      if (campos.dataNascimento) {
        setErroData(true);
      }
      return;
    }

    await metodoSalvar(campos);
    resetarForm();
  };

  const cancelar = () => {
    if (metodoCancelar == undefined) {
      return navigation.goBack();
    }
    metodoCancelar();
  };

  const validarCampos = () => {
    let nome = nomeTemp.trim();
    let telefone = telefoneTemp.trim();
    let dataNascimento = dataNascimentoTemp.trim();
    let CEP = CEPTemp.trim();
    let rua = ruaTemp.trim();
    let numero = numeroTemp.trim();
    let bairro = bairroTemp.trim();

    let error = {};

    if (nome == "" || nome.length < 3) {
      error.nome = true;
    } else {
      delete error.nome;
    }

    if (telefone == "" || telefone.length < 10) {
      error.telefone = true;
    } else {
      delete error.telefone;
    }

    if (dataNascimento == "" || dataNascimento.length < 10) {
      error.dataNascimento = true;
    } else {
      delete error.dataNascimento;
    }

    if (Object.keys(error).length > 0) {
      error.erro = true;
      return error;
    }

    return {
      nome,
      telefone,
      dataNascimento,
      CEP,
      rua,
      numero,
      bairro,
    };
  };

  const blurCEP = async () => {
    if (CEPTemp.length < 9) {
      return Alert.alert("CEP invalido", "O cep precisa ter 8 numeros");
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${CEPTemp}/json`);
      const resp = await res.json();

      setRua(resp.logradouro);
      setBairro(resp.bairro);
    } catch (err) {
      Alert.alert("CEP invalido", "O cep precisa ter 8 numeros");
    }
  };

  const resetarForm = () => {
    setNome("");
    setTelefone("");
    setDataNascimento("");
    setCEP("");
    setRua("");
    setNumero("");
    setBairro("");
    setData(new Date());
    setMostrar(false);
    setErroNome(false);
    setErroTelefone(false);
    setErroData(false);
  };

  const dataCorreta = (date) => {
    return String(date).length == 1 ? `0${date}` : date;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.form}>
          <View style={styles.fieldInput}>
            <Text style={styles.label}>
              Nome<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, erroNome == true ? styles.error : null]}
              onChangeText={(e) => changeNome(e)}
              value={nomeTemp}
              placeholder="Digite o nome"
            />
          </View>

          <View style={styles.fieldInput}>
            <Text style={styles.label}>
              Telefone<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              keyboardType="number-pad"
              style={[styles.input, erroTelefone == true && styles.error]}
              onChangeText={(e) => changeTelefone(e)}
              value={telefoneTemp}
              placeholder="99999-9999"
            />
          </View>

          <View style={styles.fieldInput}>
            <Text style={styles.label}>
              Data de nascimento<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              keyboardType="number-pad"
              style={[styles.input, styles.inputDate, erroData == true && styles.error]}
              onChangeText={(e) => changeData(e)}
              value={dataNascimentoTemp}
              placeholder="Digite a data de nascimento"
            />
            <View style={styles.icon}>
              <Ionicons
                size={28}
                color="#444444"
                name="calendar-outline"
                onPress={() => setMostrar(true)}
              />
            </View>
          </View>

          <View style={styles.fieldInput}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(e) => changeCEP(e)}
              value={CEPTemp}
              placeholder="99999-999"
              onBlur={() => blurCEP()}
            />
          </View>

          <View style={styles.fieldInput}>
            <Text style={styles.label}>Rua</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => setRua(e)}
              value={ruaTemp}
              placeholder="Rua. . ."
            />
          </View>

          <View style={styles.fieldInput}>
            <Text style={styles.label}>Numero</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(e) => setNumero(e)}
              value={numeroTemp}
              placeholder="Nº. . ."
            />
          </View>

          <View style={styles.fieldInput}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => setBairro(e)}
              value={bairroTemp}
              placeholder=". . ."
            />
          </View>

          <Botao
            metodoSalvar={salvar}
            metodoCancelar={cancelar}
            nomeRejeitar={nomeRejeitar}
            nomeConfirmar={nomeConfirmar}
            carregando={carregando}
          />

          {mostrar && (
            <DateTimePicker
              testID="dateTimePicker"
              value={data}
              mode="date"
              display="compact"
              onChange={mudarData}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Formulario;
