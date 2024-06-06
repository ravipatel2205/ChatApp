import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'

interface VidePlayerProps {
    onCancel: () => void
    videoURL: string
}

const VidePlayer: React.FC<VidePlayerProps> = ({ videoURL, onCancel }) => {
    return (
        <View style={styles.container}>
            <View style={styles.videoPlayerContainer}>
                <Video
                    style={styles.video}
                    source={{ uri: videoURL }}
                    controls={true}
                    playInBackground={false}
                />
            </View>
            <View style={styles.closeIconContainer}>
                <TouchableOpacity activeOpacity={0.65} onPress={onCancel}>
                    <Image style={styles.closeIcon} source={require('../../assets/ic_close.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'black',
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    videoPlayerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },
    video: {
        width: '100%',
        height: '100%'
    },
    closeIconContainer: {
        position: 'absolute',
        width: '100%',
        height: 40,
        zIndex: 1,
        marginTop: '12%'
    },
    closeIcon: {
        width: 35,
        height: 35,
        marginTop: 5,
        marginLeft: '88%',
        tintColor: 'white'
    }
})

export default VidePlayer
