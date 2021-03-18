import { Dimensions, PixelRatio } from 'react-native'
import DeviceInfo from 'react-native-device-info'

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

let ScalingFactor = () => {
  let isLongDevice =
    SceneInfo(deviceWidth, deviceHeight) !==
    SceneInfo(deviceHeight, deviceWidth)

  let scene = isLongDevice
    ? SceneInfo(
        Math.min(deviceWidth, deviceHeight),
        Math.max(deviceWidth, deviceHeight)
      )
    : SceneInfo(deviceWidth, deviceHeight)

  let standardHeight = 568
  let standardWidth = 320 // iPhone 5
  let sizeRatio = deviceHeight / standardHeight

  switch (scene) {
    case 'small':
    case 'medium':
      sizeRatio = Math.max(deviceHeight, deviceWidth) / standardHeight

      break
    case 'large':
      sizeRatio = Math.min(deviceHeight, deviceWidth) / standardHeight

      break
    case 'x-large':
      sizeRatio = (Math.min(deviceHeight, deviceWidth) / standardHeight) * 0.8
      break
    default: {
      sizeRatio = deviceHeight / standardHeight
    }
  }

  // let pixelRatio = PixelRatio.get()

  // let size = 1

  // /*       FACTOR BY HIT-N-TRIAL */
  // let scaleFactorMS =
  //   sizeRatio === 1 ? 1 : size * Math.pow(sizeRatio * 0.65, pixelRatio)
  // scaleFactorMS = Math.round(scaleFactorMS * 100) / 100

  // /*       FACTOR BY LINEAR EQUATION, MORE ACCURATE */
  // let scaleFactorEq = sizeRatio === 1 ? 1 : sizeRatio * pixelRatio * 0.23 + 0.54

  // let x = sizeRatio * pixelRatio

  // /*       FACTOR BY POLYNOMIAL EQUATION, MOST ACCURATE AS PER iOS Devices  http://www.dcode.fr/lagrange-interpolating-polynomial */
  // let scaleFactorEqTwo =
  //   0.1737 * Math.pow(x, 4) +
  //   -2.104 * Math.pow(x, 3) +
  //   9.0128 * Math.pow(x, 2) +
  //   -15.8879 * Math.pow(x, 1) +
  //   10.7771
  // scaleFactorEqTwo = Math.round(scaleFactorEqTwo * 100) / 100
  // // return scaleFactorEqTwo
  return sizeRatio
}

let Scale = (style) => {
  let keys = Object.keys(style)
  let newStyle
  Object.values(style).map((value, key, array) => {
    newStyle =
      typeof value === 'number'
        ? ![
            'borderWidth',
            'borderTopWidth',
            'borderBottomWidth',
            'borderLeftWidth',
            'borderRightWidth',
          ].includes(keys[key])
          ? { ...newStyle, [keys[key]]: value * ScalingFactor() }
          : { ...newStyle, [keys[key]]: Math.floor(value * ScalingFactor()) }
        : { ...newStyle, [keys[key]]: value }
  })

  return newStyle
}

let ScaleDown = (style) => {
  let keys = Object.keys(style)
  let newStyle
  Object.values(style).map((value, key, array) => {
    newStyle =
      typeof value === 'number'
        ? ![
            'borderWidth',
            'borderTopWidth',
            'borderBottomWidth',
            'borderLeftWidth',
            'borderRightWidth',
          ].includes(keys[key])
          ? { ...newStyle, [keys[key]]: value / ScalingFactor() }
          : { ...newStyle, [keys[key]]: Math.floor(value / ScalingFactor()) }
        : { ...newStyle, [keys[key]]: value }
  })

  return newStyle
}

let ScaleArray = (arr) => {
  arr.map((value, key, array) => {
    arr[key] = typeof value === 'number' ? value * ScalingFactor() : value
  })

  return arr
}

let SceneInfo = () => {
  let isTablet = DeviceInfo.isTablet()

  if (!isTablet) {
    return 'small'
  } else {
    return 'large'
  }
}

export { Scale, ScalingFactor, ScaleArray, ScaleDown, SceneInfo }
