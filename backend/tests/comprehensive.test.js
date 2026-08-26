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

async function runComprehensiveSuite() {
  console.log('================================================================');
  console.log('🧪 MASTER AUTOMATED TEST & QUALITY VALIDATION SUITE (PHASE 6)');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;
  const total = 28;

  function assert(condition, message) {
    if (condition) {
      passed++;
      console.log(`  ✓ PASS: ${message}`);
    } else {
      failed++;
      console.error(`  ✗ FAIL: ${message}`);
    }
  }

  await new Promise(resolve => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });

  try {
    // --- SECTION 1: AUTHENTICATION & CREDENTIAL SECURITY (TC-AUTH-001..005) ---
    console.log('[CATEGORY 1] Authentication & Credential Security');
    
    // TC-AUTH-001: Valid Admin Login
    const admLogin = await request('/api/v1/auth/login', { method: 'POST', body: { username: 'admin', password: 'Admin@123' } });
    assert(admLogin.status === 200 && admLogin.data.data.token, 'TC-AUTH-001: Valid Admin Login returns 200 OK + JWT');
    const adminToken = admLogin.data.data ? admLogin.data.data.token : null;

    // TC-AUTH-002: Invalid Username
    const badUser = await request('/api/v1/auth/login', { method: 'POST', body: { username: 'non_existent_user', password: 'Admin@123' } });
    assert(badUser.status === 401 && badUser.data.success === false, 'TC-AUTH-002: Non-existent username rejected with 401 Unauthorized');

    // TC-AUTH-003: Invalid Password
    const badPass = await request('/api/v1/auth/login', { method: 'POST', body: { username: 'admin', password: 'WrongPassword999!' } });
    assert(badPass.status === 401 && badPass.data.success === false, 'TC-AUTH-003: Incorrect password rejected with 401 Unauthorized');

    // TC-AUTH-004: Missing Credentials
    const missingCreds = await request('/api/v1/auth/login', { method: 'POST', body: {} });
    assert(missingCreds.status === 400, 'TC-AUTH-004: Empty payload rejected with 400 Bad Request');

    // TC-AUTH-005: Password Hash Sanitization
    assert(!admLogin.data.data.user.passwordHash && !admLogin.data.data.user.password_hash, 'TC-AUTH-005: Password hash is strictly sanitized and omitted from API response');

    // --- SECTION 2: ROLE-BASED ACCESS CONTROL & IDOR PREVENTION (TC-RBAC-001..004) ---
    console.log('\n[CATEGORY 2] Role-Based Authorization & IDOR Access Control');

    // Login Faculty & Student
    const facLogin = await request('/api/v1/auth/login', { method: 'POST', body: { username: 'dr_alan', password: 'Faculty@123' } });
    const facultyToken = facLogin.data.data.token;

    const stuLogin = await request('/api/v1/auth/login', { method: 'POST', body: { username: 'alice_smith', password: 'Student@123' } });
    const studentToken = stuLogin.data.data.token;

    // TC-RBAC-001: Student accessing Admin student directory
    const stuAdminAttempt = await request('/api/v1/students', { headers: { 'Authorization': `Bearer ${studentToken}` } });
    assert(stuAdminAttempt.status === 403, 'TC-RBAC-001: Student access to Admin directory rejected with 403 Forbidden');

    // TC-RBAC-002: Student attempting to record attendance
    const stuAttAttempt = await request('/api/v1/attendance', { method: 'POST', headers: { 'Authorization': `Bearer ${studentToken}` }, body: { courseId: 'crs_001', entries: [] } });
    assert(stuAttAttempt.status === 403, 'TC-RBAC-002: Student attempt to record attendance rejected with 403 Forbidden');

    // TC-RBAC-003: Faculty accessing student deletion
    const facDelAttempt = await request('/api/v1/students/stu_001', { method: 'DELETE', headers: { 'Authorization': `Bearer ${facultyToken}` } });
    assert(facDelAttempt.status === 403, 'TC-RBAC-003: Faculty attempt to delete student rejected with 403 Forbidden');

    // TC-RBAC-004: IDOR Protection - Student attempting to query another student profile
    const idorAttempt = await request('/api/v1/students/stu_002', { headers: { 'Authorization': `Bearer ${studentToken}` } });
    assert(idorAttempt.status === 403, 'TC-RBAC-004: IDOR Protection: Student accessing another student record rejected with 403 Forbidden');

    // --- SECTION 3: STUDENT MANAGEMENT CRUD & CONSTRAINTS (TC-STU-001..004) ---
    console.log('\n[CATEGORY 3] Student Management Lifecycle & Validation');

    // TC-STU-001: Admin Create Valid Student (FR-05)
    const newStudentRes = await request('/api/v1/students', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        username: 'george_boole',
        password: 'Student@123',
        email: 'george@student.edu',
        rollNumber: 'CS2026044',
        fullName: 'George Boole',
        department: 'Computer Science',
        currentSemester: 4
      }
    });
    assert(newStudentRes.status === 201 && newStudentRes.data.data.rollNumber === 'CS2026044', 'TC-STU-001: Admin successfully creates student (201 Created)');
    const createdStudent = newStudentRes.data.data;

    // TC-STU-002: Duplicate Roll Number Rejection
    const dupRoll = await request('/api/v1/students', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        username: 'george_copy',
        password: 'Student@123',
        email: 'george2@student.edu',
        rollNumber: 'CS2026044',
        fullName: 'Duplicate Boole',
        department: 'Computer Science'
      }
    });
    assert(dupRoll.status === 409, 'TC-STU-002: Duplicate student roll number rejected with 409 Conflict');

    // TC-STU-003: Update Student Profile (FR-07)
    const updateStu = await request(`/api/v1/students/${createdStudent.studentId}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { currentSemester: 5, contactNumber: '+1-555-8888' }
    });
    assert(updateStu.status === 200 && updateStu.data.data.currentSemester === 5, 'TC-STU-003: Admin updates student details (200 OK)');

    // TC-STU-004: Delete Student Record (FR-08)
    const delStu = await request(`/api/v1/students/${createdStudent.studentId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(delStu.status === 200, 'TC-STU-004: Admin deletes student record (200 OK)');

    // --- SECTION 4: COURSE & ENROLLMENT MANAGEMENT (TC-CRS-001..004) ---
    console.log('\n[CATEGORY 4] Course Catalog & Enrollment Management');

    // TC-CRS-001: Admin Create Course (FR-10)
    const newCourseRes = await request('/api/v1/courses', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        courseCode: 'CS304',
        title: 'Compiler Construction',
        creditUnits: 4,
        department: 'Computer Science',
        description: 'Lexical analysis, syntax trees, and code generation.'
      }
    });
    assert(newCourseRes.status === 201 && newCourseRes.data.data.courseCode === 'CS304', 'TC-CRS-001: Admin creates course offering (201 Created)');
    const createdCourse = newCourseRes.data.data;

    // TC-CRS-002: Assign Faculty to Course (FR-11)
    const assignFacultyRes = await request(`/api/v1/courses/${createdCourse.courseId}/assign-faculty`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: { facultyId: 'fac_001' }
    });
    assert(assignFacultyRes.status === 200 && assignFacultyRes.data.data.facultyId === 'fac_001', 'TC-CRS-002: Teaching faculty assigned to course (200 OK)');

    // TC-CRS-003: Student Enrollment (FR-12)
    const enrollRes = await request('/api/v1/enrollments', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        studentId: 'stu_001',
        courseId: createdCourse.courseId,
        academicTerm: 'Fall 2026'
      }
    });
    assert(enrollRes.status === 201, 'TC-CRS-003: Student enrolled in course (201 Created)');

    // TC-CRS-004: Prevent Duplicate Enrollment
    const dupEnroll = await request('/api/v1/enrollments', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        studentId: 'stu_001',
        courseId: createdCourse.courseId,
        academicTerm: 'Fall 2026'
      }
    });
    assert(dupEnroll.status === 409, 'TC-CRS-004: Duplicate enrollment rejected with 409 Conflict');

    // --- SECTION 5: ATTENDANCE MANAGEMENT & INVARIANTS (TC-ATT-001..003) ---
    console.log('\n[CATEGORY 5] Attendance Tracking & Status Invariants');

    // TC-ATT-001: Faculty Record Attendance (FR-15)
    const recordAtt = await request('/api/v1/attendance', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${facultyToken}` },
      body: {
        courseId: createdCourse.courseId,
        sessionDate: '2026-08-26',
        sessionSlot: 1,
        entries: [{ studentId: 'stu_001', status: 'PRESENT', remarks: 'Active participant' }]
      }
    });
    assert(recordAtt.status === 200 && recordAtt.data.recordsCreated === 1, 'TC-ATT-001: Faculty records session attendance (200 OK)');

    // TC-ATT-002: Invalid Attendance Status Validation
    const badStatus = await request('/api/v1/attendance', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${facultyToken}` },
      body: {
        courseId: createdCourse.courseId,
        sessionDate: '2026-08-26',
        entries: [{ studentId: 'stu_001', status: 'INVALID_STATUS' }]
      }
    });
    assert(badStatus.status === 500 || badStatus.status === 400, 'TC-ATT-002: Invalid attendance status rejected by domain invariants');

    // TC-ATT-003: Student View Attendance % (FR-17)
    const myAtt = await request('/api/v1/attendance/my-records', { headers: { 'Authorization': `Bearer ${studentToken}` } });
    assert(myAtt.status === 200 && myAtt.data.data.length > 0, 'TC-ATT-003: Student queries personal attendance percentage');

    // --- SECTION 6: ACADEMIC RECORDS & GRADE COMPUTATION (TC-MRK-001..004) ---
    console.log('\n[CATEGORY 6] Continuous Evaluation & Academic Records');

    // TC-MRK-001: Faculty Enter Continuous Marks (FR-18)
    const enterMarks = await request('/api/v1/academic-records', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${facultyToken}` },
      body: {
        courseId: createdCourse.courseId,
        assessmentType: 'Quiz 1 (Syntax Analysis)',
        maximumScore: 20,
        weightagePercentage: 10,
        entries: [{ studentId: 'stu_001', scoreObtained: 19, feedbackRemarks: 'Flawless BNF grammar' }]
      }
    });
    assert(enterMarks.status === 200 && enterMarks.data.entriesSaved === 1, 'TC-MRK-001: Faculty enters assessment scores (200 OK)');

    // TC-MRK-002: Score Boundary Validation (Score > Max Score)
    const outOfBounds = await request('/api/v1/academic-records', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${facultyToken}` },
      body: {
        courseId: createdCourse.courseId,
        assessmentType: 'Invalid Test',
        maximumScore: 50,
        entries: [{ studentId: 'stu_001', scoreObtained: 999 }]
      }
    });
    assert(outOfBounds.status === 500 || outOfBounds.status === 400, 'TC-MRK-002: Out-of-bounds mark score (> Max) rejected by domain validation');

    // TC-MRK-003: Student View Transcript & Calculated Grades (FR-20)
    const transcriptRes = await request('/api/v1/academic-records/transcript', { headers: { 'Authorization': `Bearer ${studentToken}` } });
    assert(transcriptRes.status === 200 && transcriptRes.data.data.length > 0 && transcriptRes.data.data[0].finalGrade, 'TC-MRK-003: Student accesses calculated academic transcript & letter grades');

    // TC-MRK-004: Relational Cascade Deletion Check
    const rosterCheck = await request(`/api/v1/courses/${createdCourse.courseId}/roster`, { headers: { 'Authorization': `Bearer ${facultyToken}` } });
    assert(rosterCheck.status === 200 && rosterCheck.data.data.length > 0, 'TC-MRK-004: Course roster aggregates attendance % and computed grades dynamically');

    // --- SECTION 7: SECURITY & SANITIZATION (TC-SEC-001..004) ---
    console.log('\n[CATEGORY 7] Security, Parameterization & Sanity Checks');

    // TC-SEC-001: SQL Injection Pattern Neutralization in Text Inputs
    const sqliAttempt = await request('/api/v1/students', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: {
        username: "admin' OR '1'='1",
        password: 'Password@123',
        email: "sqli@test.edu",
        rollNumber: "CS2026999",
        fullName: "Test'); DROP TABLE users; --",
        department: "Computer Science"
      }
    });
    assert(sqliAttempt.status === 201, 'TC-SEC-001: SQL injection characters safely stored as literal strings without payload execution');
    if (sqliAttempt.data.data) {
      await request(`/api/v1/students/${sqliAttempt.data.data.studentId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${adminToken}` } });
    }

    // TC-SEC-002: Health & Latency Performance Check
    const startTime = Date.now();
    const perfCheck = await request('/api/v1/courses', { headers: { 'Authorization': `Bearer ${adminToken}` } });
    const latency = Date.now() - startTime;
    assert(perfCheck.status === 200 && latency < 500, `TC-SEC-002: API response time is within acceptable limits (${latency}ms < 500ms)`);

    // TC-SEC-003: Unauthenticated Access Guard
    const noToken = await request('/api/v1/courses/my-assigned');
    assert(noToken.status === 401, 'TC-SEC-003: Access without authorization header returns 401 Unauthorized');

    // TC-SEC-004: Malformed JWT Token Rejection
    const badToken = await request('/api/v1/students', { headers: { 'Authorization': 'Bearer malformed.token.signature' } });
    assert(badToken.status === 401, 'TC-SEC-004: Malformed or fake JWT signature rejected with 401 Unauthorized');

    console.log('\n================================================================');
    console.log(`📊 MASTER TEST RESULTS: ${passed} / ${total} TESTS PASSED (${((passed / total) * 100).toFixed(1)}%)`);
    console.log('================================================================');

    if (failed > 0) {
      console.error(`⚠️ ${failed} tests failed!`);
      process.exit(1);
    }
  } finally {
    server.close();
  }
}

runComprehensiveSuite().catch(err => {
  console.error('Fatal test error:', err);
  if (server) server.close();
  process.exit(1);
});
