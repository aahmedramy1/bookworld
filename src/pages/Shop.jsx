import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import BookCard from "../components/BookCard";
import StoreCard from "../components/StoreCard";
import AuthorCard from "../components/AuthorCard";

const Shop = () => {
    const navigate = useNavigate();

    const books = useSelector(state => state.books.allBooks).slice(0, 3);
    const stores = useSelector(state => state.stores.allStores).slice(0, 3);
    const authors = useSelector(state => state.authors.allAuthors).slice(0, 3);

    return (
        <div className='flex flex-col gap-6'>
            <section className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <div
                        className="text-2xl font-[500]"
                    >
                        Browse by Stores
                    </div>
                    <Button onClick={() => {}} color="primary" variant='contained'>
                        View All
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 overflow-auto">
                    {
                        stores.map(store => (
                            <StoreCard store={store} key={store.id} />
                        ))
                    }
                </div>
            </section>

            <section className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <div
                        className="text-2xl font-[500]"
                    >
                        Browse by Authors
                    </div>
                    <Button onClick={() => {}} color="primary" variant='contained'>
                        View All
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 overflow-auto">
                    {
                        authors.map(author => (
                            <AuthorCard author={author} key={author.id} />
                        ))
                    }
                </div>
            </section>

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