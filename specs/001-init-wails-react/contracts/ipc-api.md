# IPC Interface Contract: Wails Backend Bridge

**Feature**: [spec.md](file:///home/alok/building/bodhi-paper-v2/specs/001-init-wails-react/spec.md)  
**Branch**: `001-init-wails-react`  
**Date**: 2026-11-12  

---

## 1. Overview
This contract defines the inter-process communication (IPC) bindings exposed by the Go backend to the React TypeScript frontend via Wails v2 runtime bindings.

Wails automatically generates TypeScript bindings in `frontend/wailsjs/go/main/App.d.ts` and JavaScript wrappers in `frontend/wailsjs/go/main/App.js` based on public methods exposed on `App`.

---

## 2. Exposed Methods

### `GetHealth()`

Retrieves the runtime health status, version, and environment of the desktop backend service from `internal/health.go`.

#### Go Backend Signature
```go
// Package: internal
type HealthResponse struct {
    Status      string `json:"status"`
    Version     string `json:"version"`
    Environment string `json:"environment"`
    Timestamp   int64  `json:"timestamp"`
}

// In app.go (calling internal.GetHealth())
func (a *App) GetHealth() internal.HealthResponse
```

#### TypeScript Frontend Binding
```typescript
// frontend/wailsjs/go/main/App.d.ts
export interface HealthResponse {
    status: "ok" | "degraded" | "error";
    version: string;
    environment: string;
    timestamp: number;
}

export function GetHealth(): Promise<HealthResponse>;
```

#### Response Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "HealthResponse",
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["ok", "degraded", "error"]
    },
    "version": {
      "type": "string"
    },
    "environment": {
      "type": "string"
    },
    "timestamp": {
      "type": "integer"
    }
  },
  "required": ["status", "version", "environment", "timestamp"],
  "additionalProperties": false
}
```

---

### `Greet(name: string)`

Template verification method for parameter passing across the IPC bridge.

#### Go Backend Signature
```go
func (a *App) Greet(name string) string
```

#### TypeScript Frontend Binding
```typescript
export function Greet(name: string): Promise<string>;
```
