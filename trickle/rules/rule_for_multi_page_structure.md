When building CRM applications with multiple views
Then
    - Each main section (dashboard, customers, sales, reports) should be a separate HTML page
    - Each page should have its own dedicated entry JS file (e.g., sales-app.js, reports-app.js)
    - Sidebar navigation should link to the appropriate HTML pages using href attributes
    - Each page should include its own complete CSS styling and component dependencies
    - Maintain consistent theme variables across all pages for visual coherence
    - Use separate component files for page-specific functionality (e.g., SalesChart.js, ReportsTable.js)