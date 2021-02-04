import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useContext } from "react/cjs/react.development";
import { Context } from "../context/Context";
import { styles, text } from "../styles/styles";

export function TaskListItems({ item, navigation }) {
    const { deleteList } = useContext(Context)
    const [isLongPress, setIsLongPress] = useState(false)

    function waitForLongPress(delay) {
        return new Promise( res => setTimeout(res, delay))
    }

    return (
        <View style={styles.listItemContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.taskListItems,
                    {
                        backgroundColor: isLongPress ? 'rgb(255, 59, 48)' : pressed
                        ? 'rgba(255, 185, 87, 0.4)' : 'white'
                    }
                    ]}
                onPress={() => {
                    console.log("pressed")
                    navigation.navigate('Tasks', { item: item })
                }}
                onLongPress={async () => {
                    setIsLongPress(true)
                    await waitForLongPress(300)
                    deleteList(item.id)
                    setIsLongPress(false)
                    alert('List deleted')
                }}>
                <Text style={text.listTitleBig}>{item.name}</Text>
                <Text>{item.tasks.length} tasks in list</Text>
            </Pressable>
        </View>
        
    );
}