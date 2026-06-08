import type { ComponentType } from "react";
import type { TextStyle, ViewStyle } from "react-native";

export interface UseForceStoreUpdateOptions {
  iosAppId: string;
  title?: string;
  message?: string;
  buttonText?: string;
  buttonColor?: string;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  buttonTextStyle?: TextStyle;
  modalContainerStyle?: ViewStyle;
  modalStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  disableDefaultModal?: boolean;
}

export interface UseForceStoreUpdateReturn {
  needsUpdate: boolean;
  currentVersion: string | null;
  latestVersion: string | null;
  openStore: () => void;
  ExpoStoreVersionChecker: ComponentType;
}
