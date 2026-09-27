export type FileWriteAction = {
  type: "write_file";
  filePath: string;
  content: string;
};