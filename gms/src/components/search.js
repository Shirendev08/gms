import {useState} from "react";
import { TR_API_URL } from "../api";


const Search = ({onSearchChange}) =>{

    const [search, setSearch] = useState(null);
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData)
    }
    const loadOptions = (inputValue)=>{
        return fetch(`${TR_API_URL}/languages?`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
    }

    return (
        <div>
            <input value={search} onChange={handleOnChange} loadOptions={loadOptions}/>
        </div>
    )
}

export default Search;
