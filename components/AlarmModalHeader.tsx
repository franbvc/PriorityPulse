import { StyleSheet, Text, View } from "react-native";

export function AlarmModalHeader() {
  return (
    <View style={styles.modalHeader}>
      <Text style={styles.title}>New Alarm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },

  modalHeader: {
    // marginBottom: "3%",
    // backgroundColor: "lightblue",
    // height: "10%",
    // width: "100%",
    justifyContent: "center",
  },
});
