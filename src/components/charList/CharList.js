import './charList.scss';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import { useState, useEffect, useRef } from 'react/cjs/react.development';
import MarvelService from '../../services/MarvelService';

const CharList = props => {
    const [charArr, setcharArr] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newItemLoading, setNEwItemLoading] = useState(false);
    const [offset, setOffset] = useState(310);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = offset => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    };

    const onCharListLoading = () => {
        setNEwItemLoading(true);
    };

    const onCharListLoaded = newCharArr => {
        let ended = false;
        if (newCharArr.lenght < 9) {
            ended = true;
        }

        setcharArr(charArr => [...charArr, ...newCharArr]);
        setLoading(loading => false);
        setNEwItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    };

    const onError = () => {
        setError(true);
        setLoading(loading => false);
    };

    const itemRef = useRef([]);

    const setRef = ref => itemRef.push(ref);

    const focusOnItem = id => {
        itemRef.current.forEach((item, i) =>
            item.classList.remove('char__item_selected'),
        );
        itemRef.current[id].classList.add('char__item_selected');
        itemRef.current[id].focus();
    };

    function View(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { objectFit: 'cover' };
            if (
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
                imgStyle = { objectFit: 'unset' };
            }
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={el => (itemRef.current[i] = el)}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return <ul className="char__grid">{items}</ul>;
    }

    const characters = View(charArr);

    const errorMesage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? characters : null;

    return (
        <div className="char__list">
            {errorMesage}
            {spinner}
            {content}

            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ ' display': charEnded ? 'none' : ' block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default CharList;
