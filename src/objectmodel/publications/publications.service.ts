import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './infrastructure/persistence/publication.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { Publication } from './domain/publication';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly publicationRepository: PublicationRepository,
  ) {}

  async create(createPublicationDto: CreatePublicationDto) {
    // Do not remove comment below.
    // <creating-property />
    let creator: User | null | undefined = undefined;

    if (createPublicationDto.creator) {
      const creatorObject = await this.userService.findById(
        createPublicationDto.creator.id,
      );
      if (!creatorObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            creator: 'notExists',
          },
        });
      }
      creator = creatorObject;
    } else if (createPublicationDto.creator === null) {
      creator = null;
    }

    return this.publicationRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      creator,

      body: createPublicationDto.body,

      title: createPublicationDto.title,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.publicationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Publication['id']) {
    return this.publicationRepository.findById(id);
  }

  findByIds(ids: Publication['id'][]) {
    return this.publicationRepository.findByIds(ids);
  }

  async update(
    id: Publication['id'],

    updatePublicationDto: UpdatePublicationDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let creator: User | null | undefined = undefined;

    if (updatePublicationDto.creator) {
      const creatorObject = await this.userService.findById(
        updatePublicationDto.creator.id,
      );
      if (!creatorObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            creator: 'notExists',
          },
        });
      }
      creator = creatorObject;
    } else if (updatePublicationDto.creator === null) {
      creator = null;
    }

    return this.publicationRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      creator,

      body: updatePublicationDto.body,

      title: updatePublicationDto.title,
    });
  }

  remove(id: Publication['id']) {
    return this.publicationRepository.remove(id);
  }
}
