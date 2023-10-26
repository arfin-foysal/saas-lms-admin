import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetAreaListQuery, useGetDistrictListQuery, useGetDivisionListQuery, useGetUpazilaListQuery } from "../../../services/commonApi";
import { useStudentSaveOrUpdateMutation } from "../../../services/resourceApi";
const UpdateStudent = ({ handleClose, paramValue }) => {
    const [studentSaveOrUpdate, res] = useStudentSaveOrUpdateMutation();
    const divisionRes = useGetDivisionListQuery()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            'id': paramValue.id,
            'user_id': paramValue.user_id,
            'name': paramValue.name,
            'email': paramValue.email,
            'education': paramValue.education,
            'institute': paramValue.institute,
            'contact_no': paramValue.contact_no,
            'device_id': paramValue.device_id,
            'referral_code': paramValue.referral_code,
            'referred_code': paramValue.referred_code,
            'alternative_contact_no': paramValue.alternative_contact_no,
            'gender': paramValue.gender,
            'blood_group': paramValue.blood_group,
            'bio': paramValue.bio,
            'father_name': paramValue.father_name,
            'mother_name': paramValue.mother_name,
            'religion': paramValue.religion,
            'marital_status': paramValue.marital_status,
            'date_of_birth': paramValue.date_of_birth,
            'profession': paramValue.profession,
            'current_address': paramValue.current_address,
            'permanent_address': paramValue.permanent_address,
            'division_id': paramValue.division_id,
            'district_id': paramValue.district_id,
            'city_id': paramValue.city_id,
            'area_id': paramValue.area_id,
            'nid_no': paramValue.nid_no,
            'birth_certificate_no': paramValue.birth_certificate_no,
            'passport_no': paramValue.passport_no,
            'interests': paramValue.interests,
            'image': paramValue.image,
            'intro_video': paramValue.intro_video,
            'status': paramValue.status,
            'is_foreigner': paramValue.is_foreigner,
            'is_active': paramValue.is_active,
            'rating': paramValue.rating,

        },

        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append('id', paramValue.id);
            formData.append('user_id', paramValue.user_id);
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('education', values.education);
            formData.append('institute', values.institute);
            formData.append('contact_no', values.contact_no);
            formData.append('mentor_code', values.mentor_code);
            formData.append('device_id', values.device_id);
            formData.append('referral_code', values.referral_code);
            formData.append('referred_code', values.referred_code);
            formData.append('blood_group', values.blood_group);
            formData.append('alternative_contact_no', values.alternative_contact_no);
            formData.append('gender', values.gender);
            formData.append('bio', values.bio);
            formData.append('father_name', values.father_name);
            formData.append('mother_name', values.mother_name);
            formData.append('religion', values.religion);
            formData.append('marital_status', values.marital_status);
            formData.append('date_of_birth', values.date_of_birth);
            formData.append('profession', values.profession);
            formData.append('current_address', values.current_address);
            formData.append('permanent_address', values.permanent_address);
            formData.append('division_id', values.division_id);
            formData.append('district_id', values.district_id);
            formData.append('city_id', values.city_id);
            formData.append('area_id', values.area_id);
            formData.append('nid_no', values.nid_no);
            formData.append('birth_certificate_no', values.birth_certificate_no);
            formData.append('passport_no', values.passport_no);
            formData.append('interests', values.interests);
            formData.append('image', values.image);
            formData.append('intro_video', values.intro_video);
            formData.append('status', values.status);
            formData.append('is_foreigner', values.is_foreigner ? 1 : 0);
            formData.append('is_active', values.is_active ? 1 : 0);
            formData.append('rating', values.rating);

           
            try {
                const result = await studentSaveOrUpdate(formData).unwrap();
                toast.success(result.message);
                resetForm();
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });

    const districtRes = useGetDistrictListQuery(formik.values.division_id || 0)
    const upozilaRes = useGetUpazilaListQuery(formik.values.district_id || 0)
    const areaRes = useGetAreaListQuery(formik.values.city_id || 0)

    const handleDivisionChange = (e) => {
        formik.setFieldValue('division_id', e.target.value)
        formik.setFieldValue('district_id', '')
        formik.setFieldValue('city_id', '')
        formik.setFieldValue('area_id', '')
    }
    const handleDistrictChange = (e) => {
        formik.setFieldValue('district_id', e.target.value)
        formik.setFieldValue('city_id', '')
        formik.setFieldValue('area_id', '')
    }

    if (res.isSuccess) {
        handleClose();
    }

    return (
        <div>
            <form
                className="form-sample"
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
            >
                <div className="row">
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Name<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter name"
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                required
                            />
                        </div>
                    </div>


                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Email</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter email"
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                       
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Contact No</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Contact no"
                                type="text"
                                className="form-control"
                                name="contact_no"
                                onChange={formik.handleChange}
                                value={formik.values.contact_no}
                        
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Alternative Contact No</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Alternative Contact No"
                                type="text"
                                className="form-control"
                                name="alternative_contact_no"
                                onChange={formik.handleChange}
                                value={formik.values.alternative_contact_no}
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Education</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter education"
                                type="text"
                                className="form-control"
                                name="education"
                                onChange={formik.handleChange}
                                value={formik.values.education}
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Institute</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter institute"
                                type="text"
                                className="form-control"
                                name="institute"
                                onChange={formik.handleChange}
                                value={formik.values.institute}
                            />
                        </div>
                    </div>

                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Referral Code</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Referral Code"
                                type="text"
                                className="form-control"
                                name="referral_code"
                                onChange={formik.handleChange}
                                value={formik.values.referral_code}

                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Referred Code</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Referred Code"
                                type="text"
                                className="form-control"
                                name="referred_code"
                                onChange={formik.handleChange}
                                value={formik.values.referred_code}

                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Device ID</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Device ID"
                                type="text"
                                className="form-control"
                                name="device_id"
                                onChange={formik.handleChange}
                                value={formik.values.device_id}

                            />
                        </div>
                    </div>


                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Gender</label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="gender"
                                onChange={formik.handleChange}
                                value={formik.values.gender}

                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>


                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Blood Group</label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="blood_group"
                                onChange={formik.handleChange}
                                value={formik.values.blood_group}

                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                <option value="A+">A+</option>
                                <option value="B+">B+</option>
                                <option value="O+">O+</option>
                                <option value="AB+">AB+</option>
                                <option value="A-">A+</option>
                                <option value="B-">B-</option>
                                <option value="AB-">AB-</option>
                            </select>


                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Father Name</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Father Name"
                                type="text"
                                className="form-control"
                                name="father_name"
                                onChange={formik.handleChange}
                                value={formik.values.father_name}

                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Mother name</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Mother name"
                                type="text"
                                className="form-control"
                                name="mother_name"
                                onChange={formik.handleChange}
                                value={formik.values.mother_name}

                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Religion</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter religion"
                                type="text"
                                className="form-control"
                                name="religion"
                                onChange={formik.handleChange}
                                value={formik.values.religion}

                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Marital Status</label>
                        <div className="col-12">
                            <div className="col-12">
                                <select
                                    placeholder="Enter Marital Status"
                                    className="form-control"
                                    name="marital_status"
                                    onChange={formik.handleChange}
                                    value={formik.values.marital_status}
                                >
                                    <option value="" disabled selected hidden> --Select-- </option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>


                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Date Of Birth</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Date Of Birth"
                                type="date"
                                className="form-control"
                                name="date_of_birth"
                                onChange={formik.handleChange}
                                value={formik.values.date_of_birth}
                                defaultValue={paramValue?.date_of_birth?.slice(0, 10)                                }
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Profession</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Profession"
                                type="text"
                                className="form-control"
                                name="profession"
                                onChange={formik.handleChange}
                                value={formik.values.profession}
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">NID No</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Nid No"
                                type="number"
                                className="form-control"
                                name="nid_no"
                                onChange={formik.handleChange}
                                value={formik.values.nid_no}
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Birth Certificate No</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter birth certificate no"
                                type="number"
                                className="form-control"
                                name="birth_certificate_no"
                                onChange={formik.handleChange}
                                value={formik.values.birth_certificate_no}
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Passport No</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Passport no"
                                type="number"
                                className="form-control"
                                name="passport_no"
                                onChange={formik.handleChange}
                                value={formik.values.passport_no}
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Intro Video</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Intro Video"
                                type="text"
                                className="form-control"
                                name="intro_video"
                                onChange={formik.handleChange}
                                value={formik.values.intro_video}
                            />
                        </div>
                    </div>
      

                    <div className="form-group col-3 my-1">
                        <label className="col-12 col-form-label">Division </label>
                        <div className="col-12">

                            <select
                                className="form-control"
                                name="division_id"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    handleDivisionChange(e)
                                }}
                                value={formik.values.division_id}

                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                {divisionRes.data && divisionRes?.data?.data?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                )
                                )}
                            </select>

                        </div>
                    </div>
                    <div className="form-group col-3 my-1">
                        <label className="col-12 col-form-label">District </label>
                        <div className="col-12">

                            <select
                                className="form-control"
                                name="district_id"
                                onChange={(e) => {
                                    formik.handleChange(e)
                                    handleDistrictChange(e)
                                }}
                                value={formik.values.district_id}

                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                {districtRes.data && districtRes?.data?.data?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                )
                                )}
                            </select>

                        </div>
                    </div>
                    <div className="form-group col-3 my-1">
                        <label className="col-12 col-form-label">City </label>
                        <div className="col-12">

                            <select
                                className="form-control"
                                name="city_id"
                                onChange={formik.handleChange}
                                value={formik.values.city_id}

                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                {upozilaRes.data && upozilaRes?.data?.data?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                )
                                )}
                            </select>

                        </div>
                    </div>
                    <div className="form-group col-3 my-1">
                        <label className="col-12 col-form-label">Area </label>
                        <div className="col-12">

                            <select
                                className="form-control"
                                name="area_id"
                                onChange={formik.handleChange}
                                value={formik.values.area_id}

                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                {areaRes.data && areaRes?.data?.data?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                )
                                )}
                            </select>

                        </div>
                    </div>

                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Current Address</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Current Address"
                                type="text"
                                className="form-control"
                                name="current_address"
                                onChange={formik.handleChange}
                                value={formik.values.current_address}

                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Permanent Address</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Permanent Address"
                                type="text"
                                className="form-control"
                                name="permanent_address"
                                onChange={formik.handleChange}
                                value={formik.values.permanent_address}

                            />
                        </div>
                    </div>

                    <div className="form-group  col-4 my-1">
                        <label className="col-12 col-form-label">Image</label>
                        <div className="col-12">
                            <input
                                className="form-control"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("image", e.currentTarget.files[0]);

                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Status</label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="status"
                                onChange={formik.handleChange}
                                value={formik.values.status}

                            >
                                <option value="Pending" disabled selected hidden> --Select-- </option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                                <option value="On-Hold">On-Hold</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">Rating <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Rating"
                                type="number"
                                max="5"
                                className="form-control"
                                name="rating"
                                onChange={formik.handleChange}
                                value={formik.values.rating}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Bio </label>
                        <div className="col-12">
                            <textarea
                                placeholder="Enter Bio"
                                className="form-control"
                                name="bio"
                                onChange={formik.handleChange}
                                value={formik.values.bio}
                            />
                        </div>
                    </div>
                    <div className="form-group row col-4 my-2 ">
                        <label className="col-6 col-form-label">Is Active</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                
                                    name="is_active"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_active}
                                    checked={formik.values.is_active}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row col-4 my-2 ">
                        <label className="col-6 col-form-label">Is Foreigner</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    
                                    name="is_foreigner"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_foreigner}
                                    checked={formik.values.is_foreigner}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal.Footer>

                    <button className="btn btn-dark me-2 btn-sm" onClick={handleClose}>
                        Close
                    </button>

                    <button type="submit" className="btn btn-success btn-sm">
                        Submit
                    </button>

                </Modal.Footer>
            </form>
        </div>
    );
};

export default UpdateStudent;
