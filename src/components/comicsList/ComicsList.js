import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = newComicsList => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    };

    function Content(arr) {
        const items = arr.map((item, i) => {
            return (
                <li
                    className="comics__item"
                    key={item.id}
                >
                    <Link to={`/comics/${item.id}`}>
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            );
        });
        return <ul className="comics__grid">{items}</ul>;
    }

    const items = Content(comicsList);

    const errorMesage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMesage}
            {spinner}
            {items}
            <button
                onClick={() => onRequest(offset)}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
