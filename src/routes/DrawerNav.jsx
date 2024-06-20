import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "../pages/Home";
import Adicionar from "../pages/Adicionar";
import Participantes from "../pages/Participantes";
import DrawerContent from "../components/DrawerContent";
import BottomTabNav from "./BottomTabNav";

import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../configs/firebaseconfig";
import { Alert } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNav = ({ setTelaLogin, outroLogin }) => {
  const [user, setUser] = useState({});
  const [participantes, setParticipantes] = useState([]);
  const [aniversariantes, setDatasAniversariantes] = useState([]);

  useEffect(() => {
    getUser();
    buscarParticipantes();
  }, []);

  const getUser = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("login");
      if (userJSON !== null) {
        const userPARSE = JSON.parse(userJSON);
        setUser(userPARSE);
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possivel acessar a conta");
      outroLogin();
    }
  };

  const buscarParticipantes = async () => {
    try {
      const participantesCollection = collection(db, "participantes");
      const participantesQuery = query(participantesCollection, orderBy("nome"));
      const resp = await getDocs(participantesQuery);

      const mapParticipantes = resp.docs.map((d) => ({ id: d.id, ...d.data() }));

      setParticipantes(mapParticipantes);
      criarDataAniversario(mapParticipantes);
    } catch (err) {
      Alert.alert("Erro", "Não foi possivel acessar os participantes");
    }
  };

  const criarDataAniversario = (mapParticipantes) => {
    let mapAniversariantes = mapParticipantes.map((p) => ({
      nome: p.nome,
      ...converterData(p.dataNascimento),
    }));

    const agrupamento = mapAniversariantes.reduce((agrupado, aniversariante) => {
      const data = aniversariante.dataAniversario;

      if (!agrupado[data]) {
        agrupado[data] = [];
      }

      agrupado[data].push(aniversariante);
      return agrupado;
    }, {});

    const listaAniver = Object.keys(agrupamento).map((data) => {
      return {
        dataAniversario: data,
        pessoas: agrupamento[data],
      };
    });

    listaAniver.sort((a, b) => {
      return (
        converterParaComparacao(a.dataAniversario) - converterParaComparacao(b.dataAniversario)
      );
    });

    setDatasAniversariantes(listaAniver);
  };

  function converterData(data) {
    const anoAtual = new Date().getFullYear();
    let meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const [day, month, year] = data.split("/").map(Number);
    const dataNasc = new Date(year, month - 1, day);
    return {
      dia: dataNasc.getDate(),
      mes: meses[dataNasc.getMonth()],
      idade: anoAtual - dataNasc.getFullYear(),
      dataAniversario: `${dataNasc.getDate()} ${meses[dataNasc.getMonth()]}`,
    };
  }

  const meses = {
    Janeiro: 0,
    Fevereiro: 1,
    Março: 2,
    Abril: 3,
    Maio: 4,
    Junho: 5,
    Julho: 6,
    Agosto: 7,
    Setembro: 8,
    Outubro: 9,
    Novembro: 10,
    Dezembro: 11,
  };

  const converterParaComparacao = (data) => {
    const [dia, mes] = data.split(" ");
    return `${meses[mes].toString().padStart(2, "0")}${dia.padStart(2, "0")}`;
  };

  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      drawerContent={(props) => (
        <DrawerContent props={props} user={user} setTelaLogin={setTelaLogin} />
      )}
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen name="Inicio" options={{ headerShown: false }}>
        {(props) => <Home {...props} aniversariantes={aniversariantes} user={user} />}
      </Drawer.Screen>

      <Drawer.Screen name="Adicionar">
        {(props) => (
          <Adicionar
            {...props}
            participantes={participantes}
            setParticipantes={setParticipantes}
            criarDataAniversario={criarDataAniversario}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen name="Participantes">
        {(props) => (
          <Participantes
            {...props}
            participantes={participantes}
            setParticipantes={setParticipantes}
            buscarParticipantes={buscarParticipantes}
            criarDataAniversario={criarDataAniversario}
          />
        )}
      </Drawer.Screen>
      {user.cargo == "admin" && <Drawer.Screen name="Funcionarios" component={BottomTabNav} />}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
