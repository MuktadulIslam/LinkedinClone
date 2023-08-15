import React, { useEffect, useState } from 'react'
import constant from '../../messageConstant';


export default function HomePage(props) {
    let loadFirstTime = false;
    const user = props.user;
    const [allPost, setAllPost] = useState([]);


    const getallPost = async () => {
        try {
            const response = await fetch(constant.SERVER_IP + 'getallPosts');
            setAllPost(await response.json());
            // console.log(allPost)
        } catch (error) {
            console.error('An error occurred while sending request to get all post!!!');
        }
    }


    useEffect(() => {
        if (!loadFirstTime) {
            getallPost();
            loadFirstTime = true;
        }
    }, []);

    const getPostTime = (postDate) => {
        const postTime = new Date(postDate);
        const now = new Date();
        const timeDiff = now - postTime;

        const minutes = Math.floor(timeDiff / (1000 * 60));
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));

        // Format the date based on the elapsed time
        if (minutes < 1) {
            return <span style={{ color: 'blue' }}>Just now</span>;
        } else if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            return `${postDate.toDateString()}`;
        }

    }
    return (
        <>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">

                            {allPost.map((post) => (
                                post.email !== user.email ? (
                                    <div key={post.postID} className="card mb-5" style={{ borderRadius: '15px' }}>
                                        <div className="card-body p-4">
                                            <h3 className="mb-3">{post.name}</h3>
                                            <p className="small mb-0">
                                                <i className="far fa-star fa-lg"></i> <span className="mx-2">|</span>
                                                Created <strong>{getPostTime(post.date)}</strong>
                                            </p>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-start align-items-center">
                                                <p>{post.article}</p>
                                            </div>
                                        </div>

                                        {post.email !== user.email ?
                                            (<>
                                                <img alt='post image' src={post.image}
                                                    style={{
                                                        width: '100%',
                                                        border: '2px solid black'
                                                    }} />
                                            </>)
                                            : null
                                        }
                                    </div>
                                ) : null
                            ))}


                            {/* <div className="card mb-5" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-4">
                                    <h3 className="mb-3">User Name</h3>
                                    <p className="small mb-0"><i className="far fa-star fa-lg"></i> <span className="mx-2">|</span> Created on <strong> 11 April , 2023</strong></p>
                                    <hr className="my-4" />
                                    <div className="d-flex justify-content-start align-items-center">
                                        <p>Bangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with EasBangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with EasBangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with EasBangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with Eas</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-5" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-4">
                                    <h3 className="mb-3">User Name</h3>
                                    <p className="small mb-0"><i className="far fa-star fa-lg"></i> <span className="mx-2">|</span> Created on <strong> 11 April , 2023</strong></p>
                                    <hr className="my-4" />
                                    <div>
                                        <p>Bangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with EasBangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormousOn the southern coast, the Sundarbans, an enormous mangrove forest shared with EasBangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with Eas</p>
                                    </div>
                                    <img alt='post image' src="assets/img/loginBackground.webp"
                                        style={{
                                            width: '100%',
                                            border: '2px solid black'
                                        }} />

                                </div>
                            </div>

                            <div className="card mb-5" style={{ borderRadius: '15px', marginBottom: '3rem' }}>
                                <div className="card-body p-4">
                                    <h3 className="mb-3">User Name</h3>
                                    <p className="small mb-0"><i className="far fa-star fa-lg"></i> <span className="mx-2">|</span> Created on <strong> 11 April , 2023</strong></p>
                                    <hr className="my-4" />
                                    <div>
                                        <p>Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with EasBangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with Eas</p>
                                    </div>
                                </div>
                            </div>


                            <div className="card mb-5" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-4">
                                    <h3 className="mb-3">User Name</h3>
                                    <p className="small mb-0"><i className="far fa-star fa-lg"></i> <span className="mx-2">|</span> Created on <strong> 11 April , 2023</strong></p>
                                    <hr className="my-4" />
                                    <div>
                                        <p>Bangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with EasBangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormousOn the southern coast, the Sundarbans, an enormous mangrove forest shared with EasBangladesh, to the east of India on the Bay of Bengal, is a South Asian country marked by lush greenery and many waterways. Its Padma (Ganges), Meghna and Jamuna rivers create fertile plains, and travel by boat is common. On the southern coast, the Sundarbans, an enormous mangrove forest shared with Eas</p>
                                    </div>
                                    <img alt='post image' src="assets/img/loginBackground.webp"
                                        style={{
                                            width: '100%',
                                            border: '2px solid black'
                                        }} />

                                </div>
                            </div> */}



                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
