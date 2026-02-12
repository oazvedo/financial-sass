import { useTransactions } from "../../transactions/hooks/useTransactions";

export const useFinancialSummary = () => {
    const { transactions } = useTransactions();

    const totalIncomes = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncomes - totalExpenses;

    return { totalIncomes, totalExpenses, balance };
}