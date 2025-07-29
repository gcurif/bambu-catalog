import { ScrollView, StyleSheet } from 'react-native';

import ItemDetail from '@/components/ItemDetail';
import { SearchEngine } from '@/components/SearchEngine';
import { getSchema } from '@/data/data';

export default function TabTwoScreen() {

  const schema = getSchema();
  return (
    <ScrollView style={styles.titleContainer}>
      <SearchEngine
        schema={schema}
        onSearch={(term, filters) => console.log(term, filters)}
        onClear={() => console.log('limpiar')}
      />
      <ItemDetail />
    </ScrollView>
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
    flexDirection: 'column',
    gap: 8,
  },
});
