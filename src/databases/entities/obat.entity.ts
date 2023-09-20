import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TransaksiPembayaran } from './transaksi.entity';

@Entity()
export class Obat {
  @PrimaryGeneratedColumn()
  ID_Obat: number;

  @Column({ nullable: true })
  Nama_Obat: string;

  @Column({ nullable: true })
  Jumlah_Stok: number;

  @Column({ nullable: true })
  Harga: number;

  @Column({ nullable: true })
  Deskripsi: string;

  @OneToMany(
    () => TransaksiPembayaran,
    (transaksiPembayaran) => transaksiPembayaran.obatId,
  )
  obatId: TransaksiPembayaran | number;
}
