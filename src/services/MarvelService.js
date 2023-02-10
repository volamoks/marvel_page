class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '&apikey=6b45172ef9efcf14f9bb9ddda9fa03da';
    _baseOffset = 310;

    getResourse = async url => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could get ${url}: status ${res.status}`);
        }
        return res.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResourse(
            `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`,
        );
        // return res.data.results;
        return res.data.results.map(this._transformChar);
    };

    getChracter = async (id = 1011400) => {
        const res = await this.getResourse(
            `${this._apiBase}characters/${id}?${this._apiKey}`,
        );
        return this._transformChar(res.data.results[0]);
    };

    _transformChar = char => {
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
}
export default MarvelService;
