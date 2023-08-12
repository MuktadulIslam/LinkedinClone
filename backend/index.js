const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const database = require('./util/firebase')

const User = require('./util/user-database');
const Posts = require('./util/post-database');
const constant = require('./messageConstant');

app.post('/register', async (req, res) => {
    const userInfo = req.body;
    const email = req.body.email;

    if (!(await User.doc(email).get()).data()) {
        await User.doc(email).set(userInfo)
            .then(docRef => {
                console.log('Document written with ID: ', docRef.id);
                res.send({ message: constant.SUCCESS });
            })
            .catch(error => {
                console.error('Error adding document: ', error);
                res.send({ message: constant.SERVER_ERROR });
            });
    }
    else {
        res.send({ message: constant.DATA_DUPLICATION });
    }
})

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const data = await User.doc(email).get()
        if (data.data().password == password) {
            res.send(data.data());
        }
        else {
            res.send({ message: constant.INCORRECT_PASSWORD })
        }
    }
    catch (error) {
        // console.log(error);
        res.send({ message: constant.NULL_USER })
    }
})


app.post('/post', async (req, res) => {
    const email = req.body.email;
    const post = req.body;

    // Get the current date and time
    post.time = new Date()

    // Get specific components of the date and time
    // const year = currentDateTime.getFullYear();
    // const month = currentDateTime.getMonth() + 1; // Months are 0-based
    // const day = currentDateTime.getDate();
    // const hours = currentDateTime.getHours();
    // const minutes = currentDateTime.getMinutes();
    // const seconds = currentDateTime.getSeconds();


    try {
        await Posts.add(post);
        res.send({ message: constant.SUCCESS });
    }
    catch (error) {
        console.log(error);
        res.send({ message: constant.SERVER_ERROR });
    }

    // console.log(req.body.image)
    // res.send({ message: constant.SUCCESS });
})


app.post('/allpost', async (req, res) => {
    const userRef = database.ref("users");

    userRef.on("value", (snapshot) => {
        console.log("The user data has changed:");
        console.log(snapshot.val());
    });

    // const responsedata = await Posts.get()
    //   .catch(error => {
    //     console.error('Error adding document: ', error);
    //     res.send({ message: 'error' });
    //   });

    // if (responsedata) {
    //   let dataArray = [];
    //   responsedata.forEach(doc => {
    //     dataArray.push(doc.data());
    //   })

    //   res.send(dataArray);
    // }
})




app.listen(constant.PORT_NUMBER, () => {
    console.log("Running backend server on port 3001");
});