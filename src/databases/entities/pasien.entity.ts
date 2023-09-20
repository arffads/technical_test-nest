import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Tindakan } from './tindakan.entity';
import { Resep } from './resep-obat.entity';
// import { TransaksiPembayaran } from './transaksi.entity';
import { Tindakan } from './tindakan.entity';

@Entity()
export class Pasien {
  @PrimaryGeneratedColumn()
  ID_Pasien: number;

  @Column({ nullable: true })
  Nama: string;

  @Column({ nullable: true })
  Usia: number;

  @Column({ nullable: true })
  Alamat: string;

  @Column({ nullable: true })
  Nomor_Telepon: string;

  @Column({ nullable: true })
  Jenis_Kelamin: string;

  @OneToMany(() => Tindakan, (tindakan) => tindakan.pasienId)
  tindakanId: Tindakan[];

  @OneToMany(() => Resep, (resep) => resep.pasienId)
  resepId: Resep[];
}
