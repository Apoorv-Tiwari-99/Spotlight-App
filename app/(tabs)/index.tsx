import {  Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import {styles} from "../../styles/auth.styles";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {

  const {signOut}=useAuth();
  return (
    <View style={styles.container}
    >
    
    <TouchableOpacity onPress={()=>signOut()}>
      <Text style={{color:"white"}}>Sign Out </Text>
    </TouchableOpacity>

    </View>
  );
}

