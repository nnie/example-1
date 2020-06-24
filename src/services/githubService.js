import CONFIG from "../config";

export const getUserRepos = async owner => {
  const r = await fetch(`${CONFIG.API_BASE_URL}/users/${owner}/repos`);
  if (r.ok) return await r.json();
  throw new Error(r.status);
};

export const getUserSuggestions = async (str, limit = 3) => {
  const r = await fetch(
    `${CONFIG.API_BASE_URL}/search/users?q=${str}&page=1&per_page=${limit}`
  );
  if (r.ok) return await r.json();
  throw new Error(r.status);
};
