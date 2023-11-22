import { SingleCard, SingleMovieProps } from "../SingleCard/SingleCard"

export const HomePage = () => {
    const template: SingleMovieProps[] = [{genre: 'Horror', title:'test', liked: false, image:'https://i.etsystatic.com/27475238/r/il/728167/4295663532/il_794xN.4295663532_pn71.jpg'},
    {genre: 'Horror', title:'test', liked: false, image:'https://i.etsystatic.com/27475238/r/il/728167/4295663532/il_794xN.4295663532_pn71.jpg'},
    {genre: 'Horror', title:'asdasd', liked: true, image:'https://i.etsystatic.com/27475238/r/il/728167/4295663532/il_794xN.4295663532_pn71.jpg'},
    {genre: 'Horror', title:'fafas', liked: false, image:'https://i.etsystatic.com/27475238/r/il/728167/4295663532/il_794xN.4295663532_pn71.jpg'},
    {genre: 'Horror', title:'gdfgf', liked: true, image:'https://i.etsystatic.com/27475238/r/il/728167/4295663532/il_794xN.4295663532_pn71.jpg'},
    {genre: 'Horror', title:'vxcvxc', liked: false, image:'https://i.etsystatic.com/27475238/r/il/728167/4295663532/il_794xN.4295663532_pn71.jpg'}]
    return (
        <>
    <div style={{minWidth:'10%', backgroundColor:'lightblue'}}>
        <p>Test</p>
    </div>
    <div style={{backgroundColor:'gray'}}>
        <div style={{display:'flex', maxWidth:'50%', flexDirection:'row',gap: '2rem'}}>
        {template.map((elem) => (<SingleCard {...elem}/>))}
        </div>
        </div>
    </>
    )
}