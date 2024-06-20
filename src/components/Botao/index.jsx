import styles from "./styles";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const Botao = ({
  metodoSalvar,
  metodoCancelar,
  nomeRejeitar = "Não",
  nomeConfirmar = "Sim",
  carregando = false,
}) => {
  return (
    <View style={styles.formButtons}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#fa4646" }]}
        onPress={() => metodoCancelar()}
      >
        <Text style={styles.buttonText}>{nomeRejeitar}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => metodoSalvar()}>
        {carregando ? (
          <ActivityIndicator size={21} color="white" />
        ) : (
          <Text style={styles.buttonText}>{nomeConfirmar}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Botao;
