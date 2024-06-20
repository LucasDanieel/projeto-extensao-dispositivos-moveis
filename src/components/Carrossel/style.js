import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  wrapperImagem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagem: {
    width: "100%",
    height: "100%",
  },
  pontos: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    bottom: 0,
    // backgroundColor: '#606060eb'
  },
});

export default styles;
