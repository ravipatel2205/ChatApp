import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 3,
        height: 30
    },
    backButtonContainer: {
        position: 'absolute',
        left: 10
    },
    backButton: {
        width: 30,
        height: 30
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    mainWraper: {
        flexDirection: 'column',
        flex: 0.98,
        rowGap: 10
    },
    noMessageFoundTitleContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    noMessageFoundTitle: {
        textAlign: 'center',
        fontWeight: '500'
    },
    messagesContainer: {
        backgroundColor: '#f2f2f2',
        height: '89%'
    },
    messageInputContainer: {
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    messageInput: {
        borderWidth: 1,
        padding: 10,
        flex: 1,
        borderRadius: 50,
        marginHorizontal: 10
    },
    button: {
        width: '25%',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600'
    },
    pinImage: {
        width: 20,
        height: 20
    },
    attachementButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    attachementContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    videoPlayer: {
        margin: 0,
        justifyContent: 'flex-start'
    }
})
