import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tareas } from "../../../constants/tareas";

export default function Tareas() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Lista de Tareas</Text>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/Screen/Tareas/[tareaId]" as const,
                params: { tareaId: item.id },
              })
            }
          >
            <MaterialIcons name="assignment" size={24} color="#4a4a4a" />
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

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    color: "#222",
  },
});
