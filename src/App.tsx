// src/App.tsx
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Legend } from 'recharts';
import { useForecast } from './hooks/useForecast';
import { ForecastForm } from './components/ForecastForm';
import './App.css';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPrediction = data.date === 'Forecast';
    return (
      <div className="custom-tooltip">
        <p className="tooltip-date">{isPrediction ? 'Predicted Value' : data.date}</p>
        <p className="tooltip-value" style={{ color: isPrediction ? 'var(--color-prediction)' : 'var(--color-accent)' }}>
          {payload[0].value.toFixed(2)} units
        </p>
      </div>
    );
  }
  return null;
};

function App() {
  const { predictedQuantity, historyData, isLoading, error, predict } = useForecast();

  const chartData = useMemo(() => {
    if (!historyData || historyData.length === 0) return [];
    
    const data = historyData.map(h => ({
      date: h.date,
      quantity: h.quantity,
    }));

    if (predictedQuantity !== null && !isLoading) {
      data.push({
        date: 'Forecast', 
        quantity: predictedQuantity,
      });
    }
    return data;
  }, [historyData, predictedQuantity, isLoading]);

  return (
    <div className="layout-container">
      <main className="main-content">
        <header className="page-header">
          <h1>Demand Forecasting Dashboard</h1>
        </header>
        
        <div className="grid-container">
          <section className="card form-card">
            <div className="card-header">
              <h2 className="card-title"><span>⚙️</span> Forecast Parameters</h2>
            </div>
            {error && <div className="error-message">Error: {error}</div>}
            <ForecastForm onSubmit={predict} isLoading={isLoading} />
          </section>

          <section className="results-area">
            
            {(predictedQuantity === null && !isLoading) && (
              <div className="card" style={{height: '100%'}}>
                <div className="placeholder-state">
                  <div className="placeholder-icon">📈</div>
                  <h3>Ready to Forecast</h3>
                  <p>Select a Brand, Hierarchy, and Target Date on the left panel<br /> to generate a demand prediction and visualize the trend.</p>
                </div>
              </div>
            )}

            {(predictedQuantity !== null || isLoading) && (
              <div className={`card result-highlight-card ${isLoading ? 'loading-skeleton' : ''}`}>
                <div>
                  <div className="highlight-label">Predicted Quantity</div>
                  <br></br>
                  <h2></h2>
                  <div className="highlight-value">
                    {isLoading ? '...' : predictedQuantity?.toFixed(2)}
                    <span style={{fontSize: '1.5rem', color: 'var(--color-text-muted)', marginLeft: '10px'}}>units</span>
                  </div>
                </div>
                <div className="placeholder-icon" style={{opacity: 0.1, margin: 0}}>📦</div>
              </div>
            )}

            {(historyData.length > 0 || isLoading) && (
              <div className={`card chart-card ${isLoading ? 'loading-skeleton' : ''}`}>
                <div className="card-header">
                  <h2 className="card-title"><span></span> Demand Trend & Forecast</h2>
                </div>
                
                <div className="chart-container">
                  <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis 
                        dataKey="date" 
                        stroke="var(--color-text-muted)" 
                        tick={{fontSize: 12}}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        stroke="var(--color-text-muted)" 
                        tick={{fontSize: 12}}
                        label={{ value: 'Units', angle: -90, position: 'insideLeft', fill: 'var(--color-text-muted)', offset: 10 }}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-accent)', strokeWidth: 1 }} />
                      
                      {/* Legenda Customizada via 'content' para evitar erros de TypeScript */}
                      <Legend 
                        content={() => (
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '12px', height: '3px', backgroundColor: 'var(--color-accent)' }}></div>
                              <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Historical Demand</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-prediction)' }}></div>
                              <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>Predicted Value</span>
                            </div>
                          </div>
                        )}
                      />

                      <Line 
                        name="Historical Demand"
                        type="monotone" 
                        dataKey="quantity" 
                        stroke="var(--color-accent)" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 5, stroke: 'var(--bg-card)', strokeWidth: 2 }}
                      />
                      
                      {predictedQuantity !== null && !isLoading && (
                        <ReferenceDot 
                          x="Forecast" 
                          y={predictedQuantity} 
                          r={6} 
                          fill="var(--color-prediction)" 
                          stroke="var(--bg-card)" 
                          strokeWidth={2}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;