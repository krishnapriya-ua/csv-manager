import { type CsvFile } from 'wasp/entities';
import { type GetCsvFiles, type UploadCsvFile } from 'wasp/server/operations';

export const getCsvFiles: GetCsvFiles<void, CsvFile[]> = async (_args, context) => {
  if (!context.user) {
    throw new Error('Not authorized');
  }

  return context.entities.CsvFile.findMany({
    where: {
      userId: context.user.id
    },
    orderBy: {
      uploadedAt: 'desc'
    }
  });
};

type UploadCsvFileArgs = {
  fileName: string;
  originalName: string;
  columnHeaders: string[];
  rowCount: number;
  rows: { rowData: any; rowIndex: number }[];
};

export const uploadCsvFile: UploadCsvFile<UploadCsvFileArgs, CsvFile> = async (args, context) => {
  if (!context.user) {
    throw new Error('Not authorized');
  }

  const csvFile = await context.entities.CsvFile.create({
    data: {
      userId: context.user.id,
      fileName: args.fileName,
      originalName: args.originalName,
      columnHeaders: args.columnHeaders,
      rowCount: args.rowCount,
      rows: {
        create: args.rows
      }
    },
    include: {
      rows: true
    }
  });

  return csvFile;
}; 