export interface ForecastRequest {
  brand: string;
  hierarchy: string;
  date: string; // Formato YYYY-MM-DD
}

export interface ForecastResponse {
  predicted_quantity: number;
}