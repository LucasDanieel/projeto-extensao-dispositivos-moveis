import { Modal } from "react-native";
import { Fragment, useState } from "react";
import styles from "./styles";

import Lista from "../../components/Lista";
import ModalConfirmacao from "../../components/ModalConfirmacao";

const Pedidos = ({ pedidos, refresh, refreshing, metodoFirebase, carregando }) => {
  const [openModal, setOpenModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const adicionarFuncionario = async () => {
    await metodoFirebase(usuarioSelecionado);
    fecharModal();
  };

  const salvar = (item) => {
    setUsuarioSelecionado(item);
    setOpenModal(true);
  };

  const fecharModal = () => {
    setUsuarioSelecionado(null);
    setOpenModal(false);
  };

  return (
    <Fragment>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <ModalConfirmacao
          texto="Deseja adicionar esse usuario?"
          metodoCancelar={fecharModal}
          metodoConfirmacao={adicionarFuncionario}
          carregando={carregando}
        />
      </Modal>

      <Lista
        items={pedidos}
        nomeCampo="Email"
        nomeIcone="check"
        refresh={refresh}
        refreshing={refreshing}
        clickIcone={salvar}
      />
    </Fragment>
  );
};

export default Pedidos;
