import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import './edit.css'
import InputField from '../InputFields/Input';
import {updateUser} from '../redux/apiRequests'

const EditPage = (props) => {
    const {setEdit} = props;
    const { id } = useParams();
    const avaUrl = [
        'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a',
        'https://preview.redd.it/fc9k38jwfwv51.png?auto=webp&s=9ce3d4c488091bb21969fd0fad7a6d89e4bfc50d',
        'https://preview.redd.it/se39g98mljw51.png?auto=webp&s=758dfe2b0a2df439b06b68533e763f413d58b46c',
        'https://preview.redd.it/5es1lne1du261.png?width=640&crop=smart&auto=webp&s=e6eb0ee5710710000e4fbace119112de63324a38',
        'https://i.redd.it/7ipyf6pvqac61.png',
        'https://preview.redd.it/cpwkbke13vv51.png?auto=webp&s=9158e49b35ad2581d840efd2a013a9ead06abbc7',
    ]
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user?.currentUser);
    const [name, setName] = useState(user?.displayName);
    const [age, setAge] = useState(user?.age);
    const [about, setAbout] = useState(user?.about);
    const [theme, setTheme] = useState(user?.theme);
    const [url, setUrl]  = useState(user.avaUrl);
    const handleSubmit = (e) => {
        e.preventDefault();
        setEdit(false);
        const updatedUser = {
            displayName: name,
            age: age,
            about: about,
            profilePicture: url,
            theme: theme
        };
        updateUser(dispatch, updatedUser, id, user?.accessToken);
    }
    return ( 
        <>
        <form
        onSubmit={handleSubmit}
        className="edit-form"
        data-testid="editForm"
        >
            <section className="edit-container">
            <div className="close-container">
                <p className="close-x" onClick={() => setEdit(false)}>
                    X
                </p>
                <button type="submit" className="close">
                    SAVE
                </button>
            </div>
                <div className="edit-profile">Edit Profile</div>
                <div className="input-container">
                    <InputField 
                        label='Display name' 
                        type="text" 
                        data={user.name} 
                        setData={setName}
                    />
                    <InputField
                        label='Age'
                        type="text"
                        data={user.age} 
                        setData={setAge}
                    />
                    {/* <Input 
                        inputType='textarea' 
                        classStyle='input-about' 
                        label='About' 
                        data={user.about} 
                        setData={setAbout}
                    /> */}
                    <InputField
                        inputType="textarea"
                        data={user.about}
                        setData={setAbout}
                        classStyle="input-about"
                        label="About"
                    />
                <label>Profile Picture</label>
                <div className="input-image-container">
                    {avaUrl.map((url) => {
                        return(
                            <>
                                <img src={url} alt="" className='input-image' onClick={(e) => setUrl(e.target.src)}/>
                            </>
                        )
                    })}
                </div>
                <div className="theme-container">
                    <label>Theme</label>
                    <input type="color" className='theme-color' onChange={(e) => setTheme(e.target.value)}/>
                </div>
                </div>
            </section>
        </form>
        </>
     )
}
 
export default EditPage;