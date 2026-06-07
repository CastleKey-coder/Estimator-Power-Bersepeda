ESTIMATOR POWER BERSEPEDA
=========================

Aplikasi ini digunakan untuk menghitung estimasi power/watt saat bersepeda tanpa power meter. Perhitungan bersifat estimasi berdasarkan data kecepatan, berat, tanjakan, angin, posisi tubuh, permukaan jalan, drivetrain, dan data gear fixed gear.

STRUKTUR FILE
-------------
Pastikan semua file berikut berada dalam satu folder:

1. index.html
   File utama untuk membuka aplikasi di browser.

2. style.css
   File tampilan/desain aplikasi.

3. script.js
   File rumus dan logika perhitungan.

CARA MENJALANKAN APLIKASI
-------------------------
1. Ekstrak file ZIP aplikasi.
2. Buka folder hasil ekstrak.
3. Klik dua kali file index.html.
4. Aplikasi akan terbuka di browser.
5. Pastikan file style.css dan script.js tidak dipindah dari folder yang sama.

CARA INPUT DATA RIDE
--------------------

1. Jarak ride (km)
   Isi total jarak bersepeda dalam kilometer.
   Contoh: 50

2. Moving time (hh:mm:ss)
   Isi waktu bergerak, bukan total elapsed time.
   Format yang disarankan: jam:menit:detik.
   Contoh: 01:30:24

3. Kecepatan rata-rata (km/jam)
   Isi kecepatan rata-rata selama ride.
   Jika belum tahu, isi jarak dan moving time, lalu klik tombol "Hitung Speed dari Jarak & Waktu".

4. Berat badan pesepeda (kg)
   Isi berat badan pesepeda.
   Contoh: 60

5. Berat sepeda + perlengkapan (kg)
   Isi berat sepeda ditambah perlengkapan yang ikut terbawa.
   Contoh: sepeda 7,6 kg + botol/minum/tas 1 kg = 8,6 kg.

6. Elevation gain (meter)
   Isi total elevasi naik selama ride.
   Contoh: 128

7. Kemiringan / grade rata-rata (%)
   Isi rata-rata kemiringan jalan.
   Jika belum tahu, isi jarak dan elevation gain, lalu klik "Hitung Grade dari Elev Gain".
   Catatan: grade dari elevation gain adalah pendekatan kasar, karena rute asli biasanya naik-turun.

CARA INPUT DATA GEAR DAN UKURAN SEPEDA
--------------------------------------

1. Gear yang digunakan
   Isi rasio gear fixed gear dalam format chainring/cog.
   Contoh: 52/15

2. Chainring depan (T)
   Isi jumlah gigi chainring depan.
   Contoh: 52

3. Cog belakang (T)
   Isi jumlah gigi cog belakang.
   Contoh: 15

4. Ukuran frame sepeda
   Pilih ukuran frame yang sesuai, misalnya XS, S, M, L, XL, atau custom.
   Jika menggunakan custom, isi angka pada kolom frame size custom.

5. Frame size custom (cm)
   Isi ukuran frame dalam sentimeter jika ukuran tidak tersedia di pilihan.
   Contoh: 54

6. Ukuran roda/ban
   Pilih ukuran roda/ban yang digunakan.
   Contoh umum fixed gear: 700x25c, 700x28c, atau 700x32c.

7. Keliling roda/ban (meter)
   Keliling roda dipakai untuk menghitung rollout dan cadence.
   Contoh umum:
   - 700x23c: 2,096 m
   - 700x25c: 2,105 m
   - 700x28c: 2,136 m
   - 700x32c: 2,155 m

CARA INPUT POSISI, JALAN, DAN ANGIN
-----------------------------------

1. Posisi bersepeda
   Pilih posisi yang paling mendekati gaya bersepeda Anda.
   - Upright / santai: posisi badan lebih tegak, hambatan angin lebih besar.
   - Road bike hoods santai: posisi cukup umum saat bersepeda.
   - Road bike hoods cukup aero: posisi lebih menunduk dan efisien.
   - Drops: posisi lebih aero.
   - Aero/TT position: posisi paling aero.

2. CdA / drag area (m²)
   CdA menggambarkan hambatan angin dari tubuh dan sepeda.
   Semakin kecil CdA, semakin aerodinamis.
   Nilai ini sangat memengaruhi estimasi power, terutama pada kecepatan tinggi.

3. Permukaan jalan
   Pilih kondisi permukaan jalan.
   - Aspal sangat halus: rolling resistance rendah.
   - Aspal normal: kondisi umum jalan raya.
   - Aspal kasar: membutuhkan power lebih besar.
   - Gravel ringan: rolling resistance lebih besar.

4. Crr / rolling resistance
   Crr adalah angka hambatan gulir ban terhadap jalan.
   Semakin besar Crr, semakin besar power yang dibutuhkan.

5. Angin depan (+) / belakang (-), km/jam
   Isi angin depan dengan angka positif.
   Contoh: headwind 10 km/jam, isi 10.
   Isi angin belakang dengan angka negatif.
   Contoh: tailwind 10 km/jam, isi -10.

6. Suhu udara (°C)
   Dipakai untuk memperkirakan kepadatan udara.
   Contoh: 25

