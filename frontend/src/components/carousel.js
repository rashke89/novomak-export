import React from 'react';
import guma1 from '../assets/imgs/guma7.jpg'
import guma2 from '../assets/imgs/guma2.jpg'
import guma3 from '../assets/imgs/guma3.jpg'

export default function Carousel(props) {
  return <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
          <div className="carousel-item active" style={{'backgroundImage': `url('${guma1}')`}}>
              {/*<img className="d-block w-100" src={guma1} alt="First slide" />*/}
          </div>
          <div className="carousel-item" style={{'backgroundImage': `url('${guma2}')`}}>
              {/*<img className="d-block w-100" src={guma2} alt="Second slide" />*/}
          </div>
          <div className="carousel-item" style={{'backgroundImage': `url('${guma3}')`}}>
              {/*<img className="d-block w-100" src={guma3} alt="Third slide" />*/}
          </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
      </a>
  </div>
}
