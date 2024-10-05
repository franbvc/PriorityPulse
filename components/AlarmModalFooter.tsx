import { StyleSheet, Text, Pressable, View } from "react-native";

interface AlarmModalFooterProps {
  setModalVisible: (visible: boolean) => void;
  addAlarm: () => void;
}

export function AlarmModalFooter({
  setModalVisible,
  addAlarm,
}: AlarmModalFooterProps) {
  return (
    <View style={styles.modalFooter}>
      <Pressable
        style={[styles.button, styles.cancelButton]}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.textStyle}>Cancel</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.confirmButton]}
        onPress={() => addAlarm()}
      >
        <Text style={styles.textStyle}>Confirm</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "darkslateblue", // Button background color
    paddingVertical: "4%", // Vertical padding (top and bottom)
    paddingHorizontal: "10%", // Horizontal padding (left and right)
    borderRadius: 8, // Rounded corners
    alignItems: "center", // Center the text horizontally
    justifyContent: "center", // Center the text vertically
    flexDirection: "row", // Arrange the text and icon in a row
    // marginTop: 10, // Add some space above/below the button
  },
  cancelButton: {
    backgroundColor: "#121212", // Button background color
  },

  confirmButton: {
    backgroundColor: "#3CB371", // Button background color
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalFooter: {
    // backgroundColor: "lightblue",
    // height: "10%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
