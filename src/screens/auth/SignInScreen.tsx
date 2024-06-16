import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import Button from '../../components/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setUser} from '../../store/slice/userSlice';
import Background from '../../components/Background';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/RootStockParams';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  // Password hide func
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // // Sign in func
  const signInWithEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/api/auth/signin',
        {
          email,
          password,
        },
      );
      const {token, userId} = response.data; // Pretpostavimo da backend šalje ovo

      setLoading(false);

      if (response.data) {
        dispatch(setUser({id: userId, token: token}));
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Background>
      <View className="flex-1">
        <Header title="Sign In" />
        <View className="p-4">
          <Text className="text-xl text-neutral-600">
            Sign In to your account
          </Text>
        </View>
        <View className="items-center justify-center mt-4">
          <Text className="text-sm text-neutral-400">
            Please enter your email and password
          </Text>
        </View>
        <View className="mt-8">
          <View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              className="border text-neutral-900 border-neutral-300 mb-8 mx-5 rounded-lg h-10 p-2"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="border mx-5 border-neutral-300 flex-row justify-between items-center mb-5 rounded-lg p-2">
            <AntDesign name="lock1" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              className="h-10 text-neutral-900 flex-1 ml-2"
              secureTextEntry={!showPassword}
            />
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color="black"
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
            <Text className="font-bold">OR</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('DriverSignUpScreen')}
            className="items-center justify-center">
            <Text className="text-sm mt-2 text-neutral-700">
              Want to drive for us ?
            </Text>
            <Text className="text-sm underline font-extrabold mt-2 text-neutral-700">
              Click here to apply
            </Text>
          </Pressable>
        </View>
        {/* <Pressable
          onPress={() => {}}
          className="p-4 border justify-center my-5 flex-row border-neutral-500 mx-5 rounded-full">
          <AntDesign
            name="facebook-square"
            size={24}
            color="black"
            className="mr-5"
          />
          <Text>Sign In with Facebook</Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          className="p-4 border justify-center flex-row border-neutral-500 mx-5 rounded-full">
          <AntDesign name="google" size={24} color="black" className="mr-5" />
          <Text>Sign In with Google</Text>
        </Pressable> */}
        <View className="mt-5 p-5">
          <Text className="text-neutral-500">New on vugel?</Text>
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
