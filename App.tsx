import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './src/navigation';

function App() {

  return (
    <>
      <StatusBar backgroundColor="#F0F0F0" barStyle="dark-content" />
      <Navigation />
    </>
  );
}

export default App;
