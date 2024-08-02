import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {


    const socket = useMemo(()=>io("http://localhost:8080"),[]) 

    useEffect(()=>{
        socket.on('connect',()=>{
                console.log("connet client",socket.id);
                socket.on("welcome", (msg) => {console.log(msg);})

                socket.on("griting", (msg) => {console.log(msg);})                                                              
            }
        )
    },[])

   
    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Chat</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Chat</li>
                </ol>
            </div>
            
        </div>
    );
}

export default Chat;