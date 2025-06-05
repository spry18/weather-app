//this will be the Home screen (City Weather)

// app/(tabs)/index.tsx
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { width } = useWindowDimensions();

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=64fd57653af9704cd955b1280fc8983e&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getBackgroundImage = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return require("../../assets/weather/clear.jpg");
      case "clouds":
        return require("../../assets/weather/clouds.jpg");
      case "rain":
        return require("../../assets/weather/rain.jpg");
      case "snow":
        return require("../../assets/weather/snow.jpg");
      case "thunderstorm":
        return require("../../assets/weather/thunderstorm.jpg");
      default:
        return require("../../assets/weather/default.jpg");
    }
  };

  // Dynamic styles based on width
  const dynamicStyles = StyleSheet.create({
    text: {
      fontSize: width > 400 ? 28 : 22,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
    },
    info: {
      fontSize: width > 400 ? 20 : 16,
      marginVertical: 6,
      textAlign: "center",
    },
    button: {
      marginTop: 20,
      backgroundColor: "#007BFF",
      paddingVertical: width > 400 ? 14 : 10,
      paddingHorizontal: width > 400 ? 40 : 30,
      borderRadius: 6,
      alignSelf: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: width > 400 ? 18 : 16,
    },
  });

  return (
    <ImageBackground
      source={weather ? getBackgroundImage(weather.weather[0].main) : null}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <Text style={styles.errorText}>❌ {error}</Text>
        ) : (
          <>
            <Text style={dynamicStyles.text}>🌤️ Weather in Pune</Text>
            <Text style={dynamicStyles.info}>
              Temperature: {weather.main.temp}°C
            </Text>
            <Text style={dynamicStyles.info}>
              Feels like: {weather.main.feels_like}°C
            </Text>
            <Text style={dynamicStyles.info}>
              Humidity: {weather.main.humidity}%
            </Text>
            <Text style={dynamicStyles.info}>
              Wind Speed: {weather.wind.speed} km/h
            </Text>
            <Text style={dynamicStyles.info}>
              Condition: {weather.weather[0].description}
            </Text>

            {/* 🔄 Refresh Button */}
            <TouchableOpacity
              onPress={fetchWeather}
              style={dynamicStyles.button}
            >
              <Text style={dynamicStyles.buttonText}>Refresh</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: { color: "red", fontSize: 16, textAlign: "center" },
});
