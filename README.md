
# Address Book Restful API

Welcome to the Address Book RESTful API, a comprehensive solution for managing personal contacts and addresses. This RESTful API seamlessly integrates address book functionality into your applications, providing users with intuitive tools to effortlessly create, retrieve, update, and delete their contacts.

In addition to contact management, the API offers robust authentication features. Users can securely access their accounts through login and registration, as well as recover lost passwords with the password reset and forgot password functionalities. Furthermore, users have full control over their profiles, enabling them to update passwords, upload and reset avatar images, and even delete their profiles if needed.

By leveraging the API, you can streamline the development process and empower users with powerful yet easy-to-use features for managing their contacts and profiles. 

## Features

 - ### Authentication
    - **Login**: Authenticates a user using the email and password. Upon successful authentication, a session is created for the user, and a secure HTTP cookie is set in the response to maintain the user's session.
    - **Register**: Register a new user with a unique email address
    - **Forgot password**: Sends an email with instructions for resetting the password
    - **Reset password**: Resets the password for the user account based on the instructions received via the email
    - **Logout**: Logs out the current user from the system and destroys the session for the logged-out user

- ### Managing contacts
    - **Get all contacts**: Returns contacts based on the provided query parameters. If no query parameters are provided, all contacts are returned. If the query parameter is provided, contacts matching the search criteria are returned
    - **Get contact by ID**: Retrieves contact information based on the provided contact ID
    - **Search contacts**: Searches for contacts based on the provided search query
    - **Add new contact**: Adds a new contact to the database
    - **Add contact to favorite**: Marks a contact as a favorite
    - **Update contact**: Updates the information of an existing contact
    - **Delete contact**: Deletes an existing contact from the database

- ### Profile
    - **Get user information**: Retrieves personal information such as first name, last name, birth date, email, and avatar of the logged-in user.
    - **Change password**: Allows users to change their password.
    - **Upload avatar image**: Allows users to upload a new avatar image. Only image files are allowed for upload.
    - **Reset avatar image**: Resets the avatar image of the user.
    - **Delete profile**: Deletes the profile of the user along with all added contacts from the profile.
    
- ### Server-Side Validation
    This API implements robust server-side validation mechanisms to ensure data integrity, security, and smooth operation. Leveraging a combination of middleware functions and the Joi validation library, the API meticulously verifies input data before processing, guaranteeing that only valid data is accepted and processed.

    - **Joi Validation**: Joi serves as the cornerstone of validation within the application. With Joi, intricate validation rules are defined to meticulously scrutinize incoming data against predefined schemas, assuring its accuracy and integrity before proceeding with further processing.

    - **Middleware Utilization**:
        - **Auth Middleware**: Ensures secure access to protected endpoints by verifying the authenticity of user authentication tokens. This middleware meticulously validates incoming requests, rejecting unauthorized access attempts and providing a seamless authentication experience for users. Additionally, it centralizes authentication logic, promoting code reusability and enhancing the overall security posture of the application.
        - **NotFound Middleware**: Effectively manages requests to non-existent routes and delivering meaningful response.
        - **Validation Middleware**: Scrutinizes incoming request payloads against predefined schemas, encompassing parameters, query strings, and request bodies. Leveraging the Joi validation library, it meticulously evaluates data accuracy, ensuring that only valid information is accepted and processed further.
        - **Error Middleware**: Orchestrates comprehensive error management throughout the application, seamlessly handling various error scenarios including Joi validation errors, custom API errors, and Multer errors. By centralizing error handling logic, it promotes uniformity in error responses, thereby improving the overall code maintainability and ensuring a seamless user experience.

## API Documentation and Postman Collection

- [SwaggerHub Documentation] <a href="https://app.swaggerhub.com/apis/MileMijatovic/address-book-restful-api/1.0.1">SwaggerHub Documentation</a>
- [Postman Collection] <a href="https://mm.omega.nextweb.space/address-book/address_book_postman_collection.json">Download Postman collection</a>
