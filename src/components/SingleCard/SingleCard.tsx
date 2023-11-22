export type SingleMovieProps = {
    title: string,
    image: string,
    genre: string,
    liked: boolean,
}

export const SingleCard = ({title,image,genre,liked} : SingleMovieProps) => {
    return(
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
            <div style={{height:'auto'}}>
                <img src={`${image}`} style={{maxWidth:'300px', maxHeight:'600px'}}/>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div style={{display:'flex', width:'100%', flexDirection:'column'}}>
                <p>{title}</p>
                <p>{genre}</p>
                </div>
                <button disabled={liked} style={{height:'30%', width:'100%'}}>Like</button>
            </div>
            </div>
    )
}