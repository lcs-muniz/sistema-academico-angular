import { EmailAdapter } from '../../adapters/EmailAdapter';
import { ExternalEmailLib } from '../../adapters/ExternalEmailLib';
import { NotificacaoService } from '../../services/Notificacao/NotificacaoService';

describe('Adapter de Notificação (EmailAdapter)', () => {
  it('usa adapter para enviar mensagem via lib externa', async () => {
    const client = new ExternalEmailLib();
    const spy = jest.spyOn(client, 'send').mockResolvedValue();
    const adapter = new EmailAdapter(client);
    const service = new NotificacaoService(adapter);

    await service.enviarBoasVindas('dest@teste.com', 'Aluno');

    expect(spy).toHaveBeenCalledWith('dest@teste.com', 'Notificação Acadêmica', expect.stringContaining('bem-vindo'));
  });
});
