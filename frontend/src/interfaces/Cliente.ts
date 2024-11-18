export interface Client {
  clienteid: number;
  nome: string;
  email: string;
  datanascimento: Date | null;
  telefone: string;
  cpf: string;
  uuid: string;
}