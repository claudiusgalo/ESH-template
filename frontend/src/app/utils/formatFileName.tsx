import moment from "moment";


export const formatFilename = (filename) => {
  const date = moment().format("YYYYMMDD");
  const randomString = Math.random()
    .toString(36)
    .substring(2, 7);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
  return newFilename.substring(0, 60);
};