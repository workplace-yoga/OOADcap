import { adminService } from '../services/AdminService.js';
import { authService } from '../services/AuthService.js';
import { state, showToast, openModal, closeModal } from '../core/StateManager.js';

export async function renderAdminDashboardView(tab = 'overview') {
  const studentsRes = await adminService.getStudents().catch(() => ({ data: [] }));
  const facultyRes = await adminService.getFaculty().catch(() => ({ data: [] }));
  const coursesRes = await adminService.getCourses().catch(() => ({ data: [] }));

  const students = studentsRes.data || [];
  const faculty = facultyRes.data || [];
  const courses = coursesRes.data || [];

  return `
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo"><i class="fa-solid fa-shield-halved"></i></div>
        <div>
          <div class="sidebar-title">Admin Portal</div>
          <div style="font-size: 11px; color: var(--accent-primary); font-weight: 600;">CENTRAL SIS CONTROL</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-item ${tab === 'overview' ? 'active' : ''}" onclick="window.location.hash='#/admin/dashboard'"><i class="fa-solid fa-chart-pie"></i> Overview</div>
        <div class="nav-item ${tab === 'students' ? 'active' : ''}" onclick="window.location.hash='#/admin/students'"><i class="fa-solid fa-user-graduate"></i> Students</div>
        <div class="nav-item ${tab === 'faculty' ? 'active' : ''}" onclick="window.location.hash='#/admin/faculty'"><i class="fa-solid fa-chalkboard-user"></i> Faculty</div>
        <div class="nav-item ${tab === 'courses' ? 'active' : ''}" onclick="window.location.hash='#/admin/courses'"><i class="fa-solid fa-book-bookmark"></i> Courses &amp; Enrollment</div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-badge">
          <div class="user-avatar">A</div>
          <div style="flex: 1; overflow: hidden;">
            <div style="font-weight: 600; font-size: 13px;">${state.user.username}</div>
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">${state.user.role}</div>
          </div>
          <button class="btn btn-secondary btn-sm" id="logout-btn" title="Logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
      </div>
    </aside>

    <!-- Main Viewport -->
    <main class="main-viewport">
      <header class="top-bar">
        <div class="page-title-group">
          <h1>${tab === 'overview' ? 'Institutional Dashboard' : tab.charAt(0).toUpperCase() + tab.slice(1) + ' Management'}</h1>
          <p>Object-Oriented Central Student Information System</p>
        </div>
        <div class="top-actions">
          ${tab === 'students' ? '<button class="btn btn-primary btn-sm" id="add-student-btn"><i class="fa-solid fa-plus"></i> Register Student</button>' : ''}
          ${tab === 'faculty' ? '<button class="btn btn-primary btn-sm" id="add-faculty-btn"><i class="fa-solid fa-plus"></i> Add Faculty</button>' : ''}
          ${tab === 'courses' ? '<button class="btn btn-primary btn-sm" id="add-course-btn"><i class="fa-solid fa-plus"></i> Create Course</button> <button class="btn btn-secondary btn-sm" id="enroll-btn"><i class="fa-solid fa-link"></i> Enroll Student</button>' : ''}
        </div>
      </header>

      <!-- Stats Grid -->
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(56, 189, 248, 0.15); color: var(--accent-primary);"><i class="fa-solid fa-user-graduate"></i></div>
          <div>
            <div class="stat-val">${students.length}</div>
            <div class="stat-lbl">Registered Students</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(168, 85, 247, 0.15); color: var(--accent-purple);"><i class="fa-solid fa-chalkboard-user"></i></div>
          <div>
            <div class="stat-val">${faculty.length}</div>
            <div class="stat-lbl">Academic Faculty</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(99, 102, 241, 0.15); color: var(--accent-indigo);"><i class="fa-solid fa-book-open"></i></div>
          <div>
            <div class="stat-val">${courses.length}</div>
            <div class="stat-lbl">Active Courses</div>
          </div>
        </div>
      </div>

      <!-- Tab Dynamic Content -->
      ${renderTabContent(tab, students, faculty, courses)}
    </main>
  </div>
  `;
}

