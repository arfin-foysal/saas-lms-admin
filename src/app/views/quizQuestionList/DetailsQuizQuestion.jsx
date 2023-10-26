import { LazyLoadImage } from "react-lazy-load-image-component";
const DetailsQuizQuestion = ({ handleClose, values }) => {

    return (
        <>
            <div className="row">
    
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td >Code:</td>
                            <td>{values?.video_code}</td>
                        </tr>
                        <tr>
                            <td>Title:</td>
                            <td>{values?.title}</td>
                     </tr>
                         <tr>
                            <td>Bangla Title:</td>
                            <td>{values?.title_bn}</td>
                        </tr>
                <tr>
                            <td>Class:</td>
                            <td>{values?.class_name}</td>
                        </tr>
                        <tr>
                            <td>Subject:</td>
                            <td>{values?.subject_name}</td>
                        </tr>
                        <tr>
                            <td>
                                Chapter:
                            </td>
                            <td>{values?.chapter_name}</td>
                        </tr>
                        <tr>
                            <td>
                                Author:
                            </td>
                            <td>{values?.author_name}</td>
                         </tr>
                       <tr>
                            <td>
                                Author Details:
                            </td>
                            <td>{values?.author_details}</td>
                        </tr>
                        <tr>
                            <td>
                                Price:
                            </td>
                            <td>{values?.price}</td>
                        </tr>
                        <tr>
                            <td>
                                Rating:
                            </td>
                            <td>{values?.rating}</td>
                        </tr>
                        <tr>
                            <th>
                                Raw URL:
                            </th>
                            <th>{values?.raw_url}</th>
                        </tr>
                        <tr>
                            <th>
                                S3 URL:
                            </th>
                            <th>{values?.s3_url}</th>
                        </tr>
                        <tr>
                            <th>
                                Download URL:
                            </th>
                            <th>{values?.download_url}</th>
                        </tr>
                        <tr>
                            <th>
                                Duration:
                            </th>
                            <th>{values?.duration}</th>
                        </tr>

                        <tr>
                            <td>
                                Thumbnail:
                            </td>
                            <td>

                                <LazyLoadImage
                                    src={`${import.meta.env.VITE_ASSET_HOST_URL}${values?.thumbnail}`}
                                    width={50} height={40}
                                    alt="Image Alt"
                                />
                            </td>
                        </tr> 
                    </thead>
                </table>
                <p>
                    Description: {values?.description}
                </p>
            </div>
        </>
    );
};

export default DetailsQuizQuestion;
