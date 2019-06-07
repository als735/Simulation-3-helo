module.exports = {
    retrieveAllPosts: (req, res, next) => {
        const {userposts, search} = req.query; // destructuring the query 
        const {session} = req; 
        const sqlSearch = '%' + search + '%' // makes it so the app will search the database for post titles with the search string anywhere in there
        const dbInstance = req.app.get('db'); // accessing the database 
        if (userposts === 'true' && search) { // If userposts is true AND there is a search string, the endpoint should respond with all the posts where
            dbInstance.search_posts(sqlSearch)
            .then( res => {
                res.status(200).send(res) //respond with all titles that contain the search string 
            })
            .catch (err => {
                res.status(500).send(err)
            })
        } else if (userposts === 'false' && search === '') { // If userposts is false AND there is no search string, the endpoint should respond with all the posts where...
            dbInstance.get_all_posts_not_from_this_user(sqlSearch) //The current user is NOT the author.
            .then(res => {
                res.status(200).send(res)
            })
            .catch (err => {
                res.status(500).send(err)
            })
        } else if (userposts === 'false' && search) { // If userposts is false AND there is no search string, the endpoint should respond with all the posts where
            dbInstance.search_for_posts_not_from_this_user(sqlSearch)
            .then(res => {
                res.status(200).send(res) // The current user is NOT the author. The title contains the search string.
            })
            .catch (err => {
                res.status(500).send(err)
            })
        } else if (userposts === 'true' && search === '') { // If userposts is true AND there is no search string, the endpoint should respond with all the posts.
            dbInstance.get_all_posts(sqlSearch)
            .then(res => {
                res.status(200).send(res)
            })
            .catch (err => {
                res.status(500).send(err)
            })
        }
    },  
    retrieveSinglePost: (req, res, next) => {

    }, 

    createAPost: (req, res, next) => {
    }
}