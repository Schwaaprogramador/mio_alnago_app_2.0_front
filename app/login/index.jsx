import { Link, Stack, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  BackHandler,
} from "react-native";
import { SingInIcon } from "../../components/Icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkLogin,
  loginFetch,
} from "../../redux/slices/login/loginController";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function Login() {


  const router = useRouter();
  const status = useSelector((state) => state.loginStatus.status);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    dispatch(checkLogin());

    if (status == "login") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      router.push("inventory");      
    }

    const backAction = () => {
      // Bloquea el botón de retroceso mostrando una alerta, por ejemplo
      Alert.alert("¡Espera!", "¿Estás seguro de que deseas Cerrar Sesion?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Salir", onPress: () => BackHandler.exitApp() }
      ]);
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    
    return () => backHandler.remove();


  }, [status]);






  const loginForm = () => {

    if (email == "" || password == "") {
      Alert.alert("Debe ingresar un correo y una contraseña");
      return;
    } else {
      setLoading(true);
      const data = {
        email,
        password,
      };
      setTimeout(() => {
        setLoading(false);
      }, 5000);
      dispatch(loginFetch(data));
    }
  };

  return (
    <View className="flex-1 bg-alnago-1 justify-center items-center">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="w-full h-full justify-center items-center">
        <Image
          source={require("../../assets/images/logotipo_negro.png")}
          className="w-72 h-52 my-16"
        />

        <View className="w-full justify-center items-center gap-4">
          <TextInput
            className="w-10/12 h-10 border-2 rounded-xl text-alnago-2 text-2xl px-2 py-1"
            placeholder="Correo"
            value={email}
            name="email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            name="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            className="w-10/12 h-10 border-2 rounded-xl text-alnago-2 text-2xl px-2 py-1"
            placeholder="Contraseña"
          />
        </View>

        <View className="m-5">
          {loading ? (
            <ActivityIndicator size="larges" color="#000000" />
          ) : (
            <StyledPressable
              className="flex-row justify-between items-center bg-alnago-2 rounded-md px-4 active:opacity-75 active:scale-90"
              onPress={() => loginForm()}
            >
              <Text className="text-alnago-1 text-2xl p-1">Ingresar</Text>
              <SingInIcon />
            </StyledPressable>
          )}
        </View>
      </View>
    </View>
  );
}
