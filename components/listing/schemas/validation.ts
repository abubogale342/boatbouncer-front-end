import * as Yup from "yup";

export const formUpdateSchema = Yup.object().shape({
  boatName: Yup.string().required("Boat name is required"),
  boatType: Yup.string().required("Boat type is required"),
  description: Yup.string().required("Description is required"),
  manufacturer: Yup.string().required("Manufacturer is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.number().required("Year is required"),
  length: Yup.number().required("Length is required"),
  amenities: Yup.array()
    .min(1, "Amenities is required")
    .required("Amenities is required"),
  imageUrls: Yup.string().required("First image  upload is required"),
  category: Yup.array()
    .min(1, "Category is required")
    .required("Category is required"),
  subCategory: Yup.array(),
  features: Yup.bool()
    .oneOf([true], "Feature is required")
    .required("Feature is required"),
  securityAllowance: Yup.number().required("Security allowance is required"),
  pricing: Yup.mixed(),
  currency: Yup.string().required("currency is required"),
});
