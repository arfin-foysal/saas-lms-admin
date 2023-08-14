// src/components/TagsInput.js
import { useState } from 'react'
import './tags.scss'
import PageTopHeader from '../../components/PageTopHeader'
import { useGetTagsListQuery, useTagsCreateOrUpdateMutation, useTagsDeleteMutation } from '../../../services/masterSettingsApi';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { confirmHandel } from '../../../utils/Alert';
import { BiEdit, BiMinusCircle, BiTrash, BiUpload } from 'react-icons/bi';

function Tags() {
    const res = useGetTagsListQuery()
    const { data, isSuccess, isFetching, isError } = res;
    const [quizCreateOrUpdate, ress] = useTagsCreateOrUpdateMutation()
    const [tagsDelete] = useTagsDeleteMutation()
    const [tags, setTags] = useState([])
    const [updateState, setUpdateState] = useState(false)
    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    const handelSubmit = async () => {
        if (tags.length === 0) {
            toast.warn('Please add tags')
            return
        }
        const tag_Arr = JSON.stringify(tags);

        try {
            const result = await quizCreateOrUpdate({ tags: tag_Arr }).unwrap()
            toast.success(result.message);
            setTags([])

        } catch (error) {
            toast.warn(error.data.message);

        }
    }

    function TagsEdit({ current }) {
        const [edit, setEdit] = useState(current.tags)

        const submitKeyDown = (e) => {
            if (e.key !== 'Enter') return
            if (!edit.trim()) return
            handelSubmit(current.id)
        }

        const handelSubmit = async (id) => {
            try {
                const result = await quizCreateOrUpdate({ id: id, tags: edit }).unwrap();
                toast.success(result.message);

                setUpdateState(false)
            } catch (error) {
                toast.warn(error.data.message);
            }
        }

        return (
            <span className="tag-item">
                <input type="text" className="tags-input" placeholder="Type something"
                    name='edit'
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                    onKeyDown={submitKeyDown}
                />

                <span className="pointer" onClick={() => setUpdateState(false)}> <BiMinusCircle color='red' size={17} /></span>
                <span className="pointer" onClick={() => handelSubmit(current.id)}> <BiUpload color='green' size={17} /></span>
            </span>
        )
    }

    return (
        <>
            {isFetching && <Loader />}
            <PageTopHeader title="Tags List" />
            <div className='text-center'>
                <div className='my-5'>
                    {data?.data?.map((tag, index) => (
                        updateState === tag.id ? <TagsEdit current={tag} key={index} /> :
                            <div className="tag-item" key={index}>
                                <span className="text me-1">{tag.tags?.slice(0, 20)}</span>
                                <span className="pointer" onClick={() => setUpdateState(tag.id)}><BiEdit  size={17} /></span>
                                <span className=" pointer" onClick={() => confirmHandel(
                                    "error",
                                    "Delete",
                                    "#FF0000",
                                    tag.id,
                                    tagsDelete
                                )}><BiTrash color='red' size={17} />  </span>
                            </div>
                    ))}
                </div>

                <div className="area">
                    <div className="tags-input-container">
                        {tags.map((tag, index) => (
                            <div className="tag-item" key={index}>
                                <span className="text">{tag?.slice(0, 20)
                                }</span>
                                <span className="close" onClick={() => removeTag(index)}>&times;</span>
                            </div>
                        ))}
                        <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type something and enter !" />
                    </div>

                </div>
                <div className=' text-center mt-2'>
                    <button
                        onClick={handelSubmit}
                        className='btn btn-success btn-sm'>Submit</button>
                </div>
            </div>
        </>
    )
}



export default Tags