import "./App.css";
import { Container, Row, Col, Card, Image, Modal, Button } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Slider from "react-slick";
import Fall from "./public/osen_les_park_128379_1920x1080.jpg";
import Waterfall from "./public/vodopad_obryv_kamennyj_141850_1920x1080.jpg";
import Sakura from "./public/most_reka_techenie_100663_1920x1080.jpg";
import River from "./public/lodka_gory_ozero_135258_1920x1080.jpg";
import dayWeather from "./public/dayWeather.jpeg";
import CurrDate from "./Date";
import CurrTime from "./Time";
import CityAutocomplete from "./CityAutocomplete";
// import weekWeather from "./public/cloudy.png";

// API Key
const apiKey = "2a1415da8e78fd27494cf3257836cd32";

// Настройки слайдера
const sliderSettings = {
  className: "Slider",
  centerMode: true,
  slidesToShow: 5,
  infinite: true,
  centerPadding: "0",
  responsive: [
    {
      breakpoint: 900,
      settings: {
        className: "Slider",
        centerMode: true,
        centerPadding: "0",
        slidesToShow: 3,
        arrows: false,
      },
    },
  ],
};

const App = () => {
  // Состояние модалки
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //Город начальный и его изменение
  const [settedCity, setCity] = useState("New York");

  // Координаты
  const [coordinates, setCoordinates] = useState({lat: '40.7127281', lon: '-74.0060152'});

  //Показания погоды 
  const [loading, setLoading] = useState(true);
  const [weatherConditions, setWeatherConditions] = useState({});

  useEffect(() => {
    const { lat, lon } = coordinates; 
    const getConditions = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      setWeatherConditions(response.data);
      setLoading(false);
    };
    getConditions();
  }, [coordinates]);



  if (!loading) {
    return (
    <div className="app">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a city</Modal.Title>
        </Modal.Header>
        <Modal.Body><CityAutocomplete settedCity={settedCity} setCity={setCity} setCoordinates={setCoordinates} setShow={setShow} apiKey={apiKey}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <Container fluid>
      <Row className="d-flex">
        <Col className="info" xs={6} sm={4} xl={4}>
          <h6>
            <i className="bi bi-geo-alt-fill"></i> {settedCity}
          </h6>
          <h2>Cloudy</h2>
          <h1 className="temperature">{weatherConditions.main.temp}°C</h1>
          <CurrDate />
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
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={handleShow}>
            <i className="bi bi-geo-alt-fill"></i>cities
          </a>
          <a href="/settings">
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
          <Slider {...sliderSettings}>
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
            <i className="bi bi-clock-fill"></i> <CurrTime />
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
};
};

export default App;
