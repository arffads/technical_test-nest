import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dokter } from './dokter.entity';

@Entity()
export class Poli {
  @PrimaryGeneratedColumn()
  ID_Poli: number;

  @Column({ nullable: true })
  Nama_Poli: string;

  @OneToMany(() => Dokter, (poli) => poli.poliId)
  dokterId: Dokter[] | number;
}
