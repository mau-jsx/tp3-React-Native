import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductList() {
  const [productos, setProductos] = useState([
    {
      id: "1",
      nombre: "Auriculares Bluetooth",
      precio: "$25",
      imagen: "https://cdn-icons-png.flaticon.com/512/1032/1032550.png",
    },
  ]);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted === false) {
      alert("Se necesita permiso para acceder a la galería");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const agregarProducto = () => {
    if (!nombre || !precio || !imagen) return;

    const nuevoProducto = {
      id: Date.now().toString(),
      nombre,
      precio: `$${precio}`,
      imagen,
    };

    setProductos([nuevoProducto, ...productos]);
    setNombre("");
    setPrecio("");
    setImagen(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛒 Productos</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          placeholderTextColor="#aaa"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          placeholderTextColor="#aaa"
          value={precio}
          keyboardType="numeric"
          onChangeText={setPrecio}
        />

        <TouchableOpacity
          style={styles.imageButton}
          onPress={seleccionarImagen}
        >
          <Text style={styles.botonTexto}>
            {imagen ? "Cambiar imagen" : "Seleccionar imagen"}
          </Text>
        </TouchableOpacity>

        {imagen && <Image source={{ uri: imagen }} style={styles.preview} />}

        <TouchableOpacity style={styles.boton} onPress={agregarProducto}>
          <Text style={styles.botonTexto}>Agregar producto</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagen }} style={styles.imagen} />
            <View style={styles.info}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>{item.precio}</Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2e",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    marginBottom: 20,
    backgroundColor: "#2a2a3c",
    padding: 16,
    borderRadius: 12,
  },
  input: {
    backgroundColor: "#3a3a4c",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#a855f7",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  imageButton: {
    backgroundColor: "#4f46e5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#2a2a3c",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  imagen: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: "#444",
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 6,
    fontWeight: "600",
  },
  precio: {
    fontSize: 18,
    color: "#c084fc",
    fontWeight: "bold",
  },
});
