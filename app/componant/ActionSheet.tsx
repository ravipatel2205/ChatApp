import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

export interface ActionItem {
    id: string
    label: string
    onPress: () => void
}

interface ActionSheetProps {
    actionItems: ActionItem[]
    onCancel: () => void
    actionTextColor?: string
}

const PRIMARY_COLOR = 'rgb(0,98,255)'
const WHITE = '#ffffff'
const BORDER_COLOR = '#DBDBDB'

const ActionSheet: React.FC<ActionSheetProps> = ({ actionItems, onCancel, actionTextColor }) => {
    const actionSheetItems: ActionItem[] = [
        ...actionItems,
        {
            id: '#cancel',
            label: 'Cancel',
            onPress: onCancel
        }
    ]
    return (
        <View style={styles.modalContent}>
            {actionSheetItems.map((actionItem, index) => (
                <TouchableHighlight
                    key={index}
                    onPress={actionItem.onPress}
                    style={[
                        styles.actionSheetView,
                        index === 0 && { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
                        index === actionSheetItems.length - 2 && {
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12
                        },
                        index === actionSheetItems.length - 1 && {
                            borderBottomWidth: 0,
                            backgroundColor: WHITE,
                            marginTop: 8,
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12
                        }
                    ]}
                    underlayColor={'#f7f7f7'}
                >
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.actionSheetText,
                            index === actionSheetItems.length - 1 && actionSheetItems.length > 0
                                ? { color: '#fa1616' }
                                : {}
                            // { color: actionTextColor ?? undefined }
                        ]}
                    >
                        {actionItem.label}
                    </Text>
                </TouchableHighlight>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 20
    },
    actionSheetText: {
        fontSize: 18,
        color: PRIMARY_COLOR
    },
    actionSheetView: {
        backgroundColor: WHITE,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: BORDER_COLOR
    }
})

export default ActionSheet
