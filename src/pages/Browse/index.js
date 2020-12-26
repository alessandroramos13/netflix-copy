import React, { useState, useEffect, memo } from 'react';
import BrowsePage from './BrowsePage/index';
import BrowseLoading from './BrowseLoading/index';
import Tmdb from '../../API/Tmdb';

const Browse = () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            setMovieList(list)
            let originals = list.filter(i => i.slug === "originals");
            let randomChose = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChose];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
        }
        loadAll()
    }, [])

    return(
        <div>
            {featuredData ? <BrowsePage featuredData={featuredData} /> : <BrowseLoading />}
        </div>
    );
}

export default memo(Browse);