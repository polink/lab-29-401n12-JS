import React from 'react';
import ExpenseItem from '../ExpenseItem/ExpenseItem';

import ExpenseForm from '../ExpenseForm/ExpenseForm';

export default class Dashboard extends React.Component {
    constructor(props){
        super(props);

        this.state = {};

        // This array will hold all the expenses for our app
        this.state.expenses = [];

        // Expenses are going to have main properties
        // 1 - id
        // 2 - title
        // 3 - price
    }

    renderExpenses = () => {
        return(
            <ul>
                {
                    this.state.expenses.map(currentExpense => {
                        return <ExpenseItem expense={currentExpense}
                                            handleRemoveExpense={this.handleRemoveExpense}
                                            handleUpdateExpense={this.handleUpdateExpense}
                                            // handleAddExpense={this.handleAddExpense}
                        />
                    })
                }
            </ul>
        );
    };

    handleRemoveExpense = (expense) => {
        this.setState((previousState) => ({
            expenses: previousState.expenses.filter(currentExpense => currentExpense.id !== expense.id),
        }));
    };

    handleUpdateExpense = (expense) => {
        this.setState((previousState) => {
            const updateExpenses = previousState.expenses.map(currentExpense =>
            expense.id === currentExpense.id ? expense : currentExpense
            );
            return {expenses: updateExpenses};
        });
    };


    handleAddExpense = (expense) => {
        //    Faux "back end" that randomly creates IDs
        //    Assumes that expenses only have name and price

        this.setState((previousState) => {
            // In order to create a new state we create a new array
            // We do this to follow functional's programming principle of immutability

            return {
                expenses: [...previousState.expenses, {
                    ...expense,
                    id: Math.random(),
                    createdOn: new Date(),
                }],
            }
        });
    };

    render(){
        return(<div>
            <h2>Expense Dashboard</h2>
            <ExpenseForm handleAddExpense={this.handleAddExpense}/>
            {this.renderExpenses()}
        </div>);
    }
}