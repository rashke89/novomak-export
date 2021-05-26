import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {listProducts, updateFilter} from '../actions/productActions';
import Rating from '../components/Rating';
import {useHistory} from 'react-router-dom';
import Pagination from "react-js-pagination";
import Carousel from "../components/carousel";
import {WIDTH_LIST, HEIGHT_LIST, DIAMETER} from "../config";
import {listCategories} from "../actions/categoryAction";
import Cookie from "js-cookie";

function AboutUsScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const filter = useSelector((state) => state.filter);
  const {categories, diameters, manufacturers, heights, widths, seasons} = useSelector((state) => state.categoryList.categories);
  const [page, setPage] = useState(1);
  const [totalPerPage, setTotalPerPage] = useState(32);
  const {products, loading, error, totalItems} = productList;
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (props.match.params?.contact) {
      setTimeout(() => {
        document.getElementById('contact-section').scrollIntoView({
          behavior: 'smooth'
        })
      }, 500)
    }
  }, []);


  return (
      <>
        <section className="-carousel">
          <div className="carousel-wrapper">
            <Carousel/>
          </div>
        </section>

        <div id="home-section"></div>

        <section className="about-us-wrapper">
          <div className="row my-5">
            <div className="col-md-12 mb-5">
              <h1 className="info-text">O nama</h1>
            </div>
            <div className="col-md-6 about-us-text">
              <p>
                Preduzeće NOVOMAK  EXPORT DOO osnovano je 2000 godine sa sedištem u Staroj Pazovi  ulica Kalja Petra Prvog Karađorđevića 78.
            </p>
            <h3>Osnovni principi poslovanja</h3>
            <p>- Osnovne principe poslovanja ostvarujemo uspešnom kombinacijom visoko-profesionalnih i stručnih radnika sa tehnički savremenom opremom i mašinama za vulkanizerske usluge</p>
            <p className="mb-0"><strong> Montaža-demontaža</strong></p>
            <p className="mb-2">(putničkih, SUV, poluteretnih, teretnih, poljoprivrednih, damper i industrijskih pneumatika)</p>
            <p  className="mb-0"><strong> Balansiranje</strong></p>
            <p className="mb-2">(putničkih,SUV,poluteretnih i teretnih pneumatika)</p>
            <p   className="mb-2"><strong> TPMS SENZORI PRITISKA u pneumaticima marke SCHRADER</strong> (nemačke schrader senzore programiramo i ugrađujemo)</p>
            <p className="mb-0"><strong> Hotel za gume</strong></p>
            <p  className="mb-2">Od 2019 godine naši kupci svoje pneumatike mogu čuvati kod nas do sledeće zamene.</p>
            <p  className="mb-0"><strong> Reglaža trapa </strong></p>
            <p>EURO 2020 sa nemačkom tehnologijom I <strong className="green"> Hofmann </strong> opremom, za putnička,SUV, poluteretna I terena vozila.</p>




            </div>
            <div className="col-md-6 about-us-img">
              <img src="http://media2.power-pixels.com/2021/02/block-tires.jpg" className="img img-fluid about-us-img" alt="online prodaja guma"/>
            </div>

            <div className="col-md-12 about-us-text pt-3">

              <p>
                Od 2014 godine našu delatnost smo proširili otvaranjem samouslužne auto-perionice nemačke marke<strong className="blue">EHRLE</strong> ,tako da u našem servisu pored vulkanizerskih usluga, brzog servisa I reglaže trapa možete Vaše vozilo održavati čistim
                Sva pravna kao I fizička lica mogu koristiti pored žetona I akceptora I KOD KLJUČ za samouslužno pranje vozila.

              </p>
              <p>Kao još jedan dokaz uspešnosti I profesionalnog odnosa u radu je dobijeni sertifikat
                <strong className="blue"><i> TRUCK FORCE Koncerna GOODYEAR</i> </strong> uvoza, izvoza, veleprodaje, maloprodaje I servisa svih vrsta
                teretnih  pneumatika u čijem timu smo od 2015 godine.

              </p>

    <p>
    Za pravna lica koja održavaju svoja vozila kod nas imamo odgovarajuće bonuse i popuste.
    </p>
    <p>Danas obuhvatamo najznačajnije robne marke proizvođača <strong>pneumatika</strong> i to:</p>
    <ul>
      <li><strong><a href="https://www.goodyear.com/en-US/international?expand=international" target="_blank">GOODYEAR</a></strong> (Goodyear, Dunlop, Fulda, Sava, Kelly)</li>
    <li><strong><a href="http://www.conti-online.com/generator/www/start/com/en/index_en.html" target="_blank">CONTINENTAL</a></strong> (Continental, Uniroyal, Semperit, Viking, Barum, General)</li>
    <li><strong><a href="http://www.bridgestone.com/regional/europe_cis/" target="_blank">BRIDGESTONE</a></strong> (Bridgestone, Firestone, Dayton)</li>
        <li><strong><a href="http://www.michelin.com/fre" target="_blank">MICHELIN</a></strong> (Michelin,BF Godrich, Tigar)</li>
        <li><strong><a href="http://www.pirelli.com/tyres/sr-rs/contact-us" target="_blank">Pirelli </a></strong>(Pirelli)</li>
        <li><strong><a href="https://www.nexentire.com/international/" target="_blank">NEXEN </a></strong></li>
        <li><strong><a href="https://www.lassa.com/" target="_blank">LASSA </a></strong></li>
        <li><strong><a href="https://www.petlas.com/en/" target="_blank">PETLAS </a></strong></li>
      <li><strong><a href="https://www.hankooktire.com/mea-en/" target="_blank">HANKOOK </a></strong></li>
      <li><strong><a href="http://www.westlaketire.com/" target="_blank">WEST LAKE </a></strong>(Goodride)</li>


    <li><strong><a href="http://www.td-kama.com/en/" target="_blank">KAMA</a></strong></li>
      <li><strong><a href="http://www.triangletire.cn/" target="_blank">TRIANGLE</a></strong></li>
      <li><strong><a href="http://en.miragetires.cn/" target="_blank">MIRAGE</a></strong></li>
      <li><strong><a href="http://www.mitas-tyres.com/rs/" target="_blank">Mitas</a></strong> (Mitas, Cultor)</li>
      <li><strong><a href="https://tyre.seha.com.tr/en/" target="_blank">SEHA,OZKA</a></strong></li>
        <li><strong><a href="http://www.atgtire.com/" target="_blank">Alliance</a></strong> (Alliance, Galaxy, Primex)</li>
        <li><strong><a href="http://www.trelleborg.com/en" target="_blank">Trelleborg</a></strong></li>
        </ul>
            </div>

            <div className="col-md-12 quote-wrapper my-5">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                   className="svg-inline--fa fa-quote-left fa-w-16 fa-3x">
                <path fill="currentColor"
                      d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                      className=""></path>
              </svg>
              <blockquote>
                ČAST NAM SE ŠTO SMO OD 2014 GODINE DEO TIMA VULCO  MULTINACIONALNOG FRANŠIZNOG LANCA BRZIH SERVISA KONCERNA <strong className="blue"><i>GOODYEAR</i> </strong>,KOME VERUJU VOZAČI ŠIROM EVROPE.
              </blockquote>
            </div>
          </div>

          {/*Contact*/}
          <div className="row my-5" id="contact-section">
            <div className="col-md-12 mb-5">
              <h1 className="info-text">Kontakt</h1>
            </div>
            <div className="col-md-6">
              <div className="contact">
                <a href="tel:022/314-740">
                  <p>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         className="svg-inline--fa fa-phone fa-w-16 fa-3x">
                      <path fill="currentColor"
                            d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
                            className=""></path>
                    </svg>

                    022/314-740
                  </p>
                </a>
                <a href="mailto:novomakexport@yahoo.com">
                  <p>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         className="svg-inline--fa fa-envelope fa-w-16 fa-3x">
                      <path fill="currentColor"
                            d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                            className=""></path>
                    </svg>
                    novomakexport@yahoo.com
                  </p>
                </a>
                <a href="https://www.google.com/maps?ll=44.991588,20.157549&z=16&t=m&hl=en-GB&gl=RS&mapclient=embed&cid=3269410594426619850" target="_blank">
                  <p>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                         className="svg-inline--fa fa-map-marker-alt fa-w-12 fa-3x">
                      <path fill="currentColor"
                            d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                            className=""></path>
                    </svg>
                    Kralja Petra I Karađorđevića 78, Stara Pazova 22300
                  </p>
                </a>
              </div>
            </div>
            <div className="col-md-6 cart-action">
              <div className="form-modal row">
                <div className="col-md-6 col-sm-12 my-1">
                  <input
                      placeholder="Ime (obavezno)"
                      type="text"
                      name="name"
                      value={name}
                      id="name"
                      className={`${formSubmitted && !name ? 'not-valid' : ''}`}
                      onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-md-6 col-sm-12 my-1">
                  <input
                      placeholder="Prezime (obavezno)"
                      type="text"
                      name="lastName"
                      value={lastName}
                      id="lastName"
                      className={`${formSubmitted && !lastName ? 'not-valid' : ''}`}
                      onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="col-md-6 col-sm-12 my-1">
                  <input
                      placeholder="Broj telefona"
                      type="text"
                      name="phone"
                      value={phone}
                      id="phone"
                      className={`${formSubmitted && !phone ? 'not-valid' : ''}`}
                      onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="col-md-6 col-sm-12 my-1">
                  <input
                      placeholder="E-mail (obavezno)"
                      type="mail"
                      name="email"
                      value={email}
                      id="email"
                      className={`${formSubmitted && !email ? 'not-valid' : ''}`}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-md-12 my-1">
                  <textarea
                      style={{padding: "10px"}}
                      placeholder="Napomena..."
                      name="note"
                      value={note}
                      id="note"
                      className="w-100"
                      rows={4}
                      onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>

                <div className="col-md-12">
                  <button className={`button primary full-width mt-5`}>
                    {/*{apiStarted && <div className="spinner-border" role="status">*/}
                    {/*  <span className="sr-only">Loading...</span>*/}
                    {/*</div>}*/}
                    Pošalji
                  </button>
                </div>

              </div>



            </div>
          </div>
        </section>

      </>
  );
}

export default AboutUsScreen;
