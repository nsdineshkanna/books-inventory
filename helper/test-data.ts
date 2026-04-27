const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) {
  throw new Error('Missing Username or Password in .env');
}

export const credentials = {
  username,
  password
};