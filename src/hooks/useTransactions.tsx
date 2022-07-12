import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;   
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
    );


export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

useEffect(() => {
    // fetch api data
    api.get('transactions')
    // with fetch we need to convert response to json, with axios we don't need to do this
    // .then(response => response.json())
    // when data is ready, set it to state
    .then(response => setTransactions(response.data.transactions))
}, []); 


    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});    
        const { transaction } = response.data;

        setTransactions([...transactions, transaction ]);
    }

    return (
        <TransactionsContext.Provider value={ { transactions, createTransaction} }>
            { children }
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    if (!context) {
        throw new Error('useTransactions must be used within a TransactionsProvider');
    }

    return context;
}