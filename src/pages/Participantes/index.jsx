import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import styles from "./style";
import { MaterialIcons } from "@expo/vector-icons";

import ModalParticipante from "../../components/ModalParticipante/index.jsx";

const Participantes = ({
  participantes,
  setParticipantes,
  buscarParticipantes,
  criarDataAniversario,
}) => {
  const [procurar, setProcurar] = useState("");
  const [filtroParticipantes, setFiltroParticipantes] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [abrir, setAbrir] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  const filtrar = (texto) => {
    setProcurar(texto);
    if (texto.trim() != "") {
      let newArray = participantes.filter((p) => {
        let nome = p.nome.toLowerCase();
        if (nome.indexOf(texto.toLowerCase()) > -1) return p;
      });
      setFiltroParticipantes(newArray);
    } else {
      setFiltroParticipantes([]);
    }
  };

  const refresh = async () => {
    if (procurar.trim() == "") {
      setRefreshing(true);
      await buscarParticipantes();
      setRefreshing(false);
    }
  };

  const openModal = (item) => {
    setSelecionado(item);
    setAbrir(true);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" visible={abrir} onRequestClose={() => setAbrir(false)}>
        <ModalParticipante
          setAbrir={setAbrir}
          selecionado={selecionado}
          setSelecionado={setSelecionado}
          participantes={participantes}
          setParticipantes={setParticipantes}
          criarDataAniversario={criarDataAniversario}
        />
      </Modal>

      <View style={styles.containerBuscar}>
        <MaterialIcons style={styles.buscarIcone} name="search" size={22} color="#6e6e6e" />
        <TextInput style={styles.buscar} value={procurar} onChangeText={(e) => filtrar(e)} />
        {procurar && (
          <MaterialIcons
            style={styles.apagarIcone}
            name="clear"
            size={22}
            color="#6e6e6e"
            onPress={() => filtrar("")}
          />
        )}
      </View>

      <FlatList
        refreshing={refreshing}
        onRefresh={() => refresh()}
        style={styles.wrapperList}
        data={filtroParticipantes.length > 0 ? filtroParticipantes : participantes}
        renderItem={({ item }) => (
          <View style={styles.wrapperParticipante}>
            <View style={styles.wrapperContent}>
              <View style={styles.wrapperText}>
                <Text style={styles.nomeParticipantes} numberOfLines={1}>
                  {item.nome}
                </Text>
                <Text style={styles.telefoneParticipantes} numberOfLines={1}>
                  Telefone: {item.telefone}
                </Text>
              </View>
              <TouchableOpacity style={styles.buttomEdit} onPress={() => openModal(item)}>
                <MaterialIcons name="arrow-forward-ios" size={22} color="#6e6e6e" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Participantes;
