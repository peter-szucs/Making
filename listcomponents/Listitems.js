import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles, text } from "../styles/styles";

export function ListItems({ item, navigation }) {

    console.log("Item in component: ", item)
    return (
        <View style={styles.listItemContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.listItems,
                    {
                        backgroundColor: pressed
                        ? 'rgba(255, 185, 87, 0.4)' : 'white'
                    }
                    ]}
                onPress={() => {
                    console.log("pressed")
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