import { useHttp } from '../components/hooks/http.hook';

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=6b45172ef9efcf14f9bb9ddda9fa03da';
    const _baseOffset = 310;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`,
        );
        // return res.data.results;
        return res.data.results.map(_transformChar);
    };

    const getAllComics = async (offset = 0) => {
        const res = await request(
            `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=100${offset}&${_apiKey}`,
        );
        // console.log(res.data.results);
        return res.data.results.map(_transformCosmics);
    };

    // getAllComics();
    const getComics = async id => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformCosmics(res.data.results[0]);
    };

    const getChracter = async (id = 1011400) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformChar(res.data.results[0]);
    };

    const _transformCosmics = comics => {
        return {
            id: comics.id,
            title: comics.title,
            descr: comics.description,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : 'not available',
            pages: comics.pageCount,
        };
    };

    const _transformChar = char => {
        return {
            name: char.name,
            descr: char.description
                ? `${char.description.slice(0, 210)}...`
                : 'There is no data for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        };
    };

    return {
        loading,
        error,
        getAllCharacters,
        getChracter,
        getAllComics,
        getComics,
        clearError,
    };
};
export default useMarvelService;
