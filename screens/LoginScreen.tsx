import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api"; // Adjust path based on your folder structure
import { Id } from "../convex/_generated/dataModel"; 


export default function LoginScreen({ onLogin }: { onLogin: (id: Id<"users">) => void })  {
  // 1. State for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");


  
  // 2. Convex Mutation hook
  const createUser = useMutation(api.users.register); // Assuming you have a 'create' mutation in users.ts

  const handleSignUp = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      await createUser({ username, password, fullname });
      Alert.alert("Success", "Account created successfully!");
      // Here you would typically navigate back to Login or into the App
    } catch (error) {
      Alert.alert("Signup Failed", "That username might already be taken.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/signup.webp")}
          style={styles.image}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="John Doe" 
          value={fullname}
          onChangeText={setFullName}
        />
        
        <Text style={styles.label}>Email Address (Username)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="john@gmail.com" 
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          secureTextEntry 
          placeholder="********" 
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-google" size={30} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-apple" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-facebook" size={30} color="#4267B2" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ... Styles remain the same as your previous code ...

const styles = StyleSheet.create({


container:{
flex: 1,
backgroundColor: '#7D7AFF',
paddingTop: 40,
},

// step2


header:{
flex:1,
alignItems:'center',
justifyContent:'center',

},

image: {
width: '80%',
height: '70%',

},

// “Step 3: Create the Header Section”

formContainer : {
flex: 2,  
backgroundColor: '#FFF',
borderTopLeftRadius: 60,
borderTopRightRadius: 60,
padding: 30,
},

// “Step 4: Create the Form Container”

label : {
fontSize:14,
color:'#666',
marginBottom:5,
marginTop:15,
},

input : {
backgroundColor:'#F0F0F0',
padding:15,
borderRadius:15,
fontSize:16

},
// “Step 5: Create the Email and Password Inputs”

forgotText : {
  textAlign:'right',
  marginTop:10,
  color:'#666'
  },
// “Step 6: Create the Forgot Password Link”

loginButton: {
backgroundColor:'#FFCC00',
padding: 18,
borderRadius: 15,
alignItems: 'center',
marginTop: 30,
},

loginButtonText: {
fontWeight: 'bold',
fontSize:18,

},
// “Step 7: Create the Login Button”

orText: {
textAlign:'center',
marginVertical:20,
fontSize:18,
fontWeight:'bold'

},
// “Step 8: Create the OR Separator”

socialRow:{
  flexDirection:'row',
  alignItems:'center',
  gap:20,
  justifyContent:'center',
},

socialIcon:{
  backgroundColor:' #F0F0F0',
  padding:15,
  borderRadius:15

},
// “Step 9: Create the Social Login Icons”

footer:{
flexDirection:'row',
justifyContent:'center',
marginTop:30,
},

linkText: {
color:'#FFCC00',
fontWeight:'bold',
}

// “Step 10: Create the Footer Signup Link”

});
