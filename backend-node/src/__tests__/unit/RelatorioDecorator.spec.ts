import { RelatorioBase } from '../../services/relatorio/RelatorioBase';
import { CabecalhoDecorator } from '../../services/relatorio/decorators/CabecalhoDecorator';
import { HtmlDecorator } from '../../services/relatorio/decorators/HtmlDecorator';

describe('Relatório Decorator', () => {
  it('adiciona cabeçalho institucional', () => {
    const base = new RelatorioBase('Conteúdo');
    const decorado = new CabecalhoDecorator(base);
    const out = decorado.gerar();
    expect(out).toContain('Instituto Federal - Relatório Acadêmico');
    expect(out).toContain('Conteúdo');
  });

  it('envolve conteúdo em HTML', () => {
    const base = new RelatorioBase('Conteúdo');
    const html = new HtmlDecorator(base);
    const out = html.gerar();
    expect(out.startsWith('<html>')).toBe(true);
    expect(out).toContain('<pre>Conteúdo</pre>');
  });

  it('combina múltiplos decorators', () => {
    const base = new RelatorioBase('Conteúdo');
    const withHeader = new CabecalhoDecorator(base);
    const html = new HtmlDecorator(withHeader);
    const out = html.gerar();
    expect(out).toContain('Instituto Federal - Relatório Acadêmico');
    expect(out).toContain('Conteúdo');
    expect(out.startsWith('<html>')).toBe(true);
  });
});
