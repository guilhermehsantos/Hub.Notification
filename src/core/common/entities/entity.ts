import { Code } from '../code/Code';
import { Exception } from '../exception/Exception';
import { Optional } from '../type/CommonTypes';

export class EntityBase<TIdentify extends string> {
  protected id: Optional<TIdentify>;

  public getId(): TIdentify {
    if (typeof this.id === 'undefined') {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        overrideMessage: `${this.constructor.name}: ID is empty`,
      });
    }

    return this.id;
  }

  public setId(id: TIdentify): void {
    this.id = id;
  }
}
