import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Calculadora() {
  const [num1, setnum1] = useState("");
  const [num2, setnum2] = useState("");
  const [resultado, setresultado] = useState<number | null>(null);

  const suma = () => {
    const x = parseFloat(num1) + parseFloat(num2);
    setresultado(x);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧮 Calculadora</Text>

      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Número 1"
        placeholderTextColor="#ccc"
        value={num1}
        onChangeText={setnum1}
      />
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Número 2"
        placeholderTextColor="#ccc"
        value={num2}
        onChangeText={setnum2}
      />

      <TouchableOpacity style={styles.button} onPress={suma}>
        <Text style={styles.buttonText}>Sumar ➕</Text>
      </TouchableOpacity>

      {resultado !== null && (
        <Text style={styles.resultado}>Resultado: {resultado}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: "#ffffff",
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#2b2b3c",
    color: "#ffffff",
    width: "100%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  button: {
    backgroundColor: "#8e44ad",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#8e44ad",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultado: {
    color: "#fff",
    fontSize: 22,
    marginTop: 30,
    textAlign: "center",
    backgroundColor: "#2f2f44",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
});
