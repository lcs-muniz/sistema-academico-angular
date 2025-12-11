export interface INotificador {
  notificar(destinatario: string, mensagem: string): Promise<void>;
}
