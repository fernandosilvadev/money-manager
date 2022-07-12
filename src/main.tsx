import React from 'react'
import ReactDOM from 'react-dom/client'
import { createServer, Model } from 'miragejs'
import { App } from './App'


createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        { 
          id: 1, 
          title: 'Salário', 
          amount: 1000, 
          category: 'receita', 
          type: 'deposit',
          createdAt: new Date('2022-01-01 09:00:00'),
        },
        { 
          id: 2, 
          title: 'Compras', 
          amount: 100.80, 
          category: 'despesa', 
          type: 'withdraw',
          createdAt: new Date('2022-05-01 10:00:00'),
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
