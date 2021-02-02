import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles, text } from "../styles/styles";

export function TaskListItems({ item, navigation }) {
    return (
        <View style={styles.listItemContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.taskListItems,
                    {
                        backgroundColor: pressed
                        ? 'rgba(255, 185, 87, 0.4)' : 'white'
                    }
                    ]}
                onPress={() => {
                    console.log("pressed")
                    navigation.navigate('Tasks', { item: item })
                }}
                onLongPress={() => {
                    console.log("Long press")
                }}>
                <Text style={text.listTitleBig}>{item.name}</Text>
                <Text>{item.tasks.length} tasks in list</Text>
            </Pressable>
        </View>
        
    );
}