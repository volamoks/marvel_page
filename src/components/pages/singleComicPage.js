import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/errorMessage';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comics, setComics] = useState(null);
    const { loading, error, getComics, clearError } = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [comicId]);

    const updateComics = () => {
        clearError();

        getComics(comicId).then(onComicsLoaded);
    };

    const onComicsLoaded = comics => {
        setComics(comics);
        console.log(comics);
    };

    const errorMesage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comics) ? (
        <View comics={comics} />
    ) : null;

    return (
        <>
            {errorMesage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ comics }) => {
    const { title, descr, thumbnail, price, pages } = comics;
    return (
        <div className="single-comic">
            <img
                src={thumbnail}
                alt={title}
                className="single-comic__img"
            />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{descr}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link
                to="/comics "
                className="single-comic__back"
            >
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
