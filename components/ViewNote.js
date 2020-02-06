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
                <Text editble={true} style={styles.title}>{props.note.title}</Text>
                <Text onLongPress={copyToClipboard} editble={true} style={styles.inputNote} multiline numberOfLines={8}>{props.note.note}</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="GO BACK 👈" color={colors.red} onPress={props.onCancel} />
                    </View>
                    <View style={styles.button}>
                        <Button title="DECRYPT 🔓" color={colors.primary} onPress={props.onDecrypt.bind(this, props.note)} />
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default ViewNote;
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
const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.secondary,
        padding:4
    },
    appContainer: {
        paddingTop: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 0,
        margin:0
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
    title: {
        fontSize: 20,
        margin: 10,
        padding: 10,
        backgroundColor: colors.white,
        borderColor: colors.white,
        borderWidth: 1,
        borderRadius:5,
        width: '50%',
        textAlign: 'center',
        fontWeight: 'bold'
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
        borderRadius:5,
        textAlignVertical: 'top'
    }
})
