export interface getAttendanceHistoryResponse{
    message: string,
    attendances: getAttendanceDailyResponse[]
}

export interface getAttendanceDailyResponse{
    message: string,
    attendance: {
        account_id : number,
        id: number, 
        jam_hadir: string
        jam_pulang: string,
        laporan: string,
        created_date: string
    }
}