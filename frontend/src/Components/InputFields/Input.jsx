import '../Edit/edit.css';
import '../Posts/post.css';

const Input = (props) => {
    const {inputType, classStyle, type, data, setData, label} = props;
    return ( 
        <>
            <label>{label}</label>
            {inputType === 'textarea'? (
                <textarea 
                    type='text' 
                    className={classStyle} 
                    placeholder={data} 
                    onChange={(e) => setData(e.target.value)}
                >
                </textarea>
            ) : (
                <input 
                    type="text" 
                    placeholder={data} 
                    onChange={(e) => setData(e.target.value)} 
                />
            )}
            
        </>
     );
}
 
export default Input;