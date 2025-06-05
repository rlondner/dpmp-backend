import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AddressesServiceBase } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Address } from './domain/address';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../utils/infinity-pagination';
import { FindAllAddressesDto } from './dto/find-all-addresses.dto';

@ApiTags('Addresses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'addresses',
  version: '1',
})
export class AddressesControllerBase {
  constructor(private readonly addressesServiceBase: AddressesServiceBase) {}

  @Post()
  @ApiCreatedResponse({
    type: Address,
  })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesServiceBase.create(createAddressDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Address),
  })
  async findAll(
    @Query() query: FindAllAddressesDto,
  ): Promise<InfinityPaginationResponseDto<Address>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.addressesServiceBase.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Address,
  })
  findById(@Param('id') id: string) {
    return this.addressesServiceBase.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Address,
  })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesServiceBase.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.addressesServiceBase.remove(id);
  }
}
