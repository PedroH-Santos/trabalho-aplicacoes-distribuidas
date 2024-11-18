import { AuthProvider } from "../../contexts/auth";
import Routes from "@/src/routes";
import React, { useEffect } from "react";
import { StatusBar, SafeAreaView, StyleSheet, View } from "react-native";
import ThemeColors from "@/themes/Colors";
import Toast from 'react-native-toast-message';

export default function RootLayout() {


  return (
    <AuthProvider>

      <SafeAreaView style={styles.container}>
      
        <Routes />
        <Toast />  
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
});
