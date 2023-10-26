import React, { memo } from 'react'
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
const PreviewImage = ({ previewImage, formValue }) => {
    return (
        <div>
            {previewImage ? (
                <img
                    className="py-2
                   border border-2 
                                "
                    src={previewImage}
                    width="80px"
                    height="80px"
                    alt="Preview Image"
                />
            ) : (
                <img
                    className="py-2
                        border border-2 
                    "
                    src={
                        formValue === null
                            ? <BsFillCloudArrowUpFill size={40} />
                            : `${import.meta.env.VITE_ASSET_HOST_URL}${formValue}`
                    }
                    width="80px"
                    height="80px"
                    alt="Preview Image"
                />
            )}
        </div>
    )
}

export default memo(PreviewImage)