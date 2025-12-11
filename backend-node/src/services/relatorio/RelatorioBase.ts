import { IRelatorio } from './IRelatorio';

export class RelatorioBase implements IRelatorio {
  constructor(private readonly conteudo: string) {}
  gerar(): string {
    return this.conteudo;
  }
}
