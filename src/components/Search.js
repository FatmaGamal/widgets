import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    console.log('I run with every render')

    // example: [] => initial, no array at all => initial + repeat, [term, term2] => initial + change of (term || term2)
    useEffect(() => {
        console.log('I only run once')
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedTerm(term)
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [term]);

    useEffect(() => {

        // 1. async inside an inside function
        const search = async () => {
            //destructure data from results returned
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action:'query',
                    list:'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                }
            });

            setResults(data.query.search);
        }
        
        // 2. promise chain
        /* axios.get().then((response) => {
            
        }) */
        
        // 3. IIFE
        /* (async() => {
            
        })(); */

        if (debouncedTerm) {
            search();
        }
        
    },[debouncedTerm])

    const renderedResults = results.map((result) => {
        return (
            <a className="item" key={result.pageid} href={`https://en.wikipedia.org?curid=${result.pageid}`}>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </a>
        );
    });

    const onTermChange = (e) => {
        setTerm(e.target.value);
    }

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input type="input" className="input" value={term} onChange={(e) => onTermChange(e)}/>
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
}

export default Search;