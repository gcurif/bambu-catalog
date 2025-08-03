import { CreateItem } from '@/components/CreateItem';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { getSchema } from '@/data/data';
import { View } from 'react-native';

export default function HomeScreen() {
  const schema = getSchema();

  return (
    <View style={GlobalStyles.container}>
      <CreateItem
        schema={schema}
        onSearch={(term, filters) => console.log(term, filters)}
        onClear={() => console.log('limpiar')}
      />
    </View>
  );
}

