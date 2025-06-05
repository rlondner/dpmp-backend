import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';

@Entity({
  name: 'address',
})
export class AddressEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  country: string;

  @Column({
    nullable: true,
    type: String,
  })
  state?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  city: string;

  @Column({
    nullable: false,
    type: String,
  })
  postalCode: string;

  @Column({
    nullable: true,
    type: String,
  })
  line3?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  line2?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  line1: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
