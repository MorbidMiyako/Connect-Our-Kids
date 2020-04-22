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
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 30,
        borderRadius: 20,
    },
    addCaseText: {
        color: '#0279AC',
        fontSize: 17,
    },
});
