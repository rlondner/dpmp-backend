import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepositoryBase } from './infrastructure/persistence/address.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { Address } from './domain/address';

@Injectable()
export class AddressesServiceBase {
  constructor(
    // Dependencies here
    private readonly addressRepositoryBase: AddressRepositoryBase,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.addressRepositoryBase.create({
      // Do not remove comment below.
      // <creating-property-payload />
      country: createAddressDto.country,

      state: createAddressDto.state,

      city: createAddressDto.city,

      postalCode: createAddressDto.postalCode,

      line3: createAddressDto.line3,

      line2: createAddressDto.line2,

      line1: createAddressDto.line1,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.addressRepositoryBase.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Address['id']) {
    return this.addressRepositoryBase.findById(id);
  }

  findByIds(ids: Address['id'][]) {
    return this.addressRepositoryBase.findByIds(ids);
  }

  async update(
    id: Address['id'],

    updateAddressDto: UpdateAddressDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.addressRepositoryBase.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      country: updateAddressDto.country,

      state: updateAddressDto.state,

      city: updateAddressDto.city,

      postalCode: updateAddressDto.postalCode,

      line3: updateAddressDto.line3,

      line2: updateAddressDto.line2,

      line1: updateAddressDto.line1,
    });
  }

  remove(id: Address['id']) {
    return this.addressRepositoryBase.remove(id);
  }
}
