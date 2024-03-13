import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  login: boolean;
  companyInfo: {
    companyName: string;
    companyAccount: string;
  };
  loginHandler: (companyInfo: AuthContextProps['companyInfo']) => void;
  logoutHandler: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    companyAccount: '',
  });

  const loginHandler = (newCompanyInfo: AuthContextProps['companyInfo']) => {
    setCompanyInfo(newCompanyInfo);
    setLogin(true);
  };

  const logoutHandler = () => {
    setCompanyInfo({
      companyName: '',
      companyAccount: '',
    });
    setLogin(false);
  };

  return (
    <AuthContext.Provider value={{ login, companyInfo, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


