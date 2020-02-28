import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './store/reducer'
import {EmpIdProvider} from './contexts/EmpId/EmpIdContext'
import {EmployeeProvider} from './contexts/Emp/EmployeeContext'
import {HistoryProvider} from './contexts/History/HistoryContext'
import {ApprovalHistoryProvider} from './contexts/AprrovalHistory/ApprovalHistoryContext'



ReactDOM.render(
    <ApprovalHistoryProvider>
        <EmpIdProvider>
            <EmployeeProvider>
                <HistoryProvider>
                    <App/>
                </HistoryProvider>
            </EmployeeProvider>
        </EmpIdProvider>
    </ApprovalHistoryProvider>, document.getElementById('root'));

