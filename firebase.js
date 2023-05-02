import { initializeApp } from 'firebase/app';
import config from './config.js';

const firebase = initializeApp(config.firebaseConfig);

export default firebase;
