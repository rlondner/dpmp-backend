import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusEntity } from '../../../../objectmodel/statuses_original/infrastructure/persistence/relational/entities/status.entity';
import { StatusEnum } from '../../../../objectmodel/statuses_original/statuses.enum';

@Injectable()
export class StatusSeedService {
  constructor(
    @InjectRepository(StatusEntity)
    private repository: Repository<StatusEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: StatusEnum.active,
          name: 'Active',
        }),
        this.repository.create({
          id: StatusEnum.inactive,
          name: 'Inactive',
        }),
        this.repository.create({
          id: StatusEnum.blocked,
          name: 'Blocked',
        }),
      ]);
    }
  }
}
