// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native'
// import { BottomNavigation, Icon, BottomNavigationTab } from '@ui-kitten/components'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { NavigationContainer } from '@react-navigation/native'
// import { Ionicons } from '@expo/vector-icons'

// import QR from '../../pages/QR'
// import Scanner from '../../pages/Scanner'
// import Contacts from '../../pages/Contacts'
// import Menu from '../../pages/Menu'

// const BottomTab = createBottomTabNavigator()

// const PersonIcon = style => <Icon {...style} name="person-outline" />
// const BellIcon = style => <Icon {...style} name="bell-outline" />
// const EmailIcon = style => <Icon {...style} name="email-outline" />
// const HamburgerIcon = style => <Icon {...style} name="menu-outline" />


// export const BottomTabBar = ({ navigation, state }) => {
//   const [bottomSelectedIndex, setBottomSelectedIndex] = useState(0)
//   const onSelect = (index) => {
//     navigation.navigate(state.routeNames[index])
//     setBottomSelectedIndex(index)
//   }
//   return (
//     <SafeAreaView>
//       <BottomNavigation
//         // style={styles.bottomNavigation}
//         selectedIndex={bottomSelectedIndex}
//         onSelect={onSelect}
//       >
//         <BottomNavigationTab title="My QR" icon={PersonIcon} />
//         <BottomNavigationTab title="แสกน" icon={BellIcon} />
//         <BottomNavigationTab title="รายชื่อ" icon={EmailIcon} />
//         <BottomNavigationTab title="เมนู" icon={HamburgerIcon} />
//       </BottomNavigation>
//     </SafeAreaView>
//   )
// }

// const TabNavigator = () => (
//   <BottomTab.Navigator options={{ tabBarVisible: false }} tabBar={props => <BottomTabBar {...props} />}>
//     <BottomTab.Screen name='QR' component={QR} />
//     <BottomTab.Screen name='Scanner' component={Scanner} />
//     <BottomTab.Screen name='Contacts' component={Contacts} />
//     <BottomTab.Screen name='Menu' component={Menu} />
//   </BottomTab.Navigator>
// )

// export const AppNavigator = () => <TabNavigator />

// // export default AppNavigator
// export default () => {
//   return (
//     <NavigationContainer>
//       <BottomTab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName
//             if (route.name === 'QR') {
//               iconName = focused
//                 ? 'ios-information-circle'
//                 : 'ios-information-circle-outline'
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'ios-list-box' : 'ios-list'
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'gray',
//         }}
//       >
//         <BottomTab.Screen name='QR' component={QR} />
//         <BottomTab.Screen name='Scanner' component={Scanner} />
//         <BottomTab.Screen name='Contacts' component={Contacts} />
//         <BottomTab.Screen name='Menu' component={Menu} />
//       </BottomTab.Navigator>
//     </NavigationContainer>
//   )
// }
