// import { Matrix } from '@/app/lib/definitions';
// import React, { useState, useEffect } from 'react';
// import { Alert, Modal, StyleSheet, Text, Pressable, View, useColorScheme } from 'react-native';

// type MatrixModalProps = {
//   matrix: Matrix;
//   onClose: () => void;
// };

// export function TaskList({ tasks, setMatrix }: { tasks: Matrix[]; setMatrix: React.Dispatch<React.SetStateAction<Matrix[]>> }) {
//     const [selectedTask, setSelectedTask] = useState<Matrix | null>(null);
  
//     return (
//       <View>
//         {tasks.map((task) => (
//           <Pressable key={task.id} onPress={() => setSelectedTask(task)}>
//             <Text>{task.name}</Text>
//           </Pressable>
//         ))}
  
//         {selectedTask && (
//           <PomodoroModal matrix={selectedTask} onClose={() => setSelectedTask(null)} />
//         )}
//       </View>
//     );
//   }
  

// export function PomodoroModal({ matrix, onClose }: MatrixModalProps) {
//   const [modalVisible, setModalVisible] = useState(true);
//   const theme = useColorScheme() ?? 'light';

//   const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
//   const [isBreak, setIsBreak] = useState(false); // Is break mode
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (isRunning && timeLeft > 0) {
//       timer = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && isRunning) {
//       if (isBreak) {
//         // Start work session after break
//         setTimeLeft(1500);
//         setIsBreak(false);
//       } else {
//         // Start break after work session
//         setTimeLeft(300); // 5 minutes for break
//         setIsBreak(true);
//       }
//     }

//     return () => clearInterval(timer);
//   }, [timeLeft, isRunning, isBreak]);

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const handleStartPause = () => {
//     setIsRunning(!isRunning);
//   };

//   const handleReset = () => {
//     setTimeLeft(1500);
//     setIsBreak(false);
//     setIsRunning(false);
//   };

//   return (
//     <View style={styles.openModalButton}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Pomodoro timer has been closed.');
//           setModalVisible(!modalVisible);
//           onClose();
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.title}>{matrix.name}</Text>
//             <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
//             <Text>{isBreak ? 'Break Time!' : 'Work Time!'}</Text>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
//               <Pressable style={[styles.button, styles.buttonClose]} onPress={handleStartPause}>
//                 <Text style={styles.textStyle}>{isRunning ? 'Pause' : 'Start'}</Text>
//               </Pressable>

//               <Pressable style={[styles.button, styles.buttonClose]} onPress={handleReset}>
//                 <Text style={styles.textStyle}>Reset</Text>
//               </Pressable>
//             </View>

//             <Pressable
//               style={[styles.button, styles.buttonClose, { marginTop: 20 }]}
//               onPress={() => {
//                 setModalVisible(!modalVisible);
//                 onClose();
//               }}
//             >
//               <Text style={styles.textStyle}>Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   openModalButton: {
//     width: '100%',
//   },
//   button: {
//     backgroundColor: '#4FA1FF',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   confirmButton: {
//     backgroundColor: '#4FA1FF',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     width: '80%',
//     height: '60%',
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   timerText: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
// });
