import React from "react";
import Image from "next/image";

const ImageForm = ({ template, set_template, width, height }) => {
  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      set_template((prev) => ({
        ...prev,
        image: URL.createObjectURL(event.target.files[0]),
      }));

      // Convert the file to base64
      const base64 = await toBase64(event.target.files[0]);

      set_template((prev) => ({ ...prev, imageBase64: base64 }));
    }
  };

  // Convert a file to base64 string
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // On submit, upload the file
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    // Convert the file to base64
    const base64 = await toBase64(file);

    set_template((prev) => ({ ...prev, imageBase64: base64 }));

    // // Clear the states after upload
    // setFile(null);
    // setBase64(null);
  };

  return (
    <>
      {template.image ? (
        <div className="">
          <label for="dropzone-file">
            <Image
              src={template.image}
              alt="image"
              width={width}
              height={height}
              className="item-center rounded-lg max-lg:w-screen flex flex-col items-center justify-center "
            />
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              onChange={onImageChange}
            />
          </label>
        </div>
      ) : (
        <div className="">
          <label
            for="dropzone-file"
            className={`flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100   `}
            style={{ width: width, height: height }}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p class="text-xs text-gray-500 ">SVG, PNG, JPG or GIF</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={onImageChange}
            />
          </label>
        </div>
      )}
    </>
  );
};

export default ImageForm;
