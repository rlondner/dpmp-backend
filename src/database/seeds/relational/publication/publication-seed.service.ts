import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicationEntity } from '../../../../objectmodel/publications/infrastructure/persistence/relational/entities/publication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicationSeedService {
  constructor(
    @InjectRepository(PublicationEntity)
    private repository: Repository<PublicationEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(this.repository.create({}));
    }
  }
}