7. Ketinggian lokasi (m dpl)
   Dipakai untuk memperkirakan kepadatan udara.
   Semakin tinggi lokasi, udara semakin tipis dan hambatan udara sedikit berkurang.

8. Efisiensi drivetrain (%)
   Menggambarkan berapa persen tenaga dari pedal yang sampai ke roda belakang.
   Untuk fixed gear kondisi normal, isi 96-97%.
   Rantai bersih, lube bagus, dan chainline lurus bisa memakai 97-98%.
   Rantai kotor, kering, atau terlalu kencang bisa lebih rendah.

9. Akselerasi: speed awal, speed akhir, dan durasi akselerasi
   Bagian ini dipakai jika ingin menghitung kebutuhan power saat akselerasi.
   Untuk estimasi rata-rata ride biasa, biarkan durasi akselerasi 0.

CARA MEMBACA HASIL PERHITUNGAN
------------------------------

1. Estimasi power / watt utama
   Angka besar di bagian atas hasil adalah estimasi power di pedal.
   Ini adalah perkiraan tenaga yang dikeluarkan pesepeda setelah memperhitungkan efisiensi drivetrain.

2. W/kg
   Power-to-weight ratio, yaitu watt dibagi berat badan pesepeda.
   Rumus: estimasi power / berat badan.
   Contoh: 210 W dengan berat 60 kg = 3,50 W/kg.

3. Wheel power
   Estimasi power yang sampai ke roda belakang.
   Nilai ini lebih kecil daripada power pedal karena ada kehilangan tenaga di drivetrain.

4. Drivetrain loss
   Selisih antara power pedal dan wheel power.
   Contoh: wheel power 200 W dan efisiensi 97%, maka power pedal sekitar 206 W dan loss sekitar 6 W.

5. Air density
   Estimasi kepadatan udara berdasarkan suhu dan ketinggian.
   Nilai ini memengaruhi hambatan aerodinamika.

6. Mechanical work
   Total kerja mekanis selama moving time, ditampilkan dalam kJ.
   Semakin lama dan semakin besar power, nilai kJ akan semakin besar.

7. Metabolic estimate
   Estimasi kalori metabolik tubuh.
   Ini bukan angka kalori mutlak, tetapi perkiraan berdasarkan mechanical work dan asumsi efisiensi tubuh.

CARA MEMBACA HASIL GEAR FIXED GEAR
----------------------------------

1. Gear digunakan
   Menampilkan rasio gear yang dimasukkan.
   Contoh: 52/15.

2. Gear ratio
   Perbandingan chainring depan dengan cog belakang.
   Rumus: chainring / cog.
   Contoh: 52 / 15 = 3,47.

3. Rollout
   Jarak tempuh sepeda untuk 1 putaran pedal penuh.
   Semakin besar rollout, gear terasa semakin berat.

4. Cadence estimasi
   Estimasi putaran pedal per menit pada kecepatan yang dimasukkan.
   Contoh: pada gear 52/15 dan kecepatan 33 km/jam, cadence akan dihitung dari kecepatan, rollout, dan keliling roda.

5. Skid patches
   Jumlah titik skid berbeda pada ban belakang untuk fixed gear.
   Semakin banyak skid patches, keausan ban bisa lebih tersebar.
   Jika sering skid, rasio dengan skid patches lebih banyak biasanya lebih ramah ban.

6. Frame / roda
   Menampilkan ringkasan ukuran frame dan ukuran roda/ban yang dipilih.
   Bagian ini untuk dokumentasi setup sepeda, bukan penentu utama estimasi watt.

CARA MEMBACA BREAKDOWN POWER
----------------------------

1. Aerodinamika
   Power yang dipakai untuk melawan hambatan angin.
   Biasanya menjadi komponen terbesar saat kecepatan tinggi.
   Semakin cepat laju sepeda, kebutuhan power aerodinamika naik sangat besar.

2. Rolling resistance
   Power yang dipakai untuk melawan hambatan gulir ban di permukaan jalan.
   Dipengaruhi oleh ban, tekanan ban, berat total, dan kondisi jalan.

3. Tanjakan / gravitasi
   Power yang dipakai untuk melawan gravitasi saat jalan menanjak.
   Dipengaruhi oleh berat total, grade, dan kecepatan.

4. Akselerasi
   Power tambahan untuk menaikkan kecepatan dari speed awal ke speed akhir.
   Jika durasi akselerasi diisi 0, nilai ini akan 0.

CATATAN PENTING
---------------
1. Aplikasi ini hanya estimasi, bukan pengganti power meter.
2. Hasil sangat dipengaruhi oleh CdA, angin, grade, berat total, dan Crr.
3. Gear fixed gear tidak langsung mengubah kebutuhan power saat steady speed, tetapi memengaruhi cadence, rollout, dan rasa berat kayuhan.
4. Untuk hasil lebih mendekati kondisi nyata, gunakan data yang akurat dari GPS, barometer/elevation, dan kondisi angin sebenarnya.
5. Perhitungan zona power dan FTP sudah dihapus agar aplikasi fokus pada estimasi watt, komponen hambatan, dan data gear.
