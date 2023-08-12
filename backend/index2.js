const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require('path');
const fs = require('fs');
const constant = require('./messageConstant');
const dataCheckingTime = 5000;

// for hashing
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt


const app = express();

app.use(express.json());
app.use(cors());


function getConnection() {
    return mysql.createConnection({
        user: "root",
        host: "localhost",
        password: "",
        database: "linkedin"
    });
}


//  <-----------Registration-------->
app.post('/registration', async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, saltRounds);

    try {
        getConnection().query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password],
            (err, result) => {
                if (result) {
                    res.send({ message: constant.SUCCESS });
                } else {
                    res.send({ message: constant.DATA_DUPLICATION });
                }
            }
        )
    } catch (err) {
        res.send({ message: constant.SERVER_ERROR });
    }
})


//  <-----------Login-------->
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        getConnection().query(`SELECT * FROM users WHERE email = ?`, [email], async(err, result) => {
            if (result.length > 0) {
                const passwordMatch = await bcrypt.compare(password, result[0].password);
                if(passwordMatch){
                    res.send(result[0]);
                }
                else{
                    res.send({ message: constant.INCORRECT_PASSWORD})
                }
            } else {
                res.send({ message: constant.NULL_USER })
            }
        });
    } catch (err) {
        res.send({ message: constant.SERVER_ERROR });
    }
});


//  <-----------Making Post-------->
app.post('/post', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const article = req.body.article;
    const date = new Date();
    const image = null;
    const postID = Date.now() + email;


    try {
        getConnection().query("INSERT INTO posts (name, email, date, article_text,image, postID) VALUES (?, ?, ?, ?, ?, ?)", [name, email, date, article, image, postID],
            (err, result) => {
                if (result) {
                    try {
                        // getting all users email to set notification
                        getConnection().query("SELECT email FROM users", (err, result) => {
                            result.forEach((useremail) => {
                                // console.log(email.email);
                                if (useremail.email !== email) {
                                    getConnection().query("INSERT INTO notification (email, postID) VALUES (?, ?)", [useremail.email, postID], (err, result) => {
                                        if (err) console.log(err);
                                    });
                                }
                            });
                            // console.log(result);
                        })
                    } catch (error) {
                        res.send(constant.EXTERNAL_ERROR)
                    }
                    res.send({ message: constant.SUCCESS });

                } else {
                    res.send({ message: constant.SERVER_ERROR });
                }
            }
        )
    } catch (err) {
        res.send({ message: constant.SERVER_ERROR });
    }
});



//  <-----------Sending All Posts-------->
app.get('/getallPosts', (req, res) => {
    try {
        getConnection().query("SELECT * FROM posts ORDER BY date DESC", (err, result) => {
            let postList = [];
            result.forEach((post) => {

                postList.push({
                    name: post.name,
                    email: post.email,
                    date: post.date,
                    article: post.article_text,
                    image: post.image,
                    postID: post.postID,
                });
            });

            // console.log(postList.reverse());
            allPosts = postList;
            res.json(postList);
        })
    } catch (error) {
        res.send(constant.EXTERNAL_ERROR)
    }
})


//  <-----------Sending All Notifications-------->
app.get('/getallNotifications', (req, res) => {
    const useremail = req.query.email;
    // console.log('useremail', useremail);
    try {
        const query = `
            SELECT posts.name, posts.email, posts.date, posts.postID
            FROM posts, notification WHERE
            notification.email = ? AND
            notification.postID = posts.postID
            ORDER BY posts.date DESC
        `;
        getConnection().query(query, [useremail], (err, result) => {
            let notifiactionList = [];
            result.forEach((notifiaction) => {

                notifiactionList.push({
                    name: notifiaction.name,
                    email: notifiaction.email,
                    date: notifiaction.date,
                    postID: notifiaction.postID,
                });
            });

            // console.log(notifiactionList);
            res.send(notifiactionList);
        })
    } catch (error) {
        res.send(constant.EXTERNAL_ERROR)
    }
})


//  <-----------Deleting Notifications as it was read-------->
app.post('/removeNotification', (req, res) => {
    const email = req.body.email;
    const postID = req.body.postID;

    try {
        getConnection().query(`DELETE FROM notification WHERE email = ? AND postID = ?`, [email, postID], (err, result) => {
            if (err) {
                res.send({ message: constant.SERVER_ERROR });
            }
            else {
                res.send({ message: constant.SUCCESS });
            }
        });
    } catch (err) {
        res.send({ message: constant.SERVER_ERROR });
    }
});




app.listen(3001, () => {
    console.log("Running backend server on port 3001");
});
