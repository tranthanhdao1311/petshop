import React, { ReactNode } from 'react';
import './GlobalStyle.module.scss'
interface GlobalStyleProps {
    children: ReactNode;
  }
const GlobalStyle: React.FC<GlobalStyleProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default GlobalStyle;