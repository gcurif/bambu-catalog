import { ScrollView, StyleSheet, Text, View } from "react-native";

import ItemDetail from "@/components/ItemDetail";
import { SearchEngine } from "@/components/SearchEngine";
import { Spinner } from "@/components/ui/spinner";
import { getItems, getSchema } from "@/data/data";
import { useState } from "react";
import colors from "tailwindcss/colors";

export default function TabTwoScreen() {
  const schema = getSchema();
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
    <ScrollView style={styles.titleContainer}>
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
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "rgba(217, 235, 255, 1)",
  },
  resultsContainer: {
    marginTop: 8,
  },
});
