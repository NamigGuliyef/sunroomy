import { diskStorage } from 'multer';
export const MulterOptions = {
  storage: diskStorage({
    destination: './src/public',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 10 },
};

export const MulterOptionsCloudinary = {
  storage: diskStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 10 },
};
