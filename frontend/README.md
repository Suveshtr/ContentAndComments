# Readable APP

This is a content and comment app using React Redux. Users will be able to post contents to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server to interact with the front-end portion of the project.

## Installing and Starting

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window
    - `cd frontend`
	- `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Usage

The command npm start opens the browser and displays the main page containing all posts. The posts can be viewd by categories links as displayed on the header.

* How to add a post
    - on the main page, click on the `green circle icon` with + sign on it
    - a form for adding a post is displayed. Fill in the Title, Author and Description of the post and select the      Category from the drop down. All fields are mandatory.
    - click on the Submit button which will open the main page for the category where the new added post is added.
    - the new post can also be seen under category named 'all'

* How to navigate to detail post
    - on the main page either click on the title of the post or the number of comments link ( if there are any         comments)
    - a new details post page will be displayed detailing the selected post and the comments underneath

* How to edit a post
    - a post can be editted either by clicking on the `Edit Post` button on the main page or by clicking on the        `Edit Post` link on the post detail page
    - an edit post form will be displayed. Only Title and Description fields are editable. 
    - click on `Submit` button to submit the changed post. This will take to detail post page showing modified post.

* How to delete a post
    - a post can be deleted either by clicking on the `Delete Post` button on the main page or by clicking on the        `Delete Post` link on the post detail page
    - a confirmation pop up will be diaplayed to confirm the deletion or cancel the deletion
    - on clicking the `Yes` confirmation the post shall be deleted and main page will be displayed without the         deleted post

* How to display comments
    - on the main page listing the posts click on the number of comments links
    - post details page will be displayed and the comments listing can be seen underneath the post detail

* How to add comment to a post
    - navigate to post detail page by clicking a post title on the main page that lists the posts
    - post detail page, click on the `Add Cooment` link in the post detail area
    - a form for adding a comment will be displayed. Fill in the Author and Description of the comment and click on    the Submit button to add the comment
    - post detail page will display the newly added comment

* How to edit a comment
    - navigate to post detail page and click on `Edit Comment` link on the comment that needs to be editted
    - Edit Comment form will be displayed where the Description of the comment can be editted
    - click on Submit button which will display the post detail page with modified comment

* How to delete a comment
    - navigate to post detail page and click on `Delet Comment` link on the comment that needs deletion
    - a confirmation pop up will be diaplayed to confirm the deletion or cancel the deletion
    - on clicking the `Yes` confirmation the comment shall be deleted and post detail page will be displayed without   the deleted comment