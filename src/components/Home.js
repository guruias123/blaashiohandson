import React, { useState, useEffect } from 'react'
import axios from "axios";
import './Home.css'

function Home() {
    const [playlist, setPlayList] = useState([]);
    const [savePlayList, setSavePlayList] = useState({
        PlayListId: 0,
        Post_Ids: [],
        Name: null,
        Description: null,
    });
    useEffect(() => {
        axios
            .post(
                "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1",
                {
                    Index: 1,
                    ContentType: [2],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
                        "X-tenant-key": "DIVANOR123",
                    },
                }
            )
            .then((res) => {
                console.log("RESPONSE", res);
                setPlayList(res.data.data.Feeds);
                console.log(res.data.data.Feeds);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        //   debugger;
        console.log(savePlayList);
    }, [savePlayList]);
    const setValue = (event) => {
        let value = event.target.value;
        if (event.target.name === "Post_Ids") {
            let postIds = savePlayList.Post_Ids;
            postIds.push(value);
            value = postIds;
        }
        setSavePlayList({
            ...savePlayList,
            ...{ [event.target.name]: value },
        });
    };
    const postTheData = () => {
        var config = {
            method: "post",
            url: "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prodapi/engt/createPlayList",
            headers: {
                Accept: "application/json, text/plain, /",
                "Content-Type": "multipart/form-data",
            },
            data: savePlayList,
        };
        axios(config)
            .then((res) => {
                console.log("POSTED", res);
            })
            .catch((err) => {
                console.log(err, "ERROR");
            });
    };
    return (
        <div>
            <div className='nav'>
                <input value={savePlayList.Name}
                    placeholder="Playlist Name"
                    type="text"
                    name="Name"
                    onChange={(e) => {
                        setValue(e);
                    }} />
                <input value={savePlayList.Description}
                    placeholder="Description"
                    type="text"
                    name="Description"
                    onChange={(e) => {
                        setValue(e);
                    }} />
                <button onClick={postTheData}>+ Create Playlist</button>
            </div>
            <div className='main'>

                {playlist.map((item) => {
                    return (
                        <div className="sub-main">
                            <input
                                type="checkbox"
                                name="Post_Ids"
                                value={item.EngagementPostId}
                                onChange={(e) => {
                                    setValue(e);
                                }}
                            />
                            <p >{item.Thumbnail_Title}</p>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default Home