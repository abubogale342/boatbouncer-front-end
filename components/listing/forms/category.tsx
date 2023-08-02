import { Field, Form, Formik } from "formik";
import {
  resetSubCategories,
  updateBasicInfoField,
  updateCategory,
  updateSubCategory,
} from "features/boat/boatSlice";
import { useSelector, useDispatch } from "react-redux";
import { categories } from "./data";

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
      <hr className="mb-4 mt-2 h-px border-0 bg-gray-200" />

      <div className="flex flex-col">
        <label htmlFor="category" className="mb-2 text-xs text-gray-700">
          Choose your category
        </label>

        <select
          name="category"
          id="category"
          className="h-11 rounded-lg border text-gray-500 shadow-sm"
          onChange={(event) => {
            handleChange(event);
            updateCategories(event.target.name, event.target.value);
          }}
          defaultValue={values.category ?? ""}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="h-11 rounded-lg border text-gray-900 shadow-sm"
            >
              {category.id}
            </option>
          ))}
        </select>
        {errors.category && touched.category && (
          <p className="ml-1 text-sm text-orange-700">
            {errors.category as string}
          </p>
        )}
      </div>
      {categories.filter(
        (category) => category.id === values.category,
      )?.[0] && (
        <div className="my-3 ml-10 flex flex-col">
          <select
            name="subCategory"
            id="subCategory"
            className="rounded-lg border text-gray-500 shadow-sm"
            onChange={(event) => {
              handleChange(event);
              updateSubCategories(event.target.name, event.target.value);
            }}
            defaultValue={values.subCategory ?? ""}
          >
            <option value="" className="h-10">
              Select Sub Category
            </option>
            {categories
              .filter((category) => category.id === values.category)?.[0]
              ?.subCategories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="h-11 rounded-lg border text-gray-900"
                >
                  {category.id}
                </option>
              ))}
          </select>
          {errors.subCategory && touched.subCategory && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.subCategory as string}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
