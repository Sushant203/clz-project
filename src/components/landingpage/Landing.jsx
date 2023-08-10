import React, { useState, useEffect } from 'react';
import Logo from '../resources/images/logo.png';
import LandingImage from '../resources/images/landingimage.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserAuthContextApi, { UserAuthContext } from '../../hoc/contextapi/Userauth';

const Landing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const topItems = [

        {
            name: "Click Here for Driving Cab",
            path: "/drivingrequest"
        },

    ];
    const headingLines = [
        "Online Cab Booking System",
        "Your Journey, Our Priority"
    ];
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentLine, setCurrentLine] = useState("");

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (currentLine.length < headingLines[currentLineIndex].length) {
                setCurrentLine(prevLine => prevLine + headingLines[currentLineIndex][currentLine.length]);
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setCurrentLine("");
                    setCurrentLineIndex((currentLineIndex + 1) % headingLines.length);
                }, 1000); // Delay before starting the typing again
            }
        }, 200); // Adjust the typing speed here (milliseconds)

        return () => clearInterval(typingInterval);
    }, [currentLine, currentLineIndex]);

    return (
        <div className="bg-gradient-to-b from-purple-400 to-purple-800 min-h-screen flex flex-col text-white">
            <UserAuthContextApi>
                <UserAuthContext.Consumer>
                    {(context) => (
                        <div>
                            <div className="container mx-auto py-4 px-4 md:px-8 lg:px-16 flex items-center justify-between">
                                <div className="flex items-center gap-3 md:gap-5">
                                    <img src={Logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
                                    <div className=" md:flex gap-4">
                                        {topItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`cursor-pointer hover:text-gray-300 capitalize text-md md:text-lg rounded-md px-4 bg-blue-800 text-white`}
                                            >
                                                <Link to={item.path}>{item.name}</Link>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-3 md:gap-4">
                                    <Link to='/login'>
                                        <div className="px-3 py-1 bg-white text-blue-800 font-semibold rounded-md cursor-pointer hover:bg-blue-800 hover:text-white transition duration-300">
                                            Login
                                        </div>
                                    </Link>
                                    <Link to='/signup'>
                                        <div className="px-3 py-1 border-2 border-white text-white font-semibold rounded-md cursor-pointer hover:border-blue-800 hover:text-blue-800 transition duration-300">
                                            Register
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="container mx-auto my-8 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between">
                                <div className="md:w-1/2">
                                    {headingLines.map((line, index) => (
                                        <h1
                                            key={index}
                                            className={`font-extrabold text-2xl md:text-4xl lg:text-5xl mb-3 ${index === currentLineIndex ? 'typing' : 'hidden'
                                                }`}
                                        >
                                            {index === currentLineIndex ? currentLine : ''}
                                        </h1>
                                    ))}
                                    <p className="text-justify mb-6 mx-2">
                                        Welcome to a seamless cab booking experience. Say goodbye to waiting and hello to convenience. With
                                        just a few clicks, you can now book a comfortable and reliable ride to your destination of choice.

                                        <span className='text-xl text-blue-800 font-bold'> Login to Book a cab</span>
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <div
                                            className="px-4 py-2 bg-white text-blue-800 font-semibold rounded-full cursor-pointer hover:bg-blue-800 hover:text-white transition duration-300 mb-3 md:mb-0"
                                            onClick={() => {
                                                navigate('/login')
                                            }}
                                        >
                                            Book Now
                                        </div>
                                        <div
                                            className="px-4 py-2 border-2 border-white text-white font-semibold rounded-full cursor-pointer hover:border-blue-800 hover:text-blue-800 transition duration-300"
                                            onClick={() => {
                                                navigate('/login')
                                            }}
                                        >
                                            Learn More
                                        </div>
                                    </div>

                                </div>

                                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                                    <img src={LandingImage} alt="Landing" className="w-full h-auto rounded-lg shadow-lg" />
                                </div>
                            </div>
                            <div className='text-justify m-3 border-2 flex flex-col justify-center items-center w-fit px-3 py-1 rounded-md shadow-lg shadow-white'>
                                <div className='text-justify'>
                                    For Quick Contact: 071-0000012 , 9800000000 <br />
                                    Mail: cbsnew@mail.com <br />
                                    Main Office: Butwal , Rupandehi
                                </div>


                            </div>
                        </div>
                    )}
                </UserAuthContext.Consumer>
            </UserAuthContextApi>
        </div>
    );
};

export default Landing;