function renderTabContent(tab, students, faculty, courses) {
  if (tab === 'students' || tab === 'overview') {
    return `
    <div class="glass-card" style="margin-bottom: 24px;">
      <h3 style="margin-bottom: 16px;">Student Directory (FR-06)</h3>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Full Name</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${students.map(s => `
              <tr>
                <td><strong>${s.rollNumber}</strong></td>
                <td>${s.fullName}</td>
                <td>${s.department}</td>
                <td>Semester ${s.currentSemester}</td>
                <td>${s.email}</td>
                <td><span class="badge badge-success">Active</span></td>
                <td>
                  <button class="btn btn-danger btn-sm" onclick="window.deleteStudent('${s.studentId}')"><i class="fa-solid fa-trash"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    `;
  }

  if (tab === 'faculty') {
    return `
    <div class="glass-card">
      <h3 style="margin-bottom: 16px;">Faculty Directory (FR-09)</h3>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${faculty.map(f => `
              <tr>
                <td><strong>${f.facultyId}</strong></td>
                <td>${f.fullName}</td>
                <td>${f.department}</td>
                <td>${f.designation}</td>
                <td>${f.email}</td>
                <td><span class="badge badge-info">Instructor</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    `;
  }

  if (tab === 'courses') {
    return `
    <div class="glass-card">
      <h3 style="margin-bottom: 16px;">Course Catalog &amp; Instructors (FR-10, FR-11)</h3>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Credits</th>
              <th>Department</th>
              <th>Assigned Instructor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${courses.map(c => `
              <tr>
                <td><strong>${c.courseCode}</strong></td>
                <td>${c.title}</td>
                <td>${c.creditUnits} Units</td>
                <td>${c.department}</td>
                <td>${c.facultyName ? `<span class="badge badge-success">${c.facultyName}</span>` : `<span class="badge badge-warning">Unassigned</span>`}</td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="window.promptAssignFaculty('${c.courseId}', '${c.courseCode}')"><i class="fa-solid fa-user-plus"></i> Assign</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    `;
  }
}

export function attachAdminEvents() {
  document.getElementById('logout-btn')?.addEventListener('click', () => authService.logout());

  window.deleteStudent = async (studentId) => {
    if (confirm(`Are you sure you want to delete student '${studentId}'?`)) {
      try {
        await adminService.deleteStudent(studentId);
        showToast('Student deleted successfully', 'success');
        window.location.reload();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  };

  window.promptAssignFaculty = async (courseId, code) => {
    const facultyRes = await adminService.getFaculty();
    const facultyList = facultyRes.data || [];
    openModal(`
      <h3>Assign Instructor to ${code}</h3>
      <form id="assign-form" style="margin-top: 20px;">
        <div class="form-group">
          <label class="form-label">Select Faculty</label>
          <select id="assign-faculty-id" class="form-control">
            ${facultyList.map(f => `<option value="${f.facultyId}">${f.fullName} (${f.department})</option>`).join('')}
          </select>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary" onclick="window.closeModalHandler()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Assignment</button>
        </div>
      </form>
    `);

    document.getElementById('assign-form').onsubmit = async (e) => {
      e.preventDefault();
      const facId = document.getElementById('assign-faculty-id').value;
      try {
        await adminService.assignFaculty(courseId, facId);
        showToast('Faculty assigned successfully!', 'success');
        closeModal();
        window.location.reload();
      } catch (err) {
        showToast(err.message, 'error');
      }
    };
  };

  document.getElementById('add-student-btn')?.addEventListener('click', () => {
    openModal(`
      <h3>Register New Student (FR-05)</h3>
      <form id="create-student-form" style="margin-top: 16px;">
        <div class="form-group"><label class="form-label">Full Name</label><input type="text" id="stu-name" class="form-control" required placeholder="e.g. David Miller"></div>
        <div class="form-group"><label class="form-label">Roll Number</label><input type="text" id="stu-roll" class="form-control" required placeholder="e.g. CS2026099"></div>
        <div class="form-group"><label class="form-label">Department</label><input type="text" id="stu-dept" class="form-control" required value="Computer Science"></div>
        <div class="form-group"><label class="form-label">Email</label><input type="email" id="stu-email" class="form-control" required placeholder="david@student.edu"></div>
        <div class="form-group"><label class="form-label">Username</label><input type="text" id="stu-user" class="form-control" required placeholder="david_miller"></div>
        <div class="form-group"><label class="form-label">Initial Password</label><input type="password" id="stu-pass" class="form-control" required value="Student@123"></div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
          <button type="button" class="btn btn-secondary" onclick="window.closeModalHandler()">Cancel</button>
          <button type="submit" class="btn btn-primary">Register Student</button>
        </div>
      </form>
    `);

    document.getElementById('create-student-form').onsubmit = async (e) => {
      e.preventDefault();
      const payload = {
        fullName: document.getElementById('stu-name').value,
        rollNumber: document.getElementById('stu-roll').value,
        department: document.getElementById('stu-dept').value,
        email: document.getElementById('stu-email').value,
        username: document.getElementById('stu-user').value,
        password: document.getElementById('stu-pass').value
      };
      try {
        await adminService.createStudent(payload);
        showToast('Student registered successfully!', 'success');
        closeModal();
        window.location.reload();
      } catch (err) {
        showToast(err.message, 'error');
      }
    };
  });

  document.getElementById('add-course-btn')?.addEventListener('click', () => {
    openModal(`
      <h3>Create New Course Offering (FR-10)</h3>
      <form id="create-course-form" style="margin-top: 16px;">
        <div class="form-group"><label class="form-label">Course Code</label><input type="text" id="crs-code" class="form-control" required placeholder="e.g. CS401"></div>
        <div class="form-group"><label class="form-label">Course Title</label><input type="text" id="crs-title" class="form-control" required placeholder="e.g. Distributed Cloud Computing"></div>
        <div class="form-group"><label class="form-label">Credit Units</label><input type="number" id="crs-credits" class="form-control" required value="3" min="1" max="6"></div>
        <div class="form-group"><label class="form-label">Department</label><input type="text" id="crs-dept" class="form-control" required value="Computer Science"></div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
          <button type="button" class="btn btn-secondary" onclick="window.closeModalHandler()">Cancel</button>
          <button type="submit" class="btn btn-primary">Create Course</button>
        </div>
      </form>
    `);

    document.getElementById('create-course-form').onsubmit = async (e) => {
      e.preventDefault();
      const payload = {
        courseCode: document.getElementById('crs-code').value,
        title: document.getElementById('crs-title').value,
        creditUnits: document.getElementById('crs-credits').value,
        department: document.getElementById('crs-dept').value
      };
      try {
        await adminService.createCourse(payload);
        showToast('Course created successfully!', 'success');
        closeModal();
        window.location.reload();
      } catch (err) {
        showToast(err.message, 'error');
      }
    };
  });

  document.getElementById('enroll-btn')?.addEventListener('click', async () => {
    const studentsRes = await adminService.getStudents();
    const coursesRes = await adminService.getCourses();
    const stus = studentsRes.data || [];
    const crss = coursesRes.data || [];

    openModal(`
      <h3>Enroll Student in Course (FR-12)</h3>
      <form id="enroll-form" style="margin-top: 16px;">
        <div class="form-group">
          <label class="form-label">Select Student</label>
          <select id="enr-student" class="form-control">
            ${stus.map(s => `<option value="${s.studentId}">${s.fullName} (${s.rollNumber})</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Select Course</label>
          <select id="enr-course" class="form-control">
            ${crss.map(c => `<option value="${c.courseId}">${c.courseCode} - ${c.title}</option>`).join('')}
          </select>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
          <button type="button" class="btn btn-secondary" onclick="window.closeModalHandler()">Cancel</button>
          <button type="submit" class="btn btn-primary">Complete Enrollment</button>
        </div>
      </form>
    `);

    document.getElementById('enroll-form').onsubmit = async (e) => {
      e.preventDefault();
      const studentId = document.getElementById('enr-student').value;
      const courseId = document.getElementById('enr-course').value;
      try {
        await adminService.enrollStudent(studentId, courseId, 'Fall 2026');
        showToast('Enrollment completed successfully!', 'success');
        closeModal();
        window.location.reload();
      } catch (err) {
        showToast(err.message, 'error');
      }
    };
  });

  window.closeModalHandler = () => closeModal();
}
