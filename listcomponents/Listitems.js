import React, { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Context } from "../context/Context";
import { styles, text } from "../styles/styles";

export function ListItems({ item, navigation, listId }) {
    const { addOrDeleteOrUpdateTask } = useContext(Context)

    function checkIfDone(isDone) {
        if (isDone) {
            return "Done"
        } else {
            return "Expires: " + item.expiryDate
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
                delayLongPress={1000}
                onPress={() => {
                    // isFinished toggle
                    // change backgroundcolor to "finished state"
                    // ideally, move all finished tasks down
                    if (!item.isFinished) {
                        item.isFinished = !item.isFinished
                        addOrDeleteOrUpdateTask(listId, item, "update")
                    }
                }}
                onLongPress={() => {
                    addOrDeleteOrUpdateTask(listId, item, "delete" )
                }}>
                <Text style={text.listTitleMedium}>{item.description}</Text>
                <Text style={{  }}>{checkIfDone(item.isFinished)}</Text>
            </Pressable>
        </View>
        
    );
}