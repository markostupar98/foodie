import {View, Text, Image, Alert, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import Header from '../components/Header';
import deliveryGuy from '../../assets/deliveryguy.jpeg';
// import Header from '../../components/Header';
import MapView, {Marker} from 'react-native-maps';
// import Background from '../../components/Background';
import Background from '../components/Background';
// import {fetchUserProfile, updateUserProfile} from '../../services/userService';
import {fetchUserProfile, updateUserProfile} from '../services/userService';
import {useSelector, useDispatch} from 'react-redux';
// import {clearUser} from '../../store/slice/userSlice';
import {clearUser} from '../store/slice/userSlice';

interface RootState {
  user: {
    id: number;
  };
}

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.user.id);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  // Get user
  useEffect(() => {
    const fetchUser = async () => {
      const {profile, error} = await fetchUserProfile(userId);
      if (error) {
        console.error(error);
      } else {
        setUser(profile);
        if (profile.latitude && profile.longitude) {
          setLocation({
            latitude: profile.latitude,
            longitude: profile.longitude,
          });
        }
        setAddress(profile.address);
      }
    };
    fetchUser();
  }, [userId]);

  // Sign out
  const signOut = () => {
    dispatch(clearUser());
    navigation.navigate('SignInScreen');
  };

  if (!user) {
    return (
      <View className="items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  // Location changing based on map press
  const handleMapPress = async (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setLocation({latitude, longitude});

    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (reverseGeocode.length > 0) {
      setAddress(reverseGeocode[0].address);
    }
  };

  const saveLocation = async () => {
    if (user) {
      const {profile, error} = await updateUserProfile(user.id, {
        latitude: location.latitude,
        longitude: location.longitude,
        address: address,
      });
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Location updated successfully!');
        setUser(profile);
      }
    }
  };

  return (
    <Background>
      <View className="flex-1">
        <Header title="Profile" />
        <View className="justify-center items-center p-5">
          {/* <Image
            source={require('../../../assets/deliveryguy.jpeg')}
            className="w-17 h-17 rounded-full"
          /> */}
          <Text className="mt-2 text-base">Full Name: {user.fullName}</Text>
          {/* <Text className="mt-2 text-neutral-500">Email: {user.email}</Text> */}
          <View className="w-60 h-60 mt-3 ">
            <MapView
              className="flex-1 rounded-2xl"
              mapType="standard"
              onPress={handleMapPress}
              initialRegion={{
                latitude: 44.7722,
                longitude: 17.191,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {location && <Marker coordinate={location} />}
            </MapView>
          </View>

          {address && <Text className="text-extrabold">City: {address}</Text>}

          <Button title="Save Location" onPress={saveLocation} />

          <Button title={'Sign Out'} onPress={signOut} />
        </View>
      </View>
    </Background>
  );
};

export default UserProfileScreen;
