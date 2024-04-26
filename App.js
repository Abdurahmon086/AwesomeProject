import { StyleSheet } from 'react-native';
import Loader from './components/Loader';
import Weather from './components/Weather';
import { useEffect, useState } from 'react';

export default function App() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
  }, []);

  return visible ? <Weather /> : <Loader />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hello: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
});
