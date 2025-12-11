import { INotificador } from '../services/Notificacao/INotificador';
import { ExternalEmailLib } from './ExternalEmailLib';

export class EmailAdapter implements INotificador {
  constructor(private readonly client: ExternalEmailLib, private readonly subject: string = 'Notificação Acadêmica') {}

  async notificar(destinatario: string, mensagem: string): Promise<void> {
    await this.client.send(destinatario, this.subject, mensagem);
  }
}
