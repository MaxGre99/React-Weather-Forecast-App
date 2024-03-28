import "./App.css";
import { Container, Row, Col, Card, Carousel, Image } from "react-bootstrap";
import React from "react";
import Slider from "react-slick";
import Fall from "./public/osen_les_park_128379_1920x1080.jpg";
import Waterfall from "./public/vodopad_obryv_kamennyj_141850_1920x1080.jpg";
import Sakura from "./public/most_reka_techenie_100663_1920x1080.jpg";
import River from "./public/lodka_gory_ozero_135258_1920x1080.jpg";
import dayWeather from "./public/dayWeather.jpeg";
// import weekWeather from "./public/cloudy.png";

var settings = {
  className: "Zaeb",
  centerMode: true,
  slidesToShow: 5,
  infinite: true,
  centerPadding: "0",
  responsive: [
    {
      breakpoint: 900,
      settings: {
        className: "Zaeb",
        centerMode: true,
        centerPadding: "0",
        slidesToShow: 3,
        arrows: false,
      },
    },
  ],
};

const App = () => (
  <div className="app">
    <Container fluid>
      <Row className="d-flex">
        <Col className="info" xs={6} sm={4} xl={4}>
          <h6>
            <i className="bi bi-geo-alt-fill"></i> New York
          </h6>
          <h2>Cloudy</h2>
          <h1 className="temperature">26C</h1>
          <p>Sunday | 12 Dec 2023</p>
        </Col>
        <Col className="cloud" xs={4} sm={6} xl={4}>
          <i className="bi bi-cloud-sun-fill"></i>
        </Col>
      </Row>
    </Container>
    <Container fluid>
      <Row className="tabs">
        <Col className="navigation d-flex" xs={12} sm={2} md={2} xl={1}>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a href="/profile" className="avatar"></a>
          <a href="/weather" className="active">
            <i className="bi bi-cloud-sun-fill"></i>weather
          </a>
          <a href="/explore">
            <i className="bi bi-compass-fill"></i>explore
          </a>
          <a href="/weather">
            <i className="bi bi-geo-alt-fill"></i>cities
          </a>
          <a href="/weather">
            <i className="bi bi-gear-fill"></i>settings
          </a>
        </Col>
        <Col className="mainBlock" xs={12} sm={6} md={6} xl={7}>
          <div className="activities d-flex">
            <h3>
              <i className="bi bi-heart-fill"></i> Activities in your area
            </h3>
            <div className="d-flex activities-cards">
              <Card>
                <Card.Img variant="top" src={Fall}  className="rounded"/>
                <Card.Footer>
                  <small>2km away</small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src={Waterfall} className="rounded"/>
                <Card.Footer>
                  <small>2km away</small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src={Sakura} className="rounded"/>
                <Card.Footer>
                  <small>2km away</small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src={River} className="rounded"/>
                <Card.Footer>
                  <small>2km away</small>
                </Card.Footer>
              </Card>
            </div>
          </div>
          <div className="emptySpace"></div>
          <div className="dailyForecast d-flex">
            <h3>
              <i className="bi bi-clock-fill"></i> 24-hour forecast
            </h3>
            <div className="img">
              <Image src={dayWeather} />
            </div>
          </div>
        </Col>
        <Col className="weekly d-flex" xs={12} sm={3} md={3} xl={3}>
          <Slider {...settings}>
            <div className="slickSlide">
              <p>MON</p>
              <i className="bi bi-cloud-sun-fill"></i>
            </div>
            <div className="slickSlide">
            <p>TUE</p>
              <i className="bi bi-cloud-sun-fill"></i>
            </div>
            <div className="slickSlide">
            <p>WED</p>
              <i className="bi bi-cloud-sun-fill"></i>
            </div>
            <div className="slickSlide">
            <p>THU</p>
              <i className="bi bi-cloud-sun-fill"></i>
            </div>
            <div className="slickSlide">
            <p>FRI</p>
              <i className="bi bi-cloud-sun-fill"></i>
            </div>
            <div className="slickSlide">
            <p>SAT</p>
              <i className="bi bi-cloud-sun-fill"></i>
            </div>
            <div className="slickSlide">
            <p>SUN</p>
              <i className="bi bi-cloud-sun-fill"></i>
            </div>
          </Slider>
          <p className="time">
            <i className="bi bi-clock-fill"></i> 8:00 PM GMT
          </p>
          <div className="airConditions d-flex">
            <p className="airConditionsTitle">AIR CONDITIONS</p>
            <p>
              <i className="bi bi-thermometer-half"></i> Real Feel
              <br />
              <span>30C</span>
            </p>
            <p>
              <i className="bi bi-wind"></i> Wind
              <br />
              <span>0.8 km/hr</span>
            </p>
            <p className="rain">
              <i className="bi bi-droplet-fill"></i> Chance of rain
              <br />
              <span>2 %</span>
            </p>
            <p>
              <i className="bi bi-sun"></i> UV Index
              <br />
              <span>4</span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default App;
