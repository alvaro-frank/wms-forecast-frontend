export interface HistoricalData {
  date: string;
  quantity: number;
  isPrediction?: boolean;
}

export interface ForecastRequest {
  brand: string;
  hierarchy: string;
  date: string;
}

export interface ForecastResponse {
  predicted_quantity: number;
  history: HistoricalData[]; // <--- Novo
}