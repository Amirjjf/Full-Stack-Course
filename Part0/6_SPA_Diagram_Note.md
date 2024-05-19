# Sequence Diagram for Creating a New Note in the Single-Page App Version

```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Write note and click "Save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (note content)
    activate server
    server-->>browser: Confirmation of note saved
    deactivate server

    Note right of browser: The browser updates the displayed notes dynamically without reloading
