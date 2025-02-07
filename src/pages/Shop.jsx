import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import BookCard from "../components/BookCard";

const Shop = () => {
    const navigate = useNavigate();

    const books = useSelector(state => state.books.allBooks).slice(0, 3);

    return (
        <div>
            <section className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <div
                        className="text-2xl font-[500]"
                    >
                        Browse by Books
                    </div>
                    <Button onClick={() => navigate("/shop/books")} color="primary" variant='contained'>
                        View All
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 overflow-auto">
                    {
                        books.map(book => (
                            <BookCard book={book} key={book.id} />
                        ))
                    }
                </div>
            </section>
        </div>
    );
}

export default Shop;