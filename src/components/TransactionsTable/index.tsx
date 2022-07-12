import { Container } from "./styles";
import { useTransactions } from '../../hooks/useTransactions';

export function TransactionsTable() {

    const { transactions } = useTransactions();

  return (
    <Container>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>title</th>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            
            <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                    <td>
                        {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
                    </td>
                    <td>{transaction.title}</td>
                    <td>{transaction.category}</td>
                    <td className={transaction.type}>
                        {new Intl.NumberFormat('pt-BR',{
                            style: 'currency',
                            currency: 'BRL',
                        }).format(transaction.amount)}
                    </td>
                </tr>
                ))}
           </tbody>
        </table>
    </Container>
  );
}