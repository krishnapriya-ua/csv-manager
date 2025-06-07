import { useParams } from 'react-router-dom';
import { useQuery, useAction } from 'wasp/client/operations';
import { getCsvFileById, updateCsvCell } from 'wasp/client/operations';
import { useState } from 'react';

  const CsvDetail = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <p>Invalid file ID</p>;

  const { data: file, isLoading, error } = useQuery(getCsvFileById, { id });
  const updateCell = useAction(updateCsvCell);

  const [editingCell, setEditingCell] = useState<{ rowId: string; field: string } | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleCellClick = (rowId: string, field: string, currentValue: string) => {
    setEditingCell({ rowId, field });
    setInputValue(currentValue);
  };

  const handleSave = async () => {
    if (!editingCell || !id) return;

    try {
      await updateCell({
        fileId: id,
        rowId: editingCell.rowId,
        field: editingCell.field,
        newValue: inputValue,
      });

      setEditingCell(null);
    } catch (err) {
      console.error('Error updating cell:', err);
    }
  };

  if (isLoading) return <p className="text-gray-600 p-4">Loading...</p>;
  if (error) return <p className="text-red-600 p-4">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{file.originalName}</h1>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <input type="checkbox" className="accent-blue-500" />
              </th>
              {file.columnHeaders.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {file.rows.map((row) => {
              const rowData = row.rowData as Record<string, any>;
              return (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="accent-blue-500" />
                  </td>
                  {file.columnHeaders.map((header) => {
                    const isEditing =
                      editingCell?.rowId === row.id && editingCell?.field === header;

                    return (
                      <td
                        key={header}
                        className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                      >
                        {isEditing ? (
                          <div className="flex items-center space-x-2">
                            <input
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              className="border px-2 py-1 text-sm rounded"
                              autoFocus
                            />
                            <button
                              onClick={handleSave}
                              className="text-blue-600 hover:underline text-sm"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() =>
                              handleCellClick(row.id, header, rowData[header] ?? '')
                            }
                            className="cursor-pointer hover:underline"
                          >
                            {rowData[header] ?? '-'}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvDetail;
