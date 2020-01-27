import React, { useState } from "react";
import { View, Button, Text, StyleSheet, FlatList, ToastAndroid} from 'react-native'
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import CryptoJS from "react-native-crypto-js";

import Note from './components/Note';
import CreateNote from "./components/CreateNote";
import ViewNote from "./components/ViewNote";

export default function App() {
    const [notes, setNote] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [currentNote, setCurrentNote] = useState({ id: 0, title: "", note: "" });
    const [location, setLocation] = useState({ lon: "", lat: "" });
    const [noteDecrypted, setNoteDecrypted] = useState(false);

    const componentWillMount = () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    const _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        Location.Accuracy.Lowest
        let loc = await Location.getCurrentPositionAsync({});
        // At 45° lat accuracy at 3rd decimal is around 70m
        setLocation({ lon: loc.coords.longitude.toFixed(3).toString(), lat: loc.coords.latitude.toFixed(3).toString() });
        console.log(loc);
    };

    const addNoteHandler = noteProp => {
        let cryptedNote = encryptAES(noteProp.enteredNote);
        setNote(currentNotes => [
            ...currentNotes, { id: Math.random().toString(), title: noteProp.enteredTitle, note: cryptedNote }
        ]);
        setIsAddMode(false);
    }

    const openAddMode = () => {
        _getLocationAsync();
        setIsAddMode(true);
    }

    const viewNoteHandler = note => {
        _getLocationAsync();
        setCurrentNote(note);
        setIsViewMode(true);
    }

    const cancelNoteHandler = () => {
        setIsAddMode(false);
        setIsViewMode(false);
    }

    const removeNoteHandler = noteId => {
        console.log('Note delete key' + noteId);
        setNote(currentNotes => {
            return currentNotes.filter((note) => note.id !== noteId);
        })
    }

    const encryptAES = note => {
        let key = location.lat + location.lon;
        ToastAndroid.show('Note encrypted!', ToastAndroid.SHORT);
        return CryptoJS.AES.encrypt(note, key).toString();
    }

    const decryptAES = note => {
        // Decrypt
        if(noteDecrypted){
            ToastAndroid.show('Note alredy decrypted!', ToastAndroid.SHORT);
            return;
        }
        console.log(note.note);
        console.log(location);
        let key = location.lat + location.lon;
        let bytes = CryptoJS.AES.decrypt(note.note, key);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText);
        setCurrentNote({ id: "aaa", title: note.title, note: originalText });
        ToastAndroid.show('Note decrypted!', ToastAndroid.SHORT);
        setNoteDecrypted(true);
    }


    return (
        <View style={styles.appContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}> Location Locker </Text>
                <Button style={styles.button} onPress={() => openAddMode()} title="ADD" />
            </View>
            <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                data={notes}
                renderItem={noteData => (
                    <Note
                        note={noteData.item}
                        onDelete={removeNoteHandler}
                        onViewNote={viewNoteHandler}
                    />
                )}
            />
            <CreateNote visible={isAddMode} onAddNote={addNoteHandler} onCancel={cancelNoteHandler} location={location} />
            <ViewNote visible={isViewMode} note={currentNote} onCancel={cancelNoteHandler} onDecrypt={decryptAES} location={location} />
        </View>
    )
}

const styles = StyleSheet.create({
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appContainer: {
        paddingTop: 0,
        height: '100%',
        backgroundColor: '#B6F0DA'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
        paddingTop: 36,
        backgroundColor: "#00B26E",
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#FC1B1B'
    },
    headerTitle: {
        color: 'white',
        fontSize: 25,
    }
})