import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { ThemedView } from "./ThemedView";
import { AlarmComparator } from "@/app/lib/definitions";

type FilterItemProps = {
  item: AlarmComparator;
  setComparator: (comparator: AlarmComparator) => void;
};

export function FilterItem({ item, setComparator }: FilterItemProps) {
  return (
    <ThemedView style={styles.alarmItemView}>
      <TouchableOpacity
        style={styles.alarmItem}
        onPress={() => setComparator(item)}
      >
        <Text style={styles.nameText}>{item}</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  alarmItemView: {
    width: "75%",
    // backgroundColor: "grey",
    backgroundColor: "#2A2929",
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
  },
  alarmItem: {
    padding: 6,
    // borderBottomWidth: 1,
    // borderBottomColor: "lightgray",
  },
  nameText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    textTransform: "capitalize",
  },
  timeText: {
    color: "white",
    fontSize: 16,
  },
  categoryText: {
    color: "white",
    fontSize: 14,
  },
});
