import {  Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import {styles} from "../../styles/auth.styles";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
    >
      <Link href={"/notifications"}>
        Notification Here 
      </Link>

    </View>
  );
}

