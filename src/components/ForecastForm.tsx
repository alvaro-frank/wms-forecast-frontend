import React, { useState } from 'react';
import type { ForecastRequest } from '../types';

interface ForecastFormProps {
  onSubmit: (data: ForecastRequest) => void;
  isLoading: boolean;
}

export const ForecastForm: React.FC<ForecastFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ForecastRequest>({
    brand: '',
    hierarchy: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="forecast-form">
      <div className="form-group">
        <label htmlFor="brand">Brand ID</label>
        <input required type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label htmlFor="hierarchy">Hierarchy ID</label>
        <input required type="text" id="hierarchy" name="hierarchy" value={formData.hierarchy} onChange={handleChange} />
      </div>
      
      <div className="form-group">
        <label htmlFor="date">Target Date (YYYY-MM-DD)</label>
        <input required type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'A calcular...' : 'Prever Procura'}
      </button>
    </form>
  );
};