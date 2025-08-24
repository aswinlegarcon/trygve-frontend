import React, {useState,useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom"; 
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
    const touchStartX = useRef<number | null>(null); // know about this
    const nextScreen = ()=> {
        currentScreen<screens.length-1 && setCurrentScreen(currentScreen + 1);
    };
    const navigate = useNavigate();

    const lastScreen = () => {
        setCurrentScreen(screens.length - 1);
    }

    const prevScreen = () => {
        currentScreen > 0 && setCurrentScreen(currentScreen - 1);
    }

    useEffect(() => {
        if (currentScreen === 0) {
            setTimeout(() => {
                setCurrentScreen(1);
            }, 3000);
        }
    },[]);

    // keyboard navigation
    useEffect( () => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(currentScreen === 0) return; // Prevent navigation on the first screen
            e.key==='ArrowRight' && nextScreen();
            e.key==='ArrowLeft' && currentScreen > 1 && prevScreen();
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {window.removeEventListener('keydown', handleKeyDown);};
    }, [currentScreen]);

    // mouse and touch navigation
    useEffect( () => {
        const handleTouchStart = (e :TouchEvent) => {
            if(currentScreen === 0) return; // Prevent navigation on the first screen
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e:TouchEvent) => {
            if(currentScreen === 0 || touchStartX.current===null) return;
            const touchEndX = e.changedTouches[0].clientX;
            const touchDiff = touchStartX.current - touchEndX;
            if (touchDiff > 50) nextScreen();
            if (touchDiff < -50 && currentScreen > 1) prevScreen();
            touchStartX.current = null; // Reset after handling
        };

        const handleMouseDown = (e: MouseEvent) => {
            if(currentScreen === 0) return; // Prevent navigation on the first screen
            e.preventDefault(); // Prevent text selection
            touchStartX.current = e.clientX;
        };
        const handleMouseUp = (e: MouseEvent) => {
            if(currentScreen === 0) return; // Prevent navigation on the first screen
            e.preventDefault(); // Prevent text selection
            if (touchStartX.current === null) return;
            const mouseEndX = e.clientX;
            const diff = mouseEndX - touchStartX.current;
            if (diff > 50  && currentScreen > 1 ) prevScreen();
            if (diff < -50) nextScreen();
            touchStartX.current = null;
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    },[currentScreen]) ;



    const {backgroundImage,title,subtitle} = screens[currentScreen];

    return (
        <div className="onboarding-bg" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="onboarding-overlay">
                
                <div className="onboarding-content">
                    <h1 className="onboarding-title" key={currentScreen}>"{title}"</h1>
                    <p className="onboarding-subtitle">"{subtitle}"</p>
                    {
                            currentScreen === screens.length - 1 &&
                            <button className="onboarding-btn primary"  onClick={() => navigate('/home')}>Get Started</button>
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
