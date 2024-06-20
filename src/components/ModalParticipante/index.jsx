import { Alert, Modal, Pressable, Text, View } from "react-native";
import { Fragment, useState } from "react";
import styles from "./styles";

import Formulario from "../Formulario";
import { db } from "../../configs/firebaseconfig";
import { Ionicons } from "@expo/vector-icons";
import ModalConfirmacao from "../ModalConfirmacao";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const ModalParticipante = ({
  setAbrir,
  selecionado,
  setSelecionado,
  participantes,
  setParticipantes,
  criarDataAniversario,
}) => {
  const [apagando, setApagando] = useState(false);
  const [abrirModalConfimacao, setAbrirModalConfimacao] = useState(false);

  const [carregando, setCarregando] = useState(false);

  const editarInfo = async (dados) => {
    setCarregando(true);
    try {
      const participanteRef = doc(db, "participantes", selecionado.id);
      await updateDoc(participanteRef, dados);

      setParticipantes((s) => {
        s.map((user) => {
          if (user.id == selecionado.id) {
            user.nome = dados.nome;
            user.telefone = dados.telefone;
            user.dataNascimento = dados.dataNascimento;
            user.CEP = dados.CEP;
            user.rua = dados.rua;
            user.numero = dados.numero;
            user.bairro = dados.bairro;
          }
        });

        criarDataAniversario(s);
        return [...s];
      });

      setCarregando(false);
      cancelar();
    } catch (err) {
      setCarregando(false);
      Alert.alert("Erro", "Não foi possivel salvar as alterações");
    }
  };

  const cancelar = () => {
    setAbrirModalConfimacao(false);
    setSelecionado(null);
    setAbrir(false);
  };

  const apagarParticipantes = async () => {
    setApagando(true);
    try {
      const participanteRef = doc(db, "participantes", selecionado.id);
      await deleteDoc(participanteRef);

      let novosParticipantes = participantes.filter((participante) => {
        if (participante.id != selecionado.id) return participante;
      });

      setParticipantes(novosParticipantes);
      criarDataAniversario(novosParticipantes);
      setApagando(false);
      cancelar();
    } catch (err) {
      setApagando(false);
      Alert.alert("Erro", "Não foi possivel excluir o participante");
    }
  };

  const fecharConfimacao = () => {
    setAbrirModalConfimacao(false);
  };

  return (
    <Fragment>
      <Modal
        transparent={true}
        visible={abrirModalConfimacao}
        onRequestClose={() => setAbrirModalConfimacao(false)}
      >
        <ModalConfirmacao
          texto="Deseja excluir o participante?"
          carregando={apagando}
          metodoCancelar={fecharConfimacao}
          metodoConfirmacao={apagarParticipantes}
        />
      </Modal>

      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Alterar informações</Text>
        <Pressable style={styles.icone} onPress={() => setAbrirModalConfimacao(true)}>
          <Ionicons name="trash" size={20} />
        </Pressable>
      </View>

      <Formulario
        nomeRejeitar="Voltar"
        nomeConfirmar="Salvar"
        info={selecionado}
        metodoSalvar={editarInfo}
        metodoCancelar={cancelar}
        carregando={carregando}
      />
    </Fragment>
  );
};
export default ModalParticipante;
