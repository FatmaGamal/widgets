// no need to import React here
import {useEffect, useState} from 'react';

const Route = ({path, children}) => {
    //this state is only tracking the current value of pathname to cause a rerender
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    const onLocationChange = () => {
        console.log('location change');
        setCurrentPath(window.location.pathname);
    }

    useEffect(() => {
        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange);
        }
    }, []);

    return currentPath === path ? children: null;
}

export default Route;