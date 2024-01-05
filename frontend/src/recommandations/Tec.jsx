import React from "react";

const Rec = ({ top, bot, accessorie, hat, shoes }) => {
    
    return (
        <div>
            <div style={{
                display : "flex",
                flexDirection : "row"
            }}>
                <img src={(hat.image.filePath) ? hat.image.filePath : "https://cdn-icons-png.flaticon.com/512/5084/5084126.png" } style={{with:"100px", height:"100px"}}></img>
                <h1>{hat.name}</h1>
            </div>
            
            <div style={{
                display : "flex",
                flexDirection : "row"
            }}>
                <img style={{with:"100px", height:"100px"}} src={(top.image.filePath) ? top.image.filePath : "https://cdn-icons-png.flaticon.com/512/5084/5084126.png" }></img>
                <h1>{top.name}</h1>
            </div>
            
            <div style={{
                display : "flex",
                flexDirection : "row"
            }}>
                <img style={{with:"100px", height:"100px"}} src={(accessorie.image.filePath) ? accessorie.image.filePath : "https://cdn-icons-png.flaticon.com/512/5084/5084126.png" }></img>
                <h1>{accessorie.name}</h1>
            </div>
        
            <div style={{
                display : "flex",
                flexDirection : "row"
            }}>
                <img style={{with:"100px", height:"100px"}} src={(bot.image.filePath) ? bot.image.filePath : "https://cdn-icons-png.flaticon.com/512/5084/5084126.png" }></img>
                <h1>{bot.name}</h1>
            </div>

            <div style={{
                display : "flex",
                flexDirection : "row"
            }}>
                <img style={{with:"100px", height:"100px"}} src={(shoes.image.filePath) ? shoes.image.filePath : "https://cdn-icons-png.flaticon.com/512/5084/5084126.png" }></img>
                <h1>{shoes.name}</h1>
            </div>
        
        </div>
    )

}

export default Rec;