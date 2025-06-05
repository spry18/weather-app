# 🌤️ Weather App

A responsive React Native app that shows current weather and allows searching for city forecasts with dynamic background images.

## 🚀 Technologies Used
- React Native (Expo)
- TypeScript
- Expo Router
- OpenWeatherMap API

## 🎨 Design Rationale

The app uses a clean and minimalist UI with weather-based background images to enhance the visual experience. Responsive design elements were added using `useWindowDimensions` for consistent performance across devices.

## 🧑‍💻 How to Run the App Locally

1. Clone the Repository
   ```bash
   git clone https://github.com/spry18/weather-app.git
   cd weather-app

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

4. Open in Expo Go App

Scan the QR code using the Expo Go app (available on Android/iOS).

Alternatively, use:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


## Usability Heuristics Focused

1. Visibility of System Status
   - Shows loading indicators during data fetch.
   - Displays error messages when city is not found or input is missing.

2. Match Between System & Real World
   - Weather info presented using familiar terms (°C, km/h).
   - Background images visually represent real-world weather conditions.

3. User Control and Freedom
   - Clear input field with retry and refresh options.

4. Aesthetic and Minimalist Design
   - Simple layout, readable text, minimal visual clutter.
