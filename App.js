import { Alert } from 'react-native';
import Loader from './components/Loader';
import Weather from './components/Weather';
import { useEffect, useState } from 'react';
import axios from 'axios';

import * as Location from 'expo-location';

export default function App() {
  const API_KEY = 'a44a3695dd97514eedaa3d29f4d628b7'

  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const getWeather = async (latitude, longitude) => {
    try {
      console.log(latitude, longitude);
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setLocation(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error)
    }
  };

  const setWeather = async query => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      setLocation(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('this ctiy is not found: '+ query  )
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=41.3534336&lon=69.2874126&appid=${API_KEY}&units=metric`
      );
      setLocation(data);
      setIsLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("I can't find your current location, so bad ):");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Weather
      setWeather={setWeather}
      temp={Math.round(location.main.temp)}
      name={location.name}
      condition={location.weather[0].main}
    />
  );
}
