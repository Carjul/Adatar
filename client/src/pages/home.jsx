import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { setArticulos} from '../app/FeatureSlices/data/index'
import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

const Home = () => {
    const dispatch = useDispatch()
    const articulos = useSelector(state => state.data.articulos)
    const rolId = localStorage.getItem('RolId');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [articles, setArticles] = useState([]);
   


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newArticle = { title, text, image };
     
      
         dispatch(setArticulos(newArticle))
      
        setTitle('');
        setText('');
        setImage(null);
    };

    return (
        <>
            <Nav />
            <div className='flex flex-row justify-content-around'>
                <Sidebar props={1} />
                {
                    rolId === '1' ? <label htmlFor="my-modal" className="btn btn-primary text-2xl w-auto  border-circle mt-5 ml-5">+</label> : null
                }
                <div className='flex flex-col items-center w-full h-1/2 z-0'>

                    <div className=" w-4/5 bg-base-100 shadow-xl mt-6">
                        {articulos?.map((article, index) => (
                            <div key={index} >
                                <div className='p-4'>
                                    <h2 className='text-2xl text-center font-bold'>{article.title}</h2>
                                    <br />
                                    <p className='  text-lg text-center'>{article.text}</p>
                                </div>
                                <img src={URL.createObjectURL(article.image)} alt='' className='w-1/2 mx-auto h-64 object-cover object-center mb-5' />
                            </div>
                        ))}
                    </div>

            


                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn btn-outline btn-error text-xl">X</label>
                            </div>
                            {/*  */}
                            <form onSubmit={handleSubmit} className="flex-1  w-auto bg-base-100 ">
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">Crear Articulo</h2>
                                    <div className="form-control">
                                        <label className="input-group input-group-md">
                                            <span className='bg-primary' htmlFor='title'>Titulo</span>
                                            <input type='text' id='title' name='title' value={title} onChange={handleTitleChange} className="input input-bordered input-md input-primary w-full max-w-xs" />
                                        </label>
                                        <br />
                                        <label htmlFor='text' className='card-title'>Texto</label>
                                        <textarea id='text' name='text' value={text} onChange={handleTextChange} className="textarea textarea-bordered border-primary" required />
                                        <br />
                                        <label htmlFor='image' className='card-title'>Subir imagen</label>

                                        <input type='file' id='image' name='image' accept='image/*' onChange={handleImageChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" required />
                                    </div>
                                    <br />
                                    <button type='submit' className="btn btn-primary">Crear artículo</button>
                                </div>
                            </form>
                            {/*  */}

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
