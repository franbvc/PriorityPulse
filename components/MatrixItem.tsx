import { Matrix } from "../app/lib/definitions"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { ThemedView } from "./ThemedView"
import {useState} from 'react'

export function MatrixItem({item}: {item: Matrix})  {
  return (
    <ThemedView style={[styles.MatrixItemView, { backgroundColor: getColour(item) }]}>
      <TouchableOpacity style={styles.MatrixItem}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.timeText}>{Math.floor(item.durationInMinutes/60)}h {item.durationInMinutes%60}m</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

function getColour(item: Matrix) {
  
  if(item.durationInMinutes <= 30)
  {
    return 'green'
  }
  else if(item.durationInMinutes <= 120)
  {
    return 'yellow'
  }
  else if(item.durationInMinutes <= 240)
  {
    return 'orange'
  }
  else
  {
    return 'red'
  }
}

const styles = StyleSheet.create({
  MatrixItemView: {
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
  },
  MatrixItem: {
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
});
