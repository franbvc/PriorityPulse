import { Alarm } from "../app/lib/definitions"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { ThemedView } from "./ThemedView"

export function AlarmItem({item}: {item: Alarm})  {
  return (
    <ThemedView style={styles.alarmItemView}>
      <TouchableOpacity style={styles.alarmItem}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.timeText}>{item.time.toLocaleString()}</Text>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text > penis </Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  alarmItemView: {
    backgroundColor: 'grey',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
  },
  alarmItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  nameText: {
    color: 'white',
    fontSize: 20,
  }, 
  timeText: {
    color: 'white',
    fontSize: 16,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
  },
});
