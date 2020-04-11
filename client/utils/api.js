const ENDPOINT = 'http://localhost:5000';

export default {
  user: `${ENDPOINT}/api/user`,
  refresh: `${ENDPOINT}/api/auth/token`,
  list: `${ENDPOINT}/api/user/all`,
  profile: `${ENDPOINT}/api/profile`,
  auth: `${ENDPOINT}/api/auth`,
  cities: `${ENDPOINT}/api/profile/cities`,
  skills: `${ENDPOINT}/api/profile/skills`,
  authGithub: `${ENDPOINT}/api/auth/github`
};
