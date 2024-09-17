import rateLimit from 'express-rate-limit';
const limitAccess = (options) => rateLimit(options);

export default limitAccess;