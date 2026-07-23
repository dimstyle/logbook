export interface getAttendanceHistoryResponse{
    message: string,
    attendances: DailyAttendance[]
}

export interface getAttendanceDailyResponse{
    message: string,
    attendance: DailyAttendance
}

export interface DailyAttendance{
    account_id : number,
    id: number, 
    jam_hadir: string
    jam_pulang: string,
    laporan: string,
    created_date: string
}