import React, {useState, useEffect, useRef} from 'react';


const Dropdown = ({label, options, selected, onSelectedChange}) => {

    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (e) => {
            // contains available for all DOM elements, allow us to check if one contains the other
            if (ref.current.contains(e.target)) {
                return;
             }
             setOpen(false);
            console.log('body clicked!')
        };

       document.body.addEventListener('click', onBodyClick, {capture: true});

       return () => {
           // cleanup function to avoid breaking after toggling dropdown
           document.body.removeEventListener('click', onBodyClick, {capture: true})
       }
    }, [])

    const renderedOptions = options.map((option)=> {
        if (option.value === selected.value) {
            return null
        }
        return (
            <div key={option.value} className="item" onClick={() => {
                onSelectedChange(option);
                console.log('item clicked!')
            }}>
                {option.label}
            </div>
        );
    })

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                {/* ternary condition to assign class */}
                <div className={`ui selection dropdown ${open ? 'visible active': ''}`} onClick={() => {
                    setOpen(!open);
                    console.log('dropdown clicked!')
                    }}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition': ''}`}>{renderedOptions}</div>
                </div>
            </div>
        </div>
    );
}

export default Dropdown