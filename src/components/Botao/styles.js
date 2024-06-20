import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    formButtons: { 
        width: '80%',
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
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
})

export default styles;