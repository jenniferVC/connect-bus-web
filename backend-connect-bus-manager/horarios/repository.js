import admin from "firebase-admin";
import { Horario } from "./model.js";

// Camada de Repositório
// - Contém a lógica de acesso aos dados necessária para a aplicacao funcionar
// sejam dados obtidos em banco de dados ou de outra API qualquer.

export class HorarioRepository {
  /**
   * Retorna todos os Horarios do banco
   * @returns Promise
   */
  async listAll() {
    // var docs = await this.getDocsHorariosCollection();
    // var horarios = await this.getHorarios(docs);
    // console.log("A:", horarios[1]);
    // return horarios[1];
    return admin
      .firestore()
      .collection("Horarios")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
      });
  }

  /**
   * Adiciona no banco um horario novo com o ID do documento gerado automaticamente
   * @param {Horario} horario
   * @returns
   */
  create(horario) {
    console.log("horario salvo no banco:", JSON.parse(JSON.stringify(horario)));
    return admin
      .firestore()
      .collection("Horarios")
      .add(JSON.parse(JSON.stringify(horario)));
  }

  /**
   * Retorna todos os documents da collection [Horarios]
   * @returns []
   */
  async getDocsHorariosCollection() {
    const horariosRef = admin
      .firestore()
      .collection("Horarios")
      .where("linha", "==", "Linha 011 TURÍSTICA");
    // .orderBy("linha", "asc");
    const snapshot = await horariosRef.get();
    return snapshot.docs;
  }

  /**
   * Retorna todos os Horarios convertidos em objeto
   * @param {[]} docs
   * @returns
   */
  async getHorarios(docs) {
    let arrHorarios = [];

    return docs.map(async (doc) => {
      let docIDHorarios = doc.id;
      let linha = doc.data()["linha"];
      let diaDeFuncionamento = doc.data()["diaDeFuncionamento"];

      const r = await this.getDocsBairrosHorariosCollection(
        docIDHorarios,
        linha,
        diaDeFuncionamento
      );
      r.forEach((element) => {
        arrHorarios.push(element);
      });
      return arrHorarios;
    });
  }

  /**
   * Retorna todos os documents da sub-collection [BairrosHorarios]
   * @param {string} docIdHorario
   * @param {string} linha
   * @param {string} diaDeFuncionamento
   * @returns
   */
  async getDocsBairrosHorariosCollection(
    docIdHorario,
    linha,
    diaDeFuncionamento
  ) {
    let arrBairrosHorarios = [];
    const bairrosHorariosRef = admin
      .firestore()
      .collection("Horarios")
      .doc(docIdHorario)
      .collection("BairrosHorarios");
    const snapshot = await bairrosHorariosRef.get();

    snapshot.forEach((doc) => {
      let horario = {
        ...doc.data(),
        docIdBairrosHorarios: doc.id,
        docIdHorarios: docIdHorario,
        linha: linha,
        diaDeFuncionamento: diaDeFuncionamento,
      };
      arrBairrosHorarios.push(horario);
    });
    return arrBairrosHorarios;
  }

  /**
   * Encontra o horario pelo ID do documento
   * @param {string} id
   * @returns
   */
  async findByDocID(id) {
    const horario = new Horario();
    let t = await this.getLinhaEDiaDeFuncionamento(id);
    horario.linha = t.linha;
    horario.diaDeFuncionamento = t.diaDeFuncionamento;
    console.log(JSON.stringify(horario));
  }

  /**
   *
   * @param {string} id
   * @returns Horario
   */
  getLinhaEDiaDeFuncionamento(id) {
    return admin
      .firestore()
      .collection("Horarios")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
  }
}
