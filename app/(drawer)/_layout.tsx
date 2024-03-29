import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../auth/SignInScreen/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import { useAuthenticationStatus } from '@nhost/react';
import { Spinner } from 'tamagui';
import { DrawerToggleButton } from '@react-navigation/drawer';

const DrawerLayout = () => {
  const Stack = createNativeStackNavigator();
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  console.log('isAuthenticated ' + isAuthenticated, 'isLoading ' + isLoading);

  if (isLoading) {
    return <Spinner size="large" />;
  }
  if (!isAuthenticated) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="sign-in" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" component={SignUpScreen} options={{ title: 'Sign up' }} />
      </Stack.Navigator>
    );
  }
  return (
    <>
      <Drawer
        screenOptions={{
          //to change the possition and the burger menu
          drawerPosition: 'right',
          headerRight: () => <DrawerToggleButton />,
          headerLeft: () => null,
        }}>
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="news"
          options={{
            headerTitle: 'Newsfeed',
            drawerLabel: 'News',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="events/index"
          options={{
            headerTitle: 'KP Events',
            drawerLabel: 'Events',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="add-circle-sharp" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile/index"
          options={{
            headerTitle: 'Profile',
            drawerLabel: 'Profile',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </>
  );
};

export default DrawerLayout;
