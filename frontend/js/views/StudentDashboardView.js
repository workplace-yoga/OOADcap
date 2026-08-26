import { studentService } from '../services/StudentService.js';
import { authService } from '../services/AuthService.js';
import { state } from '../core/StateManager.js';

export async function renderStudentDashboardView() {
  const [coursesRes, attRes, transcriptRes] = await Promise.all([
    studentService.getMyCourses().catch(() => ({ data: [] })),
    studentService.getMyAttendance().catch(() => ({ data: [] })),
    studentService.getMyTranscript().catch(() => ({ data: [] }))
  ]);

  const courses = coursesRes.data || [];
  const attendance = attRes.data || [];
  const transcript = transcriptRes.data || [];

  return `
  <div class="app-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo" style="background: linear-gradient(135deg, var(--accent-emerald), var(--accent-primary));"><i class="fa-solid fa-graduation-cap"></i></div>
        <div>
          <div class="sidebar-title">Student Portal</div>
          <div style="font-size: 11px; color: var(--accent-emerald); font-weight: 600;">LEARNER ACADEMIC DESK</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-item active"><i class="fa-solid fa-chart-line"></i> Academic Overview</div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-badge">
          <div class="user-avatar" style="background: var(--accent-emerald);">S</div>
          <div style="flex: 1; overflow: hidden;">
            <div style="font-weight: 600; font-size: 13px;">${state.user.username}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${state.user.studentId || 'STUDENT'}</div>
          </div>
          <button class="btn btn-secondary btn-sm" id="logout-btn"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
      </div>
    </aside>

    <main class="main-viewport">
      <header class="top-bar">
        <div class="page-title-group">
          <h1>Student Academic Dashboard</h1>
          <p>Real-time attendance tracking &amp; course performance report (FR-13, FR-17, FR-20)</p>
        </div>
      </header>

      <!-- Enrolled Courses Cards -->
      <h3 style="margin-bottom: 16px;">Enrolled Courses (Fall 2026)</h3>
      <div class="stat-grid" style="margin-bottom: 32px;">
        ${courses.map(c => `
          <div class="glass-card" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
              <span class="badge badge-info">${c.courseDetails ? c.courseDetails.courseCode : 'COURSE'}</span>
              <span class="badge badge-success">${c.grade}</span>
            </div>
            <h4 style="font-size: 16px; margin-bottom: 6px;">${c.courseDetails ? c.courseDetails.title : 'Course Name'}</h4>
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Instructor: ${c.courseDetails && c.courseDetails.facultyName ? c.courseDetails.facultyName : 'Assigned Faculty'}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px; border-top: 1px solid var(--border-subtle); padding-top: 8px;">
              <span>Attendance: <strong>${c.attendancePercentage}%</strong></span>
              <span>Avg Score: <strong>${c.averageMark}%</strong></span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Attendance Breakdown -->
      <div class="glass-card" style="margin-bottom: 32px;">
        <h3 style="margin-bottom: 16px;">Attendance Breakdown per Course (FR-17)</h3>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Total Sessions</th>
                <th>Attendance Rate</th>
                <th>Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              ${attendance.map(a => `
                <tr>
                  <td><strong>${a.courseCode}</strong></td>
                  <td>${a.courseTitle}</td>
                  <td>${a.totalSessions} Lectures</td>
                  <td><strong>${a.attendancePercentage}%</strong></td>
                  <td>
                    <span class="badge ${a.attendancePercentage >= 75 ? 'badge-success' : 'badge-danger'}">
                      ${a.attendancePercentage >= 75 ? 'Satisfactory' : 'Low Attendance Warning'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Academic Transcript -->
      <div class="glass-card">
        <h3 style="margin-bottom: 16px;">Academic Transcript &amp; Continuous Marks (FR-20)</h3>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Credits</th>
                <th>Weighted Mark</th>
                <th>Grade</th>
                <th>Assessments Recorded</th>
              </tr>
            </thead>
            <tbody>
              ${transcript.map(t => `
                <tr>
                  <td><strong>${t.courseCode} — ${t.courseTitle}</strong></td>
                  <td>${t.creditUnits} Units</td>
                  <td>${t.averagePercentage}%</td>
                  <td><span class="badge badge-info">${t.finalGrade}</span></td>
                  <td>
                    ${t.assessments.map(ev => `<span style="font-size: 12px; color: var(--text-muted); display: block;">• ${ev.assessmentType}: <strong>${ev.scoreObtained}/${ev.maximumScore}</strong> (${ev.percentage}%)</span>`).join('')}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
  `;
}

export function attachStudentEvents() {
  document.getElementById('logout-btn')?.addEventListener('click', () => authService.logout());
}
