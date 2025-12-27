import axios from 'axios';

export const authService = {
  login: (username, password) => 
    axios.get(`/users?username=${username}&password=${password}&roleState=true&_expand=role`),
};

export const newsService = {
  getAll: (params) => axios.get('/news', { params }),
  getById: (id, params) => axios.get(`/news/${id}`, { params }),
  create: (data) => axios.post('/news', data),
  update: (id, data) => axios.patch(`/news/${id}`, data),
  delete: (id) => axios.delete(`/news/${id}`),
};

export const categoryService = {
  getAll: () => axios.get('/categories'),
  update: (id, data) => axios.patch(`/categories/${id}`, data),
  delete: (id) => axios.delete(`/categories/${id}`),
};

export const userService = {
  getAll: (params) => axios.get('/users', { params }),
  create: (data) => axios.post('/users', data),
  update: (id, data) => axios.patch(`/users/${id}`, data),
  delete: (id) => axios.delete(`/users/${id}`),
};

export const regionService = {
  getAll: () => axios.get('/regions'),
};

export const roleService = {
  getAll: () => axios.get('/roles'),
  update: (id, data) => axios.patch(`/roles/${id}`, data),
  delete: (id) => axios.delete(`/roles/${id}`),
};

export const rightService = {
  getAll: (params) => axios.get('/rights', { params }),
  update: (id, data) => axios.patch(`/rights/${id}`, data),
  delete: (id) => axios.delete(`/rights/${id}`),
  getChildren: () => axios.get('/children'),
};
