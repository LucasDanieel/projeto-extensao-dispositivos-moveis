import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Funcionarios from "../pages/Funcionarios";
import Pedidos from "../pages/Pedidos";

import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../configs/firebaseconfig";

const Tab = createBottomTabNavigator();

const BottomTabNav = ({ route }) => {
  const [pedidos, setPedidos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const unsubscribe = buscarPedidos();

    return () => unsubscribe();
  }, []);

  const buscarPedidos = () => {
    setRefreshing(true);
    const funcionariosCollection = collection(db, "usuario");
    const funcionariosQuery = query(funcionariosCollection, where("cargo", "!=", "admin"));
    return onSnapshot(
      funcionariosQuery,
      (snapshot) => {
        let arrayFuncionarios = [];
        let arrayPedidos = [];

        snapshot.forEach((doc) => {
          let user = doc.data();
          if (user.aceito == true) {
            arrayFuncionarios.push({ id: doc.id, ...user });
          } else {
            arrayPedidos.push({ id: doc.id, ...user });
          }
        });

        setFuncionarios(arrayFuncionarios);
        setPedidos(arrayPedidos);
        setRefreshing(false);
      },
      (err) => {
        setRefreshing(false);
        Alert.alert("Erro", "Não foi possivel carregar seu pedidos");
      }
    );
  };

  const metodoFirebase = async (usuarioSelecionado, metodo = "adicionar") => {
    setCarregando(true);
    let atualizarItem = { ...usuarioSelecionado };
    delete atualizarItem.id;
    try {
      if (metodo == "adicionar") {
        atualizarItem.aceito = true;
      } else {
        atualizarItem.aceito = false;
      }

      const funcionarioRef = doc(db, "usuario", usuarioSelecionado.id);
      await updateDoc(funcionarioRef, atualizarItem);

      setCarregando(false);
    } catch (err) {
      setCarregando(false);
      if (metodo == "adicionar") {
        Alert.alert("Erro", "Problemas ao adicionar usuario.");
      } else {
        Alert.alert("Erro", "Problemas ao excluir usuario.");
      }
    }
  };

  return (
    <Tab.Navigator initialRouteName="Meu Funcionarios" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Meu Funcionarios"
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="team" size={size} color={color} />,
        }}
      >
        {(props) => (
          <Funcionarios
            {...props}
            funcionarios={funcionarios}
            setFuncionarios={setFuncionarios}
            refreshing={refreshing}
            refresh={buscarPedidos}
            metodoFirebase={metodoFirebase}
            carregando={carregando}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Pedidos"
        options={{
          tabBarBadge: pedidos.length > 0 ? pedidos.length : null,
          tabBarIcon: ({ color, size }) => <AntDesign name="team" size={size} color={color} />,
        }}
      >
        {(props) => (
          <Pedidos
            {...props}
            pedidos={pedidos}
            setPedidos={setPedidos}
            setFuncionarios={setFuncionarios}
            refreshing={refreshing}
            refresh={buscarPedidos}
            metodoFirebase={metodoFirebase}
            carregando={carregando}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNav;
