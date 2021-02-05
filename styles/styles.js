import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    mainInfoBox: {
        flexDirection: 'row', 
        // padding: 10,
        marginTop: 40, 
        justifyContent: 'space-between', 
        width: '100%', 
        borderBottomWidth: 2, 
        borderTopWidth: 2, 
        borderColor: '#aaa'
    },
    mainInfoBoxColumnContainers: {
        flexDirection: 'column', 
        padding: 10,
        // backgroundColor: 'white',
        // marginTop: 40
    },
    healthBarBackground: {
        backgroundColor: '#fff',
        height: 22,
        width: '100%',
        marginRight: 10,
        marginTop: 2,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    avatarImage: {
        borderWidth: 3, 
        borderColor: '#2b31b3', 
        borderRadius: 10
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
    mainScreenListTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 10,
        alignSelf: 'flex-start'
    },
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
    },
    mainInfoBoxText: {
        padding: 5,
        color: 'white'
    },
    sectionHeaderText: {
        paddingLeft: 5,
        fontSize: 24,
        fontWeight: '500'
    },
    expirySetText: {
        fontSize: 16,
        paddingTop: 10
    }
});

export { styles, buttons, text }