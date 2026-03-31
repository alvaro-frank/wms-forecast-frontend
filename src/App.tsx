import React from 'react';
import { useForecast } from './hooks/useForecast';
import { ForecastForm } from './components/ForecastForm';
import './App.css';

function App() {
  const { predictedQuantity, isLoading, error, predict } = useForecast();

  return (
    <div className="app-container">
      <header>
        <h1>WMS Demand Forecasting</h1>
      </header>
      
      <main className="main-content">
        <section className="input-section">
          <h2>Nova Previsão</h2>
          <ForecastForm onSubmit={predict} isLoading={isLoading} />
        </section>

        <section className="output-section">
          <h2>Resultado</h2>
          {error && <div className="error-message">Erro: {error}</div>}
          
          {predictedQuantity !== null && !isLoading && (
            <div className="result-card">
              <h3>Quantidade Prevista</h3>
              <p className="quantity-value">{predictedQuantity.toFixed(2)}</p>
            </div>
          )}

          {!predictedQuantity && !isLoading && !error && (
            <p className="placeholder-text">Preenche o formulário para obter uma previsão.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;