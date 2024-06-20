import { Modal } from "react-native";
import { Fragment, useState } from "react";
import styles from "./styles";

import Lista from "../../components/Lista";
import ModalConfirmacao from "../../components/ModalConfirmacao";

const Funcionarios = ({ funcionarios, refresh, refreshing, metodoFirebase, carregando }) => {
  const [openModal, setOpenModal] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  const [procurar, setProcurar] = useState("");
  const [filtroFuncionarios, setFiltroFuncionarios] = useState([]);

  const filtrar = (texto) => {
    setProcurar(texto);
    if (texto.trim() != "") {
      let newArray = funcionarios.filter((f) => {
        let nome = f.nome.toLowerCase();
        if (nome.indexOf(texto.toLowerCase()) > -1) return f;
      });
      setFiltroFuncionarios(newArray);
    } else {
      setFiltroFuncionarios([]);
    }
  };

  const apararFuncionario = async () => {
    await metodoFirebase(funcionarioSelecionado, "apagar");
    fecharModal();
    filtrar("");
  };

  const salvar = (item) => {
    setFuncionarioSelecionado(item);
    setOpenModal(true);
  };

  const fecharModal = () => {
    setFuncionarioSelecionado(null);
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
          texto="Deseja excluir esse funcionario?"
          metodoCancelar={fecharModal}
          metodoConfirmacao={apararFuncionario}
          carregando={carregando}
        />
      </Modal>

      <Lista
        items={funcionarios}
        nomeCampo="Email"
        nomeIcone="restore-from-trash"
        procurar={procurar}
        filtrar={filtrar}
        itemFiltrado={filtroFuncionarios}
        refresh={refresh}
        refreshing={refreshing}
        clickIcone={salvar}
      />
    </Fragment>
  );
};

export default Funcionarios;
