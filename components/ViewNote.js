import React from 'react';
import { View, Button, Text, StyleSheet, Modal, Clipboard } from 'react-native'

const ViewNote = props => {
    const copyToClipboard = () => {
        Clipboard.setString(props.note.note);
    }

    return (
        <Modal visible={props.visible} animationType="fade">
            <View style={styles.header}>
                <Text style={styles.headerTitle}> Latitude: {props.location.lat} / Longitude:{props.location.lon} </Text>
            </View>
            <View style={styles.inputContainer}>
                <Text editble={false} style={styles.title}>{props.note.title}</Text>
                <Text onLongPress={copyToClipboard} editble={false} style={styles.inputNote} multiline numberOfLines={8}>{props.note.note}</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="GO BACK 👈" color='#FB7373' onPress={props.onCancel} />
                    </View>
                    <View style={styles.button}>
                        <Button title="DECRYPT 🔓" color='#00B26E' onPress={props.onDecrypt.bind(this, props.note)} />
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default ViewNote;

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
    title: {
        fontSize: 20,
        margin: 10,
        padding: 10,
        backgroundColor: '#B6F0DA',
        borderColor: 'black',
        borderWidth: 1,
        width: '50%',
        textAlign: 'center',
        fontWeight: 'bold'
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