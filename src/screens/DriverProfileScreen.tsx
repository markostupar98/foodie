import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import Button from '../components/Button';
import Header from '../components/Header';
import Background from '../components/Background';
import {
  fetchDriverProfile,
  updateDriverProfile,
} from '../services/driverService';
import {clearUser} from '../store/slice/userSlice';

interface RootState {
  driver: {
    id: number;
  };
}

const DriverProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const driverId = useSelector((state: RootState) => state.driver.id);
  const [driver, setDriver] = useState<any>(null);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [editableField, setEditableField] = useState('');
  const [newData, setNewData] = useState('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const profile = await fetchDriverProfile(driverId);
        setDriver(profile);
        setVehicleType(profile.vehicleType);
      } catch (error) {
        console.error('Error fetching driver profile:', error);
      }
    };
    fetchDriver();
  }, [driverId]);

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
    if (driver) {
      let updatedData: any = {[editableField]: newData};
      if (editableField === 'vehicleType') {
        updatedData = {vehicleType: newData};
      }
      try {
        const profile = await updateDriverProfile(driver.id, updatedData);
        setDriver(profile); // Update driver state with the new profile data
        if (editableField === 'vehicleType') {
          setVehicleType(profile.vehicleType); // Update vehicleType state
        }
        setModalVisible(false);
        Alert.alert('Success', 'Profile updated successfully!');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  if (!driver) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Background>
      <View className="flex-1">
        <Header title="Profile" />
        <View className="justify-center items-center p-5">
          <View className="flex-row items-center mb-3">
            <Text className="mt-2 text-lg mr-10">
              Full Name: {driver.fullName}
            </Text>
            <TouchableOpacity
              onPress={() => handleEdit('fullName', driver.fullName)}>
              <Ionicons name="pencil" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-3">
            <Text className="mt-2 text-lg mr-10">Phone: {driver.phone}</Text>
            <TouchableOpacity onPress={() => handleEdit('phone', driver.phone)}>
              <Ionicons name="pencil" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-3">
            <Text className="mt-2 text-lg mr-10">
              Vehicle Type: {vehicleType}
            </Text>
            <TouchableOpacity
              onPress={() => handleEdit('vehicleType', vehicleType)}>
              <Ionicons name="pencil" size={28} color="#000" />
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
            {editableField === 'vehicleType' ? (
              <Picker
                selectedValue={newData}
                onValueChange={itemValue => setNewData(itemValue)}
                style={{
                  width: '100%',
                  height: 50,
                  color: colorScheme === 'dark' ? 'white' : 'black',
                }}>
                <Picker.Item label="Motorcycle" value="Motorcycle" />
                <Picker.Item label="Bike" value="Bike" />
                <Picker.Item label="Car" value="Car" />
              </Picker>
            ) : (
              <TextInput
                className="h-10 border border-gray-400 mb-5 w-full px-2"
                value={newData}
                onChangeText={setNewData}
                placeholder={`Enter new ${editableField}`}
              />
            )}
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </Background>
  );
};

export default DriverProfileScreen;
