export interface getAttendanceHistoryResponse{
    message: string,
    attendances: DailyAttendance[],
    user: {
        nama_lengkap: string,
        sekolah: string,
        jurusan: string
    }
}

export interface getAttendanceDailyResponse{
    message: string,
    attendance: DailyAttendance
}

export interface getAttendanceListResponse{
    message: string,
    attendances: {
        account_id: number ,
        attendance_id: number,

        nama_lengkap: string,
        sekolah: string,
        jurusan: string,
        profile_photo: string,

        sudah_hadir: boolean,
        sudah_laporan: boolean,
        sudah_pulang: boolean,
        izin: boolean,
        sakit: boolean,
        wfh: boolean,
        created_date: string,
        updated_at: string
    }[]
}

export interface DailyAttendance{
    account_id : number,
    id: number, 
    jam_hadir: string
    jam_pulang: string,
    laporan: string,
    images: string,
    created_date: string
}

export interface getAttendancePhotosResponse{
    message: string,
    photos: {
        images: string[]
    }
}

export interface getAttendanceDetails{
    message: string,
    attendance: {
        nama_lengkap: string,
        sekolah: string,
        jurusan: string,
        divisi: string,
        profile_photo: string,

        sudah_hadir: boolean,
        wfh: boolean,
        jam_hadir: string,

        sudah_laporan: boolean,
        laporan: string,
        images: string,

        sudah_pulang: boolean,
        jam_pulang: string,

        created_date: string,       
    }
}