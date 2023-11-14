import { v2 as cloudinary } from "cloudinary";

export async function getCloudinary(img) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (img.includes("cloudinary.com")) {
    return img;
  } else {
    try {
      const res = await cloudinary.uploader.upload(img, {
        // public_id: "img_1",
      });
      return res.url;
    } catch (error) {
      console.log("imgError", error);
      return "";
    }
  }
}

// async function getCloudinary(img) {
//   cloudinary.config({
//     cloud_name: "dfdwyn5dh",
//     api_key: "279461676153856",
//     api_secret: "fsW4PzsRHQmGJMJdtRh2Nf61hXQ",
//   });

//   try {
//     const res = await cloudinary.uploader.upload(img, {
//       public_id: "img_3",
//     });
//     console.log(res.url);
//     return res.url;
//   } catch (error) {
//     console.log("imgError", error);
//     return "";
//   }
// }
// getCloudinary(
//   "https://res.cloudinary.com/dfdwyn5dh/image/upload/v1699867327/img_1.png"
// );
