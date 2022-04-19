export const addCourseWindowRender = (e) => {
  return `
  <div id="addWindowOverlay" class="addWindow">
    <div class="inputWindow">
      <h1>Enter Course Info:</h1>
      <input id="courseName" type="text" placeholder="Name" />
      <input id="courseCredit" type="number" placeholder="Credit" />
      <select id="courseGrade" type="text" placeholder="Grade Letter">
        <option value="">Grade Letter</option>
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
        <option value="F,0">F</option>
      </select>
      <div class="button">
        <button id="saveBtn">Save</button>
      </div>
    </div>
  </div>`;
};

export const addCourse = (name, credit, gradeLetter, gradePoint) => {
  const semester = localStorage.getItem("gradeTrackerSemesterId");
  const user = localStorage.getItem("gradeTrackerUserid");
  const url = "http://localhost:3001/api/courses";
  const data = { semester, user, name, credit, gradeLetter, gradePoint };
  const response = axios.post(url, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const editCourse = (id, name, credit, gradeLetter, gradePoint) => {
  const semester = localStorage.getItem("gradeTrackerSemesterId");
  const user = localStorage.getItem("gradeTrackerUserid");
  const active = true;
  const url = "http://localhost:3001/api/courses/edit/" + id;
  const data = {
    semester,
    user,
    name,
    credit,
    gradeLetter,
    gradePoint,
    active,
  };
  const response = axios.post(url, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
