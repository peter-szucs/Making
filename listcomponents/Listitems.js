import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles, text } from "../styles/styles";

export function ListItems({ item, navigation }) {
    const [expiryText, setExpiryText] = useState("")

    function checkIfDone(isDone) {
        if (isDone) {
            return "Done"
        } else {
            return "Expires: ", item.expiryDate
        }
    }

    return (
        <View style={styles.listItemContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.listItems,
                    {
                        backgroundColor: item.isFinished ? '#bbb' : pressed
                        ? 'rgba(255, 185, 87, 0.4)' : 'white'
                    }
                    ]}
                onPress={() => {
                    // isFinished toggle
                    // change backgroundcolor to "finished state"
                    // ideally, move all finished tasks down
                    console.log("pressed: ", item.taskId)
                    item.isFinished = !item.isFinished
                    
                }}
                onLongPress={() => {
                    console.log("Long press")
                }}>
                <Text style={text.listTitleMedium}>{item.description}</Text>
                <Text style={{  }}>{checkIfDone(item.isFinished)}</Text>
            </Pressable>
        </View>
        
    );
}