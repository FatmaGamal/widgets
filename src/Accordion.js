import React, {useState} from 'react';  //adding useState import

const Accordion = ({items}) => {

    //Hooks state system
    //state variable name, function to set/change the variable = initial value of variable
    //any use of setActiveClick will rerender the component without the initial value
    //destructure variables
    const [activeIndex, setActiveIndex] = useState(null)

    const renderedItems = items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';   // itenary condition
        const onTitleClick = (index) => {
            setActiveIndex(index);
        } 

        return (
            <React.Fragment key={item.title}>
                <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        )
    })

    return (
        <div className="ui styled accordion">
            {renderedItems}
        </div>
    );
}

export default Accordion