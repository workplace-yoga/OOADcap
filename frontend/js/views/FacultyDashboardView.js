import { facultyService } from '../services/FacultyService.js';
import { authService } from '../services/AuthService.js';
import { state, showToast, openModal, closeModal } from '../core/StateManager.js';

export async function renderFacultyDashboardView(activeCourseId = null) {
  const coursesRes = await facultyService.getMyCourses().catch(() => ({ data: [] }));
  const courses = coursesRes.data || [];
  const selectedCourse = activeCourseId ? courses.find(c => c.courseId === activeCourseId) : courses[0];

  let roster = [];
  if (selectedCourse) {
    const rosterRes = await facultyService.getCourseRoster(selectedCourse.courseId).catch(() => ({ data: [] }));
    roster = rosterRes.data || [];
  }

  return `
  <div class="app-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo" style="background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));"><i class="fa-solid fa-chalkboard-user"></i></div>
        <div>
          <div class="sidebar-title">Faculty Portal</div>
          <div style="font-size: 11px; color: var(--accent-purple); font-weight: 600;">INSTRUCTOR DASHBOARD</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-item active"><i class="fa-solid fa-book"></i> Assigned Courses</div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-badge">
          <div class="user-avatar" style="background: var(--accent-purple);">F</div>
          <div style="flex: 1; overflow: hidden;">
            <div style="font-weight: 600; font-size: 13px;">${state.user.username}</div>
            <div style="font-size: 11px; color: var(--text-muted);">INSTRUCTOR</div>
          </div>
          <button class="btn btn-secondary btn-sm" id="logout-btn"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
      </div>
    </aside>

    <main class="main-viewport">
      <header class="top-bar">
        <div class="page-title-group">
          <h1>Faculty Classroom &amp; Evaluation</h1>
          <p>Attendance tracking &amp; continuous assessment marks management</p>
        </div>
        <div class="top-actions">
          ${selectedCourse ? `
            <button class="btn btn-primary btn-sm" id="mark-attendance-btn"><i class="fa-solid fa-calendar-check"></i> Record Attendance (FR-15)</button>
            <button class="btn btn-secondary btn-sm" id="enter-marks-btn"><i class="fa-solid fa-marker"></i> Enter Marks (FR-18)</button>
          ` : ''}
        </div>
      </header>

      <!-- Assigned Courses Selector -->
      <div style="display: flex; gap: 12px; margin-bottom: 24px; overflow-x: auto;">
        ${courses.map(c => `
          <button class="btn ${selectedCourse && selectedCourse.courseId === c.courseId ? 'btn-primary' : 'btn-secondary'}" 
            onclick="window.location.hash='#/faculty/dashboard?courseId=${c.courseId}'">
            <i class="fa-solid fa-book-bookmark"></i> ${c.courseCode} — ${c.title}
          </button>
        `).join('')}
      </div>

      ${selectedCourse ? `
        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3>Enrolled Student Roster (${roster.length} Students)</h3>
            <span class="badge badge-info">${selectedCourse.creditUnits} Credits</span>
          </div>

          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th>Department</th>
                  <th>Attendance %</th>
                  <th>Average Mark</th>
                  <th>Current Grade</th>
                </tr>
              </thead>
              <tbody>
                ${roster.map(item => `
                  <tr>
                    <td><strong>${item.student ? item.student.rollNumber : 'N/A'}</strong></td>
                    <td>${item.student ? item.student.fullName : 'N/A'}</td>
                    <td>${item.student ? item.student.department : 'N/A'}</td>
                    <td>
                      <span class="badge ${item.attendancePercentage >= 75 ? 'badge-success' : 'badge-danger'}">
                        ${item.attendancePercentage}%
                      </span>
                    </td>
                    <td>${item.averageMark}%</td>
                    <td><span class="badge badge-info">${item.grade}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : `
        <div class="glass-card" style="text-align: center; padding: 48px;">
          <p style="color: var(--text-muted);">No assigned courses found for your instructor account.</p>
        </div>
      `}
    </main>
  </div>
  `;
}

export function attachFacultyEvents(selectedCourse, roster) {
  document.getElementById('logout-btn')?.addEventListener('click', () => authService.logout());

  document.getElementById('mark-attendance-btn')?.addEventListener('click', () => {
    if (!selectedCourse) return;
    openModal(`
      <h3>Record Session Attendance (FR-15)</h3>
      <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Course: ${selectedCourse.courseCode} - ${selectedCourse.title}</p>
      
      <form id="attendance-form">
        <div class="form-group">
          <label class="form-label">Session Date</label>
          <input type="date" id="att-date" class="form-control" required value="${new Date().toISOString().split('T')[0]}">
        </div>

        <div style="max-height: 280px; overflow-y: auto; margin-bottom: 20px;">
          <table class="data-table">
            <thead>
              <tr><th>Student</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${roster.map(r => `
                <tr>
                  <td>${r.student.fullName} (${r.student.rollNumber})</td>
                  <td>
                    <select class="form-control att-status-select" data-student-id="${r.student.studentId}">
                      <option value="PRESENT">PRESENT</option>
                      <option value="ABSENT">ABSENT</option>
                      <option value="LATE">LATE</option>
                      <option value="EXCUSED">EXCUSED</option>
                    </select>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary" onclick="window.closeModalHandler()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Attendance Register</button>
        </div>
      </form>
    `);

    document.getElementById('attendance-form').onsubmit = async (e) => {
      e.preventDefault();
      const date = document.getElementById('att-date').value;
      const selects = document.querySelectorAll('.att-status-select');
      const entries = Array.from(selects).map(sel => ({
        studentId: sel.getAttribute('data-student-id'),
        status: sel.value
      }));

      try {
        await facultyService.recordAttendance({
          courseId: selectedCourse.courseId,
          sessionDate: date,
          sessionSlot: 1,
          entries
        });
        showToast('Attendance recorded successfully!', 'success');
        closeModal();
        window.location.reload();
      } catch (err) {
        showToast(err.message, 'error');
      }
    };
  });

  document.getElementById('enter-marks-btn')?.addEventListener('click', () => {
    if (!selectedCourse) return;
    openModal(`
      <h3>Enter Assessment Marks (FR-18)</h3>
      <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Course: ${selectedCourse.courseCode} - ${selectedCourse.title}</p>
      
      <form id="marks-form">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Assessment Title</label>
            <input type="text" id="eval-title" class="form-control" required placeholder="e.g. Midterm Exam">
          </div>
          <div class="form-group">
            <label class="form-label">Maximum Score</label>
            <input type="number" id="eval-max" class="form-control" required value="100" min="10">
          </div>
        </div>

        <div style="max-height: 280px; overflow-y: auto; margin-bottom: 20px;">
          <table class="data-table">
            <thead>
              <tr><th>Student</th><th>Score Obtained</th></tr>
            </thead>
            <tbody>
              ${roster.map(r => `
                <tr>
                  <td>${r.student.fullName} (${r.student.rollNumber})</td>
                  <td>
                    <input type="number" step="0.5" class="form-control mark-input" data-student-id="${r.student.studentId}" required placeholder="0 - 100" min="0" max="100">
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary" onclick="window.closeModalHandler()">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Scores</button>
        </div>
      </form>
    `);

    document.getElementById('marks-form').onsubmit = async (e) => {
      e.preventDefault();
      const assessmentType = document.getElementById('eval-title').value;
      const maxScore = document.getElementById('eval-max').value;
      const inputs = document.querySelectorAll('.mark-input');
      const entries = Array.from(inputs).map(inp => ({
        studentId: inp.getAttribute('data-student-id'),
        scoreObtained: Number(inp.value)
      }));

      try {
        await facultyService.submitMarks({
          courseId: selectedCourse.courseId,
          assessmentType,
          maximumScore: maxScore,
          entries
        });
        showToast('Assessment marks submitted successfully!', 'success');
        closeModal();
        window.location.reload();
      } catch (err) {
        showToast(err.message, 'error');
      }
    };
  });
}
