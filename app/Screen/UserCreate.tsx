import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";

interface Usuario {
  nombre: string;
  apodo: string;
  imagen: string | null;
}

export default function UserCreate() {
  const [nombre, setNombre] = useState("");
  const [apodo, setApodo] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const elegirImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      alert("Se necesita permiso para acceder a tus fotos.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const crearPerfil = () => {
    if (!nombre || !apodo || !imagen) return;
    setUsuarios([...usuarios, { nombre, apodo, imagen }]);
    setNombre("");
    setApodo("");
    setImagen(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Crear Perfil</Text>

      <TouchableOpacity style={styles.botonImagen} onPress={elegirImagen}>
        <Text style={styles.textoBoton}>Seleccionar foto de perfil</Text>
      </TouchableOpacity>

      {imagen && <Image source={{ uri: imagen }} style={styles.imagen} />}

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Apodo"
        value={apodo}
        onChangeText={setApodo}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.botonCrear} onPress={crearPerfil}>
        <Text style={styles.textoBoton}>Crear perfil</Text>
      </TouchableOpacity>

      {usuarios.map((usuario, index) => (
        <Animatable.View
          key={index}
          animation="fadeInUp"
          duration={600}
          style={styles.card}
        >
          {usuario.imagen && (
            <Image source={{ uri: usuario.imagen }} style={styles.cardImagen} />
          )}
          <Text style={styles.cardTexto}>👤 {usuario.nombre}</Text>
          <Text style={styles.cardTextoSec}>🏷️ {usuario.apodo}</Text>
        </Animatable.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#1a1a2e",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#2f2f44",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  botonImagen: {
    backgroundColor: "#9b59b6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  botonCrear: {
    backgroundColor: "#9b59b6",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 30,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#2c2c3e",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
  },
  cardImagen: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  cardTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardTextoSec: {
    color: "#bbb",
    fontSize: 14,
  },
});
