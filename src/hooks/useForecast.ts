import { useState } from 'react';
import { apiService } from '../services/api';
import type { ForecastRequest } from '../types';

export const useForecast = () => {
  const [predictedQuantity, setPredictedQuantity] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = async (requestData: ForecastRequest) => {
    setIsLoading(true);
    setError(null);
    setPredictedQuantity(null);

    try {
      const response = await apiService.predictDemand(requestData);
      setPredictedQuantity(response.predicted_quantity);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    predictedQuantity,
    isLoading,
    error,
    predict,
  };
};