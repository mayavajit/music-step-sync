import * as React from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, StyleSheet, View } from "react-native";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export function Spotify() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "client_id",
      scopes: ["user-read-email", "playlist-modify-public"],
      // To follow the "Authorization Code Flow" to fetch token after
      // authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      // const { code } = response.params;
      console.log(response);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
