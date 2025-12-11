import { RelatorioDecorator } from './RelatorioDecorator';

export class HtmlDecorator extends RelatorioDecorator {
  gerar(): string {
    const content = this.relatorio.gerar();
    return `<html><body><pre>${content}</pre></body></html>`;
  }
}
