import { CreateItem } from '@/components/CreateItem';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { getSchema } from '@/data/data';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  const [schema, setSchema] = useState<{ id: string }[]>();

  useEffect(() => {
    const fetchSchema = async () => {
      const schemas = await getSchema();
      setSchema(schemas);
    };
    fetchSchema();
  }, []);

  return (
    <View style={GlobalStyles.container}>
      {
        schema && schema.length > 0 ? (
          <CreateItem
            schema={schema}
            onSearch={(term, filters) => console.log(term, filters)}
            onClear={() => console.log('limpiar')}
          />
        ) : (
          null
        )
      }
    </View>
  );
}

