import { useState, useEffect } from "react";
import Select from "react-select";
const useSelect = (data) => {

//     <Select
//     className="w-100"
//     isClearable
//     menuPortalTarget={document.body}
//     styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
//     placeholder="Select Class"
//     isLoading={data?.isFetching}
//     onChange={(e) => {
//       formik.setFieldValue("classId", e)
//       handleChangeValue(e)
//     }}
//     getOptionLabel={option => option.name}
//     getOptionValue={option => option.id}
//     options={data?.data?.data}
//     name="classId"
//     value={data.values.classId}
//   />

  return [data];
};

export default useSelect;