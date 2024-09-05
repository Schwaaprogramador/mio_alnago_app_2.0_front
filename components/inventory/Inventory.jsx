import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import InventoryItem from "./InventoryItem.jsx";

export default function Inventory() {
  const inventory = useSelector((state) => state.inventory);

  return (
    <View className="w-full h-auto justify-center items-center gap-y-5 pt-8 pb-8">
      {inventory?.map((item) => (
        <InventoryItem
          key={item.name}
          name={item.name}
          status={item.status}
          fotos={item.fotos}
          videos={item.videos}
          detalles={item.detalles}
        />
      ))}

      <Pressable disabled={true}>
        <View className="w-10/12 h-12 bg-alnago-2 rounded-2xl border-2 border-alnago-1 justify-center items-center">
          <Text className="text-alnago-1 text-3xl mx-5">
            Finalizar inventario
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
