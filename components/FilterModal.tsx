import { Ionicons } from "@expo/vector-icons";

import {
  Alarm,
  AlarmComparator,
  AlarmComparatorMap,
} from "@/app/lib/definitions";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { FilterItem } from "./FilterItem";

type FilterModalProps = {
  alarms: Alarm[];
  setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
  setAlarmComparator: React.Dispatch<React.SetStateAction<AlarmComparator>>;
};

export function FilterModal({
  alarms,
  setAlarms,
  setAlarmComparator,
}: FilterModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const updateComparator = (comparator: AlarmComparator) => {
    setAlarmComparator(comparator);
    setAlarms(alarms.sort(AlarmComparatorMap.get(comparator)));
    setModalVisible(false);
  };

  return (
    <View style={styles.openModalButton}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <BlurView intensity={100} style={styles.blurContainer} tint="dark">
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.title}>Filter by:</Text>
                <FilterItem
                  item="name ascending"
                  setComparator={updateComparator}
                />
                <FilterItem
                  item="name descending"
                  setComparator={updateComparator}
                />
                <FilterItem
                  item="datetime ascending"
                  setComparator={updateComparator}
                />
                <FilterItem
                  item="datetime descending"
                  setComparator={updateComparator}
                />
                <FilterItem
                  item="category ascending"
                  setComparator={updateComparator}
                />
                <FilterItem
                  item="category descending"
                  setComparator={updateComparator}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </Modal>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.iconButton}
      >
        <Ionicons name="filter" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 11,
    marginRight: 15,
  },
  openModalButton: {
    // width: "100%",
  },
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
  buttonText: {
    color: "white", // Button text color
    fontSize: 16, // Text size
    fontWeight: "bold", // Bold text for emphasis
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    height: "70%",
    // margin: 20,
    // marginVertical: "5%",
    // padding: "5%",
    paddingVertical: "5%",

    // backgroundColor: "white",
    // backgroundColor: "darkgrey",
    backgroundColor: "darkslateblue",

    borderRadius: 20,

    // padding: 35,

    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  blurContainer: {
    height: "50%",
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    // overflow: "hidden",
    // borderRadius: 20,
  },
  item: {
    color: "white",
    fontSize: 20,
    padding: 10,
  },
});
