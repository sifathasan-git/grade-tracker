export const addSemesterWindowRender = (e) => {
  return `<div id="addWindowOverlay" class="addWindow"><div class="inputWindow"><h1>Enter Semester Name:</h1><input id="semesterName" type="text" /><div class="button"><button id="saveBtn">Save</button>
  </div></div>
</div>`;
};

export const addSemester = (name) => {
  const user = localStorage.getItem("gradeTrackerUserid");
  const url = "http://localhost:3001/api/semesters";
  const data = { name, user };
  const response = axios.post(url, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
