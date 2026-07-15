export interface getUserProfileResponse{
    message: string, 
    user: {
        username: string,
        email: string,
        role: string

        id: number,
        account_id: number,
        admin_id: number,
        nama_lengkap: string,
        sekolah: string,
        jurusan: string,
        nomor_telepon: string,
        hadir: number,
        tidak_masuk: number,
        laporan: string,
        periode_awal: string, 
        periode_akhir: string,
        created_at: string, 
        updated_at: string
    }
}

export interface getAdminProfileResponse{
    message: string,
    admin: {
        username: string,
        email: string,
        role: string,

        id: number,
        account_id: number,
        nama_lengkap: string,
        perusahaan: string, 
        divisi: string, 
        nomor_telepon: string,
        siswa_pkl: number,
        sekolah_mitra: number,
        laporan_hari_ini: number, 
        created_at: string,
        updated_at: string
    }
}