import React, {useState} from 'react';

import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

const items = [
    {
        title: 'Why react?',
        content: 'I believe it is better than angular, maybe will see it and vue'
    },
    {
        title: 'Why this course?',
        content: 'I am not sure yet'
    },
    {
        title: 'What is next?',
        content: 'Finally doing sth other than outdated deliveries!'
    }

]

const options = [
    {
        label: 'green',
        value: '#00FF00'
    },
    {
        label: 'blue',
        value: '#0000FF',
    },
    {
        label: 'red',
        value: '#FF0000',
    },
]

const showAccordion = () => {
    if (window.location.pathname === '/') {
        return <Accordion items={items} />
    }
}

// instead of naming the function then export default name of the function -> merge it in one line of code
export default () => {

    const [selected, setSelected] = useState(options[0]);
    const [showDropdown, setShowDropdown] = useState(true)

    return (
        <div>
            <br></br>   {/* just to emphasize why fragment is needed instead of normal div to remove the extra upper border */}
            <Header />

            <Route path="/"><Accordion items={items} /></Route>
            {/* {showAccordion()} */}
            {/* <Accordion items={items} /> */}
            
            <Route path="/list"><Search /></Route>
            {/* <Search /> */}
            <Route path="/dropdown">
            <button onClick={() => {setShowDropdown(!showDropdown)}}>Toggle Dropdown</button>
            {showDropdown ?
            // multipe elements must be wrapped inside a single element as a div or a fragment
            <React.Fragment>
                <Dropdown selected={selected} onSelectedChange={setSelected} options={options} /> 
                <div>WOOOOOW!! I changed the color to <span style={{color:selected.value}}>{selected.label}!</span></div>
            </React.Fragment>
            : null
            }
            </Route>
            {/* <button onClick={() => {setShowDropdown(!showDropdown)}}>Toggle Dropdown</button>
            {showDropdown ?
            // multipe elements must be wrapped inside a single element as a div or a fragment
            <React.Fragment>
                <Dropdown selected={selected} onSelectedChange={setSelected} options={options} /> 
                <div>WOOOOOW!! I changed the color to <span style={{color:selected.value}}>{selected.label}!</span></div>
            </React.Fragment>
            : null
            } */}
            
            <Route path="/translate"><Translate /></Route>

            {/* <div><Translate /></div> */}
        </div>
    );
};