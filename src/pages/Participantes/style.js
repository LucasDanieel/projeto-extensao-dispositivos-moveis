import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  containerBuscar: {
    position: "relative",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buscar: {
    width: "93%",
    height: 36,
    paddingLeft: 34,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#ebeef0",
  },
  buscarIcone: {
    position: "absolute",
    left: 20,
    zIndex: 10
  },
  apagarIcone: {
    position: "absolute",
    right: 22,
    zIndex: 10
  },
  wrapperList: {
    width: "100%",
    height: "100%",
  },
  wrapperParticipante: {
    width: "100%",
    alignItems: "center",
    marginBottom: 6,
    paddingVertical: 4,
  },
  wrapperContent: {
    width: "94%",
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    backgroundColor: "#f2f4f6",
  },
  wrapperText: {
    width: "80%",
    marginLeft: 10,
  },
  nomeParticipantes: {
    fontSize: 20,
    flexWrap: "wrap",
    overflow: "hidden",
  },
  telefoneParticipantes: {
    fontSize: 12,
  },
  buttomEdit: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
});

export default styles;
