import {FaStore} from "react-icons/fa";

const StoreCard = ({ store }) => {

    return (
        <div className="flex gap-4 bg-white p-6 ">
            <div className="flex bg-[#FFEBE1] font-[500] justify-center items-center
                rounded-lg
                w-[125px] min-w-[125px] text-center h-[164px]" >
                <FaStore size={58} />
            </div>

            <div>
                <div>{store.name}</div>
            </div>
        </div>
    )
}

export default StoreCard;