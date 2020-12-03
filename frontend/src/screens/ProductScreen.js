import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import {addToCart} from "../actions/cartActions";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    let options = {
      behavior: 'smooth'
    }
    setTimeout(() => {
      document.getElementsByClassName('header')[0].scrollIntoView(options)
    }, 500)
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    dispatch(addToCart(product._id, qty));
    props.history.push('/cart/');
  };
  const goBack = () => {
    props.history.goBack();
    console.log(window.history);
  };
  return (
    <div className="container">
      <div className="back-to-result">
        <p onClick={e => goBack()}>Nazad</p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          {product?.ID ? <div className="details row">
            <div className="details-image col-md-4">
              <img className="img-fluid" src={product.Slika} alt="product"></img>
            </div>
            <div className="details-info col-md-4">
              <ul>
                <li>
                  <h2>{product.Naziv}</h2>
                </li>
                <li>
                  Cena: <b>{product.Cena} rsd</b>
                </li>
                <li>
                  Kategorija:
                  <span>{product.Kategorija}</span>
                </li>
                <li>
                  Proizvodjac:
                  <span>{product.Proizvodjac}</span>
                </li>
                <li>
                  Sezona:
                  <span>{product.Sezona}</span>
                </li>
                <li>
                  Sirina:
                  <span>{product.Sirina}</span>
                </li>
                <li>
                  Visina:
                  <span>{product.Visina}</span>
                </li>
                <li>
                  Precnik:
                  <span>{product.Precnik}</span>
                </li>
                <li>
                  Opis:
                  <span>{product.Specifikacija}</span>
                </li>
              </ul>
            </div>
            <div className="details-action col-md-4">
              <ul>
                <li>Cena: {product.Cena} rsd</li>
                <li>
                  Status:{' '}
                  {product.Lager > 0 ? 'Na stanju' : 'Nema na stanju.'}
                </li>
                {product.Lager > 0 ? <li>
                  Kolicina:{' '}
                   <select
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                  >
                    {Array.from(Array(product.Lager).keys()).map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                    ))}
                  </select>
                </li> : ''}
                <li>
                  {product.Lager > 0 && (
                      <button
                          onClick={handleAddToCart}
                          className="button primary"
                      >
                        Dodaj u Korpu
                      </button>
                  )}
                </li>
              </ul>
            </div>
          </div> : ''}

          {/*<div className="content-margined">*/}
          {/*  <h2>Reviews</h2>*/}
          {/*  {!product.reviews.length && <div>There is no review</div>}*/}
          {/*  <ul className="review" id="reviews">*/}
          {/*    {product.reviews.map((review) => (*/}
          {/*      <li key={review._id}>*/}
          {/*        <div>{review.name}</div>*/}
          {/*        <div>*/}
          {/*          <Rating value={review.rating}></Rating>*/}
          {/*        </div>*/}
          {/*        <div>{review.createdAt.substring(0, 10)}</div>*/}
          {/*        <div>{review.comment}</div>*/}
          {/*      </li>*/}
          {/*    ))}*/}
          {/*    <li>*/}
          {/*      <h3>Write a customer review</h3>*/}
          {/*      {userInfo ? (*/}
          {/*        <form onSubmit={submitHandler}>*/}
          {/*          <ul className="form-container">*/}
          {/*            <li>*/}
          {/*              <label htmlFor="rating">Rating</label>*/}
          {/*              <select*/}
          {/*                name="rating"*/}
          {/*                id="rating"*/}
          {/*                value={rating}*/}
          {/*                onChange={(e) => setRating(e.target.value)}*/}
          {/*              >*/}
          {/*                <option value="1">1- Poor</option>*/}
          {/*                <option value="2">2- Fair</option>*/}
          {/*                <option value="3">3- Good</option>*/}
          {/*                <option value="4">4- Very Good</option>*/}
          {/*                <option value="5">5- Excelent</option>*/}
          {/*              </select>*/}
          {/*            </li>*/}
          {/*            <li>*/}
          {/*              <label htmlFor="comment">Comment</label>*/}
          {/*              <textarea*/}
          {/*                name="comment"*/}
          {/*                value={comment}*/}
          {/*                onChange={(e) => setComment(e.target.value)}*/}
          {/*              ></textarea>*/}
          {/*            </li>*/}
          {/*            <li>*/}
          {/*              <button type="submit" className="button primary">*/}
          {/*                Submit*/}
          {/*              </button>*/}
          {/*            </li>*/}
          {/*          </ul>*/}
          {/*        </form>*/}
          {/*      ) : (*/}
          {/*        <div>*/}
          {/*          Please <Link to="/signin">Sign-in</Link> to write a review.*/}
          {/*        </div>*/}
          {/*      )}*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
        </>
      )}
    </div>
  );
}
export default ProductScreen;
