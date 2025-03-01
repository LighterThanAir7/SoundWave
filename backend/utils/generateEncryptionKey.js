import crypto from 'crypto';

const encryptionKey = crypto.randomBytes(32).toString('hex');
console.log('API_KEY_ENCRYPTION_KEY:', encryptionKey);