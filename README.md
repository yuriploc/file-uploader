# file-uploader
Sample file uploader app with React and Expressjs

* (GET) `/uploads` page
  * Fill the form, click submit
* (POST) `/uploads`
  * Parse the CSV and saves the data in the DB (pg)
  * Redirects to `/uploads/:uploadId`
* (GET) `/upload/:uploadId` page
  * Shows the information about the file uploaded
  
  
It always can be better :-)
