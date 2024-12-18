// src/backend/utils/generateKeys.js
import { generateApiKeyPair } from './apiKeyManager.js';
import { storeApiKeys } from '../models/apiKeyModel.js';

const keyPair = generateApiKeyPair();

// Store the keys in the database
await storeApiKeys('initial_super_admin', keyPair.apiKey, keyPair.secretKey);

console.log('Generated Admin Keys:');
console.log('API Key:', keyPair.apiKey);
console.log('Secret Key:', keyPair.secretKey);