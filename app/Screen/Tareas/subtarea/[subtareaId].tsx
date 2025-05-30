import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { tareas } from "../../../../constants/tareas";

export default function DetalleSubtarea() {
  const { subtareaId } = useLocalSearchParams();

  let subtarea;
  for (const t of tareas) {
    subtarea = t.subtareas.find((s) => s.id === subtareaId);
    if (subtarea) break;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Detalle de Subtarea</Text>
      <MaterialCommunityIcons
        name="file-document-outline"
        size={64}
        color="#555"
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.label}>
        <Text style={styles.bold}>Título: </Text>
        {subtarea?.titulo}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Descripción: </Text>
        {subtarea?.descripcion}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Estado: </Text>
        {subtarea?.estado}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#1e1e2e",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  label: { fontSize: 18, marginBottom: 12 },
  bold: { fontWeight: "bold" },
});
