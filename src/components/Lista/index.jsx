import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const Lista = ({
  items,
  nomeCampo = "Telefone",
  nomeIcone,
  filtrar = null,
  procurar,
  itemFiltrado = [],
  refresh,
  refreshing,
  clickIcone,
}) => {
  return (
    <View style={styles.container}>
      {filtrar != null && (
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
      )}

      <FlatList
        refreshing={refreshing}
        onRefresh={() => refresh()}
        style={styles.wrapperList}
        data={itemFiltrado?.length > 0 ? itemFiltrado : items}
        renderItem={({ item }) => (
          <View style={styles.wrapperParticipante}>
            <View style={styles.wrapperContent}>
              <View style={styles.wrapperText}>
                <Text style={styles.nomeParticipantes} numberOfLines={1}>
                  {item.nome}
                </Text>
                <Text style={styles.telefoneParticipantes} numberOfLines={1}>
                  {nomeCampo == "Telefone" ? `Telefone: ${item.telefone}` : `Email: ${item.email}`}
                </Text>
              </View>
              <TouchableOpacity style={styles.buttomEdit} onPress={() => clickIcone(item)}>
                <MaterialIcons name={nomeIcone} size={26} color="#6e6e6e" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default Lista;
