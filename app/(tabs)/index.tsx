import { StyleSheet, View } from 'react-native';

import { SearchEngine } from '@/components/SearchEngine';
import { getSchema } from '@/data/data';

export default function TabTwoScreen() {

  const schema = getSchema();
  return (
    <View style={styles.titleContainer}>
      <SearchEngine
        schema={schema}
        onSearch={(term, filters) => console.log(term, filters)}
        onClear={() => console.log('limpiar')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
