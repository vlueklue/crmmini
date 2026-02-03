When creating navigation components like sidebars or headers
Then
    - Create a single shared component that can be reused across all pages
    - Pass the current page as a prop to control active states
    - Avoid creating separate components for each page unless there are significant differences
    - Use consistent navigation links across all instances
    - This reduces code duplication and maintenance overhead