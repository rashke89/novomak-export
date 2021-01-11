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

function ClientsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');
    const [headers, setHeaders] = useState([]);
    const [selectedHeader, setSelectedHeader] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        // if (successSave) {
        //     setModalVisible(false);
        // }
        listClients()
        return () => {
            //
        };
    }, []);

    const listClients = () => {
        axios.get(`/api/users/client`)
            .then(data => {
                setHeaders(data.data)
            })
            .catch(error => {
                console.log(error);
            })
    };
    const openModal = (product) => {
        setText(product.text);
        setImage(product.image);
        setId(product._id);
        setLink(product.link);
    };
    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        axios
            .post('/api/uploads/client', bodyFormData, {
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
        let headerBody = {text, id, image, link};
        axios.post(`/api/users/client`, headerBody)
            .then(data => {
                document.querySelector(".close").click();
                listClients()
            })
            .catch(error => {
                console.log(error);
            })
    };
    const deleteHandler = (product) => {
        axios.delete(`/api/users/client/${product._id}`)
            .then(data => {
                listClients();
            })
            .catch(error => {
                console.log('greska u brisanju headera', error);
            })
    };

    return (
        <div className="content content-margined">
            <div className="product-header mb-4">
                <h3>Proizvođači</h3>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={e => openModal({text: '', _id: '', link: '', image: ''})}>
                    Kreiraj proizvodjaca
                </button>
            </div>

            <div className="modal fade bd-example-modal-lg headers-modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">{id ? 'Izmeni' : 'Kreiraj'} proizvođača</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-modal">
                                <form onSubmit={submitHandler}>
                                    <div className="row">
                                        <div className={`col-md-6`}>
                                            <label htmlFor="name">Naziv</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={text}
                                                id="name"
                                                onChange={(e) => setText(e.target.value)}
                                            />

                                        </div>
                                        {/*<div className="col-md-6">*/}
                                        {/*    <label htmlFor="link">Dugme link</label>*/}
                                        {/*    <input*/}
                                        {/*        type="text"*/}
                                        {/*        name="link"*/}
                                        {/*        value={link}*/}
                                        {/*        id="link"*/}
                                        {/*        onChange={(e) => setLink(e.target.value)}*/}
                                        {/*    ></input>*/}
                                        {/*</div>*/}
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
                        <th>Ime</th>
                        <th>Slika</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {headers?.map((product) => (
                        <tr key={product._id}>
                            <td>{product.text}</td>
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

export default ClientsScreen;
