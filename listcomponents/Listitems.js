import React, { useContext, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Context } from "../context/Context";
import { getDateToString, isOverdue, isToday } from "../functions";
import { styles, text } from "../styles/styles";
import { Ionicons } from '@expo/vector-icons';
import { waitForLongPress } from '../functions';

export function ListItems({ item, navigation, listId }) {
    const { addOrDeleteOrUpdateTask } = useContext(Context)
    const [isLongPress, setIsLongPress] = useState(false)
    
    let iconInfo = {
        name: "checkmark-outline",
        size: 32,
        color: 'white'
    }
    function setIcon() {
        if (item.isFinished) {
            iconInfo.color='green'
        } else if (isOverdue(item.expiryDate)) {
            iconInfo.name="close-outline"
            iconInfo.color='red'
        }
         
    }

    setIcon()

    function checkIfDone(isDone) {
        if (isDone) {
            return "Done"
        } else if (isOverdue(item.expiryDate)) {
            return "Expired: " + getDateToString(item.expiryDate)
        } else {
            return isToday(item.expiryDate) ? "Expires Today!" : "Expires: " + getDateToString(item.expiryDate)
        }
    }

    return (
        <View style={styles.listItemContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.listItems,
                    {
                        backgroundColor: item.isFinished ? '#bbb' : isOverdue(item.expiryDate) ? 'rgba(255, 50, 0, 0.1)' : isLongPress ? 'rgb(255, 59, 48)' : pressed
                        ? 'rgba(255, 185, 87, 0.4)' : 'white'
                    }
                    ]}
                //delayLongPress={1000}
                onPress={() => {
                    // isFinished toggle
                    // change backgroundcolor to "finished state"
                    // ideally, move all finished tasks down
                    if (!item.isFinished) {
                        item.isFinished = !item.isFinished
                        addOrDeleteOrUpdateTask(listId, item, "update")
                    }
                }}
                onLongPress={async () => {
                    if (!isOverdue(item.expiryDate) && !item.isFinished) {
                        setIsLongPress(true)
                        await waitForLongPress(300)
                        addOrDeleteOrUpdateTask(listId, item, "delete" )
                        setIsLongPress(false)
                        alert('Task deleted')
                    }
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style= {{ flexDirection: 'column' }}>
                        <Text style={text.listTitleMedium}>{item.description}</Text>
                        <Text style={{ color: isOverdue(item.expiryDate) ? 'red' : '#777' }}>{checkIfDone(item.isFinished)}</Text> 
                    </View>
                    <View style= {{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name={iconInfo.name} size={iconInfo.size} color={iconInfo.color} style={{ padding:10 }} />
                        <View style={{ width: 10, height: '90%', backgroundColor: '#f2f2f2' }}></View>
                    </View>
                </View>
                
            </Pressable>
        </View>
        
    );
}