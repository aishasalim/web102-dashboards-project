import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from '../routes/NotFound.jsx';
import md5 from 'md5-js';
import "./HeroDetail.css";
import Chart from './Chart.jsx';

const PUBLIC_API_KEY = '1942995fed9e571bce369e5ecc4d58c8'; 
const PRIVATE_API_KEY = '79b9f67acb0f34b3d643c5567381913e8a01086f'; 

const HeroDetail = () => {
    const params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    useEffect(() => {
        const ts = new Date().getTime().toString();
        const hash = md5(ts + PRIVATE_API_KEY + PUBLIC_API_KEY);

        const getHeroDetail = async () => {
            try {
                const response = await fetch(
                    `https://gateway.marvel.com:443/v1/public/characters/${params.symbol}?apikey=${PUBLIC_API_KEY}&ts=${ts}&hash=${hash}`
                );
                const heroData = await response.json();
                setFullDetails(heroData.data.results[0]);
                console.log(heroData.data.results[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getHeroDetail();
    }, [params.symbol]);

    if (!fullDetails) {
        return null; // You might want to add a loading indicator here
    }

    return (
<div class="hero-content">
    <div class="hero-detail">
        <div class="hero-image-container">
            <img src={`${fullDetails.thumbnail.path}.${fullDetails.thumbnail.extension}`} alt={fullDetails.name} class="hero-detail-image" />
        </div>
        <div class="hero-details-container">
            <div class="hero-details-content">
                <h2 class="hero-details-header2">{fullDetails.name}</h2>
                <p class='hero-details-description'><strong>Description:</strong> {fullDetails.description || "No description available"}</p>
                <p><strong>Modified:</strong> {new Date(fullDetails.modified).toLocaleString()}</p>
            </div>
        </div>
    </div>

    <Chart fullDetails={fullDetails} />

    <div class="hero-series-card">
        <div class="hero-cards-container">
            {fullDetails.comics.items.length > 0 && (
                <div class="hero-card comics-card">
                    <h3>Comics</h3>
                    <ul>
                        {fullDetails.comics.items.map((comic, index) => (
                            <li key={index}>{comic.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            {fullDetails.series.items.length > 0 && (
                <div class="hero-card stories-card">
                    <h3>Series</h3>
                    <ul>
                        {fullDetails.series.items.map((series, index) => (
                            <li key={index}>{series.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {fullDetails.stories.items.length > 0 && (
            <div class="hero-card series-card">
                <h3>Stories</h3>
                <ul>
                    {fullDetails.stories.items.map((story, index) => (
                        <li key={index}>{story.name}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>

</div>

    );
};

export default HeroDetail;

