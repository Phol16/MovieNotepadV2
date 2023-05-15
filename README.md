# MovieNotepadV2 (https://movienotepadclient.onrender.com/)

## A Fullstack application developed using React JS and TailwindCSS in the frontend and using node JS/Express JS in the backend while using mongodb for the database.

the purpose for this app is for users to keep track on a specific movie by providing notes to it.

### The major features of this application are :


 -Login/Register feature
 
 -Search feature ( to be able to search for a specific movie )
 
 -Add to watchlsit feature ( to be able to access taking note features )
 
 -Delete from watchlist feature
 
 -Add notes ( to be able to add notes t oa specific movie )
 
 -Delete notes
 
 
 ### Feature that are still in development :
 
 -Update profile
 
 -Delete profile
 
 -Admin access profile
 
 -Update notes
 
 ---
 
 Login/Register
 
 <img src='https://res.cloudinary.com/dy23rmhmq/image/upload/v1684147213/movienotepad/login_b1a0fc.png' alt='image'/>
 
 <img src='https://res.cloudinary.com/dy23rmhmq/image/upload/v1684147419/movienotepad/register_q2xjjf.png' alt='image'/>
 
 ---
 Search
 
 <img src='https://res.cloudinary.com/dy23rmhmq/image/upload/v1684147418/movienotepad/search_bht4j4.png' alt='image'/>
 
---

Add to watchlist

<img src='https://res.cloudinary.com/dy23rmhmq/image/upload/v1684147420/movienotepad/add_to_watch_list_htv8rd.png' alt='image'/>

---
  
Delete from watchlist

<img src='https://res.cloudinary.com/dy23rmhmq/image/upload/v1684147420/movienotepad/delete_fkc6qy.png' alt='image'/>

---
  
### Add notes

<img src='https://res.cloudinary.com/dy23rmhmq/image/upload/v1684147408/movienotepad/add_notes_pweqaz.png' alt='image'/>

---

### Delete notes

<img src='https://res.cloudinary.com/dy23rmhmq/image/upload/v1684147418/movienotepad/delete_note_kmbvvk.png' alt='image'/>

---
 
 ## Dependencies
 
 ### FrontEnd
 
 -vite
 
 -typescript
 
 -tailwindcss
 
 -react
 
 -react-dom
 
 -react-lazy-load-image-component
 
 -react-router-dom
 
 -react-toastify
 
 
 ### Backend
 
 -ts-node
 
 -cors
 
 -cookie-parser
 
 -dotenv
 
 -express
 
 -mongoose
 
 -lodash
 
 -jsonwebtoken
 
 -body-parser
 
 -morgan
 
 -typescript
 
 -nodemon
 
 ---
 
  ## Getting Started
 
 First, run the development server of the server side:
 
 ```bash
 npm start
 ```
 
 you can start editing the page by modifiying the files within the `server` folder.
 
 Second, run the development server of the client side:
 
 ```bash
 npm run dev
 ```
 
 Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
 
 you can start editing the page by modifiying the files within the `client` folder. the page auto-updates as you edit the file.
 
 ## Deploy on Vercel

The easiest way to deploy your app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
 
 ---
### Note:

To be able to access locally you must change the api value in the client side located at `client` > `src` >`api`

Bug: admin button in production have issue, it is not showing but in development no issue.
 
