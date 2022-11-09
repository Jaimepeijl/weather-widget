import {useState} from "react";
import './SearchBar.css';

function SearchBar({locationHandler}) {
    const [query, setQuery] = useState('')

    function onFormSubmit(e) {
        e.preventDefault()
        locationHandler(query)
    }
    return (
        <form
            className="searchbar"
        onSubmit={onFormSubmit}
        >
            <input
                type="text"
                name="search"
                value={query}
                placeholder="Zoek een stad"
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
            type="submit"
            >
                Zoeken
            </button>
        </form>
    )
} export default SearchBar;