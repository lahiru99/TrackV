// Mock Firebase utils

const STORAGE_KEY = 'mockFirebaseStorage';

const getMockStorage = (): { [key: string]: string } => {
  const storage = localStorage.getItem(STORAGE_KEY);
  return storage ? JSON.parse(storage) : {};
};

const setMockStorage = (storage: { [key: string]: string }) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
};

export const uploadFile = async (file: File, path: string) => {
  console.log(`Mocking file upload: ${file.name} to ${path}`);
  const storage = getMockStorage();
  storage[path] = URL.createObjectURL(file);
  setMockStorage(storage);
  console.log('Current mockStorage:', storage);
  return Promise.resolve();
};

export const listFiles = async (path: string) => {
  console.log(`Mocking list files from: ${path}`);
  const storage = getMockStorage();
  const files = Object.keys(storage)
    .filter((key) => key.startsWith(path))
    .map((key) => ({
      name: key.split('/').pop() || '',
      fullPath: key,
    }));
  console.log('Files found:', files);
  return Promise.resolve(files);
};

export const getFileUrl = async (path: string) => {
  console.log(`Mocking get file URL for: ${path}`);
  const storage = getMockStorage();
  return Promise.resolve(storage[path] || `https://example.com/${path}`);
};
