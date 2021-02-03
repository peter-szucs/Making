import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles, text } from "../styles/styles";

export function ListItems({ item, navigation }) {

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
                <Text style={{  }}>Expires: {item.expiryDate}</Text>
            </Pressable>
        </View>
        
    );
}