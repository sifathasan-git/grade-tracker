export const fetchUserDetails = (username) => {
  const url = "http://localhost:3001/api/users/info/" + username;
  const response = axios.get(url).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};

export const changeName = (id, name) => {
  const url = "http://localhost:3001/api/users/name/" + id;
  const data = { name };
  const response = axios.put(url, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const changeUsername = (id, username) => {
  const url = "http://localhost:3001/api/users/username/" + id;
  const data = { username };
  const response = axios.put(url, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const changePassword = (id, password) => {
  const url = "http://localhost:3001/api/users/password/" + id;
  const data = { password };
  const response = axios.put(url, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
export const changeEmail = (id, email) => {
  const url = "http://localhost:3001/api/users/email/" + id;
  const data = { email };
  const response = axios.put(url, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
