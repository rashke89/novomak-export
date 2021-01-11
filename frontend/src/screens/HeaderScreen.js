import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios, {AxiosInstance as Axios} from 'axios';
import {
    saveProduct,
    listProducts,
    deleteProdcut,
} from '../actions/productActions';
import {deleteCategory, listCategories, saveCategory} from "../actions/categoryAction";
import {CATEGORY_SAVE_REQUEST} from "../constants/categoryConstants";
import * as config from "../config";

function HeaderScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [text, setText] = useState('');
    const [button, setButton] = useState('');
    const [position, setPosition] = useState('0');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');
    const [headers, setHeaders] = useState([]);
    const [selectedHeader, setSelectedHeader] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        // if (successSave) {
        //     setModalVisible(false);
        // }
        listHeaders()
        return () => {
            //
        };
    }, []);
    const handlePosition = (e) => {
        console.log(e.target.value);
        setPosition(e.target.value);
    };

    const listHeaders = () => {
        axios.get(`/api/users/header`)
            .then(data => {
                setHeaders(data.data)
            })
            .catch(error => {
                console.log(error);
            })
    };
    const openModal = (product) => {
        setText(product.text);
        setButton(product.button);
        setImage(product.image);
        setPosition(product.position);
        setId(product._id);
        setLink(product.link);
    };
    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        axios
            .post('/api/uploads/header', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setImage(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        let headerBody = {text, button, position, id, image, link};
        axios.post(`/api/users/header`, headerBody)
            .then(data => {
                document.querySelector(".close").click();
                listHeaders()
            })
            .catch(error => {
                console.log(error);
            })
    };
    const deleteHandler = (product) => {
        axios.delete(`/api/users/header/${product._id}`)
            .then(data => {
                listHeaders();
            })
            .catch(error => {
                console.log('greska u brisanju headera', error);
            })
    };

    return (
        <div className="content content-margined">
            <div className="product-header mb-4">
                <h3>Headers</h3>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={e => openModal({text: '', position: '0', button: '', _id: '', link: '', image: ''})}>
                    Kreiraj header
                </button>
            </div>

            <div className="modal fade bd-example-modal-lg headers-modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">{id ? 'Izmeni' : 'Kreiraj'} header</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-modal">
                                <form onSubmit={submitHandler}>
                                    <div className="row">
                                        <div className={`col-md-6`}>
                                            <label htmlFor="name">Text</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={text}
                                                id="name"
                                                onChange={(e) => setText(e.target.value)}
                                            />

                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="brand">Dugme text</label>
                                            <input
                                                type="text"
                                                name="brand"
                                                value={button}
                                                id="brand"
                                                onChange={(e) => setButton(e.target.value)}
                                            ></input>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="link">Dugme link</label>
                                            <input
                                                type="text"
                                                name="link"
                                                value={link}
                                                id="link"
                                                onChange={(e) => setLink(e.target.value)}
                                            ></input>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="brand">Pozicija</label>
                                            <select name="position" value={position} onChange={handlePosition}>
                                                <option value="0">Levo</option>
                                                <option value="1">Desno</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="image">Slika</label>
                                            <input
                                                type="text"
                                                name="image"
                                                value={image}
                                                id="image"
                                                onChange={(e) => setImage(e.target.value)}
                                            ></input>
                                            <input type="file"
                                                   className="w-100"
                                                   onChange={uploadFileHandler}></input>
                                        </div>
                                        {/*<div className="col-md-12">*/}
                                        {/*    {categorySave && categorySave.hasOwnProperty('loading') && !categorySave.loading && <div className="col-md-12 mt-3">*/}
                                        {/*        <p className={!categorySave?.success ? 'error-text p-3' : 'success-text p-3'}>*/}
                                        {/*            [STATUS] {id ? 'izmena' : 'kreiranje'} kategorije: {categorySave?.category?.message}*/}
                                        {/*        </p>*/}
                                        {/*    </div>}*/}
                                        {/*</div>*/}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="close-modal-btn" data-dismiss="modal" onClick={e => {
                                dispatch({type: CATEGORY_SAVE_REQUEST, payload: ''});
                            }}>Odustani</button>
                            <button type="submit" className="btn btn-primary" onClick={submitHandler}>
                                {id ? 'Izmeni' : 'Kreiraj'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {<div className="product-list headers-list">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Text</th>
                        <th>Dugme text</th>
                        <th>Pozicija</th>
                        <th>Link</th>
                        <th>Slika</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {headers?.map((product) => (
                        <tr key={product._id}>
                            <td>{product.text}</td>
                            <td>{product.button}</td>
                            <td>{product.position ? 'Desno' : 'Levo'}</td>
                            <td>{product.link}</td>
                            <td>
                                <img src={`${config.formatImagePath(product.image)}`} alt=""/>
                            </td>
                            <td>
                                <button type="button" data-toggle="modal" data-target="#exampleModal" className="button" onClick={() => openModal(product)}>
                                    Izmeni
                                </button>
                                { headers.length > 1 ? <button
                                    className="button"
                                    onClick={() => deleteHandler(product)}
                                >
                                    Obrisi
                                </button> : ''}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}

export default HeaderScreen;
