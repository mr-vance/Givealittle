/*Importing all necessary libraries*/

//Encapsulate local state in a functional component
import React,{useState} from 'react'

//Bring in the backend handlers from the Configuration file
import {storage,fs} from '../Config/Config'

//The export is for this component to be imported by other components
export const AddProducts = () => {

    /*Arrays to be used down the lines*/

    //This arrray holds the value of the product's title
    const [title, setTitle]=useState('');

    //This arrray holds the value of the product's description
    const [description, setDescription]=useState('');

    //This arrray holds the value of the product's price in Rands
    const [price, setPrice]=useState('');

    //This arrray holds the value of the product's Image. Some formats not supported
    const [image, setImage]=useState(null);

    //This arrray holds the value of the product's Error Message on Image
    const [imageError, setImageError]=useState('');
    
    //This arrray holds the value of the product's Success Message on Image
    const [successMsg, setSuccessMsg]=useState('');

    //This arrray holds the value of the product's Success Message on Upload
    const [uploadError, setUploadError]=useState('');

    //This arrray holds the value of the product's supported Image file types
    const types =['image/jpg','image/jpeg','image/png','image/PNG'];

    //Method to handle Product Image upload
    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&types.includes(selectedFile.type)){
                setImage(selectedFile);
                setImageError('');
            }
            else{
                setImage(null);
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else{
            console.log('please select your file');
        }
    }

    //Method to update uploaded image onto the backend (Firebase Database)
    const handleAddProducts=(e)=>{
        e.preventDefault();
        // console.log(title, description, price);
        // console.log(image);
        const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
                fs.collection('Products').add({
                    title,
                    description,
                    price: Number(price),
                    url
                }).then(()=>{
                    setSuccessMsg('Product added successfully');
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    document.getElementById('file').value='';
                    setImageError('');
                    setUploadError('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                    },3000)
                }).catch(error=>setUploadError(error.message));
            })
        })
    }
  
    //The following returns the frontend page for Adding Products as defined above
    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Add Products</h1>
            <hr></hr>        
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Product Title</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setTitle(e.target.value)} value={title}></input>
                <br></br>
                <label>Product Description</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setDescription(e.target.value)} value={description}></input>
                <br></br>
                <label>Product Price</label>
                <input type="number" className='form-control' required
                onChange={(e)=>setPrice(e.target.value)} value={price}></input>
                <br></br>
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
                onChange={handleProductImg}></input>
                
                {imageError&&<>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>
                   
                </>}
                <br></br>           
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
                </div>
            </form>
            {uploadError&&<>
                    <br></br>
                    <div className='error-msg'>{uploadError}</div>
                    
                </>}

        </div>
    )
}
