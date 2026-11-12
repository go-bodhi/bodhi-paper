package internal

import (
	"testing"
	"time"
)

func TestGetHealth(t *testing.T) {
	before := time.Now().UnixMilli()
	resp := GetHealth()
	after := time.Now().UnixMilli()

	if resp.Status != "ok" {
		t.Errorf("expected status 'ok', got '%s'", resp.Status)
	}

	if resp.Version != "0.1.0" {
		t.Errorf("expected version '0.1.0', got '%s'", resp.Version)
	}

	if resp.Environment != "development" && resp.Environment != "production" {
		t.Errorf("expected valid environment, got '%s'", resp.Environment)
	}

	if resp.Timestamp < before || resp.Timestamp > after {
		t.Errorf("expected timestamp between %d and %d, got %d", before, after, resp.Timestamp)
	}
}
