import { useIsFocused } from "@react-navigation/native";
import styles from "./styles";

import { db } from "../../configs/firebaseconfig.js";
import Formulario from "../../components/Formulario/index.jsx";
import { Alert } from "react-native";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

const Adicionar = ({ participantes, setParticipantes, criarDataAniversario }) => {
  const isFocused = useIsFocused();

  const [carregando, setCarregando] = useState(false);

  const salvarInfo = async (dados) => {
    setCarregando(true);
    try {
      let id = Date.now() + "_" + dados.nome;

      const participanteRef = doc(db, "participantes", id);
      await setDoc(participanteRef, dados);

      dados.id = id;
      participantes.push(dados);
      setParticipantes(participantes);
      criarDataAniversario(participantes);
      setCarregando(false);
    } catch (err) {
      setCarregando(false);
      Alert.alert("Erro", "Não foi possivel adicionar o participante");
    }
  };

  return (
    <Formulario
      nomeRejeitar="Voltar"
      nomeConfirmar="Adicionar"
      metodoSalvar={salvarInfo}
      isFocused={isFocused}
      carregando={carregando}
    />
  );
};
export default Adicionar;
