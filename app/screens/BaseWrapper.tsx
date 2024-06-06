import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

const BaseWrapper = (Component: any): any => {
    // eslint-disable-next-line react/display-name
    return (props: any): React.JSX.Element => {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Provider store={store}>
                    <Component {...props} />
                </Provider>
            </KeyboardAvoidingView>
        )
    }
}
export default BaseWrapper
