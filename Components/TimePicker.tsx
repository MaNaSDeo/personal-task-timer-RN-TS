import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

interface Props {
  onTimeSelected: (time: string) => void;
}

const TimePicker: React.FC<Props> = ({ onTimeSelected }) => {
  // State to hold the selected hour and minute
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [time, setTime] = useState<string | null>(null);

  // Function to handle saving the time after validation
  const saveTime = () => {
    const hourInt = parseInt(hour);
    const minuteInt = parseInt(minute);

    // Check for valid hour and minute values
    if (
      isNaN(hourInt) ||
      isNaN(minuteInt) ||
      hourInt < 0 ||
      hourInt > 23 ||
      minuteInt < 0 ||
      minuteInt > 59
    ) {
      Alert.alert(
        "Invalid Time",
        "Please enter a valid time in HH and MM format."
      );
      return;
    }

    // Format the time in HH:MM format and set it to state
    const formattedTime = `${hourInt.toString().padStart(2, "0")}:${minuteInt
      .toString()
      .padStart(2, "0")}`;
    setTime(formattedTime);
    Alert.alert("Time Selected", `You selected ${formattedTime}`);
  };

  const confirmTime = () => {
    if (time) {
      onTimeSelected(time);
    } else {
      Alert.alert("No Time Set", "Please set the time first.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Select Time:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="HH"
            value={hour}
            onChangeText={setHour}
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.input}
            placeholder="MM"
            value={minute}
            onChangeText={setMinute}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={saveTime}>
          <Text style={styles.buttonText}>Set Time</Text>
        </TouchableOpacity>
        {time && <Text style={styles.selectedTime}>Selected Time: {time}</Text>}
        {time && (
          <TouchableOpacity
            onPress={confirmTime}
            style={[styles.button, { backgroundColor: "#fff" }]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: "#4CAF50", fontWeight: "bold" },
              ]}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // alignItems: "center",
    flex: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    // alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: 50,
    textAlign: "center",
    fontSize: 18,
    marginRight: 5,
  },
  colon: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  selectedTime: {
    fontSize: 18,
    marginTop: 15,
    color: "#333",
  },
});
