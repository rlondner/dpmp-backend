import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../../..//objectmodel/organizations/infrastructure/persistence/relational/entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationSeedService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private repository: Repository<OrganizationEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      //await this.repository.save(this.repository.create({}));

      await this.repository.save(
        this.repository.create({
          name: 'Default Organization',
          slug: 'default-organization',
          description: 'This is the default organization created during seed.',
          subscription: 'ultimate',
        }),
      );

      await this.repository.save(
        this.repository.create({
          name: 'Cabinet Blanchard',
          slug: 'blanchard-cabinet',
          description:
            'Cabinet Blanchard is a law firm specializing in divorce law.',
          subscription: 'standard',
        }),
      );

      await this.repository.save(
        this.repository.create({
          name: 'Gide Avocats',
          slug: 'gide-avocats',
          description:
            'Gide Avocats is a leading international law firm based in Paris, France.',
          subscription: 'premium',
        }),
      );
    }
  }
}
