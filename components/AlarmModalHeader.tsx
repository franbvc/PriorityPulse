import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AlarmModalHeaderProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AlarmModalHeader({ setVisible }: AlarmModalHeaderProps) {
  return (
    <View style={styles.modalHeader}>
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>New Alarm</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={styles.iconButton}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
    marginBottom: "3%",
    // backgroundColor: "lightblue",
    // height: "10%",
    // width: "100%",
    maxHeight: "5%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconButton: {
    alignSelf: "center",
  },
});
