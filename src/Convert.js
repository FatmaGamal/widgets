import React, {useState, useEffect} from 'react';

import axios from 'axios';


const Convert = ({language, text}) => {

    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);
        return() => {
            clearTimeout(timeoutId);
        }
    }, [text])
    
    useEffect(() => {
        const doTranslation = async () => {
            const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', {/* no info in body request */}, {
                params : {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            });
            setTranslated(data.data.translations[0].translatedText)     // axios (data) + actual request google (data)
        };

        doTranslation();
    }, [debouncedText, language]);

    return (<h1 className="ui header">{translated}</h1>)
}

export default Convert;