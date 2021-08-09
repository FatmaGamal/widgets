import React from 'react';

const Link = ({className, href, children}) => {

    const onAnchorClick = (e) => {
        // mac || windows
        // boolean according to whether a key was held down while clicking by mouse
        if (e.metaKey || e.ctrlKey) {
            return ;
        }
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