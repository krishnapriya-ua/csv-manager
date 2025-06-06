import { useParams } from 'react-router-dom';
import { useQuery } from 'wasp/client/operations';
import { getCsvFileById } from 'wasp/client/operations';

const CsvDetail = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <p>Invalid file ID</p>;

  const { data: file, isLoading, error } = useQuery(getCsvFileById, { id });

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
                  {file.columnHeaders.map((header) => (
                    <td
                      key={header}
                      className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      {rowData[header] ?? '-'}
                    </td>
                  ))}
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
