import { getMonthlyExpenses } from '@/services/expensesService';
import { MonthExpensesChart } from '@/components/client';

export default async function Page() {

  const monthlyExpenses = await getMonthlyExpenses()

  return (
    <div className='flex-grow h-full'>
      <div className='flex flex-col items-center justify-center h-full py-2'>
        <h1>{monthlyExpenses.monthName}</h1>
        <div>
          <MonthExpensesChart data={monthlyExpenses.groups.map((group) => ({ amount: group.sum.amount, label: group.category!.name }))} />
        </div>
      </div>
    </div>
  )
}
