import { ConvexProvider, ConvexReactClient } from "convex/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

import TodoScreen from "./screens/TodoScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen"; // Make sure the filename matches
import { Id } from "./convex/_generated/dataModel";

// Define the types for your routes
export type RootStackParamList = {
  Login: { onLogin: (id: Id<"users">) => void };
  SignUp: undefined;
  Home: { userId: Id<"users"> };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function App() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  const handleLogin = (id: Id<"users">) => {
    setUserId(id);
  };

  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userId ? (
            // If logged in, show the Home/Todo screen
            <Stack.Screen name="Home">
              {(props) => <TodoScreen {...props} userId={userId} />}
            </Stack.Screen>
          ) : (
            // Auth Stack
            <>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}