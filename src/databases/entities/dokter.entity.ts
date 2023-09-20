import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Tindakan } from './tindakan.entity';
import { Resep } from './resep-obat.entity';
import { Poli } from './poli.entity';

@Entity()
export class Dokter {
  @PrimaryGeneratedColumn()
  ID_Dokter: number;

  @Column({ nullable: true })
  Nama_Dokter: string;

  @Column({ nullable: true })
  Nomor_Telepon: string;

  @Column({ nullable: true })
  Spesialisasi: string;

  @OneToMany(() => Resep, (resep) => resep.dokterId)
  resepId: Resep[];

  @OneToMany(() => Tindakan, (tindakan) => tindakan.dokterId)
  tindakanId: Tindakan[];

  @ManyToOne(() => Poli, (poli) => poli.dokterId)
  poliId: Poli[] | number;
}
