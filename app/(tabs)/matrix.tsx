import { Link, Stack } from 'expo-router';
import { Button, FlatList, StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Matrix } from '@/app/lib/definitions';
import { MatrixItem } from '@/components/MatrixItem';

import { Ionicons } from '@expo/vector-icons'; // If you're using Expo, for icons
import { useState } from 'react';
import { MatrixModal } from '@/components/MatrixModal';

export default function MatrixScreen() {
  const [tasks, setTask] = useState<Matrix[]>([
    { id: '1', name: 'French Homework', durationInMinutes: 250, is_brainpow: true, is_urgent: true},
    { id: '2', name: 'CN Videos', durationInMinutes: 65, is_brainpow: true, is_urgent: true},
    { id: '3', name: 'AI Lab Report', durationInMinutes: 185, is_brainpow: true, is_urgent: true},

    { id: '4', name: 'Workout', durationInMinutes: 80, is_brainpow: false, is_urgent: true},
    { id: '5', name: 'Groceries', durationInMinutes: 40, is_brainpow: false, is_urgent: true},
    { id: '6', name: 'Do Dishes', durationInMinutes: 20, is_brainpow: false, is_urgent: true},

    { id: '7', name: 'IUI Report', durationInMinutes: 500, is_brainpow: true, is_urgent: false},
    { id: '8', name: 'CN quiz', durationInMinutes: 40, is_brainpow: true, is_urgent: false},

    { id: '9', name: 'Facetime my brother', durationInMinutes: 80, is_brainpow: false, is_urgent: false},
   
  ]); // State to store alarms


  const categorizedTasks = {
    urgentBrainpow: tasks.filter(task => task.is_brainpow && task.is_urgent),
    notUrgentBrainpow: tasks.filter(task => !task.is_brainpow && task.is_urgent),
    urgentNotBrainpow: tasks.filter(task => task.is_brainpow && !task.is_urgent),
    notUrgentNotBrainpow: tasks.filter(task => !task.is_brainpow && !task.is_urgent),
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Tasks',
          headerRight: () => (
            <TouchableOpacity onPress={() => ({})} style={styles.iconButton}>
              <Ionicons name="filter" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.quadrant}>
            <Text style={styles.quadrantTitle}>Urgent & BrainPower</Text>
            <FlatList
              data={categorizedTasks.urgentBrainpow}
              renderItem={MatrixItem}
              keyExtractor={(item, index) => `urgent-brainpow-${index}`}
            />
          </View>
          <View style={styles.quadrant}>
            <Text style={styles.quadrantTitle}>Not Urgent & BrainPower</Text>
            <FlatList
              data={categorizedTasks.notUrgentBrainpow}
              renderItem={MatrixItem}
              keyExtractor={(item, index) => `not-urgent-brainpow-${index}`}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.quadrant}>
            <Text style={styles.quadrantTitle}>Urgent & Not BrainPower</Text>
            <FlatList
              data={categorizedTasks.urgentNotBrainpow}
              renderItem={MatrixItem}
              keyExtractor={(item, index) => `urgent-not-brainpow${index}`}
            />
          </View>
          <View style={styles.quadrant}>
            <Text style={styles.quadrantTitle}>Not Urgent & Not BrainPower</Text>
            <FlatList
              data={categorizedTasks.notUrgentNotBrainpow}
              renderItem={MatrixItem}
              keyExtractor={(item, index) => `not-urgent-not-brainpow-${index}`}
            />
          </View>
        </View>
        <MatrixModal setMatrix={setTask} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  quadrant: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  quadrantTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  taskText: {
    fontSize: 16,
  },
});
