# @blitzcode/expo-store-version-checker

A lightweight Expo hook for checking the latest version of your app from the Apple App Store and Google Play Store and displaying a customizable force-update modal.

## Features

- ✅ App Store version checking (iOS)
- ✅ Play Store version checking (Android)
- ✅ Built-in force update modal
- ✅ Fully customizable styles
- ✅ Custom update modal support
- ✅ TypeScript support
- ✅ Current and latest version exposed
- ✅ Open store directly from the hook
- ✅ Works with Expo Managed Workflow

---

## Installation

```bash
npm install @blitzcode/expo-store-version-checker
```

### Peer Dependencies

Make sure your project has the following dependencies installed:

```bash
npm install expo-constants react react-native
```

---

## Basic Usage

```tsx
import { useForceStoreUpdate } from "@blitzcode/expo-store-version-checker";

export default function App() {
  const { ExpoStoreVersionChecker } = useForceStoreUpdate({
    iosAppId: "YOUR_APP_STORE_ID",
  });

  return (
    <>
      <ExpoStoreVersionChecker />
      {/* Your App */}
    </>
  );
}
```

---

## Customizing the Built-in Modal

```tsx
import { useForceStoreUpdate } from "@blitzcode/expo-store-version-checker";

export default function App() {
  const { ExpoStoreVersionChecker } = useForceStoreUpdate({
    iosAppId: "YOUR_APP_STORE_ID",

    title: "Update Required",
    message:
      "We've released a newer version with important improvements. Please update to continue.",
    buttonText: "Update Now",
    buttonColor: "#8ED360",

    titleStyle: {
      fontFamily: "DMSans-Bold",
      fontSize: 24,
    },

    messageStyle: {
      fontFamily: "DMSans-Regular",
      fontSize: 16,
    },

    buttonStyle: {
      borderRadius: 30,
    },

    buttonTextStyle: {
      fontFamily: "DMSans-Bold",
    },

    modalStyle: {
      backgroundColor: "#F8F8F8",
    },
  });

  return (
    <>
      <ExpoStoreVersionChecker />
    </>
  );
}
```

---

## Using a Custom Modal

If you prefer complete control over the UI, disable the built-in modal.

```tsx
import { useForceStoreUpdate } from "@blitzcode/expo-store-version-checker";

export default function App() {
  const { needsUpdate, currentVersion, latestVersion, openStore } =
    useForceStoreUpdate({
      iosAppId: "YOUR_APP_STORE_ID",
      disableDefaultModal: true,
    });

  return (
    <>
      <MyCustomUpdateModal
        visible={needsUpdate}
        currentVersion={currentVersion}
        latestVersion={latestVersion}
        onUpdate={openStore}
      />
    </>
  );
}
```

---

## Hook Return Values

```tsx
const {
  needsUpdate,
  currentVersion,
  latestVersion,
  openStore,
  ExpoStoreVersionChecker,
} = useForceStoreUpdate(options);
```

| Property                | Type            | Description                             |
| ----------------------- | --------------- | --------------------------------------- | ------------------------------------- |
| needsUpdate             | boolean         | Indicates whether an update is required |
| currentVersion          | string          | null                                    | Installed app version                 |
| latestVersion           | string          | null                                    | Latest version available in the store |
| openStore               | () => void      | Opens the App Store or Play Store       |
| ExpoStoreVersionChecker | React Component | Built-in update modal component         |

---

## Configuration Options

```ts
interface UseForceStoreUpdateOptions {
  iosAppId?: string;

  title?: string;
  message?: string;
  buttonText?: string;
  buttonColor?: string;

  disableDefaultModal?: boolean;

  modalContainerStyle?: ViewStyle;
  modalStyle?: ViewStyle;

  titleStyle?: TextStyle;
  messageStyle?: TextStyle;

  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
}
```

---

## Complete Example

```tsx
import { useForceStoreUpdate } from "@blitzcode/expo-store-version-checker";

export default function App() {
  const { ExpoStoreVersionChecker } = useForceStoreUpdate({
    iosAppId: "YOUR_APP_STORE_ID",

    title: "Update Required",
    message:
      "We've released a newer version with important improvements. Please update to continue.",

    buttonText: "Update Now",
    buttonColor: "#8ED360",
  });

  return (
    <>
      <ExpoStoreVersionChecker />
      {/* App Content */}
    </>
  );
}
```

---

## How It Works

### iOS

The package fetches the latest version from Apple's App Store API using your app's bundle identifier.

### Android

The package fetches the latest version from the Google Play Store using your application's package name.

### Version Comparison

The installed app version is compared against the latest version available in the store.

If a newer version is available, the update modal is displayed.

---

## Limitations

### Android Play Store Version Detection

This package retrieves the latest Android app version by reading the Google Play Store page.

Because Google may change the Play Store page structure at any time, Android version detection could stop working until the package is updated.

If version detection fails:

- The package will not crash your application.
- A warning will be logged to the console.
- The update modal will not be displayed.

### Internet Connection Required

Version checks require an active internet connection.

If the device is offline or the store cannot be reached:

- The package will not crash your application.
- A warning will be logged to the console.
- The update modal will not be displayed.

### Expo Managed Workflow

This package is designed for Expo applications and relies on Expo configuration to determine the current app version.

Ensure your application's version is properly configured:

```json
{
  "expo": {
    "version": "1.0.0"
  }
}
```

---

## Troubleshooting

### Update modal is not showing

Verify:

- Your app version is lower than the version currently available in the store.
- The device has an active internet connection.
- The app is already published on the App Store or Play Store.
- The bundle identifier and package name are correctly configured.

### iOS App Store page does not open

Make sure a valid `iosAppId` is provided:

```tsx
useForceStoreUpdate({
  iosAppId: "YOUR_APP_STORE_ID",
});
```

---

## Contributing

Contributions, issues, and feature requests are welcome.

Feel free to open an issue or submit a pull request.

---

## License

MIT
