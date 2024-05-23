import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import crosl1 from "../../asset/Images/crosl1.jpg"
import crosl2 from "../../asset/Images/crosl2.jpg"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Home() {
    return (
        <>
            <Carousel fade style={{ width: '100%', height: '100vh' }}>
                <Carousel.Item style={{ width: '100%', height: '100%' }}>
                    <div className="w-100" style={{ height: '100vh' }}>
                        <img
                            className="d-block w-100 h-100"
                            src={crosl2}
                            alt="First slide"
                        />
                    </div>
                    <Carousel.Caption style={{ bottom: '100px' }}>
                        <h1 style={{
                            fontFamily: "'Days One', sans-serif",
                            fontSize: "48px",
                            marginBottom: "20px",
                        }}>
                            Exclusive Music and Art Events
                        </h1>
                        <p style={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "14px",
                            fontWeight: "400",
                        }}>
                            Our exclusive music and art events offer a unique experience for those seeking exceptional entertainment. From intimate concerts to gallery exhibitions, immerse yourself in the world of creativity and culture.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="w-100" style={{ height: '100vh' }}>
                        <img
                            className="d-block w-100 h-100"
                            src={crosl1}
                            alt="Second slide"
                        />
                    </div>

                    <Carousel.Caption style={{ bottom: '100px' }}>
                        <h1 style={{
                            fontFamily: "'Days One', sans-serif",
                            fontSize: "48px",
                            marginBottom: "20px",
                        }}>
                            Upcoming and Recent Events
                        </h1>
                        <p style={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "14px",
                            fontWeight: "400",
                        }}>
                            Upcoming events are exciting opportunities to plan for and attend. Recent events offer a chance to reflect on experiences and memories. Both types are valuable in building a fulfilling event calendar.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="container py-5 about">
                <div className="row mb-4">
                    <div className="col text-center">
                        <h1>About</h1>
                    </div>
                </div>
                <div className="row d-flex flex-column flex-md-row">
                    <div className="col d-flex align-items-center">
                        <div className="para">
                            <p>The EventPlanner webapp is the ultimate solution for organizing and managing events with ease. It offers a wide range of features including event listings, ticketing, scheduling, reminders, and communication tools to streamline the entire event planning process. With a user-friendly interface, the webapp is accessible from any device, making it easy for event planners to stay on top of their events no matter where they are. Whether you are planning a corporate conference, wedding, or a charity fundraiser, the EventPlanner webapp has got you covered.</p>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <div className="aboutImg">
                            <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5 about">
                <div className="row mb-4">
                    <div className="col text-center">
                        <h1>Events Detail</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex align-items-center justify-content-center my-3">
                        <Card style={{ width: '18rem', border: "none", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", }}>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG11c2ljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                            <Card.Body>
                                <Card.Title>Music Festival</Card.Title>
                                <Card.Text>
                                Enjoy live music from top artists, food and drinks, and a vibrant atmosphere that's perfect for an unforgettable weekend.
                                </Card.Text>
                                <Button variant="info" className='text-white'>More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center my-3">
                        <Card style={{ width: '18rem', border: "none", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", }}>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1468359601543-843bfaef291a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8U3BvcnRpbmclMjBFdmVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                            <Card.Body>
                                <Card.Title>Sporting Event</Card.Title>
                                <Card.Text>
                                Cheer on your favorite team or athlete, tailgate with friends, and enjoy the excitement of a live game or match.
                                </Card.Text>
                                <Button variant="info" className='text-white'>More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center my-3">
                        <Card style={{ width: '18rem', border: "none", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",}}>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1603629242133-adaaa856147c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fEFydCUyMEV4aGliaXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
                            <Card.Body>
                                <Card.Title>Art Exhibition</Card.Title>
                                <Card.Text>
                                Explore stunning artwork from local and international artists, attend artist talks, and purchase unique pieces to take home.
                                </Card.Text>
                                <Button variant="info" className='text-white'>More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center my-3">
                        <Card style={{ width: '18rem', border: "none", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",}}>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1524777313293-86d2ab467344?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlZGRpbmclMjBldmVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                            <Card.Body>
                                <Card.Title>Wedding Event</Card.Title>
                                <Card.Text>
                                Celebrate the union of two people in love with a beautiful ceremony, delicious food, dancing, and special moments with family and friends.
                                </Card.Text>
                                <Button variant="info" className='text-white'>More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center my-3">
                        <Card style={{ width: '18rem', border: "none", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",}}>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXklMjBFdmVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                            <Card.Body>
                                <Card.Title>Birthday Event</Card.Title>
                                <Card.Text>
                                Celebrate a special day with a birthday event! Create unforgettable memories with friends and family.
                                </Card.Text>
                                <Button variant="info" className='text-white'>More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center my-3">
                        <Card style={{ width: '18rem', border: "none", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",}}>
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1561489413-985b06da5bee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8TmV0d29ya2luZyUyMEV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                            <Card.Body>
                                <Card.Title>Networking Event</Card.Title>
                                <Card.Text>
                                Build new connections and strengthen existing ones in a relaxed and social environment, often with food and drinks included.
                                </Card.Text>
                                <Button variant="info" className='text-white'>More Details</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
