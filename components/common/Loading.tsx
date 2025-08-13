import { ActivityIndicator, Text, View } from "react-native";

interface LoadingProps {
  show: boolean;
  label?: string | null;
  size?: number;
}

const Loading = ({ show, label, size }: LoadingProps) => {
  return show ? (
    <View style={{ alignItems: "center", marginVertical: 16 }}>
      <Text style={{ fontSize: 24, color: "#333" }}>{label || "Cargando ..."}</Text>
      <ActivityIndicator size={size || 70 } className="mt-4" />
    </View>
  ) : null;
};

export default Loading;
