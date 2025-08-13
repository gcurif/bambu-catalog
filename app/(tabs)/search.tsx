import { ScrollView, StyleSheet, Text, View } from "react-native";

import ItemDetail from "@/components/ItemDetail";
import { SearchEngine } from "@/components/SearchEngine";
import { Spinner } from "@/components/ui/spinner";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { getItems, getSchema } from "@/data/data";
import { useEffect, useState } from "react";
import colors from "tailwindcss/colors";

export default function TabTwoScreen() {

  const [schema, setSchema] = useState<{ id: string }[]>();

  useEffect(() => {
    const fetchSchema = async () => {
      const schemas = await getSchema();
      setSchema(schemas);
    };
    fetchSchema();
  }, []);
  
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<
    {
      name: string;
      code: string;
      img: string;
      properties: { name: string; value: string; order: number }[];
    }[]
  >([]);

  const handleSearch = (
    filters: Record<string, string>
  ) => {
    setLoading(true);
    console.log("Filters:", filters);
    // Simulate a search operation
    setTimeout(() => {
      setLoading(false);
      setItems(getItems());
      console.log("Search completed");
    }, 1500); // Simulate a 1.5-second search delay
  };

  return (
    <ScrollView style={GlobalStyles.containerScrollable}>
      <SearchEngine
        schema={schema}
        onSearch={handleSearch}
        onClear={() => console.log("limpiar")}
      />
      <View style={styles.resultsContainer}>
        {loading ? (
          <View style={{ alignItems: "center", marginVertical: 16 }}>
            <Text>Buscando ...</Text>
            <Spinner className="mt-4" size="large" color={colors.gray[500]} />
          </View>
        ) : items ? (
          items.map((item, index) => <ItemDetail key={index} item={item} />)
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    marginTop: 8,
  },
});
