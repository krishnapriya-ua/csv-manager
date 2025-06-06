import { useNavigate } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Hero() {
  const navigate = useNavigate();
  const { data: user } = useAuth();
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setIsUploading(true);
      const file = acceptedFiles[0]; // Handle one file at a time
      // TODO: Implement file upload action
      console.log('File to upload:', file);
    } catch (error) {
      console.error('Error uploading file  :', error);
    } finally {
      setIsUploading(false);
    }
  }, [user, navigate]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    noClick: true // Disable automatic click handling
  });

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
    } else {
      open(); // Manually trigger file dialog
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8'>
        {/* Main Heading */}
        <div className='text-center mb-20'>
          <h5 className='text-2xl font-bold text-gray-900 sm:text-5xl md:text-3xl' style={{letterSpacing:'1px'}}>
           CSV MANAGER
          </h5>
          <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
            Select an Import Method
          </p>
        </div>

        {/* Import Options */}
        <div className='mt-10'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {/* CSV File Upload Option with Drag & Drop */}
            <div 
              {...getRootProps()}
              onClick={handleContainerClick}
              className={`relative rounded-lg border ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'} px-6 py-5 shadow-sm hover:border-gray-400 cursor-pointer transition-all duration-200 hover:shadow-md`}
            >
              <input {...getInputProps()} />
              <div className='text-center'>
                <div className='h-12 w-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 text-blue-600' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className='mt-4 text-lg font-medium text-gray-900'>CSV File Upload</h3>
                {isUploading ? (
                  <p className='mt-2 text-sm text-gray-500'>Uploading...</p>
                ) : isDragActive ? (
                  <p className='mt-2 text-sm text-blue-500'>Drop your CSV file here</p>
                ) : (
                  <p className='mt-2 text-sm text-gray-500'>
                    {user ? 'Drag & drop your CSV file here, or click to select' : 'Please login to upload files'}
                  </p>
                )}
              </div>
            </div>

            {/* Integration Option */}
            <div 
              className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 cursor-pointer transition-all duration-200 hover:shadow-md'
            >
              <div className='text-center'>
                <div className='h-12 w-12 mx-auto bg-green-100 rounded-lg flex items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 text-green-600' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className='mt-4 text-lg font-medium text-gray-900'>Integration Import</h3>
                <p className='mt-2 text-sm text-gray-500'>
                  Import from connected data sources [Dummy]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}