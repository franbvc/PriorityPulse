import { Matrix } from '@/app/lib/definitions';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View, useColorScheme, Switch} from 'react-native';

type MatrixModalProps = {
  setMatrix: React.Dispatch<React.SetStateAction<Matrix[]>>;
};

export function MatrixModal({ setMatrix }: MatrixModalProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const [newTaskName, setMatrixName] = useState('');
  const [newTaskDuration, setTaskDuration] = useState(0);
  const [newIsBrainpow, setIsBrainpow] = useState(true);
  const [newIsUrgent, setIsUrgent] = useState(true);

  const setMatrixDurationFromString = (durationString: string) => {
    const parsedDuration = parseInt(durationString, 10);
    if (!isNaN(parsedDuration)) {
      setTaskDuration(parsedDuration);  // Only update if it's a valid number
    } else {
      setTaskDuration(0);  // Reset or handle invalid input (e.g., empty input)
    }
  };
  

  const addTask = () => {
    const newTask: Matrix = {
      id: (Math.random() * 1000).toString(),
      name: newTaskName,
      durationInMinutes: newTaskDuration,
      is_brainpow: newIsBrainpow,
      is_urgent: newIsUrgent,
    };

    setMatrix((prevMatrix) => [...prevMatrix, newTask]);

    // Reset the inputs
    setMatrixName('');
    setTaskDuration(0);
    setIsBrainpow(true);
    setIsUrgent(true);

    setModalVisible(false);
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
            <Text style={styles.title}>Add New Task</Text>

            {/* Input fields */}
            <TextInput
              style={styles.input}
              placeholder="Task Name"
              value={newTaskName}
              onChangeText={setMatrixName}
            />

            <TextInput
              style={styles.input}
              placeholder="Duration"
              value={newTaskDuration.toString()}
              onChangeText={setMatrixDurationFromString}
              keyboardType="numeric"
            />

            <View style={styles.switchContainer}>
              <Text>Brainpower:             </Text>
              <Switch 
                value={newIsBrainpow}
                onValueChange={setIsBrainpow}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text>Urgent:                    </Text>
              <Switch 
                value={newIsUrgent}
                onValueChange={setIsUrgent}
              />
            </View>

            
            {/* Cancel and Confirm buttons side by side */}
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={addTask}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable
        style={styles.confirmButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>New Task</Text>
      </Pressable>

      </View>
        
  );
}

const styles = StyleSheet.create({
  openModalButton: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4FA1FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#4FA1FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // Aligns switch and label vertically in the center
    justifyContent: 'center',  // Aligns them next to each other without space
    marginBottom: 10,
    width: '100%',
  },

  });
