import { Link, useRouter } from "expo-router";
import { styled } from "nativewind";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { logoutFetch } from "../redux/slices/login/loginController";

const StyledPressable = styled(Pressable);

const Rutas = ({ closeDrawer }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const cerrarSesion = () => {
    Alert.alert("Confirmar", "¿Cerrar la sesión actual?", [
      {
        text: "Cancel",
      },
      {
        cancelable: false,
        text: "Si",
        onPress: () => {
          dispatch(logoutFetch());
          closeDrawer();
        },
      },
    ]);
  };

  return (
    <View className="w-full h-full bg-alnago-1 justify-center items-center">
      <View className="w-11/12 h-5/6 justify-between items-center py-5">
        <View className="w-52 h-52 items-center">
          <Image
            source={require("../assets/images/logo_circular_negro.png")}
            className="w-full h-full bg-contain"
          />
          <Text className="text-2xl">NOMBRE USUARIO</Text>
        </View>

        <View className="gap-y-5" onPress={closeDrawer}>
          <Link asChild href="/inventory" onPress={closeDrawer}>
            <StyledPressable className={"active:scale-90 active:opacity-50"}>
              <Text className="text-2xl">INVENTARIOS</Text>
            </StyledPressable>
          </Link>
        </View>

        <StyledPressable
          className={"active:scale-90 active:opacity-50"}
          onPress={cerrarSesion}
        >
          <Text className="text-2xl">CERRAR SESIÓN</Text>
        </StyledPressable>
      </View>
    </View>
  );
};

export default Rutas;
