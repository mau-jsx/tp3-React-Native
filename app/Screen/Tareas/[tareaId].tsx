import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tareas } from "../../../constants/tareas";

export default function Subtareas() {
  const { tareaId } = useLocalSearchParams();
  const router = useRouter();

  const tarea = tareas.find((t) => t.id === tareaId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 Subtareas de: {tarea?.titulo}</Text>
      <FlatList
        data={tarea?.subtareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/Screen/Tareas/subtarea/[subtareaId]" as const,
                params: { subtareaId: item.id },
              })
            }
          >
            <FontAwesome name="check-circle-o" size={22} color="#4a4a4a" />
            <Text style={styles.text}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1e1e2e",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    gap: 10,
  },
  text: { fontSize: 18, color: "#222" },
});
