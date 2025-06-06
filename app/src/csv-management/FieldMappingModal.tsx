import { useState } from 'react';

type Props = {
  csvHeaders: string[];
  systemFields: string[];
  onCancel: () => void;
  onFinish: (mapping: Record<string, string>) => void;
};

export default function FieldMappingModal ({
  csvHeaders,
  systemFields,
  onCancel,
  onFinish,
}: Props) {
  const [map, setMap] = useState<Record<string, string>>({});

  
  

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Map CSV Fields</h2>

        <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2">
          {csvHeaders.map((h) => (
            <div key={h} className="flex items-center justify-between gap-4">
              <span className="text-gray-700">{h}</span>
              <select
                className="border rounded px-3 py-1 text-sm flex-1"
                value={map[h] ?? ''}
                onChange={(e) =>
                   setMap((prev) => ({ ...prev, [h]: e.target.value }))
                }
              >
                <option value="">-- Not Mapped --</option>
                {systemFields.map((sf) => (
                  <option key={sf} value={sf}>
                    {sf}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={onCancel} className="text-gray-500">
            Cancel
          </button>
          <button onClick={() => onFinish(map)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
          </button>
        </div>
      </div>
    </div>
  );
}
