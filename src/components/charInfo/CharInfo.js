import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component, useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = props => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelResourse = new MarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //         // console.log('change');
    //     }
    // }

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        onCharLoading();

        marvelResourse.getChracter(charId).then(onCharLoaded).catch(onError);
    };

    const onCharLoaded = char => {
        setChar(char);
        setLoading(false);
    };

    const onCharLoading = () => {
        setLoading(true);
    };
    const onError = () => {
        setLoading(false);
        setError(false);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;

    const errorMesage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMesage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, descr, thumbnail, wiki, homepage, comics } = char;

    // console.log(comics);
    return (
        <>
            <div className="char__basics">
                <img
                    src={thumbnail}
                    alt={name}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a
                            href={homepage}
                            className="button button__main"
                        >
                            <div className="inner">homepage</div>
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
            <div className="char__descr">{descr}</div>
            <div className="char__comics">Comics</div>
            <ul className="char__comics-list">
                {comics.lenght > 0
                    ? null
                    : 'There is no comics for this character'}
                {comics.slice(0, 10).map((item, i) => {
                    return (
                        <li
                            key={i}
                            className="char__comics-item"
                        >
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
export default CharInfo;
