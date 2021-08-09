import React from 'react';

const Link = ({className, href, children}) => {

    const onAnchorClick = (e) => {
        e.preventDefault();
        window.history.pushState({}, '', href);

        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }
    return (
        <a className={className} href={href} onClick={onAnchorClick}>{children}</a>
    );
}

export default Link;