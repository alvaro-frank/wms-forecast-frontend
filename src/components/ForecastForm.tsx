// src/components/ForecastForm.tsx
import React, { useState, useMemo } from 'react';
import type { ForecastRequest } from '../types';
import { PRODUCT_MAPPING, BRAND_NAMES, getHierarchyName } from '../data/products'; 

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

  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(PRODUCT_MAPPING.map(item => item.brand))).sort();
  }, []);

  const availableHierarchies = useMemo(() => {
    if (!formData.brand) return [];
    return PRODUCT_MAPPING
      .filter(item => item.brand === formData.brand)
      .map(item => item.hierarchy)
      .sort();
  }, [formData.brand]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'brand') {
      setFormData((prev) => ({ 
        ...prev, 
        brand: value, 
        hierarchy: '' 
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="forecast-form">
      
      {/* Dropdown de Brand */}
      <div className="form-group">
        <label htmlFor="brand">Brand</label>
        <select 
          id="brand" 
          name="brand" 
          value={formData.brand} 
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="" disabled>Select Brand</option>
          {uniqueBrands.map((brand: string) => (
            <option key={brand} value={brand}>
              {BRAND_NAMES[brand] || 'Unknown Brand'} ({brand})
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="hierarchy">Product Category</label>
        <select 
          id="hierarchy" 
          name="hierarchy" 
          value={formData.hierarchy} 
          onChange={handleChange}
          className="form-select"
          required
          disabled={!formData.brand} 
        >
          <option value="" disabled>
            {!formData.brand ? 'Select Brand first' : 'Select Category'}
          </option>
          {availableHierarchies.map((hierarchy: string) => (
            <option key={hierarchy} value={hierarchy}>
              {getHierarchyName(hierarchy)} ({hierarchy})
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="date">Target Forecast Date</label>
        <input 
          required 
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          className="form-input"
          max="2024-12-31" 
        />
      </div>

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="spinner"></div>
            <span>Calculating...</span>
          </>
        ) : (
          <span>Predict Demand</span>
        )}
      </button>
    </form>
  );
};