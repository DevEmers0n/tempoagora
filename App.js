import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'eb04702b9f3e447bba6234527230706'; // Insira aqui sua chave de API do provedor de clima

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Pesquisar" onPress={fetchWeatherData} />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            Local: {weatherData.location.name}
          </Text>
          <Text style={styles.weatherText}>
            Temperatura: {weatherData.current.temp_c}°C
          </Text>
          <Text style={styles.weatherText}>
            Condição: {weatherData.current.condition.text}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  weatherContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
});

export default WeatherApp;
