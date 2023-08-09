import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSettingUpdateMutation } from "../../../services/masterSettingsApi";
const UpdateSettings = ({ handleClose, paramValue }) => {
    const [settingUpdate, res] = useSettingUpdateMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: paramValue && paramValue?.settings?.id,
            asset_host: paramValue && paramValue?.settings?.asset_host,
            host_url: paramValue && paramValue?.settings?.host_url,
            color_theme: paramValue && paramValue?.settings?.color_theme,
        },

        onSubmit: async (values, { resetForm }) => {
            resetForm();

            try {
                const result = await settingUpdate(values).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
        },
    });
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
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Host Url <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Host Url"
                                type="text"
                                className="form-control"
                                name="host_url"
                                onChange={formik.handleChange}
                                value={formik.values.host_url}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Asset Host <span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Host Url"
                                type="text"
                                className="form-control"
                                name="asset_host"
                                onChange={formik.handleChange}
                                value={formik.values.asset_host}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-12 my-2">
                        <label className="form-label">Color Theme</label>
                        <div className="col-12">
                            <input type="color" className="form-control form-control-color"
                                name="color_theme"
                                value={formik.values.color_theme}
                                onChange={formik.handleChange}
                                title="Choose your color" />
                        </div>
                    </div>
                </div>
                <Modal.Footer>
                    <Button className="btn btn-dark me-2 btn-sm" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" className="btn btn-success btn-sm">
                        Submit
                    </Button>
                </Modal.Footer>
            </form>
        </div>
    );
};

export default UpdateSettings;
