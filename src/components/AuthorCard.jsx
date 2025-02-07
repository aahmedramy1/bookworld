import {Button} from "@mui/material";

const AuthorCard = ({ author }) => {

    const randomId = Math.floor(Math.random() * 100);
    const imageUrl = `https://randomuser.me/api/portraits/men/${randomId}.jpg`;

    return (
        <div className="flex gap-4 bg-white p-6 ">
            <div className="flex bg-[#FFEBE1] font-[500] justify-center items-center
    rounded-lg
    w-[125px] min-w-[125px] text-center h-[164px] overflow-hidden">
                <img
                    src={imageUrl}
                    alt="Random Person"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className='h-full flex flex-col justify-between items-start'>
                <div>
                    <div>{author.name}</div>
                </div>
                <Button onClick={() => {}} color="primary" variant='contained'  >
                    View Profile
                </Button>
            </div>
        </div>
    )
}

export default AuthorCard;