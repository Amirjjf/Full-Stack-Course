# Sequence Diagram for Loading and Using the Single-Page App Version of Notes

```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Navigate to /spa
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data with notes
    deactivate server

    Note right of browser: The browser executes the callback function to render notes in the SPA

    user->>browser: Write note and click "Save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (note content)
    activate server
    server-->>browser: Confirmation of note saved
    deactivate server

    Note right of browser: The browser updates the displayed notes dynamically without reloading
