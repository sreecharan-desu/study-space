
type headingType = {
    text : string
}

export default function Heading({text}:headingType){
    return(<>
        <h1 className="text-xl font-bold first-letter:text-3xl">
            {text}
        </h1>
    </>)
}