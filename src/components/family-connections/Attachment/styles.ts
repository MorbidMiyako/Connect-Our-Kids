import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    headerStyles: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',

        justifyContent: 'center',
    },
    headerImgStyles: {
        width: 240,
        height: 90,
    },
    headerBtnView: {
        padding: 5,
        backgroundColor: '#0279AC',
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 30,
        borderRadius: 20,
    },
    addCaseText: {
        color: 'white',
        fontSize: 17,
    },
});
