# react-native-scale

Since ReactNative UI is flex based, we use Scale api to get similar looking components across all screens with varying resolutions.
Scaling Factor is calculated on further two factors:

- pixelRatio (Ratio of real physical-resolution and logical-resolution )
- sizeRatio (Ratio of screen dimensions of Standard selected device and current device)
  Using these factors it mathematically calculates and returns a scaling factor of styling.
