import { ActivityIndicator, Text, View } from "react-native";

import Botao from "../Botao";
import styles from "./styles";

const ModalConfirmacao = ({ texto, metodoCancelar, metodoConfirmacao, carregando }) => {
  return (
    <View style={styles.wrapperConfirmacao}>
      {carregando ? (
        <ActivityIndicator size={50} />
      ) : (
        <View style={styles.confirmacao}>
          <Text style={styles.textoConfirmacao}>{texto}</Text>
          <Botao metodoCancelar={metodoCancelar} metodoSalvar={metodoConfirmacao} />
        </View>
      )}
    </View>
  );
};

export default ModalConfirmacao;
