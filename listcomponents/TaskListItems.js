import React from "react";
import { Pressable, Text, View } from "react-native";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../context/AuthContext";
import { styles, text } from "../styles/styles";

export function TaskListItems({ item, navigation }) {
    const { deleteList } = useContext(AuthContext)
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
                    deleteList(item.id)
                    alert('List deleted')
                }}>
                <Text style={text.listTitleBig}>{item.name}</Text>
                <Text>{item.tasks.length} tasks in list</Text>
            </Pressable>
        </View>
        
    );
}