import { createContext, useState, ReactNode, useContext } from 'react';

// Define the structure of the user data
export interface User {
  name: string;
  lastName: string;
  birthDay: string;
  documentNumber: string;
  phoneNumber: string;
}

// Define the structure of the plan data
export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan | null) => void;
}

// Create the context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser, selectedPlan, setSelectedPlan }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
