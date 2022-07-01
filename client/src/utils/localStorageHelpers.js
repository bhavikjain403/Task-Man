const storageKeyToken = 'toViewAppUser';

const saveUser = (user) =>
  localStorage.setItem(storageKeyToken, JSON.stringify(user));

const loadUser = () => JSON.parse(localStorage.getItem(storageKeyToken));

const logoutUser = () => localStorage.removeItem(storageKeyToken);

export default {
  saveUser,
  loadUser,
  logoutUser,
};
