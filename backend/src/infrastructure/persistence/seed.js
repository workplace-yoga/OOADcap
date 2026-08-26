const db = require('./Database');
const PasswordHasher = require('../security/PasswordHasher');

function seedDatabase() {
  console.log('--- Initializing Relational Database & Seed Records ---');
  
  // Clear tables
  db.tables = {
    users: [],
    admins: [],
    faculty: [],
    students: [],
    courses: [],
    enrollments: [],
    attendance: [],
    academic_records: []
  };

  const adminPass = PasswordHasher.hash('Admin@123');
  const facultyPass = PasswordHasher.hash('Faculty@123');
  const studentPass = PasswordHasher.hash('Student@123');

  // 1. Admin
  db.insert('users', {
    user_id: 'usr_admin',
    username: 'admin',
    password_hash: adminPass,
    email: 'admin@university.edu',
    role: 'ADMIN',
    is_active: true,
    created_at: new Date().toISOString(),
    last_login: null
  });
  db.insert('admins', {
    admin_id: 'adm_001',
    user_id: 'usr_admin',
    department: 'Central Academic Administration',
    office_location: 'Main Tower, Room 402'
  });

  // 2. Faculty
  db.insert('users', {
    user_id: 'usr_fac_1',
    username: 'dr_alan',
    password_hash: facultyPass,
    email: 'alan.turing@university.edu',
    role: 'FACULTY',
    is_active: true,
    created_at: new Date().toISOString(),
    last_login: null
  });
  db.insert('faculty', {
    faculty_id: 'fac_001',
    user_id: 'usr_fac_1',
    full_name: 'Dr. Alan Turing',
    department: 'Computer Science',
    designation: 'Professor',
    contact_number: '+1-555-0101'
  });

  db.insert('users', {
    user_id: 'usr_fac_2',
    username: 'prof_grace',
    password_hash: facultyPass,
    email: 'grace.hopper@university.edu',
    role: 'FACULTY',
    is_active: true,
    created_at: new Date().toISOString(),
    last_login: null
  });
  db.insert('faculty', {
    faculty_id: 'fac_002',
    user_id: 'usr_fac_2',
    full_name: 'Prof. Grace Hopper',
    department: 'Software Engineering',
    designation: 'Associate Professor',
    contact_number: '+1-555-0102'
  });

  // 3. Students
  const studentsData = [
    { uId: 'usr_stu_1', sId: 'stu_001', username: 'alice_smith', roll: 'CS2026001', name: 'Alice Smith', email: 'alice@student.edu', sem: 4 },
    { uId: 'usr_stu_2', sId: 'stu_002', username: 'bob_jones', roll: 'CS2026002', name: 'Bob Jones', email: 'bob@student.edu', sem: 4 },
    { uId: 'usr_stu_3', sId: 'stu_003', username: 'charlie_brown', roll: 'CS2026003', name: 'Charlie Brown', email: 'charlie@student.edu', sem: 4 }
  ];

  for (const s of studentsData) {
    db.insert('users', {
      user_id: s.uId,
      username: s.username,
      password_hash: studentPass,
      email: s.email,
      role: 'STUDENT',
      is_active: true,
      created_at: new Date().toISOString(),
      last_login: null
    });
    db.insert('students', {
      student_id: s.sId,
      user_id: s.uId,
      roll_number: s.roll,
      full_name: s.name,
      department: 'Computer Science',
      current_semester: s.sem,
      date_of_birth: '2004-04-12',
      contact_number: '+1-555-020' + s.sem
    });
  }

  // 4. Courses
  db.insert('courses', {
    course_id: 'crs_001',
    course_code: 'CS301',
    title: 'Object-Oriented Analysis and Design',
    credit_units: 4,
    department: 'Computer Science',
    description: 'Principles of domain modeling, UML diagrams, design patterns, and decoupled software architecture.',
    faculty_id: 'fac_001',
    is_active: true
  });

  db.insert('courses', {
    course_id: 'crs_002',
    course_code: 'CS302',
    title: 'Database Management Systems',
    credit_units: 3,
    department: 'Computer Science',
    description: 'Relational algebra, SQL, normalization (3NF), transactions, and indexed query optimization.',
    faculty_id: 'fac_002',
    is_active: true
  });

  // 5. Enrollments
  const enrollments = [
    { eId: 'enr_001', sId: 'stu_001', cId: 'crs_001' },
    { eId: 'enr_002', sId: 'stu_002', cId: 'crs_001' },
    { eId: 'enr_003', sId: 'stu_003', cId: 'crs_001' },
    { eId: 'enr_004', sId: 'stu_001', cId: 'crs_002' },
    { eId: 'enr_005', sId: 'stu_002', cId: 'crs_002' }
  ];

  for (const e of enrollments) {
    db.insert('enrollments', {
      enrollment_id: e.eId,
      student_id: e.sId,
      course_id: e.cId,
      academic_term: 'Fall 2026',
      enrollment_date: new Date().toISOString(),
      status: 'ACTIVE'
    });
  }

  // 6. Attendance seed
  db.insert('attendance', { attendance_id: 'att_001', enrollment_id: 'enr_001', session_date: '2026-08-20', session_slot: 1, status: 'PRESENT', remarks: 'On time', recorded_by_faculty_id: 'fac_001', last_modified: new Date().toISOString() });
  db.insert('attendance', { attendance_id: 'att_002', enrollment_id: 'enr_001', session_date: '2026-08-22', session_slot: 1, status: 'PRESENT', remarks: 'On time', recorded_by_faculty_id: 'fac_001', last_modified: new Date().toISOString() });
  db.insert('attendance', { attendance_id: 'att_003', enrollment_id: 'enr_002', session_date: '2026-08-20', session_slot: 1, status: 'ABSENT', remarks: 'Sick leave', recorded_by_faculty_id: 'fac_001', last_modified: new Date().toISOString() });
  db.insert('attendance', { attendance_id: 'att_004', enrollment_id: 'enr_002', session_date: '2026-08-22', session_slot: 1, status: 'PRESENT', remarks: 'On time', recorded_by_faculty_id: 'fac_001', last_modified: new Date().toISOString() });

  // 7. Academic Records seed
  db.insert('academic_records', { record_id: 'rec_001', enrollment_id: 'enr_001', assessment_type: 'Assignment 1 (UML Class Modeling)', score_obtained: 95.0, maximum_score: 100.0, weightage_percentage: 20.0, feedback_remarks: 'Excellent class diagram layout and multiplicity design.' });
  db.insert('academic_records', { record_id: 'rec_002', enrollment_id: 'enr_001', assessment_type: 'Midterm Examination', score_obtained: 88.0, maximum_score: 100.0, weightage_percentage: 30.0, feedback_remarks: 'Good understanding of SOLID principles.' });
  db.insert('academic_records', { record_id: 'rec_003', enrollment_id: 'enr_002', assessment_type: 'Assignment 1 (UML Class Modeling)', score_obtained: 78.0, maximum_score: 100.0, weightage_percentage: 20.0, feedback_remarks: 'Refine aggregation vs composition semantics.' });

  console.log('✓ Database seeded successfully with Demo Accounts!');
  console.log('----------------------------------------------------');
  console.log('DEMO CREDENTIALS:');
  console.log('  Admin:   username = admin         password = Admin@123');
  console.log('  Faculty: username = dr_alan       password = Faculty@123');
  console.log('  Student: username = alice_smith   password = Student@123');
  console.log('----------------------------------------------------');
}

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
