import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {
    saveProduct,
    listProducts,
    deleteProdcut,
} from '../actions/productActions';
import {deleteCategory, listCategories, saveCategory} from "../actions/categoryAction";
import {CATEGORY_SAVE_REQUEST} from "../constants/categoryConstants";
import {listOrders} from "../actions/orderActions";

function CategoriesScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [discount, setDiscount] = useState('');
    const [order, setOrder] = useState('');
    const [usedCategories, setUsedCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('categories');
    const categoryList = useSelector((state) => state.categoryList.categories);
    const categorySave = useSelector((state) => state.categorySave);
    const {categories, diameters, manufacturers, heights, widths, seasons} = categoryList;
    const [renderList, setRenderList] = useState(categories);

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
        // if (successSave) {
        //     setModalVisible(false);
        // }
        dispatch(listCategories());
        setRenderList(categories);
        return () => {
            //
        };
    }, [successSave, successDelete]);

    useEffect(() => {
        setRenderList(categoryList[selectedCategory]);
        return () => {
            //
        };
    }, [categories]);

    const openModal = (product) => {
        setId(product._id);
        setName(product.name);
        if (product?.usedCategories)
            setUsedCategories(product.usedCategories);
        setOrder(product.order || '');

        if (product?.discount)
            setDiscount(product.discount);
        else
            setDiscount('')
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveCategory({
                _id: id,
                selectedCategory,
                name,
                discount,
                image,
                usedCategories,
                order
            })
        );
    };
    const deleteHandler = (product) => {
        dispatch(deleteCategory({id: product._id, selectedCategory}));
    };
    const onChoseCategory = (categoryName) => {
        setRenderList(categoryList[categoryName])
        setSelectedCategory(categoryName);
    };
    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        axios
            .post('/api/uploads/category-image', bodyFormData, {
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
    const handleChangeMarks = (category) => {
        dispatch(listCategories());
        var usedCat = usedCategories;
        var foundIndex = usedCat.findIndex(item => item === category.name);
        if (foundIndex >= 0) {
            usedCat.splice(foundIndex, 1)
        } else {
            usedCat.push(category.name);
        }
        setUsedCategories(usedCat);
    };
    return (
        <div className="content content-margined">
            <div className="product-header mb-4">
                {/*<h3>Kategorije</h3>*/}
                <ul className="nav header-list">
                    <li className="nav-item" onClick={e => onChoseCategory('categories')}>
                        <span className={`nav-link ${selectedCategory === 'categories' && 'active'}`}>Kategorije</span>
                    </li>
                    <li className="nav-item" onClick={e => onChoseCategory('manufacturers')}>
                        <span className={`nav-link ${selectedCategory === 'manufacturers' && 'active'}`}>Proizvođači</span>
                    </li>
                    <li className="nav-item" onClick={e => onChoseCategory('seasons')}>
                        <span className={`nav-link ${selectedCategory === 'seasons' && 'active'}`}>Sezone</span>
                    </li>
                    <li className="nav-item" onClick={e => onChoseCategory('widths')}>
                        <span className={`nav-link ${selectedCategory === 'widths' && 'active'}`}>Širina</span>
                    </li>
                    <li className="nav-item" onClick={e => onChoseCategory('heights')}>
                        <span className={`nav-link ${selectedCategory === 'heights' && 'active'}`}>Visina</span>
                    </li>
                    <li className="nav-item" onClick={e => onChoseCategory('diameters')}>
                        <span className={`nav-link ${selectedCategory === 'diameters' && 'active'}`}>Prečnik</span>
                    </li>
                </ul>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={e => openModal({name: '', id: '', image: '', order: ''})}>
                    Kreiraj kategoriju
                </button>
            </div>

            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">{id ? 'Izmeni' : 'Kreiraj'} kategoriju</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={e => {
                                dispatch({type: CATEGORY_SAVE_REQUEST, payload: ''});
                            }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-modal">
                                <form onSubmit={submitHandler}>
                                    <div className="row">
                                        <div className={`${selectedCategory === 'categories' || selectedCategory === 'seasons' ? 'col-md-6' : 'col-md-12'}`}>
                                            <label htmlFor="name">Ime</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={name}
                                                id="name"
                                                onChange={(e) => setName(e.target.value)}
                                            />

                                        </div>
                                        {selectedCategory === 'widths' || selectedCategory === 'heights' || selectedCategory === 'diameters' ? <div className={'col-md-12'}>
                                            <div onChange={null} className="marked-inputs">
                                                {usedCategories ? categories?.map(item => {
                                                        return <div key={item._id} onChange={e => handleChangeMarks(item)} className='input-field'>
                                                            <input type="checkbox" value={item.name}
                                                                   name={item.name}
                                                                   checked={usedCategories.findIndex(o => o === item.name) >= 0}/> {item.name}</div>
                                                    }
                                                ) : ''}

                                            </div>
                                        </div> : ''}
                                        {selectedCategory === 'categories' || selectedCategory === 'seasons' ? <div className={'col-md-6'}>
                                            <label htmlFor="order">Redni Br</label>
                                            <input
                                                type="number"
                                                name="order"
                                                value={order}
                                                id="order"
                                                onChange={(e) => setOrder(e.target.value)}
                                            ></input>
                                        </div> : ''}
                                        {selectedCategory === 'categories' && <div className="col-md-6">
                                            <label htmlFor="brand">Rabat (%)</label>
                                            <input
                                                type="number"
                                                name="brand"
                                                value={discount}
                                                id="brand"
                                                onChange={(e) => setDiscount(e.target.value)}
                                            ></input>
                                        </div>}
                                        {selectedCategory === 'categories' && <div className="col-md-6">
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
                                        </div>}
                                        <div className="col-md-12">
                                            {categorySave && categorySave.hasOwnProperty('loading') && !categorySave.loading && <div className="col-md-12 mt-3">
                                                <p className={!categorySave?.success ? 'error-text p-3' : 'success-text p-3'}>
                                                    [STATUS] {id ? 'izmena' : 'kreiranje'} kategorije: {categorySave?.category?.message}
                                                </p>
                                            </div>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="close-modal-btn" data-dismiss="modal" onClick={e => {
                                dispatch({type: CATEGORY_SAVE_REQUEST, payload: ''});
                            }}>Odustani
                            </button>
                            <button type="submit" className="btn btn-primary" onClick={submitHandler}>
                                {id ? 'Izmeni' : 'Kreiraj'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {<div className="product-list">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Naziv</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderList?.map((product) => (
                        <tr key={product._id}>
                            <td className="align-center">{product._id}</td>
                            <td>{product.name}</td>
                            <td>
                                <button type="button" data-toggle="modal" data-target="#exampleModal" className="button" onClick={() => openModal(product)}>
                                    Izmeni
                                </button>
                                {' '}
                                <button
                                    className="button"
                                    onClick={() => deleteHandler(product)}
                                >
                                    Obrisi
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}

export default CategoriesScreen;
