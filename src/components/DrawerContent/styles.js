import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
    height: 60,
  },
  image: {
    height: 40,
    width: 40,
    opacity: 0.7,
    overflow: 'hidden',
  },
  headerInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
  },
  email: {
    fontWeight: "300",
  },
  bottomDrawerSection: {
    borderTopColor: "#dedede",
    borderTopWidth: 1,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
});

export default styles;
