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
});

const buttons = StyleSheet.create({
    primary: {
        backgroundColor: '#ffb957',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        width: 160
    }
})

export { styles, buttons }