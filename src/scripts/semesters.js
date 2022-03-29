export const renderSemester = (semesters) => {
  let semestersHTML = "";
  semesters.forEach((semester) => {
    const gpa = semesterGpa(semester.courses);
    const courseName = semesterCoursesName(semester.courses);
    semestersHTML =
      semestersHTML +
      `<div class="semesterCard"><div class="semesterName"><h1>${semester.name}</h1><h2>${gpa}</h2></div><div class="courseName"><p>${courseName}</p></div><div class="menu"><img id="semesterDelete" src="../src/image/trash.svg" alt="" /></div></div>`;
  });
  return semestersHTML;
};

const semesterGpa = (courses) => {
  let totalGradePoint = 0;
  let totalCredit = 0;
  courses.forEach((course) => {
    totalGradePoint = totalGradePoint + course.credit * course.gradePoint;
    totalCredit = totalCredit + course.credit;
  });
  const gpa = Number(totalGradePoint / totalCredit).toFixed(2);
  return gpa;
};

const semesterCoursesName = (courses) => {
  let courseName = "";
  courses.forEach((course) => {
    courseName = courseName + course.name + ", ";
  });
  return courseName;
};
