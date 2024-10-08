import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { CategoryKeywords, knownAlarmCategories } from "@/app/lib/definitions";

type AlarmModalBodyProps = {
  newAlarmName: string;
  setNewAlarmName: (name: string) => void;
  setAlarmDate: (date: Date | undefined) => void;
  setAlarmTime: (time: Date | undefined) => void;
  newAlarmCategory: string;
  setNewAlarmCategory: (category: string) => void;
  getFormattedAlarmTime: () => string;
};

export function AlarmModalBody({
  newAlarmName,
  setNewAlarmName,
  setAlarmDate,
  setAlarmTime,
  newAlarmCategory,
  setNewAlarmCategory,
  getFormattedAlarmTime,
}: AlarmModalBodyProps) {
  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (_, selectedDate) => {
        setAlarmDate(selectedDate);
      },
      mode: "date",
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (_, selectedTime) => {
        setAlarmTime(selectedTime);
      },
      mode: "time",
      is24Hour: true,
    });
  };

  const predictCategory = () => {
    const name = newAlarmName.toLowerCase();

    for (let [category, keywords] of CategoryKeywords) {
      if (keywords.some((keyword) => name.includes(keyword))) {
        setNewAlarmCategory(category);
        return;
      }
    }

    setNewAlarmCategory("other");
  };

  return (
    <View style={styles.modalBody}>
      <Text style={styles.inputSectionTitle}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Alarm Name"
        placeholderTextColor="#B1B1B1"
        value={newAlarmName}
        onChangeText={(name) => {
          setNewAlarmName(name);
        }}
      />

      <View style={styles.divider} />

      <Text style={styles.inputSectionTitle}>Datetime</Text>

      <Text style={{ color: "white", alignSelf: "center" }}>
        {getFormattedAlarmTime()}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button onPress={showDatepicker} title="Date" color="darkslateblue" />
        <Button onPress={showTimepicker} title="Time" color="darkslateblue" />
      </View>

      <View style={styles.divider} />

      <Text style={styles.inputSectionTitle}>Category</Text>
      <View
        style={{
          // height: "12%",
          // backgroundColor: "lightgray",
          flexDirection: "row",
          // alignItems: "center",
          justifyContent: "space-around",
          // position: "relative",
        }}
      >
        <TextInput
          style={[
            styles.input,
            {
              // width: "60%",
              // backgroundColor: "lightblue",
              // position: "absolute",
              // left: "20%",
            },
          ]}
          placeholder="Category (Optional)"
          placeholderTextColor="#B1B1B1"
          value={newAlarmCategory}
          onChangeText={setNewAlarmCategory}
        />

        <View
          style={{
            flexDirection: "column",
            // backgroundColor: "lightblue",
            alignItems: "center",
            // marginLeft: "auto",
          }}
        >
          <Button
            onPress={predictCategory}
            title="Predict"
            color="darkslateblue"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: "white",
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  modalBody: {
    // backgroundColor: "lightgray",
    // backgroundColor: "white",
    // backgroundColor: "#121212",
    backgroundColor: "#2A2929",

    // borderRadius: 10,
    paddingHorizontal: "10%",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "80%",
    width: "98%",
    borderRadius: 10,
  },

  divider: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    // marginBottom: 12,
  },

  inputSectionTitle: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
