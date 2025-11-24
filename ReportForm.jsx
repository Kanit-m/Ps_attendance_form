```javascript
import React from 'react';

// ข้อมูลตัวอย่าง (ข้อมูลนี้จะมาจาก Logic การประมวลผล Firestore ของคุณ)
const mockReportData = {
    // ข้อมูลจำนวนนักเรียนเต็ม (Master Data - ดึงจาก students)
    totalStudents: {
        'อนุบาลปีที่ 2 (4 ขวบ)': { maleTotal: 17, femaleTotal: 11, total: 28 },
        'อนุบาลปีที่ 3 (5 ขวบ)': { maleTotal: 16, femaleTotal: 14, total: 30 },
        'รวมอนุบาล': { maleTotal: 33, femaleTotal: 25, total: 58 },
        'ประถมศึกษาปีที่ 1': { maleTotal: 6, femaleTotal: 12, total: 18 },
        'ประถมศึกษาปีที่ 2': { maleTotal: 13, femaleTotal: 16, total: 29 },
        'ประถมศึกษาปีที่ 3': { maleTotal: 10, femaleTotal: 8, total: 18 },
        'ประถมศึกษาปีที่ 4': { maleTotal: 7, femaleTotal: 8, total: 15 },
        'ประถมศึกษาปีที่ 5': { maleTotal: 6, femaleTotal: 11, total: 17 },
        'ประถมศึกษาปีที่ 6': { maleTotal: 10, femaleTotal: 10, total: 20 },
        'รวมประถมศึกษา': { maleTotal: 52, femaleTotal: 65, total: 117 },
        'รวมนักเรียนทั้งสิ้น': { maleTotal: 85, femaleTotal: 90, total: 175 },
    },
    // ข้อมูลสถิติการมาเรียน (Attendance Data - ดึงจาก attendance)
    attendanceStats: {
        'อนุบาลปีที่ 2 (4 ขวบ)': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'อนุบาลปีที่ 3 (5 ขวบ)': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'รวมอนุบาล': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'ประถมศึกษาปีที่ 1': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'ประถมศึกษาปีที่ 2': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'ประถมศึกษาปีที่ 3': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'ประถมศึกษาปีที่ 4': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'ประถมศึกษาปีที่ 5': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'ประถมศึกษาปีที่ 6': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'รวมประถมศึกษา': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
        'รวมนักเรียนทั้งสิ้น': { attendedMale: 0, attendedFemale: 0, absentMale: 0, absentFemale: 0, attendedTotal: 0, absentTotal: 0 },
    }
};

const ReportForm = ({ reportData = mockReportData }) => {
    // ฟังก์ชันช่วยดึงข้อมูลสถิติ
    const getStats = (grade) => {
        const students = reportData.totalStudents[grade] || {};
        const stats = reportData.attendanceStats[grade] || {};
        return { ...students, ...stats };
    };

    return (
        <div id="full-school-report" className="report-container">
            <header className="report-header">
                <h3>สถิตินักเรียนและการปฏิบัติหน้าที่ของครูเวรประจำวัน</h3>
                <p>โรงเรียนประชาสามัคคี สำนักงานเขตพื้นที่การศึกษาประถมศึกษาพระนครศรีอยุธยา เขต 1</p>
                <p>ประจำวัน................................................ที่.................. เดือน พฤศจิกายน พ.ศ. 2568</p>
            </header>

            <table className="attendance-table" border="1" cellSpacing="0" cellPadding="5">
                <thead>
                    <tr>
                        <th rowSpan="2" style={{ width: '5%' }}>ที่</th>
                        <th rowSpan="2" style={{ width: '25%' }}>ชั้น</th>
                        <th colSpan="3">จำนวนเต็ม</th>
                        <th colSpan="3">มาเรียน</th>
                        <th colSpan="3">ขาดเรียน</th>
                        <th rowSpan="2" style={{ width: '15%' }}>หมายเหตุ</th>
                    </tr>
                    <tr>
                        <th>ชาย</th>
                        <th>หญิง</th>
                        <th>รวม</th>
                        <th>ชาย</th>
                        <th>หญิง</th>
                        <th>รวม</th>
                        <th>ชาย</th>
                        <th>หญิง</th>
                        <th>รวม</th>
                    </tr>
                </thead>
                <tbody>
                    {/* ข้อมูล อนุบาล */}
                    {['อนุบาลปีที่ 2 (4 ขวบ)', 'อนุบาลปีที่ 3 (5 ขวบ)'].map((grade, index) => {
                        const data = getStats(grade);
                        return (
                            <tr key={grade}>
                                <td>{index + 1}</td>
                                <td style={{ textAlign: 'left', paddingLeft: '10px' }}>{grade}</td>
                                <td>{data.maleTotal || ''}</td>
                                <td>{data.femaleTotal || ''}</td>
                                <td>{data.total || ''}</td>
                                <td>{data.attendedMale || ''}</td>
                                <td>{data.attendedFemale || ''}</td>
                                <td>{data.attendedTotal || ''}</td>
                                <td>{data.absentMale || ''}</td>
                                <td>{data.absentFemale || ''}</td>
                                <td>{data.absentTotal || ''}</td>
                                <td></td>
                            </tr>
                        );
                    })}

                    {/* รวมอนุบาล */}
                    <tr className="summary-row">
                        <td colSpan="2">รวมอนุบาล</td>
                        <td>{getStats('รวมอนุบาล').maleTotal}</td>
                        <td>{getStats('รวมอนุบาล').femaleTotal}</td>
                        <td>{getStats('รวมอนุบาล').total}</td>
                        <td>{getStats('รวมอนุบาล').attendedMale || ''}</td>
                        <td>{getStats('รวมอนุบาล').attendedFemale || ''}</td>
                        <td>{getStats('รวมอนุบาล').attendedTotal || ''}</td>
                        <td>{getStats('รวมอนุบาล').absentMale || ''}</td>
                        <td>{getStats('รวมอนุบาล').absentFemale || ''}</td>
                        <td>{getStats('รวมอนุบาล').absentTotal || ''}</td>
                        <td></td>
                    </tr>

                    {/* ข้อมูล ประถมศึกษา */}
                    {['ประถมศึกษาปีที่ 1', 'ประถมศึกษาปีที่ 2', 'ประถมศึกษาปีที่ 3', 'ประถมศึกษาปีที่ 4', 'ประถมศึกษาปีที่ 5', 'ประถมศึกษาปีที่ 6'].map((grade, index) => {
                        const data = getStats(grade);
                        return (
                            <tr key={grade}>
                                <td>{index + 3}</td>
                                <td style={{ textAlign: 'left', paddingLeft: '10px' }}>{grade}</td>
                                <td>{data.maleTotal || ''}</td>
                                <td>{data.femaleTotal || ''}</td>
                                <td>{data.total || ''}</td>
                                <td>{data.attendedMale || ''}</td>
                                <td>{data.attendedFemale || ''}</td>
                                <td>{data.attendedTotal || ''}</td>
                                <td>{data.absentMale || ''}</td>
                                <td>{data.absentFemale || ''}</td>
                                <td>{data.absentTotal || ''}</td>
                                <td></td>
                            </tr>
                        );
                    })}

                    {/* รวมประถมศึกษา */}
                    <tr className="summary-row">
                        <td colSpan="2">รวมประถมศึกษา</td>
                        <td>{getStats('รวมประถมศึกษา').maleTotal}</td>
                        <td>{getStats('รวมประถมศึกษา').femaleTotal}</td>
                        <td>{getStats('รวมประถมศึกษา').total}</td>
                        <td>{getStats('รวมประถมศึกษา').attendedMale || ''}</td>
                        <td>{getStats('รวมประถมศึกษา').attendedFemale || ''}</td>
                        <td>{getStats('รวมประถมศึกษา').attendedTotal || ''}</td>
                        <td>{getStats('รวมประถมศึกษา').absentMale || ''}</td>
                        <td>{getStats('รวมประถมศึกษา').absentFemale || ''}</td>
                        <td>{getStats('รวมประถมศึกษา').absentTotal || ''}</td>
                        <td></td>
                    </tr>

                    {/* รวมนักเรียนทั้งสิ้น */}
                    <tr className="grand-total-row">
                        <td colSpan="2">รวมนักเรียนทั้งสิ้น</td>
                        <td>{getStats('รวมนักเรียนทั้งสิ้น').maleTotal}</td>
                        <td>{getStats('รวมนักเรียนทั้งสิ้น').femaleTotal}</td>
                        <td>{getStats('รวมนักเรียนทั้งสิ้น').total}</td>
                        <td>{getStats('รวมนักเรียนทั้งสิ้น').attendedMale || ''}</td>
                        <td>{getStats('รวมนักเรียนทั้งสิ้น').attendedFemale || ''}</td>
                        <td>{getStats('รวมนักเรียนทั้งสิ้น').attendedTotal || ''}</td>
                        <td>{getStats('รวมนักเรียนทั้งสิ้น').absentMale || ''}</td>
                        <td>{getStats('รวมนักเรียนทั้งสิ้น').absentFemale || ''}</td>
                        <td>{getStats('รวมนักเรียนทั้งสิ้น').absentTotal || ''}</td>
                        <td style={{ textAlign: 'left' }}>ร้อยละ....................</td>
                    </tr>
                </tbody>
            </table>

            <div className="duty-notes">
                <p className="note-header">● บันทึกครูเวรประจำวัน</p>
                <div className="note-content">
                    <p>เวลา 07.30 น. ควบคุม แนะนำการทำความสะอาดอาคารเรียน บริเวณโรงเรียนและอื่น</p>
                    <p>เวลา 08.00 น. ให้สัญญาณเข้าแถว ควบคุมการเข้าแถว เคารพธงชาติ ทำกิจกรรมประจำวัน</p>
                    <div className="note-indent">
                        <p>อบรมนักเรียนหน้าเสาธง เรื่อง 1 <span className="dotted-line full-width"></span></p>
                        <p style={{ paddingLeft: '145px' }}>2 <span className="dotted-line full-width"></span></p>
                    </div>
                    <p>เวลา 08.30 น. เข้าห้องเรียน</p>
                    <p>เวลา 11.30 น. พักกลางวัน / ทำกิจกรรม</p>
                    <p>เวลา 12.15 น. ให้สัญญาณตีระฆังเข้าเรียนช่วงบ่ายและอบรมเพิ่มเติม</p>
                    <div className="note-indent">
                        <p style={{ paddingLeft: '145px' }}>เรื่อง <span className="dotted-line full-width"></span></p>
                    </div>
                    <p>เวลา 15.20 น. ให้สัญญาณตีระฆังกลับบ้าน / ควบคุมการเดินแถวกลับบ้าน</p>
                    <div className="note-indent">
                        <p>เรื่องอื่น ๆ (ถ้ามี) <span className="dotted-line full-width"></span></p>
                    </div>
                </div>
            </div>

            <div className="signature-area">
                <div className="signature-block">
                    <p>ลงชื่อ..................................................................ครูเวรประจำวัน</p>
                    <p>(..................................................................)</p>
                </div>
                <div className="signature-block">
                    <p>ลงชื่อ..................................................................ผู้อำนวยการ</p>
                    <p>(นางสาวจินดา พลีรักษ์ )</p>
                </div>
            </div>

        </div>
    );
};

export default ReportForm;
```