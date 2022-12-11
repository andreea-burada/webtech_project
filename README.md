### Specifications
#### General Specifications
- Front-end must be build with a component based framework(React.js, which is covered in the course, or Angular 2+, Vue.js)
- Back-end must have a REST interface and must be implemented in node.js
- Storage must be over a relational database and access to the database must be done via an ORM
- Code must be versioned in a git repository with incremental commits with clear descriptions
- Real application, coherent from a business logic standpoint
- The code must be well organized, variable names should be suggestive of their purpose and use a naming standard (e.g. camel case), the code should be indented for readability
- The code must be documented with comments for each class, function etc.
- Non working applications receive no points. However, functionality of the front-end or back-end can be demonstrated separately

#### Bug Tracking App
- As a student i can connect to the application with an account based on an email address.
- As a student member of a project team (PM) i can register a software project in the bug tracking application, specifying a description, the repository where the project is hosted and the project team.
- As a student that is not a member of the project team i can register as a tester (TST) for the project
- As a TST i can register a bug in the bug tracking application. The bug is registered with a severity, a description and a link to the commit that has been tested.
- As a PM i can see the registered bugs for the projects i participate in.
- As a PM i can allocate fixing a bug to myself. Only one PM can have a bug allocated at a particular time.
- As a PM, after solving a bug, i can add a status to the solution with a link to the commit through which the bug was fixed.
- The application has  a permission system. A PM can add and modify a project, can change the status of a bug. A TST can add a bug.
---
### Project Plan
#### Tasks
- Task 1: Add DB schema for project