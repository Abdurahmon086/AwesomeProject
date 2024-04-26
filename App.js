import { Alert } from 'react-native';
import Loader from './components/Loader';
import Weather from './components/Weather';
import { useEffect, useState } from 'react';
import axios from 'axios';

import * as Location from 'expo-location';

export default function App() {
  const API_KEY = 'a44a3695dd97514eedaa3d29f4d628b7'

  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState(null)

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    setLocation(data)
    setVisible(!visible);
  }

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
      getWeather(latitude, longitude)

    } catch (err) {
      Alert.alert('I can\'t find your location, so bad', err)
    }
  }

  useEffect(() => {
    getLocation()
  }, []);

  return visible ? <Weather /> : <Loader />
}
