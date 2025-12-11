import { IRelatorio } from '../IRelatorio';

export abstract class RelatorioDecorator implements IRelatorio {
  constructor(protected readonly relatorio: IRelatorio) {}
  abstract gerar(): string;
}
