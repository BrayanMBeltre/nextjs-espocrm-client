import axios from "axios";

export const caseService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  count,
};

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/espocrm/Case`;

async function getAll() {
  const { data } = await axios.get(baseUrl);
  return data;
}

async function getById(id) {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data;
}

async function create(params) {
  const { data } = await axios.post(baseUrl, params);
  return data;
}

async function update(id, params) {
  const { data } = await axios.put(`${baseUrl}/${id}`, params);
  return data;
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
  const { data } = await axios.delete(`${baseUrl}/${id}`);
  return data;
}

async function count() {
  const { data } = await axios.get(baseUrl);
  return data.total;
}
