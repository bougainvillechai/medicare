FIGMA DESIGN : https://www.figma.com/design/ZLkjwG5ehxNRrC4SUA2WG7/Prescripto---UI-Design?node-id=0-1&p=f

To run the frontend first, type
-> cd frontend
-> npm run dev

To run backend ,
-> cd backend
-> npm run server

To check if the db is connected. type
-> node test-connection.js

To have quick loading/uploading of images and videos use CLOUDINARY
For default "user profile" image use Base64 image





-----------------------NOTE--------------------------------

Use of Multer: when you attach a file (like a doctor's photo for your Medicare project), the form must be sent as multipart/form-data. Standard Node.js body parsers (like express.json()) simply cannot read this complex, "multi-part" data stream. Here is why Multer is essential for your project

Use Thunder Client extension for testing REST API in VS CODE