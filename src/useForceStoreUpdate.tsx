import Constants from "expo-constants";
import { useEffect, useState } from "react";
import {
  Linking,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getLatestAndroidVersion,
  getLatestIOSVersion,
  isUpdateNeeded,
} from "./helpers";
import type {
  UseForceStoreUpdateOptions,
  UseForceStoreUpdateReturn,
} from "./types";
const androidPackageName = Constants.expoConfig?.android?.package;
const iosBundleId = Constants.expoConfig?.ios?.bundleIdentifier;
export default function useForceStoreUpdate(
  options: UseForceStoreUpdateOptions,
): UseForceStoreUpdateReturn {
  const {
    iosAppId,
    title = "Update Required",
    message = "We’ve released a newer version with important improvements. Please update to continue.",
    buttonText = "Update Now",
    buttonColor = "#8ED360",
    disableDefaultModal = false,
    buttonStyle,
    buttonTextStyle,
    titleStyle,
    messageStyle,
    modalContainerStyle,
    modalStyle,
  } = options;
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  useEffect(() => {
    async function check() {
      const current = Constants.expoConfig?.version ?? "0.0.0";
      setCurrentVersion(current);
      let latest: string | null = null;
      if (Platform.OS === "ios" && !iosBundleId) return;
      if (Platform.OS === "android" && !androidPackageName) return;
      try {
        if (Platform.OS === "ios" && iosBundleId) {
          latest = await getLatestIOSVersion(iosBundleId);
        } else if (Platform.OS === "android" && androidPackageName) {
          latest = await getLatestAndroidVersion(androidPackageName);
        } else {
          console.warn(
            "[expo-store-version-checker] Unsupported platform or missing configuration",
          );
          return;
        }
        setLatestVersion(latest);
        if (latest && isUpdateNeeded(current, latest)) {
          setNeedsUpdate(true);
        }
      } catch (error) {
        console.warn("[expo-store-version-checker]", error);
      }
    }

    check();
  }, []);
  const openStore = () => {
    Linking.openURL(
      Platform.OS === "ios"
        ? `itms-apps://itunes.apple.com/app/${iosAppId}`
        : `market://details?id=${androidPackageName}`,
    );
  };
  const UpdateModal = () => {
    if (disableDefaultModal) return null;

    if (!needsUpdate) return null;

    return (
      <Modal visible transparent>
        <View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            modalContainerStyle,
          ]}
        >
          <View
            style={[
              {
                width: "90%",
                maxWidth: 380,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingTop: 24,
                paddingBottom: 16,
              },
              modalStyle,
            ]}
          >
            <View style={{ marginBottom: 16 }}>
              <Text
                style={[
                  {
                    fontSize: 20,
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: 8,
                    color: "#000",
                  },
                  titleStyle,
                ]}
              >
                {title}
              </Text>
            </View>

            <Text
              style={[
                {
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 12,
                  marginBottom: 20,
                  color: "#444",
                  lineHeight: 24,
                },
                messageStyle,
              ]}
            >
              {message}
            </Text>

            <View style={{ marginVertical: 16 }}>
              <TouchableOpacity
                onPress={openStore}
                style={[
                  {
                    backgroundColor: buttonColor,
                    paddingVertical: 12,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  buttonStyle,
                ]}
              >
                <Text
                  style={[
                    {
                      color: "#FFF",
                      fontSize: 16,
                      fontWeight: "700",
                    },
                    buttonTextStyle,
                  ]}
                >
                  {buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  return { needsUpdate, UpdateModal, openStore, currentVersion, latestVersion };
}
