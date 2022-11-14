import { useEffect, useState } from "react";
import DisplayError from "./shared/DisplayError";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [suggestions, setSuggestions] = useState();
    const [typedValue, setTypedValue] = useState("");
    const [itemsArr, setItemArr] = useState();
    const [error, setError] = useState();
    const  array = [];

    useEffect(() => {
        const getItems = () => {
            fetch("/api/get-items")
            .then((res) => res.json())
            .then((data) => {
                data.data.map((product) => {
                    const item = {
                        _id: product._id,
                        name: product.name,
                    };
                    array.push(item);
                });
            })
            .catch((err) => setError(err))
            .finally(() => setItemArr(array));
        }
        getItems();
    }, [])

    const searchMatches = () => {
        if (itemsArr) {
            const matches = []
            itemsArr.map(item => {
                const name = item.name.toLowerCase();
                if ((name.search(typedValue.toLowerCase())) !== -1){
                    matches.push(<SuggestionLink to={`/products/${item._id}`} onClick={() => setSuggestions(null)}>{item.name}</SuggestionLink>)
                }
            })
            setSuggestions(matches);
        }
    }

    useEffect(() => {
        setSuggestions(null);
        if (typedValue.length >= 1){
            searchMatches();
        }
    }, [typedValue])

    // gets the value of what the user is typing in the search bar
    const getValue = (event) => {
        setTypedValue(event.target.value);
    };

    if (error) {
        return (<Wrapper>
            <DisplayError/>
            </Wrapper>);
        }
    return(
        <Wrapper>
            <div className="search">
                <input
                    type="text"
                    placeholder="🔍 Search"
                    value={typedValue}
                    onChange={getValue}
                />
                <button onClick={() => setTypedValue('')}>X</button>
            </div>
            {suggestions? (
                <Suggestion>
                    {suggestions.map(element => {
                        return element;
                    })}
                </Suggestion>
                
            ):(
                <NoSuggestion>
                </NoSuggestion>
            )}
        </Wrapper>
        
    )
}
const Wrapper = styled.div` 
    display: grid;
    input {
        width: 25vw;
        height: 2.3vw;
        padding-left: 1vw;
        font-size: 1.2vw;
        border-radius: var(--border-radius);
        border: var(--border);
    }
    input:focus {
        outline: none;
    }
    button{
        margin-left: -2.3vw;
        width: 2.3vw;
        height: 2.3vw;
        border: none;
        border-radius: 100px;
        color: white;
        background-color: var(--primary-colour);
        font-size: 1vw;
    }
`;
const SuggestionLink = styled(Link)`
    color: var(--primary-colour);
    width: 22vw;
    margin: auto;
`;
const Suggestion = styled.div`
    z-index: 1;
    max-width: 25vw;
    background-color: white;
    display: grid;
    gap: 1vw;
    max-height: 35vw;
    overflow: scroll;
`;

const NoSuggestion = styled.div`
    display: block;
`;
export default SearchBar;