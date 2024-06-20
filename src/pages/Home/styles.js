import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5eaedc2",
    alignItems: "center",
  },
  wrapperAbrirImagem: {
    flex: 1,
    position: "relative",
  },
  botaoApagarImagem: {
    position: "absolute",
    padding: 10,
    top: 6,
    left: 10,
    borderRadius: 50,
    zIndex: 9,
    backgroundColor: "#00000077",
  },
  textoEnviado: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 18,
    borderRadius: 6,
    color: "white",
    backgroundColor: "#00000077",
  },
  imagem: {
    width: "100%",
    height: "100%",
  },
  wrapperAdicionarImagem: {
    flex: 1,
    backgroundColor: "#252525d4",
    justifyContent: "center",
    alignItems: "center",
  },
  adicionarImagem: {
    width: "90%",
    height: "60%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputImagem: {
    width: "50%",
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#e3e8ea",
  },
  inputTexto: {
    fontSize: 18,
  },
  exemploImagem: {
    width: "90%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperTitulo: {
    position: "relative",
    flexDirection: "row",
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#202020",
  },
  iconesLeft: {
    position: "absolute",
    left: 12,
  },
  iconesRight: {
    position: "absolute",
    right: 12,
  },
  destaque: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 2,
    borderColor: "#e5eaed",
    borderBottomWidth: 1,
  },
  carrosel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carregandoImagens: {
    flex: 1,
  },
  aniversarios: {
    width: "100%",
    height: "60%",
  },
  aniversariantes: {
    width: "100%",
    marginVertical: 6,
    alignItems: "center",
  },
  todosAniversariantes: {
    width: "96%",
    paddingLeft: 4,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  dataAniversario: {
    fontSize: 22,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  aniversariante: {
    width: "100%",
    flexDirection: "row",
    paddingLeft: 20,
  },
  nomeAniversariante: {
    fontWeight: '300',
    fontSize: 20
  },
});

export default styles;
