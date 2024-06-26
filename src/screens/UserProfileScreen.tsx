// import React, {useState, useEffect} from 'react';
// import {View, Text, Alert, ActivityIndicator, StyleSheet} from 'react-native';
// import {WebView} from 'react-native-webview';
// import {useNavigation} from '@react-navigation/native';
// import {useSelector, useDispatch} from 'react-redux';
// import Button from '../components/Button';
// import Header from '../components/Header';
// import Background from '../components/Background';
// import {fetchUserProfile, updateUserProfile} from '../services/userService';
// import {clearUser} from '../store/slice/userSlice';

// interface RootState {
//   user: {
//     id: number;
//   };
// }

// const UserProfileScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const userId = useSelector((state: RootState) => state.user.id);
//   const [user, setUser] = useState<any>(null);
//   const dispatch = useDispatch();
//   const [location, setLocation] = useState<any>({
//     latitude: 44.7722,
//     longitude: 17.191,
//   });
//   const [address, setAddress] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const {profile, error} = await fetchUserProfile(userId);
//       if (error) {
//         console.error(error);
//       } else {
//         setUser(profile);
//         if (profile.latitude && profile.longitude) {
//           setLocation({
//             latitude: profile.latitude,
//             longitude: profile.longitude,
//           });
//         }
//         setAddress(profile.address);
//       }
//     };
//     fetchUser();
//   }, [userId]);

//   const signOut = () => {
//     dispatch(clearUser());
//     navigation.navigate('SignInScreen');
//   };

//   if (!user) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator />
//       </View>
//     );
//   }

//   const saveLocation = async () => {
//     if (user) {
//       const {profile, error} = await updateUserProfile(user.id, {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         address: address,
//       });
//       if (error) {
//         Alert.alert('Error', error.message);
//       } else {
//         Alert.alert('Success', 'Location updated successfully!');
//         setUser(profile);
//       }
//     }
//   };

//   return (
//     <Background>
//       <View style={styles.container}>
//         <Header title="Profile" />
//         <View style={styles.content}>
//           <Text style={styles.text}>Full Name: {user.fullName}</Text>

//           {address && <Text style={styles.boldText}>City: {address}</Text>}

//           <View style={styles.buttonContainer}>
//             <Button title="Save Location" onPress={saveLocation} />
//           </View>

//           <Button title={'Sign Out'} onPress={signOut} />
//         </View>
//       </View>
//     </Background>
//   );
// };

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//   },
//   content: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     marginTop: 10,
//     fontSize: 16,
//   },
//   mapContainer: {
//     width: '100%',
//     height: 300,
//     marginTop: 10,
//   },
//   webView: {
//     flex: 1,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     marginVertical: 10,
//   },
// });

// export default UserProfileScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import Header from '../components/Header';
import Background from '../components/Background';
import {fetchUserProfile, updateUserProfile} from '../services/userService';
import {clearUser} from '../store/slice/userSlice';

interface RootState {
  user: {
    id: number;
  };
}

const UserProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.user.id);
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch();
  const [location, setLocation] = useState<any>({
    latitude: 44.7722,
    longitude: 17.191,
  });
  const [address, setAddress] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editableField, setEditableField] = useState('');
  const [newData, setNewData] = useState('');

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

  const signOut = () => {
    dispatch(clearUser());
    navigation.navigate('SignInScreen');
  };

  const handleEdit = (field: string, currentValue: string) => {
    setEditableField(field);
    setNewData(currentValue);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (user) {
      const updatedData = {[editableField]: newData};
      const {profile, error} = await updateUserProfile(user.id, updatedData);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Profile updated successfully!');
        setUser(profile);
        setModalVisible(false);
      }
    }
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

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
          <View className="flex-row items-center mb-3">
            <Text className="mt-2 text-lg mr-10">
              Full Name: {user.fullName}
            </Text>
            <TouchableOpacity
              onPress={() => handleEdit('fullName', user.fullName)}>
              <Ionicons name="pencil" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-3">
            <Text className="mt-2 text-lg mr-10">
              Username: {user.username}
            </Text>
            <TouchableOpacity
              onPress={() => handleEdit('username', user.username)}>
              <Ionicons name="pencil" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-3">
            <Text className="mt-2 text-lg mr-10">Address: {address}</Text>
            <TouchableOpacity
              onPress={() => handleEdit('address', address || '')}>
              <Ionicons name="pencil" size={28} color="#000" className="ml-5" />
            </TouchableOpacity>
          </View>
          <View className="mt-10">
            <Button title={'Sign Out'} onPress={signOut} />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View className="m-5 bg-white rounded-2xl p-9 items-center shadow-2xl">
            <TextInput
              className="h-10 border border-gray-400 mb-5 w-full px-2"
              value={newData}
              onChangeText={setNewData}
              placeholder={`Enter new ${editableField}`}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </Background>
  );
};

export default UserProfileScreen;
