import { View } from 'react-native';

import { EditItem } from '@/components/EditItem';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { getSchema } from '@/data/data';

export default function HomeScreen() {
  const schema = getSchema();
  return (
    <View style={GlobalStyles.container}>
      <EditItem
        schema={schema}
        onSearch={(term, filters) => console.log(term, filters)}
      />
    </View>
  );
}
