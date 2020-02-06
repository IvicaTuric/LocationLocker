import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'


const Note = props => (
    <TouchableOpacity onPress={props.onViewNote.bind(this, props.note)}>
        <View style={styles.noteContainer}>
            <Text style={styles.title}>{props.note.title}</Text>
            <Button style={styles.button} color={colors.red} onPress={props.onDelete.bind(this, props.note.id)} title=" ❌ " />
        </View>
    </TouchableOpacity>
)

export default Note;
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
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: colors.grayDark,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    appContainer: {
        paddingTop: 50,
    },
    button: {
        margin: 100,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        width: '90%',
        paddingLeft: 10,
        color: colors.white
    }
})
