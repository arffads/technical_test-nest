import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Pasien } from './pasien.entity';
import { Dokter } from './dokter.entity';
import { TransaksiPembayaran } from './transaksi.entity';
// import { TransaksiPembayaran } from './transaksi.entity';

@Entity()
export class Tindakan {
  @PrimaryGeneratedColumn()
  ID_Tindakan: number;

  @Column({ nullable: true })
  Nama_Tindakan: string;

  @Column({ nullable: false })
  Deskripsi: string;

  @Column({ nullable: false })
  Biaya: number;

  @ManyToOne(() => Dokter, (dokter) => dokter.tindakanId)
  dokterId: Dokter | number;

  @ManyToOne(() => Pasien, (pasien) => pasien.tindakanId)
  pasienId: Pasien | number;

  @OneToMany(
    () => TransaksiPembayaran,
    (transaksiPembayaran) => transaksiPembayaran.tindakanId,
  )
  transaksiPembayaranId: TransaksiPembayaran | number;
}
