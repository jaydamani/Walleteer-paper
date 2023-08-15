import RootNavigator from '@Navigation/RootNavigator';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
