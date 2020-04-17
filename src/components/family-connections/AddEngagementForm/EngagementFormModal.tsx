import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Modal, StyleSheet } from 'react-native';

const EngagementFormModal = (props) => {
const [toggleModal, setToggleModal] = useState(false)
setToggleModal(props.toggleModal)
    return(
            <Modal 
                animationType = {"slide"} 
                transparent = {true}
                visible = {toggleModal}
                onRequestClose = {() => {console.log("Modal has been closed.")}}>
            <View style={styles.modal}>
            <Text> Engagement Saved! </Text>
            <TouchableHighlight 
                onPress={() => {
                setToggleModal(false)
                }}>
                    <Text style={styles.text}> Ok </Text>
            </TouchableHighlight>
            </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f702la",
        padding: 100
    },
    okButton: {

    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }

})
export default EngagementFormModal;