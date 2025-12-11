import { INotificador } from './INotificador';

export class NotificacaoService {
  constructor(private readonly notificador: INotificador) {}

  async enviarBoasVindas(email: string, nome: string) {
    const mensagem = `Olá ${nome}, bem-vindo ao sistema acadêmico!`;
    await this.notificador.notificar(email, mensagem);
  }
}
