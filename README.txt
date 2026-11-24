Travellite Tours — static site (FTP upload)

WHAT TO UPLOAD
Upload everything inside this folder to your web host document root (or a subdirectory) via FTP/SFTP:
  index.html
  about.html
  contact.html
  favicon.svg
  css/
  js/
  tours/

No Node.js, no build step, no Cursor publish — just copy files.

PAGES
  /                 Home
  /about.html       About
  /contact.html     Contact
  /tours/           Package listing
  /tours/*.html     Individual packages (5 itineraries)

LOCAL PREVIEW
  python3 -m http.server 8080 --bind 127.0.0.1
  then open http://127.0.0.1:8080/
