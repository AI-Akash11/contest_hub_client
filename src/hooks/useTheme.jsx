import React, { useContext } from 'react';
import { ThemeContext } from '../providers/themeContext/ThemeContext';

const useTheme = () => {
    const themeInfo = useContext(ThemeContext);
    return themeInfo;
};

export default useTheme;