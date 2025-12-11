import { RelatorioDecorator } from './RelatorioDecorator';

export class CabecalhoDecorator extends RelatorioDecorator {
  constructor(relatorio: any, private readonly cabecalho: string = 'Instituto Federal - Relatório Acadêmico') {
    super(relatorio);
  }
  gerar(): string {
    return `${this.cabecalho}\n\n${this.relatorio.gerar()}`;
  }
}
