# Booking System Architecture

This document describes the state machine, WebSocket notifications, and lifecycle transitions of the BlueCollar booking engine.

## Booking State Machine

```
[ Customer creates booking ]
             │
             ▼
        ┌─────────┐
        │ PENDING │
        └─────────┘
         /       \
Provider/         \ Customer/Provider
Accept /           \ Reject / Cancel
      ▼             ▼
┌──────────┐   ┌───────────┐
│ ACCEPTED │   │ CANCELLED │
└──────────┘   └───────────┘
     │
     ▼
┌──────────┐
│  ON_WAY  │
└──────────┘
     │
     ▼
┌─────────────┐
│ IN_PROGRESS │
└─────────────┘
     │
     ▼
┌───────────┐
│ COMPLETED │
└───────────┘
     │
     ▼
[ Customer submits Review ]
```

## WebSocket Real-Time Events

1. **`booking:new`**:
   - Triggered when customer calls `POST /api/bookings`.
   - Broadcast to all connected providers to alert them of available nearby jobs.

2. **`booking:updated`**:
   - Triggered on provider accept, reject, or status progression.
   - Dispatched directly to the customer room (`socket.to(customerId)`) and broadcast to providers to update lists.

3. **`join`**:
   - Client sends its `userId` on mount to join a private room for targeted notifications.
