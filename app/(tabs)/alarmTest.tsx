import { Stack } from "expo-router";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { Alarm } from "@/app/lib/definitions";
import { AlarmItem } from "@/components/AlarmItem";

import { Ionicons } from "@expo/vector-icons"; // If you're using Expo, for icons
import { useState } from "react";
import { AlarmModal } from "@/components/AlarmModal";

export default function AlarmScreen() {
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: "1",
      name: "Study AI",
      time: new Date(2024, 10, 10, 10, 10),
      category: "University",
      is_active: true,
    },
    {
      id: "2",
      name: "Wash Dishes",
      time: new Date(2024, 10, 11, 9, 45),
      is_active: true,
    },
    {
      id: "3",
      name: "Buy groceries",
      time: new Date(2024, 10, 5, 10, 30),
      category: "Chores",
      is_active: true,
    },
    {
      id: "4",
      name: "Buy groceries",
      time: new Date(2024, 10, 5, 10, 30),
      is_active: true,
    },
    {
      id: "5",
      name: "Buy groceries",
      time: new Date(2024, 10, 5, 10, 30),
      is_active: true,
    },
    {
      id: "6",
      name: "Buy groceries",
      time: new Date(2024, 10, 5, 10, 30),
      is_active: true,
    },
    {
      id: "7",
      name: "Buy groceries",
      time: new Date(2024, 10, 5, 10, 30),
      is_active: true,
    },
    {
      id: "8",
      name: "Buy groceries",
      time: new Date(2024, 10, 5, 10, 30),
      is_active: true,
    },
    {
      id: "9",
      name: "Buy groceries",
      time: new Date(2024, 10, 5, 10, 30),
      is_active: true,
    },
  ]); // State to store alarms

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Alarms",
          headerRight: () => (
            <TouchableOpacity onPress={() => ({})} style={styles.iconButton}>
              <Ionicons name="filter" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "darkslateblue",
          },
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={alarms}
          renderItem={AlarmItem}
          keyExtractor={(item) => item.id}
        />
        <AlarmModal setAlarms={setAlarms} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fullWidthLink: {
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
    // backgroundColor: "white",
  },
  button: {
    backgroundColor: "#4FA1FF", // Button background color
    paddingVertical: 12, // Vertical padding (top and bottom)
    paddingHorizontal: 20, // Horizontal padding (left and right)
    borderRadius: 8, // Rounded corners
    alignItems: "center", // Center the text horizontally
    justifyContent: "center", // Center the text vertically
    flexDirection: "row", // Arrange the text and icon in a row
    marginTop: 10, // Add some space above/below the button
  },
  buttonText: {
    color: "white", // Button text color
    fontSize: 16, // Text size
    fontWeight: "bold", // Bold text for emphasis
  },
  alarmItem: {
    color: "white",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  iconButton: {
    padding: 11,
    marginRight: 15,
  },
});
