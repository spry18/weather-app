//this will be the Forecast screen (Search or Forecast Details)

// app/(tabs)/forecast.tsx
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function ForecastScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { width } = useWindowDimensions();

  // 👇 Clear inputs and weather when user focuses this screen
  useFocusEffect(
    useCallback(() => {
      setCity("");
      setWeather(null);
      setError("");
    }, [])
  );

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("⚠️ Please enter a city.");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64fd57653af9704cd955b1280fc8983e&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error();
      setWeather(data);
      setError("");
    } catch (err: any) {
      setError("❌ City not found. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

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

  const dynamicStyles = StyleSheet.create({
    heading: {
      fontSize: width > 400 ? 28 : 22,
      fontWeight: "bold",
      marginBottom: width > 400 ? 22 : 20,
      textAlign: "center",
      color: "#fff",
    },
    input: {
      marginTop: 5,
      paddingVertical: width > 400 ? 14 : 10,
      paddingHorizontal: width > 400 ? 35 : 30,
      borderRadius: 6,
      alignSelf: "center",
      borderWidth: 1,
      borderColor: "#fff",
      color: "#444",
      fontSize: width > 500 ? 24 : 22,
    },
    button: {
      marginTop: 15,
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
    resultContainer: {
      marginTop: 20,
      alignItems: "center",
      minHeight: width > 400 ? 120 : 100,
    },
    city: {
      fontSize: width > 400 ? 32 : 28,
      fontWeight: "bold",
      marginBottom: width > 400 ? 14 : 10,
      textAlign: "center",
    },
    temp: {
      fontSize: width > 400 ? 28 : 24,
      textAlign: "center",
    },
    info: {
      fontSize: width > 400 ? 18 : 16,
      marginVertical: width > 400 ? 4 : 2,
      textAlign: "center",
    },
    error: {
      color: "red",
      textAlign: "center",
      fontSize: width > 400 ? 18 : 16,
    },
    errorBox: {
      alignItems: "center",
      marginTop: width > 400 ? 15 : 10,
    },
    retryButton: {
      marginTop: width > 400 ? 14 : 10,
      backgroundColor: "#FF6B6B",
      paddingHorizontal: width > 400 ? 26 : 20,
      paddingVertical: width > 400 ? 14 : 10,
      borderRadius: 6,
    },
    retryText: {
      color: "white",
      fontWeight: "bold",
      fontSize: width > 400 ? 18 : 16,
    },
  });

  return (
    <ImageBackground
      source={
        weather
          ? getBackgroundImage(weather.weather[0].main)
          : require("../../assets/weather/background.jpg")
      }
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.overlay}>
          <Text style={dynamicStyles.heading}>Enter Your City</Text>

          <TextInput
            placeholder="Enter City"
            style={dynamicStyles.input}
            value={city}
            onChangeText={setCity}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />

          <TouchableOpacity onPress={handleSearch} style={dynamicStyles.button}>
            <Text style={dynamicStyles.buttonText}>Search</Text>
          </TouchableOpacity>

          <View style={dynamicStyles.resultContainer}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : error ? (
              <View style={dynamicStyles.errorBox}>
                <Text style={dynamicStyles.error}> {error}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setCity("");
                    setWeather(null);
                    setError("");
                  }}
                  style={dynamicStyles.retryButton}
                >
                  <Text style={dynamicStyles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : weather ? (
              <>
                <Text style={dynamicStyles.city}>{weather.name}</Text>
                <Text style={dynamicStyles.temp}>{weather.main.temp}°C</Text>
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
              </>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
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
});
