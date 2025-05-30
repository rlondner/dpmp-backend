import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { Publication } from '../../domain/publication';

export abstract class PublicationRepository {
  abstract create(
    data: Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Publication>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Publication[]>;

  abstract findById(id: Publication['id']): Promise<NullableType<Publication>>;

  abstract findByIds(ids: Publication['id'][]): Promise<Publication[]>;

  abstract update(
    id: Publication['id'],
    payload: DeepPartial<Publication>,
  ): Promise<Publication | null>;

  abstract remove(id: Publication['id']): Promise<void>;
}
