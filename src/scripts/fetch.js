export const fetchSemesters = (userId) => {
  const url = "http://localhost:3001/api/semesters/" + userId;
  const response = axios.get(url).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const fetchCourses = (userid) => {
  const courseUrl = "http://localhost:3001/api/courses/" + userid;
  const response = axios.get(courseUrl).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const fetchSemesterCourses = (semesterId, userid) => {
  const courseUrl =
    "http://localhost:3001/api/courses/semesterCourses/" +
    semesterId +
    "/" +
    userid;
  const response = axios.get(courseUrl).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
