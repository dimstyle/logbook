// import React from 'react';
// import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
// import freckle from "@fontsource/freckle-face/files/freckle-face-latin-400-normal.woff"
// import fredoka from "@fontsource/fredoka-one/files/fredoka-one-latin-400-normal.woff"

// function formatTime(time: string | null | undefined) {
//     if(!time || time.trim() === "") return "N/A";

//     const hour = Number(time.split(":")[0]);  
//     const period = hour < 12 ? "AM" : "PM";

//     return `${time} ${period}`;
    
// }

// function formatDate(dateStr: string | null | undefined) {
//     if (!dateStr || dateStr.trim() === "") return "N/A";
//     return new Date(dateStr).toLocaleDateString('id-ID', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric'
//     });
// }

// Font.register({
//     family: 'Freckle',
//     fonts: [
//         { src: freckle }
//     ],
// })

// Font.register({
//     family: 'Fredoka',
//     fonts: [
//         { src: fredoka }
//     ],
// })

// const styles = StyleSheet.create({
//     page: { padding: 30, fontSize: 12 },
//     title: { fontFamily: 'Freckle', color: '#FF5454' , fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
//     info: { fontSize: 12, fontFamily: 'Fredoka' },
//     table: { display: 'flex', width: 'auto', backgroundColor: '#838383', borderStyle: 'solid', borderWidth: 1, borderColor: '#ffffff', marginBottom: 10 },
//     tableRow: { flexDirection: 'row' },
//     tableHeader: { backgroundColor: '#505050', fontWeight: 'bold' },
//     tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#ffffff', padding: 5 },
//     tableCell: { fontFamily: 'Fredoka', fontSize: 10, color: "#ffffff" }
// })

// interface ReportPDFProps {
//     data: Array<{
//         id: number;
//         laporan: string;
//         jam_hadir: string;
//         jam_pulang: string;
//         created_date: string;
//     }>;
//     userProfile: {
//         name: string;
//         school: string;
//         major: string;
//     }
// }

// export const ReportPDF: React.FC<ReportPDFProps> = ({ data, userProfile }) => (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             <Text style={styles.title}>Logbook Report</Text>
//             <View style={[{ display: 'flex' }, { flexDirection: 'row' }, { marginLeft: 3 }, { gap: 5 }]}>
//                 <Text style={styles.info}>Nama</Text>
//                 <Text style={styles.info}>: {userProfile.name}</Text>
//             </View>
//             <View style={[{ display: 'flex' }, { flexDirection: 'row' }, { marginLeft: 3 }, { gap: 5 }]}>
//                 <Text style={styles.info}>Sekolah</Text>
//                 <Text style={styles.info}>: {userProfile.school}</Text>
//             </View>
//             <View style={[{ display: 'flex' }, { flexDirection: 'row' }, { marginLeft: 3 }, { gap: 5 }, { marginBottom: 5 }]}>
//                 <Text style={styles.info}>Jurusan</Text>
//                 <Text style={styles.info}>: {userProfile.major}</Text>
//             </View>
//             <View style={styles.table}>
//                 <View style={[styles.tableRow, styles.tableHeader]}>
//                     <View style={[styles.tableCol, { display: 'flex' }, { justifyContent: 'center' }, { alignItems: 'center' }]}><Text style={styles.tableCell}>Activities</Text></View>
//                     <View style={[styles.tableCol, { display: 'flex' }, { justifyContent: 'center' }, { alignItems: 'center' }]}><Text style={styles.tableCell}>Clock In</Text></View>
//                     <View style={[styles.tableCol, { display: 'flex' }, { justifyContent: 'center' }, { alignItems: 'center' }]}><Text style={styles.tableCell}>Clock Out</Text></View>
//                     <View style={[styles.tableCol, { display: 'flex' }, { justifyContent: 'center' }, { alignItems: 'center' }]}><Text style={styles.tableCell}>Date</Text></View>
//                 </View>
//                 {data.map((row) => (
//                     <View style={styles.tableRow} key={row.id}>
//                         <View style={[styles.tableCol, { display: 'flex' }, { justifyContent: 'center' }, { alignItems: 'center' }]}><Text style={[styles.tableCell, { textAlign: 'center' }]}>{row.laporan || "N/A"}</Text></View>
//                         <View style={[styles.tableCol, { display: 'flex' }, { justifyContent: 'center' }, { alignItems: 'center' }]}><Text style={[styles.tableCell, { opacity: row.jam_hadir ? 1 : 0.5 },]}>{formatTime(row.jam_hadir)}</Text></View>
//                         <View style={[styles.tableCol, { display: 'flex' }, { justifyContent: 'center' }, { alignItems: 'center' }]}><Text style={[styles.tableCell, { opacity: row.jam_pulang ? 1 : 0.5 },]}>{formatTime(row.jam_pulang)}</Text></View>
//                         <View style={[styles.tableCol, { display: 'flex' }, { justifyContent: 'center' }, { alignItems: 'center' }]}><Text style={[styles.tableCell, { opacity: row.created_date ? 1: 0.5 }]}>{formatDate(row.created_date)}</Text></View>
//                     </View>
//                 ))}
//             </View>
//         </Page>
//     </Document>
// )