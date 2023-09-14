import { useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "../InputFields/Input";
import { createPost } from "../redux/postSlice";
import './post.css';

const MakePost = (props) => {
    const {setOpen} = props;
    const dispath = useDispatch();
    const [title, setTitle] = useState('Add a title');
    const [desc, setDesc] = useState("Add a Description");
    const tags = ['None', 'NSFW', 'Mood', 'Quotes', 'Shitpost'];
    const [selectedIdx, setSelectedIdx] = useState(0)
    const handlePost =  () => {
        setOpen(false);
        const newPost = {
            title: title,
            description: desc,
            tag: selectedIdx,
        };
        dispath(createPost(newPost))
    }
    return ( 
        <section className="makepost-container">
            <div className="makepost-navigation">
                <p className="makepost-save" onClick={handlePost}>
                    Post
                </p>
            </div>
            <InputField
                type="text"
                data={title} 
                inputType='textarea' 
                setData={setTitle} 
                label='Title' 
                classStyle='makepost-title' 
            />
            <InputField 
                type="text"
                data={desc} 
                inputType='textarea' 
                setData={setDesc} 
                abel='Description' 
                classStyle='makepost-desc' 
            />
            <label>Tags</label>
            <div className="makepost-tags">
                {tags.map((tag, idx) => {
                    return(
                        <button className={`${selectedIdx === idx ? `makepost-tags-selected` : `makepost-tags-${tag}`}`} onClick={()=>setSelectedIdx(idx)}>{tag}</button>
                    )
                })}
            </div>
        </section>
     );
}
 
export default MakePost;