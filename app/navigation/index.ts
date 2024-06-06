import { type UserModel } from '../models/UserModel'
import { SPLASH_SCREEN, LOGIN_SCREEN, USER_LIST_SCREEN, CHAT_SCREEN } from '../screens'

export const SplashRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: SPLASH_SCREEN,
                        options: {
                            topBar: { visible: false }
                        }
                    }
                }
            ]
        }
    }
}
export const LoginRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: LOGIN_SCREEN,
                        options: {
                            topBar: { visible: false },
                            animations: {
                                setRoot: {
                                    alpha: {
                                        from: 0,
                                        to: 1,
                                        duration: 500 // Adjust duration as needed
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }
    }
}

export const UserListRoot = {
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: USER_LIST_SCREEN,
                        options: {
                            topBar: { visible: false },
                            animations: {
                                setRoot: {
                                    alpha: {
                                        from: 0,
                                        to: 1,
                                        duration: 200 // Adjust duration as needed
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }
    }
}

interface ChatRootReturnType {
    component: {
        name: string
        passProps: {
            currentChatUser: UserModel
        }
        options: {
            topBar: { visible: boolean }
        }
    }
}
export const ChatRoot = (props: { currentChatUser: UserModel }): ChatRootReturnType => ({
    component: {
        name: CHAT_SCREEN,
        passProps: {
            currentChatUser: props.currentChatUser
        },
        options: {
            topBar: { visible: false }
        }
    }
})
