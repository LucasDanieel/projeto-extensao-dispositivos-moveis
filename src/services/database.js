import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../configs/firebaseconfig";

export const login = async (data) => {
  try {
    const res = await signInWithEmailAndPassword(auth, data.email, data.senha);

    const userSnap = await getDoc(doc(db, "usuario", res.user.uid));

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw { code: "Usuario não encontrado!" };
    }
  } catch (err) {
    throw err;
  }
};

export const criarUsuario = async (uid, dados) => {
  const usuarioRef = doc(db, "usuario", uid);
  await setDoc(usuarioRef, dados);
};

export const criarLogin = async (email, senha) => {
  const conta = await createUserWithEmailAndPassword(auth, email, senha);
  return conta.user.uid;
};
