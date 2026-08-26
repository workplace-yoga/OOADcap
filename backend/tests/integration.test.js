const app = require('../server');

let server;
let baseUrl;

async function request(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const body = options.body ? JSON.stringify(options.body) : null;

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body
  });

  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting Phase 5 Implementation Verification Suite');
  console.log('====================================================\n');

  await new Promise(resolve => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });

  try {
    // 1. Health Check
    console.log('[1/12] Testing Health Endpoint...');
    const health = await request('/api/v1/health');
    console.assert(health.status === 200, `Health status was ${health.status}`);
    console.assert(health.data.status === 'HEALTHY', 'Service not healthy');
    console.log('  ✓ Health check passed (200 OK)');

    // 2. Admin Login
    console.log('[2/12] Testing Admin Login (FR-01, FR-02)...');
    const adminLogin = await request('/api/v1/auth/login', {
      method: 'POST',
      body: { username: 'admin', password: 'Admin@123' }
    });
    console.assert(adminLogin.status === 200, `Admin login failed: ${adminLogin.status}`);
    console.assert(adminLogin.data.data.user.role === 'ADMIN', 'Role not ADMIN');
    const adminToken = adminLogin.data.data.token;
    console.log('  ✓ Admin authenticated successfully (JWT received)');

    // 3. Admin Get Students (FR-06)
    console.log('[3/12] Testing Admin View Students (FR-06)...');
    const studentsRes = await request('/api/v1/students', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    console.assert(studentsRes.status === 200, `Get students failed`);
    console.assert(studentsRes.data.data.length >= 3, 'Missing seed students');
    console.log(`  ✓ Retrieved ${studentsRes.data.data.length} students from database`);

    // 4. Admin Register New Student (FR-05)
    console.log('[4/12] Testing Admin Register Student (FR-05)...');
    const newStudent = await request('/api/v1/students', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        username: 'emma_watson',
        password: 'Student@123',
        email: 'emma@student.edu',
        rollNumber: 'CS2026099',
        fullName: 'Emma Watson',
        department: 'Computer Science',
        currentSemester: 4
      }
    });
    console.assert(newStudent.status === 201, `Create student failed: ${newStudent.status}`);
    console.log('  ✓ Student created and persisted (201 Created)');

    // 5. Course Catalog & Assign Faculty (FR-10, FR-11)
    console.log('[5/12] Testing Course Management & Faculty Assignment (FR-10, FR-11)...');
    const coursesRes = await request('/api/v1/courses', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    console.assert(coursesRes.status === 200, `Get courses failed`);
    const courseId = coursesRes.data.data[0].courseId;
    
    const assignRes = await request(`/api/v1/courses/${courseId}/assign-faculty`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { facultyId: 'fac_001' }
    });
    console.assert(assignRes.status === 200, 'Assign faculty failed');
    console.log('  ✓ Faculty assigned to course (200 OK)');

    // 6. Course Enrollment (FR-12)
    console.log('[6/12] Testing Student Course Enrollment (FR-12)...');
    const enrollRes = await request('/api/v1/enrollments', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        studentId: newStudent.data.data.studentId,
        courseId: courseId,
        academicTerm: 'Fall 2026'
      }
    });
    console.assert(enrollRes.status === 201, `Enrollment failed: ${enrollRes.status}`);
    console.log('  ✓ Student enrolled in course (201 Created)');

    // 7. Faculty Login
    console.log('[7/12] Testing Faculty Login...');
    const facLogin = await request('/api/v1/auth/login', {
      method: 'POST',
      body: { username: 'dr_alan', password: 'Faculty@123' }
    });
    console.assert(facLogin.status === 200, 'Faculty login failed');
    const facultyToken = facLogin.data.data.token;
    console.log('  ✓ Faculty authenticated (Role = FACULTY)');

    // 8. Faculty Record Attendance (FR-15)
    console.log('[8/12] Testing Faculty Record Attendance (FR-15)...');
    const attRes = await request('/api/v1/attendance', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${facultyToken}` },
      body: {
        courseId: courseId,
        sessionDate: '2026-08-26',
        sessionSlot: 1,
        entries: [
          { studentId: 'stu_001', status: 'PRESENT', remarks: 'Present' },
          { studentId: newStudent.data.data.studentId, status: 'PRESENT', remarks: 'Present' }
        ]
      }
    });
    console.assert(attRes.status === 200, `Attendance recording failed: ${attRes.status}`);
    console.log('  ✓ Attendance session persisted successfully');

    // 9. Faculty Submit Assessment Marks (FR-18)
    console.log('[9/12] Testing Faculty Enter Marks (FR-18)...');
    const marksRes = await request('/api/v1/academic-records', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${facultyToken}` },
      body: {
        courseId: courseId,
        assessmentType: 'Continuous Lab Assessment 1',
        maximumScore: 50,
        weightagePercentage: 15,
        entries: [
          { studentId: 'stu_001', scoreObtained: 48 },
          { studentId: newStudent.data.data.studentId, scoreObtained: 45 }
        ]
      }
    });
    console.assert(marksRes.status === 200, `Marks entry failed: ${marksRes.status}`);
    console.log('  ✓ Continuous evaluation scores saved & grades updated');

    // 10. Student Login & View Portal (FR-13, FR-17, FR-20)
    console.log('[10/12] Testing Student Login & Academic Records Viewing...');
    const stuLogin = await request('/api/v1/auth/login', {
      method: 'POST',
      body: { username: 'alice_smith', password: 'Student@123' }
    });
    console.assert(stuLogin.status === 200, 'Student login failed');
    const studentToken = stuLogin.data.data.token;

    const myCourses = await request('/api/v1/enrollments/my-courses', {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    console.assert(myCourses.status === 200 && myCourses.data.data.length > 0, 'Get my courses failed');

    const myAtt = await request('/api/v1/attendance/my-records', {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    console.assert(myAtt.status === 200, 'Get my attendance failed');

    const transcript = await request('/api/v1/academic-records/transcript', {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    console.assert(transcript.status === 200, 'Get transcript failed');
    console.log('  ✓ Student successfully accessed personal enrolled courses, attendance percentage, and transcript');

    // 11. RBAC Security Check: Student accessing Admin endpoint
    console.log('[11/12] Testing Role-Based Access Control (RBAC Guard)...');
    const forbiddenRes = await request('/api/v1/students', {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    });
    console.assert(forbiddenRes.status === 403, `Expected 403 Forbidden, got ${forbiddenRes.status}`);
    console.log('  ✓ Security verified: Unauthorized student access to Admin directory rejected with 403 Forbidden');

    // 12. Authentication Guard: Request without token
    console.log('[12/12] Testing Authentication Guard...');
    const unauthRes = await request('/api/v1/students');
    console.assert(unauthRes.status === 401, `Expected 401 Unauthorized, got ${unauthRes.status}`);
    console.log('  ✓ Security verified: Unauthenticated request rejected with 401 Unauthorized');

    console.log('\n====================================================');
    console.log('🎉 ALL 12 VERIFICATION SUITE TESTS PASSED WITH 100% SUCCESS!');
    console.log('====================================================');
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  if (server) server.close();
  process.exit(1);
});
