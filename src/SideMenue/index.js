// import * as React from 'react';
// import { Button, View ,Dimensions} from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import Dashboard from "../Routes/Dashboard/index"

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//       <Drawer.Navigator drawerStyle={{ width:Dimensions.get("window").width * 0.7 }} initialRouteName="Dashboard">
//         <Drawer.Screen name="Dashboard" component={Dashboard} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//   );
// }





import * as React from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import logo from "../Assates/logo/Service64-Logo-dark4.png"

import Dashboard from "../Routes/Dashboard/index"

import DrawerItems from "./DrawerItems";

import {  getUser } from "../LocalStore/AuthStore";

const { height, width } = Dimensions.get("window");
function CustomDrawerContent(props) {
    return (
        <View  {...props} style={{ flex: 1, }} >
            <View style={{ height: 150, justifyContent: "center", alignItems: "center", backgroundColor: "#15B7C9" }} >
                <Image source={logo} resizeMode={"center"} />
            </View>
            <View style={{ height: height * 0.8, }} >
                <DrawerItems currentUser={{}} navigation={props.navigation} />
            </View>

        </View>
    );
}

const Drawer = createDrawerNavigator();
function MyDrawer({ route, navigation }) {

    const [currentUser, setCurrentUser] = React.useState(null)
    React.useEffect(() => {        
        const unsubscribe = navigation.addListener('focus', () => {
            getUser().then(user => {
                setCurrentUser(JSON.parse(user))
            })
        });
        return unsubscribe
    }, [])

    return (
        <Drawer.Navigator drawerStyle={{ width: width * 0.60 }} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Dashboard" >{props => <Dashboard currentUser={currentUser} activeTab={route.params ? route.params.activeTab : "Home"} {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}

export default function SideMenu(props) {
    return (
        <MyDrawer {...props} />
    );
}