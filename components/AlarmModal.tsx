import { Alarm } from '@/app/lib/definitions';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TextInput, useColorScheme, Pressable, View, Button} from 'react-native';

type AlarmModalProps = {
  setAlarms: React.Dispatch<React.SetStateAction<Alarm[]>>;
};

export function AlarmModal({setAlarms}: AlarmModalProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const [newAlarmName, setNewAlarmName] = useState('');
  const [newAlarmTime, setNewAlarmTime] = useState<Date>(new Date());
  const [newAlarmCategory, setNewAlarmCategory] = useState('');

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

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (_, selectedDate) => {setAlarmDate(selectedDate)},
      mode: 'date',
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (_, selectedTime) => {setAlarmTime(selectedTime)},
      mode: 'time',
      is24Hour: true,
    });
  };

  const isValidAlarm = () => {
    if (newAlarmName === '') {
      Alert.alert('Invalid Alarm: Please enter a name for the alarm');
      return false;
    }

    if (newAlarmTime <= new Date()) {
      Alert.alert('Invalid Alarm: Please enter a future time for the alarm');
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

    setAlarms(prevAlarms => [...prevAlarms, newAlarm].sort((a, b) => a.time.getTime() - b.time.getTime()));

    setNewAlarmName('');
    setNewAlarmTime(new Date());
    setNewAlarmCategory('');
    setModalVisible(false);
    // Close modal or reset inputs as needed
  };

  return (
    <View style={styles.openModalButton}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Add New Alarm</Text>

            {/* Input fields */}
            <TextInput
              style={styles.input}
              placeholder="Alarm Name"
              value={newAlarmName}
              onChangeText={setNewAlarmName}
            />

            <Button onPress={showDatepicker} title="Show date picker!" />
            <Text>Select Date: {newAlarmTime.toDateString()}</Text>
            <Button onPress={showTimepicker} title="Show time picker!" />
            <Text>Select Time: {newAlarmTime.toTimeString()}</Text>

            <TextInput
              style={styles.input}
              placeholder="Category (Optional)"
              value={newAlarmCategory}
              onChangeText={setNewAlarmCategory}
            />

            {/*Cancel and Confirm buttons side to side*/}
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => addAlarm()}>
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {!modalVisible ?
        <Pressable
          // style={[styles.button, styles.buttonOpen]}
          style={styles.confirmButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>New Alarm</Text>
        </Pressable>
        : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  openModalButton: {
    width: '100%', 
  },
  button: {
    backgroundColor: '#4FA1FF', // Button background color
    paddingVertical: 12,        // Vertical padding (top and bottom)
    paddingHorizontal: 20,      // Horizontal padding (left and right)
    borderRadius: 8,            // Rounded corners
    alignItems: 'center',       // Center the text horizontally
    justifyContent: 'center',   // Center the text vertically
    flexDirection: 'row',       // Arrange the text and icon in a row
    marginTop: 10,              // Add some space above/below the button
  },
  confirmButton: {
    backgroundColor: '#4FA1FF', // Button background color
    paddingVertical: 12,        // Vertical padding (top and bottom)
    paddingHorizontal: 20,      // Horizontal padding (left and right)
    borderRadius: 8,            // Rounded corners
    alignItems: 'center',       // Center the text horizontally
    justifyContent: 'center',   // Center the text vertically
    flexDirection: 'row',       // Arrange the text and icon in a row
    marginTop: 10,              // Add some space above/below the button
  },
  buttonText: {
    color: 'white',             // Button text color
    fontSize: 16,               // Text size
    fontWeight: 'bold',         // Bold text for emphasis
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: '60%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});
