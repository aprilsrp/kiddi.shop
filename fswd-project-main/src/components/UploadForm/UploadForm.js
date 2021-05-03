import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client'

import { UPLOAD_FILE } from '../../graphql/uploadForm'

export const UploadForm = (props) => {
  const [images, setImages] = useState([]);
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: async data => {
      setImages([...images, data.uploadFile.url])
    }
  })

  useEffect(() => {
    props.handleReturnImage(images);
  }, [images])

  const handleFileChange = (e) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach(file => uploadFile({ variables: { file } }))
  }

  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="file"
        onChange={handleFileChange}
        multiple
        accept="image/png, image/jpeg" />
    </div>
  );
}

