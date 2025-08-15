import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { FilterSchemaItem } from "@/model/schema";
import React from "react";

import { ScrollView, StyleSheet, View } from "react-native";

export interface SearchEngineProps {
  schema: FilterSchemaItem[];
  onSearch?: (searchTerm: string, filters: Record<string, string>) => void;
}

export const EditItem: React.FC<SearchEngineProps> = ({
  schema = [],
  onSearch,
}) => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Heading style={styles.heading} size="xl">
        Modificar Opciones Modificables
      </Heading>
      {schema.map((item, index) => (
        <View key={index} style={styles.filterContainer}>
          {item.type === "option" && (
            <View style={styles.optionContainer}>
              <Button style={styles.button} size="xl" onPress={() => null}>
                <Text style={styles.buttonText}>{item.name}</Text>
              </Button>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 8,
    display: "flex",
    flexDirection: "column",
  },
  optionContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginRight: 4,
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "80%",
    minHeight: 48,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#fff",
    textAlign: "center",
  },
});
