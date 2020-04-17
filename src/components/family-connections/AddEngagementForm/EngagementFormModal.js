import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Modal, StyleSheet } from 'react-native';

const EngagementFormModal = (props) => {
const [toggleModal, setToggleModal] = useState(false)
    return(
        <View style={styles.container}>
            <Modal 
                animationType = {"slide"} 
                transparent = {true}
                visible = {toggleModal}
                onRequestClose = {() => {console.log("Modal has been closed.")}}>
            <View>
            <Text> Engagement Saved! </Text>
            <TouchableHighlight 
                onPress={() => {
                setToggleModal(false)
                }}>
                    <Text> Ok </Text>
            </TouchableHighlight>
            </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    okButton: {

    }
})
export default EngagementFormModal;