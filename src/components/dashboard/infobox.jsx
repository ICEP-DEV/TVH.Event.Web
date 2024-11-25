


function InfoBox(args){
    return <div className="col-lg mx-3 ms-0 my-1 p-2 rounded-3" style={{backgroundColor:"var(--grey2)"}}>
        <p className="fs-6">
            {args.title}
        </p>
        <p className="fs-4 text-center">
            {args.quantity}
        </p>
    </div>
}


export default InfoBox;

