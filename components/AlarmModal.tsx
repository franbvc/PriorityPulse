import {
  Alarm,
  AlarmComparator,
  AlarmComparatorMap,
} from "@/app/lib/definitions";
import { AlarmModalHeader } from "./AlarmModalHeader";
import { AlarmModalFooter } from "./AlarmModalFooter";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  useColorScheme,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AlarmModalBody } from "./AlarmModalBody";
import { BlurView } from "expo-blur";

type AlarmModalProps = {
  setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
  alarmComparator: AlarmComparator;
};

export function AlarmModal({ setAlarms, alarmComparator }: AlarmModalProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useColorScheme() ?? "light";

  const [newAlarmName, setNewAlarmName] = useState("");
  const [newAlarmTime, setNewAlarmTime] = useState<Date>(new Date());
  const [newAlarmCategory, setNewAlarmCategory] = useState("");

  const setAlarmTime = (selectedTime: Date | undefined) => {
    if (!selectedTime) {
      return;
    }
    let newValue = new Date(newAlarmTime);
    newValue.setHours(selectedTime.getHours());
    newValue.setMinutes(selectedTime.getMinutes());
    setNewAlarmTime(newValue);
  };

  const setAlarmDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      return;
    }
    let newValue = new Date(newAlarmTime);
    newValue.setFullYear(selectedDate.getFullYear());
    newValue.setMonth(selectedDate.getMonth());
    newValue.setDate(selectedDate.getDate());
    setNewAlarmTime(newValue);
  };

  const getFormattedAlarmTime = () => {
    let date = `${newAlarmTime.getDate()}/${newAlarmTime.getMonth() + 1}/${newAlarmTime.getFullYear()}`;
    let hours = newAlarmTime.getHours().toString().padStart(2, "0");
    let minutes = newAlarmTime.getMinutes().toString().padStart(2, "0");
    let time = `${hours}:${minutes}`;
    return `${date} - ${time}`;
  };

  const isValidAlarm = () => {
    if (newAlarmName === "") {
      Alert.alert("Invalid Alarm: Please enter a name for the alarm");
      return false;
    }

    if (newAlarmTime <= new Date()) {
      Alert.alert("Invalid Alarm: Please enter a future time for the alarm");
      return false;
    }

    return true;
  };

  const addAlarm = () => {
    if (!isValidAlarm()) {
      return;
    }

    const newAlarm: Alarm = {
      id: (Math.random() * 1000).toString(), // Generate a random ID or implement a more sophisticated ID generator
      name: newAlarmName,
      time: newAlarmTime,
      category: newAlarmCategory,
      is_active: true,
    };

    setAlarms((prevAlarms) =>
      [...prevAlarms, newAlarm].sort(AlarmComparatorMap.get(alarmComparator)),
    );

    setNewAlarmName("");
    setNewAlarmTime(new Date());
    setNewAlarmCategory("");
    setModalVisible(false);
    // Close modal or reset inputs as needed
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
                <AlarmModalHeader />

                <AlarmModalBody
                  newAlarmName={newAlarmName}
                  setNewAlarmName={setNewAlarmName}
                  setAlarmDate={setAlarmDate}
                  setAlarmTime={setAlarmTime}
                  newAlarmCategory={newAlarmCategory}
                  setNewAlarmCategory={setNewAlarmCategory}
                  getFormattedAlarmTime={getFormattedAlarmTime}
                />

                <AlarmModalFooter
                  setModalVisible={setModalVisible}
                  addAlarm={addAlarm}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </Modal>

      {!modalVisible ? (
        <Pressable
          // style={[styles.button, styles.buttonOpen]}
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>New Alarm</Text>
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  openModalButton: {
    width: "100%",
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
});
