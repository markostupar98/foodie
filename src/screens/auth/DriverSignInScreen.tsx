// import React, {useState} from 'react';
// import {View, Text, TextInput, Pressable, Alert} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {useNavigation, NavigationProp} from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Header from '../../components/Header';
// import Button from '../../components/Button';
// import Background from '../../components/Background';
// import {signinDriver} from '../../services/authService';
// import {setDriver} from '../../store/slice/driverSlice';
// import {registerForPushNotifications} from '../../services/notificationService';
// import {RootStackParamList} from '../../types/RootStockParams';

// const DriverSignInScreen: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   // Toggle password visibility
//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   // Handle sign in with email and password
//   const signInWithEmail = async () => {
//     setLoading(true);
//     try {
//       const {token, driverId, error} = await signinDriver(email, password);
//       if (error) {
//         throw new Error(error);
//       }
//       await registerForPushNotifications(driverId, 'driver');
//       dispatch(setDriver({id: driverId, token}));
//       navigation.navigate('DriverHomeScreen');
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Background>
//       <View className="flex-1">
//         <Header title="Sign In As Driver" />
//         <View className="p-4">
//           <Text className="text-xl text-neutral-600">
//             Sign In and start driving
//           </Text>
//         </View>
//         <View className="items-center justify-center mt-4">
//           <Text className="text-sm text-neutral-400">
//             Please enter your email and password
//           </Text>
//         </View>
//         <View className="mt-8">
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             placeholder="Email"
//             className="border border-neutral-300 mb-8 mx-5 rounded-lg h-10 p-2"
//           />
//           <View className="border mx-5 border-neutral-300 flex-row justify-between items-center mb-5 rounded-lg">
//             <AntDesign name="lock1" size={24} color="black" />
//             <TextInput
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Password"
//               className="h-10 flex-1"
//             />
//             <MaterialIcons
//               name={showPassword ? 'visibility' : 'visibility-off'}
//               size={24}
//               color="black"
//               className="mr-5"
//               onPress={toggleShowPassword}
//             />
//           </View>
//         </View>
//         <View className="w-90 mx-7 my-2">
//           <Button
//             title="Sign In"
//             disabled={loading}
//             onPress={signInWithEmail}
//           />
//         </View>
//         <Pressable
//           onPress={() => {}}
//           className="p-4 border justify-center my-5 flex-row border-neutral-500 mx-5 rounded-full">
//           <AntDesign
//             name="facebook-square"
//             size={24}
//             color="black"
//             className="mr-5"
//           />
//           <Text>Sign In with Facebook</Text>
//         </Pressable>
//         <Pressable
//           onPress={() => {}}
//           className="p-4 border justify-center flex-row border-neutral-500 mx-5 rounded-full">
//           <AntDesign name="google" size={24} color="black" className="mr-5" />
//           <Text>Sign In with Google</Text>
//         </Pressable>
//         <View className="justify-end my-5 flex-row mx-5">
//           <Button
//             onPress={() => navigation.navigate('DriverSignUpScreen')}
//             title="Register As Driver"
//           />
//         </View>
//       </View>
//     </Background>
//   );
// };

// export default DriverSignInScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  useColorScheme,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Background from '../../components/Background';
import {signinDriver} from '../../services/authService';
import {setDriver} from '../../store/slice/driverSlice';
import {registerForPushNotifications} from '../../services/notificationService';
import {RootStackParamList} from '../../types/RootStockParams';

const DriverSignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colorScheme = useColorScheme();

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle sign in with email and password
  const signInWithEmail = async () => {
    setLoading(true);
    try {
      const {token, driverId, error} = await signinDriver(email, password);
      if (error) {
        throw new Error(error);
      }
      await registerForPushNotifications(driverId, 'driver');
      dispatch(setDriver({id: driverId, token}));
      navigation.navigate('DriverHomeScreen');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View className="flex-1">
        <Header title="Sign In As Driver" />
        <View className="p-4">
          <Text
            className={`text-xl ${
              colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
            }`}>
            Sign In and start driving
          </Text>
        </View>
        <View className="items-center justify-center mt-4">
          <Text
            className={`text-sm ${
              colorScheme === 'dark' ? 'text-gray-400' : 'text-neutral-400'
            }`}>
            Please enter your email and password
          </Text>
        </View>
        <View className="mt-8">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            className={`border ${
              colorScheme === 'dark'
                ? 'text-white border-neutral-600'
                : 'text-neutral-900 border-neutral-300'
            } mb-8 mx-5 rounded-lg h-10 p-2`}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'darkgray'}
          />
          <View
            className={`border ${
              colorScheme === 'dark'
                ? 'border-neutral-600'
                : 'border-neutral-300'
            } mx-5 flex-row justify-between items-center mb-5 rounded-lg p-2`}>
            <AntDesign
              name="lock1"
              size={24}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            />
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              className={`h-10 ${
                colorScheme === 'dark' ? 'text-white' : 'text-neutral-900'
              } flex-1 ml-2`}
              placeholderTextColor={
                colorScheme === 'dark' ? 'gray' : 'darkgray'
              }
            />
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color={colorScheme === 'dark' ? 'white' : 'black'}
              className="mr-5"
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        <View className="w-90 mx-7 my-2">
          <Button
            title="Sign In"
            disabled={loading}
            onPress={signInWithEmail}
          />
        </View>
        <Pressable
          onPress={() => {}}
          className={`p-4 border justify-center my-5 flex-row ${
            colorScheme === 'dark' ? 'border-gray-600' : 'border-neutral-500'
          } mx-5 rounded-full`}>
          <AntDesign
            name="facebook-square"
            size={24}
            color={colorScheme === 'dark' ? 'white' : 'black'}
            className="mr-5"
          />
          <Text
            className={`${
              colorScheme === 'dark' ? 'text-white' : 'text-black'
            }`}>
            Sign In with Facebook
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          className={`p-4 border justify-center flex-row ${
            colorScheme === 'dark' ? 'border-gray-600' : 'border-neutral-500'
          } mx-5 rounded-full`}>
          <AntDesign
            name="google"
            size={24}
            color={colorScheme === 'dark' ? 'white' : 'black'}
            className="mr-5"
          />
          <Text
            className={`${
              colorScheme === 'dark' ? 'text-white' : 'text-black'
            }`}>
            Sign In with Google
          </Text>
        </Pressable>
        <View className="justify-end my-5 flex-row mx-5">
          <Button
            onPress={() => navigation.navigate('DriverSignUpScreen')}
            title="Register As Driver"
          />
        </View>
      </View>
    </Background>
  );
};

export default DriverSignInScreen;
