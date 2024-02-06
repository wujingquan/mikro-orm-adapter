import fs, { type WriteFileOptions } from 'fs';
import { FileSystem } from 'casbin'

const defaultFileSystem: FileSystem = {
  readFileSync(path: string, encoding?: Object | null) {
    return fs.readFileSync(path, encoding);
  },
  writeFileSync(path: string, text: string, encoding?: string) {
    return fs.writeFileSync(path, text, encoding as WriteFileOptions);
  },
};
  
export default defaultFileSystem