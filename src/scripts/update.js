export const activeDeactiveSemester = (id, userid, active) => {
  const courseUrl = "http://localhost:3001/api/semesters/" + id;
  const data = { userid, active };
  const response = axios.put(courseUrl, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const activeDeactiveCourse = (id, userid, active) => {
  console.log(id);
  const courseUrl = "http://localhost:3001/api/courses/" + id;
  const data = { userid, active };
  const response = axios.put(courseUrl, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const deleteSemester = (id) => {
  const courseUrl = "http://localhost:3001/api/semesters/" + id;
  const response = axios.delete(courseUrl).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const deleteSemesterCourses = (id) => {
  const courseUrl = "http://localhost:3001/api/courses/semesterCourses/" + id;
  const response = axios.delete(courseUrl).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const deleteCourse = (courseId, semesterId) => {
  const courseUrl =
    "http://localhost:3001/api/courses/" + courseId + "/" + semesterId;
  const response = axios.delete(courseUrl).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
