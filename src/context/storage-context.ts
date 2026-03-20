import { createContext } from '@lit/context';
import { StorageService } from '../services/storage.js';

export const storageContext = createContext<StorageService>('storage');