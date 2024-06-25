// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import {useNavigation, NavigationProp} from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {Picker} from '@react-native-picker/picker';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Header from '../../components/Header';
// import Button from '../../components/Button';
// import Background from '../../components/Background';
// import {signupDriver} from '../../services/authService';
// import {RootStackParamList} from '../../types/RootStockParams';

// const DriverSignUpScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [vehicleType, setVehicleType] = useState('Motorcycle');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Toggle password visibility
//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   // Handle sign up with email and password
//   const signUpWithEmail = async () => {
//     setLoading(true);
//     try {
//       const {driverId, error} = await signupDriver({
//         fullName,
//         email,
//         password,
//         phone,
//         vehicleType,
//       });

//       if (error) throw new Error(error);

//       Alert.alert('Success', 'You successfully signed up!');
//       navigation.navigate('DriverSignInScreen');
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Background>
//       <View className="flex-1">
//         <Header title="Want to drive for us?" />
//         <View className="p-8 mt-3 items-center">
//           <Text className="text-2xl justify-center items-center text-neutral-500">
//             Register as a driver and start earning
//           </Text>
//         </View>
//         <View className="mt-8">
//           <TextInput
//             value={fullName}
//             onChangeText={setFullName}
//             placeholder="Full Name"
//             className="border border-neutral-300 mb-8 mx-5 rounded-lg h-10 p-2"
//           />
//           <TextInput
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="numeric"
//             placeholder="+38795123567"
//             className="border border-neutral-300 mb-8 mx-5 rounded-lg h-10 p-2"
//           />
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             placeholder="Email"
//             className="border border-neutral-300 mb-2 mx-5 rounded-lg h-10 p-2"
//           />
//           <Picker
//             selectedValue={vehicleType}
//             onValueChange={itemValue => setVehicleType(itemValue)}
//             style={{width: '100%', height: 50}}>
//             <Picker.Item label="Motorcycle" value="Motorcycle" />
//             <Picker.Item label="Bike" value="Bike" />
//             <Picker.Item label="Car" value="Car" />
//           </Picker>
//           <View className="border mx-5 border-neutral-300 flex-row justify-between items-center mb-5 rounded-lg">
//             <AntDesign name="lock1" size={24} color="black" />
//             <TextInput
//               secureTextEntry={!showPassword}
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Password"
//               className="flex-1 h-10 mx-3"
//             />
//             <TouchableOpacity onPress={toggleShowPassword}>
//               <MaterialIcons
//                 name={showPassword ? 'visibility' : 'visibility-off'}
//                 size={24}
//                 color="black"
//               />
//             </TouchableOpacity>
//           </View>
//           <Button
//             disabled={loading}
//             title="Register"
//             onPress={signUpWithEmail}
//           />
//         </View>
//         <View className="items-center my-3">
//           <Text className="text-sm text-neutral-400">
//             Already drive for us?
//           </Text>
//           <Pressable onPress={() => navigation.navigate('DriverSignInScreen')}>
//             <Text className="font-bold underline">Sign In</Text>
//           </Pressable>
//         </View>
//       </View>
//     </Background>
//   );
// };

// export default DriverSignUpScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Background from '../../components/Background';
import {signupDriver} from '../../services/authService';
import {RootStackParamList} from '../../types/RootStockParams';

const DriverSignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleType, setVehicleType] = useState('Motorcycle');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle sign up with email and password
  const signUpWithEmail = async () => {
    setLoading(true);
    try {
      const {driverId, error} = await signupDriver({
        fullName,
        email,
        password,
        phone,
        vehicleType,
      });

      if (error) throw new Error(error);

      Alert.alert('Success', 'You successfully signed up!');
      navigation.navigate('DriverSignInScreen');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View className="flex-1">
        <Header title="Want to drive for us?" />
        <View className="p-8 mt-3 items-center">
          <Text
            className={`text-2xl justify-center items-center ${
              colorScheme === 'dark' ? 'text-white' : 'text-neutral-500'
            }`}>
            Register as a driver and start earning
          </Text>
        </View>
        <View className="mt-8">
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            className={`border ${
              colorScheme === 'dark'
                ? 'text-white border-neutral-600'
                : 'text-neutral-900 border-neutral-300'
            } mb-8 mx-5 rounded-lg h-10 p-2`}
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'darkgray'}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            placeholder="+38795123567"
            className={`border ${
              colorScheme === 'dark'
                ? 'text-white border-neutral-600'
                : 'text-neutral-900 border-neutral-300'
            } mb-8 mx-5 rounded-lg h-10 p-2`}
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'darkgray'}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            className={`border ${
              colorScheme === 'dark'
                ? 'text-white border-neutral-600'
                : 'text-neutral-900 border-neutral-300'
            } mb-2 mx-5 rounded-lg h-10 p-2`}
            placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'darkgray'}
          />
          <Picker
            selectedValue={vehicleType}
            onValueChange={itemValue => setVehicleType(itemValue)}
            style={{
              width: '100%',
              height: 50,
              color: colorScheme === 'dark' ? 'white' : 'black',
            }}>
            <Picker.Item label="Motorcycle" value="Motorcycle" />
            <Picker.Item label="Bike" value="Bike" />
            <Picker.Item label="Car" value="Car" />
          </Picker>
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
              className={`flex-1 h-10 mx-3 ${
                colorScheme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}
              placeholderTextColor={
                colorScheme === 'dark' ? 'gray' : 'darkgray'
              }
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={24}
                color={colorScheme === 'dark' ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>
          <Button
            disabled={loading}
            title="Register"
            onPress={signUpWithEmail}
          />
        </View>
        <View className="items-center my-3">
          <Text
            className={`text-sm ${
              colorScheme === 'dark' ? 'text-gray-400' : 'text-neutral-400'
            }`}>
            Already drive for us?
          </Text>
          <Pressable onPress={() => navigation.navigate('DriverSignInScreen')}>
            <Text
              className={`font-bold underline ${
                colorScheme === 'dark' ? 'text-white' : 'text-black'
              }`}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </Background>
  );
};

export default DriverSignUpScreen;
