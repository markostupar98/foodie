// import React, {useState} from 'react';
// import {View, Text, TextInput, Pressable, Alert} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {useNavigation, NavigationProp} from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Header from '../../components/Header';
// import Button from '../../components/Button';
// import Background from '../../components/Background';
// import {setUser} from '../../store/slice/userSlice';
// import {RootStackParamList} from '../../types/RootStockParams';
// import {registerForPushNotifications} from '../../services/notificationService';
// import {signInUser} from '../../services/authService';

// const SignInScreen: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const dispatch = useDispatch();

//   // Toggle password visibility
//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   // Handle sign in with email and password
//   const signInWithEmail = async () => {
//     setLoading(true);
//     try {
//       const {token, userId, error} = await signInUser(email, password);
//       if (error) {
//         throw new Error(error);
//       }
//       await registerForPushNotifications(userId, 'user');
//       dispatch(setUser({id: userId, token}));
//       navigation.navigate('HomeScreen');
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Background>
//       <View className="flex-1">
//         <Header title="Sign In" />
//         <View className="p-4">
//           <Text className="text-xl text-neutral-600">
//             Sign In to your account
//           </Text>
//         </View>
//         <View className="items-center justify-center mt-4">
//           <Text className="text-sm text-neutral-400">
//             Please enter your email and password
//           </Text>
//         </View>
//         <View className="mt-8">
//           <View>
//             <TextInput
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Email"
//               className="border text-neutral-900 border-neutral-300 mb-8 mx-5 rounded-lg h-10 p-2"
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>
//           <View className="border mx-5 border-neutral-300 flex-row justify-between items-center mb-5 rounded-lg p-2">
//             <AntDesign name="lock1" size={24} color="black" />
//             <TextInput
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Password"
//               className="h-10 text-neutral-900 flex-1 ml-2"
//               secureTextEntry={!showPassword}
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
//             onPress={signInWithEmail}
//             disabled={loading}
//           />
//         </View>
//         <View className="items-center my-2">
//           <View className="my-2">
//             <Text className="font-bold">OR</Text>
//           </View>
//           <Pressable
//             onPress={() => navigation.navigate('DriverSignUpScreen')}
//             className="items-center justify-center">
//             <Text className="text-sm mt-2 text-neutral-700">
//               Want to drive for us ?
//             </Text>
//             <Text className="text-sm underline font-extrabold mt-2 text-neutral-700">
//               Click here to apply
//             </Text>
//           </Pressable>
//         </View>

//         <View className="mt-5 p-5">
//           <Text className="text-neutral-500">New on vugel?</Text>
//         </View>
//         <View className="justify-end flex-row mx-5">
//           <Button
//             onPress={() => navigation.navigate('SignUpScreen')}
//             title="Create account"
//           />
//         </View>
//       </View>
//     </Background>
//   );
// };

// export default SignInScreen;

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
import {setUser} from '../../store/slice/userSlice';
import {RootStackParamList} from '../../types/RootStockParams';
import {registerForPushNotifications} from '../../services/notificationService';
import {signInUser} from '../../services/authService';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle sign in with email and password
  const signInWithEmail = async () => {
    setLoading(true);
    try {
      const {token, userId, error} = await signInUser(email, password);
      if (error) {
        throw new Error(error);
      }
      await registerForPushNotifications(userId, 'user');
      dispatch(setUser({id: userId, token}));
      navigation.navigate('HomeScreen');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View className="flex-1">
        <Header title="Sign In" />
        <View className="p-4">
          <Text
            className={`text-xl ${
              colorScheme === 'dark' ? 'text-white' : 'text-neutral-600'
            }`}>
            Sign In to your account
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
          <View>
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
              placeholderTextColor={
                colorScheme === 'dark' ? 'gray' : 'darkgray'
              }
            />
          </View>
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
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              className={`h-10 ${
                colorScheme === 'dark' ? 'text-white' : 'text-neutral-900'
              } flex-1 ml-2`}
              secureTextEntry={!showPassword}
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
            onPress={signInWithEmail}
            disabled={loading}
          />
        </View>
        <View className="items-center my-2">
          <View className="my-2">
            <Text
              className={`font-bold ${
                colorScheme === 'dark' ? 'text-white' : 'text-neutral-700'
              }`}>
              OR
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('DriverSignUpScreen')}
            className="items-center justify-center">
            <Text
              className={`text-sm mt-2 ${
                colorScheme === 'dark' ? 'text-gray-400' : 'text-neutral-700'
              }`}>
              Want to drive for us ?
            </Text>
            <Text
              className={`text-sm underline font-extrabold mt-2 ${
                colorScheme === 'dark' ? 'text-white' : 'text-neutral-700'
              }`}>
              Click here to apply
            </Text>
          </Pressable>
        </View>

        <View className="mt-5 p-5">
          <Text
            className={`text-neutral-500 ${
              colorScheme === 'dark' ? 'text-gray-400' : 'text-neutral-500'
            }`}>
            New on vugel?
          </Text>
        </View>
        <View className="justify-end flex-row mx-5">
          <Button
            onPress={() => navigation.navigate('SignUpScreen')}
            title="Create account"
          />
        </View>
      </View>
    </Background>
  );
};

export default SignInScreen;
