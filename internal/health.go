package internal

import "time"

// HealthResponse represents the runtime health and environment status of the application.
type HealthResponse struct {
	Status      string `json:"status"`
	Version     string `json:"version"`
	Environment string `json:"environment"`
	Timestamp   int64  `json:"timestamp"`
}

// GetHealth returns the current operational status of the local desktop application backend.
func GetHealth() HealthResponse {
	return HealthResponse{
		Status:      "ok",
		Version:     "0.1.0",
		Environment: "development",
		Timestamp:   time.Now().UnixMilli(),
	}
}
