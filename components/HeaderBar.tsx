import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // If you're using Expo, for icons

export function ({title, onMenuPress, onFilterPress}: any) {
  return (
    <View style={styles.headerContainer}>
      {/* Menu Button */}
      <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Filter Button */}
      <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
        <Ionicons name="filter" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6200EE', // Adjust the background color as needed
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
});

