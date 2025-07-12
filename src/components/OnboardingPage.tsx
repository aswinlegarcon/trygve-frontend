import React, {useState,useEffect, use} from "react";
import '../styles/OnboardingPage.css';


const screens = [
    {
        id : 0,
        title : "Tryve",
        subtitle : "Trusted Guardian of Life",
        backgroundImage: "/assets/firstpage.png",
    },
    {
        id: 1,
        title: "Your Health, Our Priority",
        subtitle: "Trusted doctors and care at your doorstep",
        backgroundImage: "/assets/secondpage.png",
    },
    {
        id: 2,
        title: "Seamless Care, Delivered",
        subtitle: "Consult, treat, and heal—hassle-free",
        backgroundImage: "/assets/thirdpage.png",
    },
    {
        id: 3,
        title: "Affordable Healthcare For Everyone",
        subtitle: "Quality care for every budget",
        backgroundImage: "/assets/fourthpage.png",
    }
];

const OnboardingPage : React.FC = () => {
    const [currentScreen,setCurrentScreen] = useState(0);

    const nextScreen = ()=> {
        currentScreen<screens.length-1 && setCurrentScreen(currentScreen + 1);
    };

    const lastScreen = () => {
        setCurrentScreen(screens.length - 1);
    }

    useEffect(() => {
        if (currentScreen === 0) {
            setTimeout(() => {
                setCurrentScreen(1);
            }, 3000);
        }
    },[]);

    const {backgroundImage,title,subtitle} = screens[currentScreen];

    return (
        <div className="onboarding-bg" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="onboarding-overlay">
                <div className="onboarding-content">
                    <h1 className="onboarding-title">{title}</h1>
                    <p className="onboarding-subtitle">{subtitle}</p>
                    {
                            currentScreen === screens.length - 1 &&
                            <button className="onboarding-btn" onClick={() => alert('clicked')}>Get Started</button>
                    }
                    <div className="onboarding-dots">
                        {
                            currentScreen !== 0 && (
                                screens.map((_, index) => (
                                    index !== 0 && 
                                    <span
                                        key={index}
                                        className={`onboarding-dot ${currentScreen === index ? 'active' : ''}`}
                                        onClick={() => setCurrentScreen(index)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ))
                            )
                        }
                    </div>
                    <div className="onboarding-nav">
                        {
                            currentScreen !== 0 && currentScreen !== screens.length - 1 &&
                            <button className="onboarding-btn" onClick={lastScreen}>Skip</button>
                        }
                        {
                           currentScreen !== 0 && currentScreen !== screens.length - 1 &&
                            <button className="onboarding-btn" onClick={nextScreen}>Next &rarr;</button>
                        }
                        
                    </div>
                </div>
            </div>
        </div>

    );

};

export default OnboardingPage;
