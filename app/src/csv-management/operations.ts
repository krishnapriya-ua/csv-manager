import { type CsvFile, type CsvRow  } from 'wasp/entities';
import { type GetCsvFiles, type UploadCsvFile } from 'wasp/server/operations';
import { type GetCsvFileById } from 'wasp/server/operations';
import { type UpdateCsvCell } from 'wasp/server/operations'


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

type GetCsvFileByIdArgs = { id: string };

export const getCsvFileById: GetCsvFileById<GetCsvFileByIdArgs, CsvFile & { rows: CsvRow[] }> = async ({ id }, context) => {
  if (!context.user) {
    throw new Error('Not authorized');
  }

  const file = await context.entities.CsvFile.findUniqueOrThrow({
    where: { id },
    include: {
      rows: {
        orderBy: { rowIndex: 'asc' }
      }
    }
  });

  return file;
};

type UpdateCsvCellArgs = {
  fileId: string;
  rowId: string
  field: string
  newValue: string
}

export const updateCsvCell = async (
  { fileId, rowId, field, newValue }: UpdateCsvCellArgs,
  context: any
) => {
  if (!context.user) throw new Error('Not authorized');

  const existingRow = await context.entities.CsvRow.findUniqueOrThrow({
    where: { id: rowId },
  });

  const currentData = typeof existingRow.rowData === 'object' && existingRow.rowData !== null
    ? existingRow.rowData
    : {};

  const updatedRowData = {
    ...(currentData as Record<string, any>),
    [field]: newValue,
  };

  await context.entities.CsvRow.update({
    where: { id: rowId },
    data: { rowData: updatedRowData },
  });

  return true;
};