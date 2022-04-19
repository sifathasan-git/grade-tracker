export const renderCourses = (courses) => {
  const gpa = semesterGpa(courses);
  document.getElementById("semesterGpa").innerHTML = `Gpa: ${gpa}`;
  let coursesHTML = "";
  courses.forEach((course) => {
    let inActive = "";
    let checked = "checked";
    if (!course.isActive) {
      inActive = `<div class="inActive"></div>`;
      checked = "";
    }
    coursesHTML =
      coursesHTML +
      `<div id=${course._id} class="semesterCard courses">${inActive}<div id='course-slider-button' class="course-slider-button"><label class="switch"><input type="checkbox" ${checked} /><span class="slider round"></span></label></div><div class="semesterName"><h1>${course.name}</h1><h2>${course.gradeLetter}</h2></div><div class="courseName"><p>${course.credit} credit hours</p></div><div class="menu"><img class="courseDelete" src="../src/image/trash.svg" alt="" /></div></div>`;
  });
  return coursesHTML;
};

const semesterGpa = (courses) => {
  let totalGradePoint = 0;
  let totalCredit = 0;
  courses.forEach((course) => {
    if (course.isActive) {
      totalGradePoint = totalGradePoint + course.credit * course.gradePoint;
      totalCredit = totalCredit + course.credit;
    }
  });
  const gpa = Number(totalGradePoint / totalCredit).toFixed(2);
  return gpa;
};
export const getCourses = (semesters) => {
  let courses = [];
  semesters.forEach((element) => {
    element.courses.forEach((course) => {
      courses.push(course);
    });
  });
  return courses;
};

export const getCourse = (id) => {
  const url = "http://localhost:3001/api/courses/singlecourse/" + id;
  const response = axios.get(url).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

export const editCourseWindowRender = async (id) => {
  const course = await getCourse(id);
  const html = `
  <div id="addWindowOverlay" class="addWindow">
    <div class="inputWindow">
      <h1>Enter Course Info:</h1>
      <input id="courseName" type="text" placeholder="Name" value="${course.name}" />
      <input id="courseCredit" type="number" placeholder="Credit" value="${course.credit}" />
      <select id="courseGrade" type="text" placeholder="Grade Letter">
        <option value="${course.gradeLetter},${course.gradePoint}">${course.gradeLetter}</option>
        <option value="A,4.0">A</option>
        <option value="A-,3.7">A-</option>
        <option value="B+,3.3">B+</option>
        <option value="B,3.0">B</option>
        <option value="B-,2.7">B-</option>
        <option value="C+,2.3">C+</option>
        <option value="C,2">C</option>
        <option value="C-,1.7">C-</option>
        <option value="D+,1.3">D+</option>
        <option value="D,1">D</option>
      </select>
      <div class="button">
        <button id="saveBtn">Save</button>
      </div>
    </div>
  </div>`;
  return html;
};
