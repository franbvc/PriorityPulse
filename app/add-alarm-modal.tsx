import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Alarm } from '@/app/lib/definitions';

export default function AddAlarmModal(
  { alarms, setAlarms }: { alarms: Alarm[], setAlarms: (alarms: Alarm[]) => void }
){
  // State to store form data
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  
  // Function to handle adding a new alarm
  const handleAddAlarm = () => {
    const newAlarm = {
      id: Math.random().toString(), // Generate a random ID
      name: name,
      time: new Date(time), // Convert input to a Date object
      category: category,
      is_active: true, // Default to active
    };

    // Update the alarms list with the new alarm
    setAlarms([...alarms, newAlarm]);

    // Clear the form
    setName('');
    setTime('');
    setCategory('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Alarm</Text>

      {/* Input fields */}
      <TextInput
        style={styles.input}
        placeholder="Alarm Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Alarm Time (YYYY-MM-DD HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (Optional)"
        value={category}
        onChangeText={setCategory}
      />

      {/* Submit button */}
      <Button title="Add Alarm" onPress={handleAddAlarm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
