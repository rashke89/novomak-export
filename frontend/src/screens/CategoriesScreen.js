import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';
import {listCategories, saveCategory} from "../actions/categoryAction";

function CategoriesScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categories, error } = categoryList;

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
    dispatch(listCategories());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    // setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
     dispatch(
         saveCategory({
        _id: id,
        name,
        image,
        description,
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
      console.log(file);
      const bodyFormData = new FormData();
    bodyFormData.append('xml', file);
      console.log(bodyFormData);
      setUploading(true);
    axios
      .post('/api/xml', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
          console.log('uploadovan XML...', response);
          setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="product-header mb-4">
        <h3>Kategorije</h3>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={openModal}>
          Kreiraj kategoriju
        </button>
      </div>

        <div className="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" id="exampleModalLabel">Kreiraj kategoriju</h2>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-modal">
                            <form onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="name">Ime</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            id="name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        {/*<label htmlFor="price">Cena</label>*/}
                                        {/*<input*/}
                                        {/*    type="text"*/}
                                        {/*    name="price"*/}
                                        {/*    value={price}*/}
                                        {/*    id="price"*/}
                                        {/*    onChange={(e) => setPrice(e.target.value)}*/}
                                        {/*/>*/}
                                        <label htmlFor="image">Slika</label>
                                        <input
                                            type="text"
                                            name="image"
                                            value={image}
                                            id="image"
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                        <input type="file"
                                               className="w-100"
                                               onChange={uploadFileHandler}/>
                                        {uploading && <div>Uploading...</div>}
                                        {/*<label htmlFor="brand">Brend</label>*/}
                                        {/*<input*/}
                                        {/*    type="text"*/}
                                        {/*    name="brand"*/}
                                        {/*    value={brand}*/}
                                        {/*    id="brand"*/}
                                        {/*    onChange={(e) => setBrand(e.target.value)}*/}
                                        {/*/>*/}
                                    </div>
                                    <div className="col-md-6">

                                        {/*<label htmlFor="countInStock">Broj raspolozivih jedinica</label>*/}
                                        {/*<input*/}
                                        {/*    type="text"*/}
                                        {/*    name="countInStock"*/}
                                        {/*    value={countInStock}*/}
                                        {/*    id="countInStock"*/}
                                        {/*    onChange={(e) => setCountInStock(e.target.value)}*/}
                                        {/*/>*/}
                                        {/*<label htmlFor="name">Kategorija</label>*/}
                                        {/*<input*/}
                                        {/*    type="text"*/}
                                        {/*    name="category"*/}
                                        {/*    value={category}*/}
                                        {/*    id="category"*/}
                                        {/*    onChange={(e) => setCategory(e.target.value)}*/}
                                        {/*/>*/}
                                        {/*<label htmlFor="description">Opis</label>*/}
                                        {/*<textarea*/}
                                        {/*    name="description"*/}
                                        {/*    value={description}*/}
                                        {/*    id="description"*/}
                                        {/*    className="w-100"*/}
                                        {/*    rows={6}*/}
                                        {/*    onChange={(e) => setDescription(e.target.value)}*/}
                                        {/*/>*/}
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

        {<div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ime</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((product) => (
              <tr key={product._id}>
                <td className="align-center">{product._id}</td>
                <td>{product.name}</td>
                <td>
                  <button type="button" data-toggle="modal" data-target="#exampleModal" className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
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
      </div>}
    </div>
  );
}
export default CategoriesScreen;
