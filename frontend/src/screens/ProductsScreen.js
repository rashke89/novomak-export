import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {
    saveProduct,
    listProducts,
    deleteProdcut,
} from '../actions/productActions';
import Pagination from "react-js-pagination";
import {listCategories} from "../actions/categoryAction";

function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [diameter, setDiameter] = useState('');
    const [season, setSeason] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [key, setKey] = useState('');
    const [xmlApiMsg, setXmlApiMsg] = useState('');
    const [xmlApiStatus, setXmlApiStatus] = useState('');
    const [uploading, setUploading] = useState(false);
    const productList = useSelector((state) => state.productList);
    const {loading, products, error, totalItems} = productList;
    const [page, setPage] = useState(1);
    const [totalPerPage, setTotalPerPage] = useState(32);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [marked, setMarked] = useState('0');
    const {categories, diameters, manufacturers, heights, widths, seasons} = useSelector((state) => state.categoryList.categories);


    const productSave = useSelector((state) => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
    } = productSave;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts('', searchKeyword, '', 1));
        dispatch(listCategories())
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (product) => {
        // setModalVisible(true);
        setId(product._id || '');
        setKey(product.Sifra || '');
        setName(product.Naziv || '');
        setPrice(product.Cena || '');
        setDescription(product.Specifikacija || '');
        setImage(product.Slika || '');
        setManufacturer(product.Proizvodjac || '');
        setCategory(product.Kategorija || '');
        setCountInStock(product.Lager || '');
        setSeason(product.Sezona || '');
        setWidth(product.Sirina || '');
        setHeight(product.Visina || '');
        setDiameter(product.Precnik || '');
        setMarked(product.Istaknut);
    };
    const submitSearchHandler = (e) => {
        e.preventDefault();
        setPage(1);
        dispatch(listProducts('', searchKeyword, '', 1));
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveProduct({
                _id: id,
                manufacturer,
                width,
                height,
                diameter,
                season,
                key,
                name,
                price,
                image,
                brand,
                category,
                countInStock: countInStock || 0,
                description,
                marked,
            })
        );
    };
    const handlePagination = (num) => {
        setPage(num);
        dispatch(listProducts('', searchKeyword, '', num));
    };
    const deleteHandler = (product) => {
        dispatch(deleteProdcut(product._id));
    };
    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
            .post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setImage(response.data);
                setUploading(false);
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };
    const uploadXmlFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('xml', file);
        setUploading(true);
        axios
            .post('/api/xml', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setXmlApiMsg(response.data.message);
                setXmlApiStatus(response.status);
                setUploading(false);
                var closeEl = document.querySelector('.-xml-close');
                setTimeout(() => {
                    dispatch(listProducts('', searchKeyword, '', page));
                    closeEl.click();
                }, 3000)
            })
            .catch((err) => {
                setXmlApiMsg(err.response.data.message);
                setXmlApiStatus(err.response.status);
                console.log('error on XML upload', err.response);
                setUploading(false);
            }).finally(() => {

        });
    };
    const onChangeValue = (e) => {
        setMarked(e.target.value)
    };
    return (
        <div className="content content-margined">
            <div className="product-header mb-4">
                <h2>Proizovdi</h2>
                <div>
                    <form className={'d-inline-block'} onSubmit={submitSearchHandler}>
                        <input
                            name="searchKeyword"
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                    <button type="button" className="btn btn-primary mx-5" data-toggle="modal" data-target="#exampleModal" onClick={() => openModal({})}>
                        Kreiraj proizovd
                    </button>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal1">
                        Ubaci XML
                    </button>
                </div>

            </div>

            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">{id ? 'Izmeni' : 'Kreiraj'} proizvod</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-modal">
                                <form onSubmit={submitHandler}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">Sifra</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={key}
                                                id="name"
                                                onChange={(e) => setKey(e.target.value)}
                                            ></input>
                                            <label htmlFor="name">Ime</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={name}
                                                id="name"
                                                onChange={(e) => setName(e.target.value)}
                                            ></input>
                                            <label htmlFor="price">Cena</label>
                                            <input
                                                type="text"
                                                name="price"
                                                value={price}
                                                id="price"
                                                onChange={(e) => setPrice(e.target.value)}
                                            ></input>
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
                                            {uploading && <div>Uploading...</div>}
                                            <label htmlFor="category">Kategorija</label>
                                            <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                                                <option value=""></option>
                                                {categories?.map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                            {/*<input*/}
                                            {/*    type="text"*/}
                                            {/*    name="brand"*/}
                                            {/*    value={category}*/}
                                            {/*    id="brand"*/}
                                            {/*    onChange={(e) => setCategory(e.target.value)}*/}
                                            {/*></input>*/}

                                            <label htmlFor="manufacturer">Proizvodjac</label>
                                            <select name="manufacturer" value={manufacturer} onChange={e => setManufacturer(e.target.value)}>
                                                <option value=""></option>
                                                {manufacturers?.map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                            {/*<input*/}
                                            {/*    type="text"*/}
                                            {/*    name="brand"*/}
                                            {/*    value={manufacturer}*/}
                                            {/*    id="brand"*/}
                                            {/*    onChange={(e) => setManufacturer(e.target.value)}*/}
                                            {/*></input>*/}
                                        </div>
                                        <div className="col-md-6">

                                            <label htmlFor="width">Sirina</label>
                                            <select name="width" value={width} onChange={e => setWidth(e.target.value)}>
                                                <option value=""></option>
                                                {widths?.map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                            {/*<input*/}
                                            {/*    type="text"*/}
                                            {/*    name="countInStock"*/}
                                            {/*    value={width}*/}
                                            {/*    id="countInStock"*/}
                                            {/*    onChange={(e) => setWidth(e.target.value)}*/}
                                            {/*></input>*/}
                                            <label htmlFor="countInStock">Visina</label>
                                            <select name="countInStock" value={height} onChange={e => setHeight(e.target.value)}>
                                                <option value=""></option>
                                                {heights?.map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                            {/*<input*/}
                                            {/*    type="text"*/}
                                            {/*    name="countInStock"*/}
                                            {/*    value={height}*/}
                                            {/*    id="countInStock"*/}
                                            {/*    onChange={(e) => setHeight(e.target.value)}*/}
                                            {/*></input>*/}
                                            <label htmlFor="diameter">Precnik</label>
                                            <select name="diameter" value={diameter} onChange={e => setDiameter(e.target.value)}>
                                                <option value=""></option>
                                                {diameters?.map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                            {/*<input*/}
                                            {/*    type="text"*/}
                                            {/*    name="countInStock"*/}
                                            {/*    value={diameter}*/}
                                            {/*    id="countInStock"*/}
                                            {/*    onChange={(e) => setDiameter(e.target.value)}*/}
                                            {/*></input>*/}
                                            <label htmlFor="countInStock">Broj raspolozivih jedinica</label>
                                            <input
                                                type="text"
                                                name="countInStock"
                                                value={countInStock}
                                                id="countInStock"
                                                onChange={(e) => setCountInStock(e.target.value)}
                                            ></input>
                                            <label htmlFor="season">Sezona</label>
                                            <select name="season" value={season} onChange={e => setSeason(e.target.value)}>
                                                <option value=""></option>
                                                {seasons?.map(item => {
                                                    return <option value={item.name} key={item.name}>{item.name}</option>
                                                })}
                                            </select>
                                            {/*<input*/}
                                            {/*    type="text"*/}
                                            {/*    name="category"*/}
                                            {/*    value={season}*/}
                                            {/*    id="category"*/}
                                            {/*    onChange={(e) => setSeason(e.target.value)}*/}
                                            {/*></input>*/}
                                            <label htmlFor="description">Opis</label>
                                            <textarea
                                                name="description"
                                                value={description}
                                                id="description"
                                                className="w-100"
                                                rows={6}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>

                                            <div onChange={onChangeValue} className="marked-inputs">
                                                <label>Istaknut</label>
                                                <input type="radio" value="1" name="gender" checked={marked === '1'} /> Da
                                                <input type="radio" value="0" name="gender" checked={marked === '0'}/> Ne
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="close-modal-btn" data-dismiss="modal">Odustani</button>
                            <button type="submit" className="btn btn-primary" onClick={submitHandler}>
                                {id ? 'Izmeni' : 'Kreiraj'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade bd-example-modal-lg" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">Ubaci XML fajl</h2>
                            <button type="button" className="close -xml-close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-modal">
                                <form onSubmit={submitHandler}>
                                    <div className="row">
                                        <div className="col-md-12">


                                            <label htmlFor="image">XML file</label>
                                            <input type="file"
                                                   className="w-100"
                                                   onChange={uploadXmlFileHandler}/>
                                            {uploading && <div>Uploading...</div>}
                                        </div>
                                        {xmlApiMsg && <div className="col-md-12 mt-3">
                                            <p className={xmlApiStatus > 250 ? 'error-text p-3' : 'success-text p-3'}>
                                                STATUS ubacivanja XML fajla: {xmlApiMsg}
                                            </p>
                                        </div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="close-modal-btn" data-dismiss="modal">Zatvori</button>
                        </div>
                    </div>
                </div>
            </div>

            {modalVisible && (
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Kreiraj Proizovd</h2>
                            </li>
                            <li>
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div>{errorSave}</div>}
                            </li>

                            <li>
                                <label htmlFor="name">Ime</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="price">Cena</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={price}
                                    id="price"
                                    onChange={(e) => setPrice(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="image">Slika</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={image}
                                    id="image"
                                    onChange={(e) => setImage(e.target.value)}
                                ></input>
                                <input type="file" onChange={uploadFileHandler}></input>
                                {uploading && <div>Uploading...</div>}
                            </li>
                            <li>
                                <label htmlFor="brand">Brend</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={brand}
                                    id="brand"
                                    onChange={(e) => setBrand(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="countInStock">Broj raspolozivih jedinica</label>
                                <input
                                    type="text"
                                    name="countInStock"
                                    value={countInStock}
                                    id="countInStock"
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="name">Kategorija</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={category}
                                    id="category"
                                    onChange={(e) => setCategory(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label htmlFor="description">Opis</label>
                                <textarea
                                    name="description"
                                    value={description}
                                    id="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </li>
                            <li>
                                <button type="submit" className="button primary">
                                    {id ? 'Izmeni' : 'Kreiraj'}
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(false)}
                                    className="button secondary"
                                >
                                    Nazad
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            )}

            <div className="product-list">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Sifra</th>
                        <th>Ime</th>
                        <th>Cena</th>
                        <th>Kategorija</th>
                        <th>Proizvodjac</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products?.map((product) => (
                        <tr key={product._id}>
                            <td className="align-center">{product.Sifra}</td>
                            <td>{product.Naziv}</td>
                            <td>{product.Cena}</td>
                            <td>{product.Kategorija}</td>
                            <td>{product.Proizvodjac}</td>
                            <td>
                                <button type="button" data-toggle="modal" data-target="#exampleModal" className="button" onClick={() => openModal(product)}>
                                    Edit
                                </button>
                                {' '}
                                <button
                                    className="button"
                                    onClick={() => deleteHandler(product)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="pagination-wrapper">
                        {totalItems && <Pagination
                            activePage={page}
                            itemsCountPerPage={totalPerPage}
                            totalItemsCount={totalItems}
                            pageRangeDisplayed={5}
                            onChange={handlePagination}
                        />}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductsScreen;
