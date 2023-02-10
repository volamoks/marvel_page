import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import { useEffect, useState } from 'react';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelResourse = new MarvelService();

    useEffect(() => {
        updateCharacter();
        const timerId = setInterval(updateCharacter, 60000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const onCharLoaded = char => {
        setLoading(false);
        setChar(char);
    };

    const onCharLoading = () => {
        setLoading(true);
    };
    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const updateCharacter = () => {
        const id = (Math.random() * (1011400 - 1011000) + 1011000).toFixed(0);
        onCharLoading();
        marvelResourse.getChracter(id).then(onCharLoaded).catch(onError);
    };

    const errorMesage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMesage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button
                    onClick={updateCharacter}
                    className="button button__main "
                >
                    <div className="inner">try it</div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { name, descr, thumbnail, homepage, wiki } = char;

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{descr}</p>
                <div className="randomchar__btns">
                    <a
                        href={homepage}
                        className="button button__main"
                    >
                        <div className="inner">HomePage</div>
                    </a>
                    <a
                        href={wiki}
                        className="button button__secondary"
                    >
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
