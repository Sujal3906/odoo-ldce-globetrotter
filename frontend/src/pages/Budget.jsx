import { Check, CircleDollarSign, Hotel, Plus, Ticket, TrainFront, Utensils, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageIntro } from '../components/UI'

const categoryInfo = {
  stay: { label: 'Stay', color: '#5e8472', Icon: Hotel },
  transport: { label: 'Transport', color: '#e58262', Icon: TrainFront },
  food: { label: 'Food & drink', color: '#e8b75d', Icon: Utensils },
  activities: { label: 'Activities', color: '#718cb5', Icon: Ticket },
  other: { label: 'Other', color: '#8b8f96', Icon: CircleDollarSign },
}

export function Budget({ trips, updateTrip }) {
  const [tripId, setTripId] = useState(() => trips.find(trip => trip.status !== 'Completed')?.id || trips[0]?.id)
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const trip = trips.find(item => item.id === tripId) || trips[0]
  const expenses = trip?.expenses || []
  const totals = useMemo(() => {
    const planned = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
    const paid = expenses.filter(expense => expense.paid).reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
    const grouped = Object.entries(categoryInfo).map(([key, info]) => ({ key, ...info, amount: expenses.filter(expense => expense.category === key).reduce((sum, expense) => sum + Number(expense.amount || 0), 0) })).filter(group => group.amount > 0)
    return { planned, paid, grouped }
  }, [expenses])
  const budget = Number(trip?.budget || 0)
  const budgetProgress = budget ? Math.min((totals.planned / budget) * 100, 100) : 0
  const paidProgress = budget ? Math.min((totals.paid / budget) * 100, 100) : 0
  const pendingExpenses = expenses.filter(expense => !expense.paid)

  const addExpense = (expense) => {
    updateTrip(trip.id, { expenses: [...expenses, { ...expense, id: `expense-${Date.now()}` }] })
    setIsAddingExpense(false)
  }
  const togglePaid = (expenseId) => updateTrip(trip.id, { expenses: expenses.map(expense => expense.id === expenseId ? { ...expense, paid: !expense.paid } : expense) })

  if (!trip) return <div className="empty-state"><CircleDollarSign size={24} /><h2>Create a trip first</h2><p>Once you have dates and a destination, your budget will appear here.</p></div>

  return <>
    <PageIntro eyebrow={trip.name} title="Your travel budget" copy="Add every cost, mark payments, and keep the whole trip comfortably on track." action={<div className="budget-actions"><select value={trip.id} onChange={event => setTripId(event.target.value)} aria-label="Choose trip">{trips.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button className="primary-button" onClick={() => setIsAddingExpense(true)}><Plus size={17} />Add expense</button></div>} />
    <section className="budget-overview"><div className="budget-total"><div className="budget-ring" style={{ background: `conic-gradient(var(--sage) ${paidProgress}%, #e2e9e1 0)` }}><div><strong>${totals.paid.toLocaleString()}</strong><span>paid so far</span></div></div><div><p className="eyebrow">Total planned spend</p><h2>${totals.planned.toLocaleString()} <small>of ${budget.toLocaleString()} budget</small></h2><p>{budget ? (totals.planned > budget ? `You are $${(totals.planned - budget).toLocaleString()} over your comfort budget.` : `$${(budget - totals.planned).toLocaleString()} remains for the journey.`) : 'Set a trip budget to see your remaining amount.'}</p><div className="budget-bar"><span style={{ width: `${budgetProgress}%`, background: totals.planned > budget ? 'var(--coral)' : undefined }} /></div><div className="budget-scale"><span>$0</span><span>Budget ${budget.toLocaleString()}</span></div></div></div><aside className="budget-insight"><span className="insight-icon">✦</span><h3>{totals.planned > budget ? 'A small adjustment helps.' : 'You’re right on track.'}</h3><p>{pendingExpenses.length ? `${pendingExpenses.length} ${pendingExpenses.length === 1 ? 'expense is' : 'expenses are'} still waiting for payment.` : 'Every planned expense has been marked as paid.'}</p></aside></section>
    <section className="budget-grid"><div className="section-card spend-card"><div className="section-head"><div><p className="eyebrow">By category</p><h2>Where it’s going</h2></div><span className="quiet-label">${totals.planned.toLocaleString()} planned</span></div><div className="expense-list">{totals.grouped.length ? totals.grouped.map(group => <CategoryRow group={group} total={totals.planned} key={group.key} />) : <div className="budget-empty"><CircleDollarSign size={20} /><span>Add your first expense to see a breakdown.</span></div>}</div></div><div className="section-card daily-card"><p className="eyebrow">Payment progress</p><h2>{expenses.length ? `${expenses.filter(expense => expense.paid).length} of ${expenses.length} paid` : 'No expenses yet'}</h2><div className="payment-progress"><div><span>Paid</span><strong>${totals.paid.toLocaleString()}</strong></div><i><b style={{ width: `${totals.planned ? (totals.paid / totals.planned) * 100 : 0}%` }} /></i><div><span>Still to pay</span><strong>${(totals.planned - totals.paid).toLocaleString()}</strong></div></div></div></section>
    <section className="section-block"><div className="section-head"><div><p className="eyebrow">Expense list</p><h2>Payments and plans</h2></div><span className="quiet-label">{pendingExpenses.length} to pay</span></div><div className="upcoming-costs">{expenses.length ? expenses.map(expense => <ExpenseItem expense={expense} onToggle={() => togglePaid(expense.id)} key={expense.id} />) : <div className="empty-state"><CircleDollarSign size={21} /><h2>Nothing added yet</h2><p>Use “Add expense” to start tracking costs.</p></div>}</div></section>
    {isAddingExpense && <ExpenseModal onClose={() => setIsAddingExpense(false)} onSave={addExpense} />}
  </>
}

function CategoryRow({ group, total }) {
  const percent = total ? Math.round((group.amount / total) * 100) : 0
  const Icon = group.Icon
  return <div className="expense-row"><span className="expense-icon" style={{ color: group.color, background: `${group.color}1a` }}><Icon size={18} /></span><div className="expense-name"><strong>{group.label}</strong><div><i style={{ width: `${percent}%`, background: group.color }} /></div></div><span className="expense-percent">{percent}%</span><b>${group.amount.toLocaleString()}</b></div>
}

function ExpenseItem({ expense, onToggle }) {
  const info = categoryInfo[expense.category] || categoryInfo.other
  const Icon = info.Icon
  return <article className={`cost-item ${expense.paid ? 'is-paid' : ''}`}><span style={{ color: info.color, background: `${info.color}1a` }}><Icon size={18} /></span><div><h3>{expense.label}</h3><p>{info.label}{expense.dueDate ? ` · due ${new Date(`${expense.dueDate}T12:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric' })}` : ''}</p></div><strong>${Number(expense.amount).toLocaleString()}</strong><button className={`text-button ${expense.paid ? 'paid-button' : ''}`} onClick={onToggle}>{expense.paid ? <><Check size={15} />Paid</> : 'Mark paid'}</button></article>
}

function ExpenseModal({ onClose, onSave }) {
  const [form, setForm] = useState({ label: '', category: 'activities', amount: '', dueDate: '' })
  const [error, setError] = useState('')
  const change = (key, value) => setForm(current => ({ ...current, [key]: value }))
  const submit = (event) => { event.preventDefault(); if (!form.label.trim() || !form.amount || Number(form.amount) <= 0) { setError('Enter a description and an amount greater than zero.'); return } onSave({ ...form, label: form.label.trim(), amount: Number(form.amount), paid: false }) }
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="expense-title"><form className="expense-modal" onSubmit={submit}><div className="modal-head"><div><p className="eyebrow">Keep it clear</p><h2 id="expense-title">Add an expense</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close"><X size={20} /></button></div><label>What is this for?<input autoFocus value={form.label} onChange={event => change('label', event.target.value)} placeholder="e.g. Museum passes" /></label><div className="field-grid"><label>Category<select value={form.category} onChange={event => change('category', event.target.value)}>{Object.entries(categoryInfo).map(([key, info]) => <option value={key} key={key}>{info.label}</option>)}</select></label><label>Amount (USD)<input type="number" min="0.01" step="0.01" value={form.amount} onChange={event => change('amount', event.target.value)} placeholder="0.00" /></label></div><label>Due date <small>(optional)</small><input type="date" value={form.dueDate} onChange={event => change('dueDate', event.target.value)} /></label>{error && <p className="form-error">{error}</p>}<div className="editor-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button">Add expense <Plus size={17} /></button></div></form></div>
}
