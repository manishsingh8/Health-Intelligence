import { useState } from "react";

const FileUpload = () => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "No file chosen");
  };

  return (
    <div className="w-full">
      <label className="block border border-gray-300 rounded-md p-3 bg-gray-50 cursor-pointer text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Choose File</span>
          <span className="text-gray-500">{fileName}</span>
        </div>

        {/* Hidden browser file input */}
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
};
export default FileUpload;
