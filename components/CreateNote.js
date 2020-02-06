import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Modal, TextInput, ToastAndroid } from 'react-native'

const colors ={
  'blue':'#007bff',
  'indigo':'#6610f2',
  'purple':'#6f42c1',
  'pink':'#e83e8c',
  'red':'#dc3545',
  'orange':'#fd7e14',
  'yellow':'#ffc107',
  'green':'#28a745',
  'teal':'#20c997',
  'cyan':'#17a2b8',
  'white':'#fff',
  'gray':'#6c757d',
  'grayDark':'#343a40',
  'black': '#000',
  'primary':'#007bff',
  'secondary':'#6c757d',
  'success':'#28a745',
  'info':'#17a2b8',
  'warning':'#ffc107',
  'danger':'#dc3545',
  'light':'#f8f9fa',
  'dark':'#343a40'
}

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

    // Need to set title and note to empty or it would load again on new create
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
                        <Button title="CANCEL ❌" color={colors.red} onPress={cancelHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button title="ENCRYPT 🔐" color={colors.primary} onPress={addNoteHandler} />
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
        backgroundColor: colors.gray
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin:0,
        padding: 0
    },
    button: {
        width: '40%',
        paddingLeft: 10,
        paddingRight: 10,
        margin: 0,
        borderRadius:30
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: colors.white,
        fontSize: 20,
    },
    inputTitle: {
        fontSize: 20,
        margin: 10,
        padding: 10,
        backgroundColor: colors.white,
        borderColor: colors.white,
        borderWidth: 1,
        borderRadius:5,
        width: '50%',
        textAlign: 'center'
    },
    inputNote: {
        fontSize: 20,
        margin: 10,
        padding: 10,
        backgroundColor: colors.white,
        height: '70%',
        width: '90%',
        borderColor: colors.white,
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: 'top'
    }
})
