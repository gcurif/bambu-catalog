import { StyleSheet, View } from 'react-native';

import { EditItem } from '@/components/EditItem';
import { getSchema } from '@/data/data';

export default function HomeScreen() {
  const schema = getSchema();
  return (
    <View style={styles.titleContainer}>
      <EditItem
        schema={schema}
        onSearch={(term, filters) => console.log(term, filters)}
        onClear={() => console.log('limpiar')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: "rgba(217, 235, 255, 1)",
    height: "100%",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
