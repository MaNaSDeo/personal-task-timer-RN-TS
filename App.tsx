import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { observer, Reactive, useObservable } from "@legendapp/state/react";
import { store$ } from "./State/store";
import React, { useState } from "react";
import TimePicker from "./Components/TimePicker";
import { NavigationContainer } from "@react-navigation/native";

const App = observer(function App() {
  const [taskName, setTaskName] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [isSettingStartTime, setIsSettingStartTime] = useState(false);
  const dateToday = store$.dateToday.get();
  const dayToday = store$.dayToday.get();

  function onPressFunction() {
    console.log("Pressed!");
    store$.addTask({
      name: taskName,
      startTime: startTime,
      endTime: endTime,
    });

    setTaskName("");
    setStartTime("");
    setEndTime("");

    console.log("tasks", store$.tasks.get());
    // console.log("Updated tasks array:", store$.tasks.get());
  }

  console.log("isTimePickerVisible", isTimePickerVisible);

  function onSetStartTime() {
    console.log("onSetStartTime");
    setIsTimePickerVisible(true);
    setIsSettingStartTime(true);
  }

  function onSetEndTime() {
    console.log("onSetEndTime");
    setIsTimePickerVisible(true);
    setIsSettingStartTime(false);
  }

  function handleTimePicked(time: string) {
    console.log("handleTimePicked");
    if (isSettingStartTime) {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
    setIsTimePickerVisible(false);
  }

  // return <TimePicker />;

  return (
    <>
      <NavigationContainer>
        <View style={styles.greetingContainer}>
          <Text>Personal Time Tracker</Text>
          <Text>{dayToday}</Text>
          <Text>{dateToday}</Text>
        </View>
        <View style={styles.greetingContainer}>
          <Pressable onPress={onPressFunction} style={styles.addTaskButton}>
            <Text style={styles.addTaskText}>+</Text>
          </Pressable>
          <View style={styles.taskInputContainer}>
            <TextInput
              style={styles.textBox}
              onChangeText={setTaskName}
              value={taskName}
            />
            <View style={styles.btnContainer}>
              <Pressable onPress={onSetStartTime} style={styles.button}>
                <Text style={styles.btnText}>Start Time</Text>
              </Pressable>
              <Pressable onPress={onSetEndTime} style={styles.button}>
                <Text style={styles.btnText}>End Time</Text>
              </Pressable>
            </View>
            {/* <Text>Start Time: {startTime}</Text>
            <Text>End Time: {endTime}</Text> */}
            {isTimePickerVisible && (
              <ScrollView>
                <TimePicker onTimeSelected={handleTimePicked} />
              </ScrollView>
            )}
            <Pressable
              onPress={onPressFunction}
              style={[styles.button, { backgroundColor: "green" }]}
            >
              <Text style={[styles.btnText, { color: "#fff" }]}>Set Task</Text>
            </Pressable>
          </View>
        </View>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0688d4",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  greetingContainer: {
    flex: 1,
    backgroundColor: "#0688d4",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  addTaskButton: {
    backgroundColor: "#0688d4",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  addTaskText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 45,
  },
  textBox: {
    width: 200,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 8,
  },
  button: {
    width: 100,
    height: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 8,
  },
  btnText: {
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
  },
  taskInputContainer: {
    width: 300,
    marginTop: 8,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
