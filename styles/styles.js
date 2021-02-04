import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    inputView: {
        padding: 10,
    },
    textInput: {
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        padding: 10,
        width: 200
    },
    listItems: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10
    },
    taskListItems: {
        width: '100%',
        padding: 20,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10
    },
    listItemContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5
    }
});

const buttons = StyleSheet.create({
    primary: {
        backgroundColor: '#ffb957',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        width: 160
    },
    addIcon: {
        alignItems: 'center',
        paddingHorizontal: 10,

    }
});

const text =  StyleSheet.create({
    listTitleBig: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    listTitleMedium: {
        fontSize: 20,
        fontWeight: '500',
        paddingBottom
        : 10
    }
});

export { styles, buttons, text }