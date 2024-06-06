import ChatScreen from './ChatScreen/ChatScreen'
import LoginScreen from './LoginScreen'
import SplashScreen from './SplashScreen'
import UserListScreen from './UserlistScreen'

export const SPLASH_SCREEN = 'Splash'
export const LOGIN_SCREEN = 'Login'
export const USER_LIST_SCREEN = 'Userlist'
export const CHAT_SCREEN = 'Chat'

export const Screens = new Map()
Screens.set(SPLASH_SCREEN, SplashScreen)
Screens.set(LOGIN_SCREEN, LoginScreen)
Screens.set(USER_LIST_SCREEN, UserListScreen)
Screens.set(CHAT_SCREEN, ChatScreen)
