import React from "react";
import { Pressable } from "react-native";
import { styles } from "../styles/styles";

export function TaskListItems({ item }) {

    return (
        <Pressable
            style={styles.taskListItems}
            onPress={() => {

            }}
            onLongPress={() => {

            }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.tasks.size} tasks in list</Text>
        </Pressable>
    );
}