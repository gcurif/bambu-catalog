import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function EditOptionScreen() {
    const { schemaId } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hola Mundo</Text>
            <Text>schemaId: {schemaId}</Text>
        </View>
    );
}
