import { View } from 'react-native';

import { EditItem } from '@/components/EditItem';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { getSchema } from '@/data/data';
import { FilterSchemaItem } from '@/model/schema';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [schema, setSchema] = useState<FilterSchemaItem[]>();

  useEffect(() => {
    const fetchSchema = async () => {
      const schemas = await getSchema();
      setSchema(schemas);
    };
    fetchSchema();
  }, []);  return (
    <View style={GlobalStyles.container}>
      <EditItem
        schema={schema}
        onSearch={(term, filters) => console.log(term, filters)}
      />
    </View>
  );
}
