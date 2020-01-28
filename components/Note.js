import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Note = props => (
    <TouchableOpacity onPress={props.onViewNote.bind(this, props.note)}>
        <View style={styles.noteContainer}>
            <Text style={styles.title}>{props.note.title}</Text>
            <Button style={styles.button} color='#FB7373' onPress={props.onDelete.bind(this, props.note.id)} title=" ❌ " />
        </View>
    </TouchableOpacity>
)

export default Note;

const styles = StyleSheet.create({
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#4EFDBA',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    appContainer: {
        paddingTop: 50,
    },
    button: {
        margin: 100
    },
    title: {
        fontSize: 20,
        width: '90%',
        paddingLeft: 10
    }
})
