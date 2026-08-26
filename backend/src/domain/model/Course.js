class Course {
  constructor({ courseId, courseCode, title, creditUnits = 3, department, description = '', facultyId = null, facultyName = null, isActive = true }) {
    this.courseId = courseId;
    this.courseCode = courseCode ? courseCode.toUpperCase().trim() : '';
    this.title = title;
    this.creditUnits = Number(creditUnits);
    this.department = department;
    this.description = description;
    this.facultyId = facultyId;
    this.facultyName = facultyName;
    this.isActive = Boolean(isActive);
  }

  assignFaculty(facultyId, facultyName = null) {
    this.facultyId = facultyId;
    if (facultyName) this.facultyName = facultyName;
  }

  removeFaculty() {
    this.facultyId = null;
    this.facultyName = null;
  }

  toJSON() {
    return {
      courseId: this.courseId,
      courseCode: this.courseCode,
      title: this.title,
      creditUnits: this.creditUnits,
      department: this.department,
      description: this.description,
      facultyId: this.facultyId,
      facultyName: this.facultyName,
      isActive: this.isActive
    };
  }
}

module.exports = Course;
