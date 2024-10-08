import { Matrix } from '@/app/lib/definitions';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View, useColorScheme, Switch } from 'react-native';

type MatrixModalProps = {
  setMatrix: React.Dispatch<React.SetStateAction<Matrix[]>>;
};

export function MatrixModal({ setMatrix }: MatrixModalProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [screen, setScreen] = useState(1);  // Track which screen is active
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

  const preFillTaskDetails = () => {
    if (newTaskName === "CN Mock Exam") {
      setTaskDuration(150);
      setIsBrainpow(true);
      setIsUrgent(true);
    } else if (newTaskName === "Build Wardrobe") {
      setTaskDuration(300);
      setIsBrainpow(false);
      setIsUrgent(true);
    } else if (newTaskName === "Buy Christmas Presents") {
      setTaskDuration(30);
      setIsBrainpow(false);
      setIsUrgent(false);
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
    setScreen(1);  // Reset to first screen
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
          setScreen(1);  // Reset to first screen on close
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Add New Task</Text>

            {screen === 1 ? (
              // Screen 1: Task name input
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Task Name"
                  value={newTaskName}
                  onChangeText={setMatrixName}
                />

                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      preFillTaskDetails(); // Pre-fill details based on task name
                      setScreen(2);  // Go to second screen
                    }}
                  >
                    <Text style={styles.textStyle}>Next</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              // Screen 2: Task details input
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Duration"
                  value={newTaskDuration.toString()}
                  onChangeText={setMatrixDurationFromString}
                  keyboardType="numeric"
                />

                <View style={styles.switchContainer}>
                  <Text>Brainpower:</Text>
                  <Switch 
                    value={newIsBrainpow}
                    onValueChange={setIsBrainpow}
                  />
                </View>

                <View style={styles.switchContainer}>
                  <Text>Urgent:</Text>
                  <Switch 
                    value={newIsUrgent}
                    onValueChange={setIsUrgent}
                  />
                </View>

                {/* Cancel and Confirm buttons */}
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setScreen(1)}  // Go back to first screen
                  >
                    <Text style={styles.textStyle}>Back</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={addTask}>
                    <Text style={styles.textStyle}>Confirm</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {!modalVisible ? (
        <Pressable
          style={styles.confirmButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>New Task</Text>
        </Pressable>
      ) : null}
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
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
});
