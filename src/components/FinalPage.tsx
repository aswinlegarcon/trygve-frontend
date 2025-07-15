import React from "react";
import "../components/FinalPage.css";


interface FinalPageProps {
    tickImage?: string;
    title : React.ReactNode;
    subtitle: React.ReactNode;
    buttonText: string;
    onButtonClick: () => void;
}


const FinalPage: React.FC<FinalPageProps> = ({
    tickImage = "/assets/tick.png",
    title,
    subtitle,
    buttonText,
    onButtonClick
}) => {
    return (
        <div className="success-bg">
            <div className="success-logo-bg"></div>
                <div className="success-content">
                    <img src={tickImage} alt="Success Image" className="success-tick" />
                    <h1 className="success-title">{title}</h1>
                    <p className="success-desc">{subtitle}</p>
                    <button className="success-btn" onClick={onButtonClick}>
                        {buttonText}
                    </button>
                </div>
        </div>
    )
};


export default FinalPage;