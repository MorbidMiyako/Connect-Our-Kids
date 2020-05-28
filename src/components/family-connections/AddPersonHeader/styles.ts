import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    headerStyles: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        height: 100,
    },
    headerImgStyles: {
        width: 200,
        height: 90,
        marginRight: 45,
        paddingTop: 100,
    },
    headerBtnView: {
        padding: 5,
        flexDirection: 'row',
        marginTop: 30,
        marginRight: 10,
        marginBottom: 30,
        borderRadius: 20,
    },
    goBackRelacement: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: Platform.OS === 'android' ? 'none' : undefined,
    },
    goBackReplacementAndroid: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: Platform.OS === 'android' ? undefined : 'none',
    },
    TakePhotoBtnGroup: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        padding: 4,
        width: '100%',
    },
    headerBtnView2: {
        display: 'none',
    },
    addCaseText: {
        color: '#0279AC',
        fontSize: 17,
        paddingTop: 7,
    },
    backToCasesText: {
        color: '#0279AC',
        fontSize: 15,
        marginTop: 10,
    },
    addPersonTextAndroid: {
        color: '#0279AC',
        fontSize: 17,
        paddingLeft: 10,
    },
    containerStyle: {
        flex: 0,
    },
    statusTextContainer: {
        paddingTop: 30,
    },
    sectionPadding: {
        paddingLeft: 15,
        paddingTop: 15,
    },
    textPadding: {
        paddingTop: 10,
    },
    sectionHeader: {
        fontSize: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        color: '#0279AC',
    },
    dropdownContainer: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        width: 140,
    },
    suffixDropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
        width: 140,
    },
    genderDropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
        width: 140,
    },
    nameInputContainer: {
        width: '100%',
        marginTop: 10,
    },
    formContainer: {
        width: '45%',
        marginTop: 10,
    },
    cityZipContainer: {
        width: '55%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addressContainer: {
        width: '95%',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        width: '95%',
        height: 45,
        paddingLeft: 5,
        borderRadius: 5,
    },
    addressInput: {
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        height: 45,
        paddingLeft: 5,
        borderRadius: 5,
    },
    cityInput: {
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        height: 45,
        paddingLeft: 5,
        marginRight: 5,
        borderRadius: 5,
    },
    zipInput: {
        borderColor: 'black',
        borderWidth: 1,
        width: '70%',
        paddingLeft: 5,
        marginLeft: 5,
        borderRadius: 5,
    },
    highlightContainer: {
        width: '85%',
    },
    highlightInput: {
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
        paddingBottom: 10,
    },
    cancelButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 96,
        height: 36,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 20,
        borderColor: '#0279AC',
    },
    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 96,
        height: 36,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 20,
        backgroundColor: '#0279AC',
        borderColor: '#0279AC',
    },
});
