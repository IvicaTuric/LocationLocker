import React, { useState } from "react";
import { View, Button, Text, StyleSheet, FlatList, ToastAndroid, AsyncStorage, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import CryptoJS from "react-native-crypto-js";

import Note from './components/Note';
import CreateNote from "./components/CreateNote";
import ViewNote from "./components/ViewNote";

let n=0;

export default function App() {
    const [notes, setNote] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [currentNote, setCurrentNote] = useState({ id: 0, title: "", note: "" });
    const [location, setLocation] = useState({ lon: "", lat: "" });
    const [noteDecrypted, setNoteDecrypted] = useState(false);
    const [appStarted, setAppStarted] = useState(true);

    if (appStarted) {
        console.log("ggggggg");
        loadNotes();
    }

    let smileyList = ["😊", "😁", "😎", "😜", "😃", "😆", "🤯", "🤪", "🤡", "🥳", "👽", "🙉"];

    const getRandomSmiley = () => {
        return smileyList[Math.floor(Math.random() * 11)] + "  ";
    }

    const _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        let loc = await Location.getCurrentPositionAsync({});
        // At 45° lat accuracy at 3rd decimal is around 70m
        setLocation({ lon: loc.coords.longitude.toFixed(3).toString(), lat: loc.coords.latitude.toFixed(3).toString() });
    };

    const addNoteHandler = async (noteProp) => {
        let cryptedNote = encryptAES(noteProp.enteredNote);
        let rndId = Math.random().toString();
        let newTitle=smileyList[n++] + "  " + noteProp.enteredTitle;
        let newNote = { id: rndId, title: newTitle, note: cryptedNote }
        setNote(currentNotes => [
            ...currentNotes, newNote
        ]);

        try {
            await AsyncStorage.setItem(rndId, JSON.stringify(newNote));
        } catch (error) {
            console.log(error);
        }

        setIsAddMode(false);
    }

    const removeNoteHandler = noteId => {
        setNote(currentNotes => {
            return currentNotes.filter((note) => note.id !== noteId);
        })
        AsyncStorage.removeItem(noteId);
        ToastAndroid.show('Note removed!', ToastAndroid.SHORT);
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
        setNoteDecrypted(false);
    }

    const encryptAES = note => {
        let key = location.lat + location.lon;
        ToastAndroid.show('Note encrypted!', ToastAndroid.SHORT);
        return CryptoJS.AES.encrypt(note, key).toString();
    }

    const decryptAES = note => {
        // Decrypt
        if (noteDecrypted) {
            ToastAndroid.show('Note alredy decrypted!', ToastAndroid.SHORT);
            return;
        }
        let key = location.lat + location.lon;
        let bytes = CryptoJS.AES.decrypt(note.note, key);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (originalText === "") {
            ToastAndroid.show('Location incorrect!', ToastAndroid.SHORT);
            return;
        }
        setCurrentNote({ id: "aaa", title: note.title, note: originalText });
        ToastAndroid.show('Note decrypted!', ToastAndroid.SHORT);
        setNoteDecrypted(true);
    }

    function loadNotes() {
        setAppStarted(false);
        AsyncStorage.getAllKeys().then(keys =>
            keys.forEach(key =>
                AsyncStorage.getItem(key).then(value =>
                    setNote(currentNotes => [
                        ...currentNotes, JSON.parse(value)
                    ])
                )
            )
        );
    }

    return (
        <View style={styles.appContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}> Location 🔐 Locker </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => openAddMode()}>
                <Text>➕</Text>
            </TouchableOpacity>
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
        paddingTop: 18,
        backgroundColor: "#00B26E",
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#4392F1',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        right: 20,
        top: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6.00,
        elevation: 10
    },
    headerTitle: {
        fontWeight: "bold",
        color: '#B6F0DA',
        fontSize: 25,
    }
})