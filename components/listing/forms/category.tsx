import { Field, Form, Formik } from "formik";
import {
  resetSubCategories,
  updateBasicInfoField,
  updateCategory,
  updateSubCategory,
} from "features/boat/boatSlice";
import { useSelector, useDispatch } from "react-redux";
import { categories } from "./data";
import { Select, Option } from "@material-tailwind/react";
import { returnClass } from "@/components/shared/styles/input";

const CategoryForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleBlur: any;
}) => {
  const dispatch = useDispatch();

  const updateCategories = (key: string, value: string) => {
    dispatch(resetSubCategories());
    dispatch(updateCategory({ key, value }));
  };

  const updateSubCategories = (key: string, value: string) => {
    dispatch(updateSubCategory({ key, value }));
  };

  return (
    <div className="mt-0 px-4">
      <p className="text-xl font-semibold text-gray-900">Category</p>
      <hr className="mb-6 mt-3 h-px border-0 bg-gray-200" />

      <div className="relative w-full">
        <select
          id="category"
          name="category"
          className={returnClass()[0]}
          defaultValue={values.category ?? categories[0].id}
          onChange={(event) => {
            handleChange(event);
            updateCategories(event?.target.name, event?.target.value);
          }}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.id}
            </option>
          ))}
        </select>
        <label className={returnClass()[1]}>Choose you category</label>
      </div>

      {errors.category && touched.category && (
        <p className="ml-1 text-sm text-orange-700">
          {errors.category as string}
        </p>
      )}

      {categories.filter(
        (category) => category.id === values.category,
      )?.[0] && (
        <div className="ml-2 flex flex-row">
          <div className="ml-3 mt-3 w-px bg-cyan-600"></div>
          <div className="relative ml-3 mt-4 w-full">
            <select
              name="subCategory"
              id="subCategory"
              className={returnClass()[0]}
              onChange={(event) => {
                handleChange(event);
                updateSubCategories(event.target.name, event.target.value);
              }}
              defaultValue={values.subCategory ?? ""}
            >
              <option value="">Select Sub Category</option>
              {categories
                .filter((category) => category.id === values.category)?.[0]
                ?.subCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id}
                  </option>
                ))}
            </select>
            <label className={returnClass()[1]}></label>
            {errors.subCategory && touched.subCategory && (
              <p className="ml-1 text-sm text-orange-700">
                {errors.subCategory as string}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
