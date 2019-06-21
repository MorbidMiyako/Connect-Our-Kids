import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  WebView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Button } from 'native-base';
import constants from '../../helpers/constants';

const VideoModal = props => {
  return (
    <>
      <View style={styles.videoWrapper}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            props.setModalVisible(!props.modalVisible);
          }}
        >
          <Text style={[styles.btnText, styles.closeBtn]}>X</Text>
        </TouchableOpacity>
        <WebView
          style={styles.WebViewContainer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri: 'https://www.youtube.com/embed/04V1mNZxNE0'
          }}
        />
        <Button style={styles.noButton} block onPress={props.onLogin}>
          <Text style={styles.btnText}>Take me to sign up</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  videoWrapper: {
    height: 300,
    margin: 30
  },
  headerContainer: {
    borderBottomColor: constants.highlightColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    width: Dimensions.get('window').width
  },
  yesButton: {
    backgroundColor: constants.highlightColor,
    marginBottom: 10
  },
  noButton: {
    backgroundColor: '#6C757D',
    marginBottom: 10
  },
  close: {
    backgroundColor: 'red',
    borderRadius: 3,
    marginLeft: 'auto'
  },
  closeBtn: {
    padding: 5
  },
  btnText: {
    color: '#fff'
  },
  modalHeaderStyle: {
    color: constants.highlightColor,
    fontSize: 20,
    fontFamily: constants.fontFamily
  },
  modalTextStyle: {
    fontFamily: constants.fontFamily,
    paddingHorizontal: 20,
    fontSize: 18,
    lineHeight: 25
  },
  logo: {
    width: Dimensions.get('window').width - 40,
    height: 100
  },
  buttonContainer: {
    padding: 20,
    borderTopColor: constants.highlightColor,
    borderTopWidth: 1,
    marginTop: 20
  },
  WebViewContainer: {
    marginTop: Platform.OS == 'ios' ? 20 : 0,
    marginBottom: 30
  }
});

export default VideoModal;