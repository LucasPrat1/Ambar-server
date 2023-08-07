import multer from 'multer';
import { dirname, extname, join } from 'path'
import { fileURLToPath } from 'url';

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const MIMETYPES = ["image/jpeg","image/png","image/jpg"];

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, '../uploads'),
    filename: (req,file,cb) => {
      const fileExtension = extname(file.originalname);
      cb(null, `img-${Date.now()}${fileExtension}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null,true)
    else cb(new Error('only .jpeg or .png are allowed'))
  },
  limits: {
    fieldSize: 10000000
  }
})

export default multerUpload
