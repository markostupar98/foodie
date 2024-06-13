import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Background from '../../components/Background';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [username, setUsername] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Sign up function
  async function signUpWithEmail() {
    setLoading(true);

    try {
      const response = await axios.post(
        'http://192.168.1.224:3000/api/auth/signup',
        {
          email: email,
          password: password,
          fullName: fullName,
          username: username,
          address: address,
          role: 'user',
        },
      );

      setLoading(false);

      if (response.status === 200) {
        Alert.alert(
          'Success',
          'Please check your email for the confirmation link.',
        );
        navigation.navigate('SignInScreen');
      } else {
        throw new Error(response.data.message || 'Something went wrong');
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        'Error',
        error.response ? error.response.data.message : error.message,
      );
      console.log(error.message, error.response);
    }
  }

  return (
    <Background>
      <View className="flex-1">
        <Header title="Sign Up" />
        <View className="p-8 mt-3 items-center">
          <Text className="text-xl text-neutral-600">Create your account</Text>
        </View>
        <View className="items-center justify-center mt-2"></View>
        <View className="mt-8">
          <View>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              className="border border-neutral-300 mb-8 mx-5 rounded-lg h-10 p-2"
            />
          </View>
          <View>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              className="border border-neutral-300 mb-8 mx-5 rounded-lg h-10 p-2"
            />
          </View>
          <View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              className="border border-neutral-300 mb-8 mx-5 rounded-lg h-10 p-2"
            />
          </View>
          <View>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Address"
              className="border border-neutral-300 mb-8 mx-5 rounded-lg h-10 p-2"
            />
          </View>
          <View className="border mx-5 border-neutral-300  flex-row justify-between items-center mb-5  rounded-lg">
            <View>
              <AntDesign name="lock1" size={24} color="black" />
            </View>
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              className="h-10"
            />
            <View>
              <MaterialIcons
                name={`${showPassword ? 'visibility' : 'visibility-off'}`}
                size={24}
                color="black"
                className="mr-5"
                onPress={toggleShowPassword}
              />
            </View>
          </View>
        </View>
        <View className="w-90 mx-7 my-2">
          <Button
            disabled={loading}
            className="mr-5"
            title={'Register'}
            onPress={signUpWithEmail}
          />
        </View>
        <View className="items-center my-3">
          <Text className="text-sm text-neutral-400">
            Already have an account
          </Text>
          <Pressable
            className="my-2"
            onPress={() => navigation.navigate('SignInScreen')}>
            <Text className="font-bold underline">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </Background>
  );
};

export default SignUpScreen;
