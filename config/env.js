export const CURRENT_ENV = 'dev';
const ENVIRONMENTS = {
  dev: {
    BASE_URL: 'http://localhost:8666',
  },
  prod: {
    BASE_URL: 'http://localhost:8888',
  }
}
export const ENV = ENVIRONMENTS[`${CURRENT_ENV}`]