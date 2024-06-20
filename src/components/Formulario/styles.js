import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  form: {
    flex: 1,
    margin: 10,
    alignItems: 'center'
  },
  fieldInput: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  label: {
    position: "absolute",
    marginLeft: 8,
    paddingHorizontal: 2,
    fontSize: 16,
    color: "#444444",
    backgroundColor: "white",
    zIndex: 10,
    // fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginTop: 15,
    paddingLeft: 11,
    borderWidth: 1.4,
    borderRadius: 6,
    paddingVertical: 6,
    fontSize: 16,
    borderColor: "#dce0e1",
  },
  error: {
    borderColor: "red",
  },
  inputDate: {
    maxWidth: "89%",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: "11%",
    height: 30,
    marginTop: 19,
    // backgroundColor: '#dce0e1'
  },
  formButtons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#4dacf0",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
  },
});

export default styles;
