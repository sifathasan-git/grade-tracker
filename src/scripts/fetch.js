export const fetchSemesters = () => {
  const response = axios
    .get("http://localhost:3001/api/semesters")
    .then((res) => {
      if (res.data) return res.data;
    });
  return response;
};
export const fetchCourses = (userId) => {
  const courseUrl = "http://localhost:3001/api/courses/" + userId;
  const response = axios.get(courseUrl).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
