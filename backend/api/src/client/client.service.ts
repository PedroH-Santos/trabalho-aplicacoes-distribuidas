import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { ClientDto } from 'dtos/entities/clientDto';
import { signUpCliente } from 'dtos/requests/signUpCliente';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async insertClient(data: signUpCliente) {
    try {
      const traitDate = new Date(data.datanascimento);
      const obj = new ClientDto();
      obj.nome = data.nome;
      obj.email = data.email;
      obj.cpf = data.cpf;
      obj.uuid = data.uuid;
      obj.telefone = data.telefone;
      obj.datanascimento = traitDate.toDateString();

      return await this.clientRepository.insertClient(obj);
    } catch (ex) {
      console.error(ex);
      throw new Error('Não foi possível inserir o cliente.');
    }
  }

  async updateClient(data: ClientDto) {
    try {
      return await this.clientRepository.updateClient(data);
    } catch (ex) {
      console.error(ex);
      throw new Error('Não foi possível atualizar o cliente.');
    }
  }

  async getClientByUuid(uuid: string) {
    return await this.clientRepository.getClientByUuid(uuid);
  }

  async getClientById(id: number) {
    return await this.clientRepository.getClientById(id);
  }
}
