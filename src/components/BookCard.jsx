const BookCard = ({ book }) => {
    return (
        <div className="flex gap-4 ">
            <div className="flex bg-[#FFEBE1] font-[500] justify-center items-center
                rounded-l-[20px] rounded-r-[4px]
                shadow-lg shadow-black/30
                w-[125px] min-w-[125px] text-center h-[164px]" >
                {book.name}
            </div>

            <div>
                <div>{book.name}</div>
                <div className='text-[#8F8F8F]'>by Brooklyn Simmons </div>
                <div>Stores:</div>
            </div>
        </div>
    );
}

export default BookCard;