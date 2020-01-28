import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Modal, TextInput, ToastAndroid } from 'react-native'

const CreateNote = props => {

    const [enteredTitle, setEnteretTitle] = useState('');
    const [enteredNote, setEnteretNote] = useState('');

    const noteInput = enteredNote => {
        setEnteretNote(enteredNote);
    }

    const titleInput = enteredTitle => {
        setEnteretTitle(enteredTitle);
    }

    const addNoteHandler = () => {
        props.onAddNote({ enteredNote, enteredTitle });
        setEnteretNote('');
        setEnteretTitle('');
    }

    const cancelHandler = () => {
        setEnteretNote('');
        setEnteretTitle('');
        props.onCancel();
        ToastAndroid.show('Note discarded!', ToastAndroid.SHORT);
    }

    return (
        <Modal visible={props.visible} animationType="fade">
            <View style={styles.header}>
                <Text style={styles.headerTitle}> Latitude: {props.location.lat}      Longitude: {props.location.lon} </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput placeholder="Title of the note"
                    style={styles.inputTitle}
                    onChangeText={titleInput}
                    value={enteredTitle} />
                <TextInput multiline numberOfLines={8} placeholder="Start writing your note"
                    style={styles.inputNote}
                    onChangeText={noteInput}
                    value={enteredNote} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="CANCEL ❌" color='#FB7373' onPress={cancelHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button title="ENCRYPT 🔐" color='#00B26E' onPress={addNoteHandler} />
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default CreateNote;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4EFDBA'
    },
    appContainer: {
        paddingTop: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '30%',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: "#00B26E",
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
    },
    inputTitle: {
        fontSize: 20,
        margin: 10,
        padding: 10,
        backgroundColor: '#B6F0DA',
        borderColor: 'black',
        borderWidth: 1,
        width: '50%',
        textAlign: 'center'
    },
    inputNote: {
        fontSize: 20,
        margin: 10,
        padding: 10,
        backgroundColor: '#B6F0DA',
        height: '70%',
        width: '90%',
        borderColor: 'black',
        borderWidth: 1,
        textAlignVertical: 'top'
    }
})
