import { ScrollView, StyleSheet, Text, View } from "react-native";

import ItemDetail from "@/components/ItemDetail";
import { SearchEngine } from "@/components/SearchEngine";
import { Spinner } from "@/components/ui/spinner";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { findAllItems, getSchema } from "@/data/data";
import { FilterSchemaItem } from "@/model/schema";
import { useEffect, useState } from "react";
import colors from "tailwindcss/colors";

export default function TabTwoScreen() {
  const [schema, setSchema] = useState<FilterSchemaItem[]>();

  useEffect(() => {
    const fetchSchema = async () => {
      const schemas = await getSchema();
      console.log("Schemas:", schemas);
      setSchema(schemas);
    };
    fetchSchema();
  }, []);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const handleSearch = async (filters: Record<string, string | number >) => {
    setLoading(true);
    console.log("Filters:", filters);
    // Simulate a search operation
    const items = await findAllItems();
    const keys = Object.keys(filters);

    // Solución temporal
    if (keys.length > 0) {
      console.log("Keys:", keys);
      // Filter items based on the filters
      const filteredItems = items.filter((item) => {
        for (const k of keys) {
          const filterValue = filters?.[k];
          const itemValue = item.properties[k];

          if (!filterValue) continue; // Skip if no filter value
          if (typeof filterValue === "string") {
            if (
              itemValue &&
              itemValue.toLowerCase().includes(filterValue.toString().toLowerCase())
            ) {
              console.log("Match str found for key:", k, "value:", itemValue, "filter:", filterValue);
              return true;
            }
          }
          if (typeof itemValue === "number" && itemValue === filterValue) {
            console.log("Match num found for key:", k, "value:", itemValue, "filter:", filterValue);
            return true;
          }
        }
        return false;
      });
      console.log("Filtered items:", filteredItems);
      setItems(filteredItems);
    } else {
      setItems(items);
    }

    console.log("Items found:", items);
    setLoading(false);
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
          items.map((item, index) => <ItemDetail key={index} schema={schema} item={item} />)
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
