import { Matrix } from "../app/lib/definitions"
import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { ThemedView } from "./ThemedView"
import {useState} from 'react'

export function MatrixItem({ item, onDelete }: { item: Matrix; onDelete: (id: string) => void }) {
  return (
    <ThemedView style={[styles.MatrixItemView, { backgroundColor: getColour(item) }]}>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.MatrixItem}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.timeText}>{Math.floor(item.durationInMinutes/60)}h {item.durationInMinutes%60}m</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

function getColour(item: Matrix) {
  
  if(item.durationInMinutes <= 30)
  {
    return '#93c47d'
  }
  else if(item.durationInMinutes <= 120)
  {
    return '#ffd966'
  }
  else if(item.durationInMinutes <= 240)
  {
    return '#f6b26b'
  }
  else
  {
    return '#e06666'
  }
}

const styles = StyleSheet.create({
  MatrixItemView: {
    marginVertical: 4,
    padding: 1,
    borderRadius: 4,
  },
  MatrixItem: {
    padding: 5,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 1,
    marginLeft: 24,
  },
  nameText: {
    color: 'black',
    fontSize: 10,
  }, 
  timeText: {
    color: 'black',
    fontSize: 8,
  },
});
