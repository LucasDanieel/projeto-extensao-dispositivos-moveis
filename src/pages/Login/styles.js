import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  carregando: {
    position: "absolute",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    opacity: 0.8,
    zIndex: 4,
    backgroundColor: "#fff",
  },
  carregandoIcone: {
    zIndex: 5,
  },
  messageBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 40,
    fontWeight: "bold",
  },
  containerForm: {
    flex: 3,
    marginHorizontal: "6%",
  },
  title: {
    fontSize: 22,
    marginTop: 20,
  },
  input: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
  },
  buttomLogin: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#09bcdb",
  },
  buttomLoginText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  cadastrar: {
    flexDirection: "row",
    height: 24,
    marginTop: 10,
    alignItems: "center",
  },
  buttomCreateText: {
    fontSize: 16,
    color: "#0368c8",
    fontWeight: "bold",
  },
});
