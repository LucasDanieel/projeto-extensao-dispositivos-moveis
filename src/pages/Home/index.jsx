import {
  Text,
  View,
  FlatList,
  Animated,
  Image,
  Platform,
  Alert,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { Fragment, useEffect, useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ImageView from "react-native-image-viewing";
import * as ImagePicker from "expo-image-picker";

import Carrossel from "../../components/Carrossel";
import Botao from "../../components/Botao";
import ModalConfirmacao from "../../components/ModalConfirmacao";

import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db, hd } from "../../configs/firebaseconfig";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

const Home = ({ navigation, aniversariantes, user }) => {
  const fadeAnim = useRef(new Animated.Value(1.3)).current;
  const [imagens, setImagens] = useState([]);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [imagemAdicionar, setImagemAdicionar] = useState(null);

  const [abrirConfirmacao, setAbrirConfirmacao] = useState(false);
  const [enviandoImagem, setEnviandoImagem] = useState(false);
  const [carregandoImagens, setCarregandoImagens] = useState(true);
  const [excluindoImagens, setExcluindoImagens] = useState(false);
  const [abrirImagem, setAbrirImagem] = useState(false);
  const [abrirAdicionarImagem, setAbrirAdicionarImagem] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const unsubscribe = carregarImagens();

    return () => {
      unsubscribe();
      setCarregandoImagens(true);
    };
  }, []);

  const carregarImagens = () => {
    const imagensCollection = collection(db, "imagens");
    const imagensQuery = query(imagensCollection, orderBy("dataCriacao", "desc"));
    return onSnapshot(
      imagensQuery,
      (snapshot) => {
        let imgs = [];
        snapshot.forEach((doc) => {
          imgs.push(doc.data());
        });

        setImagens(imgs);
        setCarregandoImagens(false);
      },
      (err) => {
        setCarregandoImagens(false);
        Alert.alert("Erro", "Não foi possivel acessar as imagens");
      }
    );
  };

  const escolherImagem = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status != "granted") {
        Alert("Desculpe, precisamos da permissão da câmera para fazer isso funcionar!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.canceled) {
      setImagemAdicionar(result.assets[0].uri);
    }
  };

  const salvarImagem = async () => {
    setEnviandoImagem(true);
    try {
      const response = await fetch(imagemAdicionar);
      const blob = await response.blob();
      let dataCriacao = Date.now();
      let nomeImagem = dataCriacao + "_" + user.nome;

      const storageRef = ref(hd, `igreja/${nomeImagem}`);
      const uploadTask = await uploadBytes(storageRef, blob, {
        customMetadata: { nome: user.nome, email: user.email },
      });

      const urlImagem = await getDownloadURL(uploadTask.ref);
      let objImagem = {
        url: urlImagem,
        nome: nomeImagem,
        dataCriacao: dataCriacao,
        usuario: user.nome,
      };

      const docRef = doc(db, "imagens", nomeImagem);
      await setDoc(docRef, objImagem);

      setEnviandoImagem(false);
      fecharAdicionarImagem();
    } catch (err) {
      setEnviandoImagem(false);
      fecharAdicionarImagem();
      Alert.alert("Erro", "Não foi possivel salvar a imagem");
    }
  };

  const apagarImagem = async () => {
    setExcluindoImagens(true);
    try {
      let nomeImagem = imagemSelecionada.nome;

      const storageRef = ref(hd, `igreja/${nomeImagem}`);
      await deleteObject(storageRef);

      const docRef = doc(db, "imagens", nomeImagem);
      await deleteDoc(docRef);

      fecharImagemSelecionada();
      setExcluindoImagens(false);
    } catch (err) {
      if (err.code == "storage/object-not-found") {
        Alert.alert("Erro", "Imagem não encontrada");
      } else {
        Alert.alert("Erro", "Não foi possivel apagar a imagem");
      }
      fecharImagemSelecionada();
      setExcluindoImagens(false);
    }
  };

  const selecionarImagem = (item) => {
    setImagemSelecionada(item);
    setAbrirImagem(true);
  };

  const fecharImagemSelecionada = () => {
    fecharConfirmacao();
    setImagemSelecionada(null);
    setAbrirImagem(false);
  };

  const fecharConfirmacao = () => {
    setAbrirConfirmacao(false);
  };

  const adicionarImagem = () => {
    setAbrirAdicionarImagem(true);
    escolherImagem();
  };

  const fecharAdicionarImagem = () => {
    setAbrirAdicionarImagem(false);
    setImagemAdicionar(null);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: fadeAnim }] }]}>
      {/* Modal onde exibe a imagem completa */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={abrirImagem}
        onRequestClose={() => fecharImagemSelecionada()}
      >
        {imagemSelecionada && (
          <View style={styles.wrapperAbrirImagem}>
            <TouchableOpacity
              style={styles.botaoApagarImagem}
              onPress={() => setAbrirConfirmacao(true)}
            >
              <Ionicons name="trash" size={26} color="white" />
            </TouchableOpacity>

            <Text style={styles.textoEnviado}>Enviado por: {imagemSelecionada.usuario}</Text>

            {abrirConfirmacao && (
              <ModalConfirmacao
                texto="Deseja apagar essa imagem?"
                metodoCancelar={fecharConfirmacao}
                metodoConfirmacao={apagarImagem}
                carregando={excluindoImagens}
              />
            )}

            <ImageView
              images={[{ uri: imagemSelecionada.url }]}
              imageIndex={0}
              visible={abrirImagem}
              onRequestClose={() => fecharImagemSelecionada()}
            />
          </View>
        )}
      </Modal>

      {/* Modal onde é feito o envio da imagem para o Firebase */}
      <Modal
        animationType="none"
        transparent={true}
        visible={abrirAdicionarImagem}
        onRequestClose={() => fecharAdicionarImagem()}
      >
        <View style={styles.wrapperAdicionarImagem}>
          <View style={styles.adicionarImagem}>
            <TouchableOpacity style={styles.inputImagem} onPress={() => escolherImagem()}>
              <Text style={styles.inputTexto}>Buscar Imagem</Text>
            </TouchableOpacity>
            <View style={styles.exemploImagem}>
              {enviandoImagem ? (
                <ActivityIndicator size={50} />
              ) : (
                <Image
                  style={styles.imagem}
                  source={{ uri: imagemAdicionar }}
                  resizeMode="contain"
                />
              )}
            </View>
            <Botao
              nomeConfirmar="Adicionar"
              nomeRejeitar="Cancelar"
              metodoCancelar={fecharAdicionarImagem}
              metodoSalvar={salvarImagem}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.wrapperTitulo}>
        <Fragment>
          <Ionicons
            style={styles.iconesLeft}
            name="reorder-three-outline"
            size={28}
            onPress={() => navigation.openDrawer()}
          />
          <Text style={styles.titulo}>Inicio</Text>
          <MaterialIcons
            onPress={() => adicionarImagem()}
            style={styles.iconesRight}
            name="add-photo-alternate"
            size={24}
            color="black"
          />
        </Fragment>
      </View>

      <View style={styles.destaque}>
        <View style={styles.carrosel}>
          {carregandoImagens ? (
            <ActivityIndicator size={50} />
          ) : imagens.length == 0 ? (
            <View>
              <Text style={{ fontSize: 16 }}>Nenhuma imagem encontrada</Text>
            </View>
          ) : (
            <Carrossel imagens={imagens} selecionarImagem={selecionarImagem} />
          )}
        </View>
      </View>

      <FlatList
        style={styles.aniversarios}
        data={aniversariantes}
        renderItem={({ item }) => (
          <View style={styles.aniversariantes}>
            <View style={styles.todosAniversariantes}>
              <Text style={styles.dataAniversario}>{item.dataAniversario}</Text>
              {item.pessoas?.map((pessoa, idx) => (
                <View style={styles.aniversariante} key={idx}>
                  <Text numberOfLines={1} style={[styles.nomeAniversariante, { maxWidth: "70%" }]}>
                    {pessoa.nome} -{" "}
                  </Text>
                  <Text numberOfLines={1} style={styles.nomeAniversariante}>
                    {pessoa.idade} anos
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Animated.View>
  );
};
export default Home;
