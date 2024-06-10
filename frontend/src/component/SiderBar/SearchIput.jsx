import React, { useState, useEffect } from 'react';
import { IoSearchSharp, IoPersonAddOutline } from "react-icons/io5";
import useGetCoversation from '../../hook/useGetCoversation';
import useConversation from '../../zustand/useConversation';
import useGetAllUsers from '../../hook/useGetAllUsers';
import useAddFriend from '../../hook/useAddFriend';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [peopleToAdd, setPeopleToAdd] = useState([]);
  const [selectedNewFriends, setSelectedNewFriends] = useState([]);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const { conversations } = useGetCoversation();
  const { setSelectedConversation,allFriends } = useConversation();
  const { allUsers } = useGetAllUsers();
  const {loading,addFriend}= useAddFriend()

  useEffect(() => {
    const people = allUsers; // Replace with actual people fetching logic
    setPeopleToAdd(
      people.filter(person => !allFriends.some(convo => convo._id === person._id))
    );
  }, [conversations, allUsers,allFriends]);

  useEffect(() => {
    if (search !== '') {
      setFilteredConversations(
        allFriends.filter(conversation =>
          conversation?.fullName.toLowerCase().includes(search.toLowerCase()) ||
          conversation?.username.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredConversations([]);
    }
  }, [search,allFriends]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setSearch('');
    setFilteredConversations([]);
  };

  const handleAddFriend = (person) => {
    if (!selectedNewFriends.includes(person._id)) {
      setSelectedNewFriends([...selectedNewFriends, person._id]);
    } else {
      setSelectedNewFriends(selectedNewFriends.filter(id => id !== person._id));
    }
  };

  const handleConfirmAddFriends = () => {
    addFriend(selectedNewFriends)
    setShowAddDropdown(false);
    setSelectedNewFriends([]);
  };

  return (
    <div className='relative flex items-center justify-between w-full '>
      <img src="/logo.svg" width="60px" height='60px' alt="logo" />
      <div className='relative flex items-center gap-2 '>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearchSharp />
        </label>
        {search !== '' && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 mt-1 z-10 max-h-96 overflow-y-auto rounded-md">
            {filteredConversations.length > 0 ? (
              <ul>
                {filteredConversations.map((conversation) => (
                  <li
                    key={conversation._id}
                    className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    {conversation.fullName}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <li className="px-4 py-2">No such user found</li>
              </ul>
            )}
          </div>
        )}
      </div>
      <div >
        <button 
          className='hover:bg-slate-500 h-full p-2 btn-circle'
          onClick={() => setShowAddDropdown(!showAddDropdown)}
        >
          <IoPersonAddOutline className='h-8 w-8 cursor-pointer hover:bg-slate-500' />
        </button>
        {showAddDropdown && peopleToAdd.length>0&& (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 w-full mt-1 z-10 max-h-96 overflow-y-auto rounded-md">
            <div className=' text-blue-400 font-thin p-3'>Add New Friends</div>
            <ul>
              {peopleToAdd.map((person) => (
                <li
                  key={person._id}
                  className={`px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100`}
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600 cursor-pointer"
                      checked={selectedNewFriends.includes(person._id)}
                      onChange={() => handleAddFriend(person)}
                    />
                    <span className="ml-2">{person.fullName}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="p-2 flex justify-end">
              <button 
                className='bg-blue-500 text-white px-4 py-2 rounded-md'
                onClick={handleConfirmAddFriends}
                disabled={selectedNewFriends.length === 0 || loading}
              >
                {!loading ?'Confirm':<span className='loading loading-spinner'></span>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;






































































// import React, { useState, useEffect } from 'react';
// import { IoSearchSharp } from "react-icons/io5";
// import useGetCoversation from '../../hook/useGetCoversation';
// import useConversation from '../../zustand/useConversation';
// import { IoPersonAddOutline } from "react-icons/io5";

// const SearchInput = () => {
//   const [search, setSearch] = useState('');
//   const [filteredConversations, setFilteredConversations] = useState([]);
//   const [selectedNewFriends, setSelectedFriends] = useState([]);
//   const { conversations } = useGetCoversation();
//   const { setSelectedConversation } = useConversation();

//   useEffect(() => {
//     if (search !== '') {
//       console.log(search);
//       setFilteredConversations(
//         conversations.filter(conversation =>
//           conversation?.fullName.toLowerCase().includes(search.toLowerCase()) || conversation?.username.toLowerCase().includes(search.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredConversations([]);
//     }
//   }, [search]);
// a
//   const handleSelectConversation = (conversation) => {
//     setSelectedConversation(conversation);
//     setSearch('');
//     setFilteredConversations([]);
//   };


//   return (
//     <div className='relative flex items-center gap-2'>
//       <img src="/logo.svg" width="60px" height='60px' alt="logo" />
//       <label className="input input-bordered flex items-center gap-2">
//         <input
//           type="text"
//           className="grow"
//           placeholder="Search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <IoSearchSharp />
//       </label>
//       {search !== '' && <div>
//         {filteredConversations.length > 0 ? (
//           <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 mt-1 z-10 max-h-60 overflow-y-auto rounded-md">
//             {filteredConversations.map((conversation) => (
//               <li
//                 key={conversation._id}
//                 className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                 onClick={() => handleSelectConversation(conversation)}
//               >
//                 {conversation.fullName}
//               </li>
//             ))}
//           </ul>
//         )
//           : <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 mt-1 z-10 max-h-60 overflow-y-auto rounded-md">
//             <li
//               className="px-4 py-2 "
//             >No such user found</li>
//           </ul>}
//       </div>}
//       <div>
//         <button className=' hover:bg-slate-500 h-full p-2 btn-circle'>
//           <IoPersonAddOutline className='h-8 w-8 cursor-pointer hover:bg-slate-500' />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchInput;





























// import React, { useState } from 'react'
// import { IoSearchSharp } from "react-icons/io5";
// import useGetCoversation from '../../hook/useGetCoversation';
// import useConversation from '../../zustand/useConversation';
// import toast from 'react-hot-toast';

// const SearchIput = () => {
//   const [search, setSearch] = useState('');
//   const { conversations } = useGetCoversation()
//   const { setSelectedConversation } = useConversation();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!search) return;
//     if (search.length < 3) {
//       toast.error('Please enter atleast three characters')
//     }
//     const foundConversation = conversations.find((conversation) => conversation?.fullName.toLowerCase().includes(search.toLowerCase()))
//     if (foundConversation) {
//       setSelectedConversation(foundConversation)
//       setSearch('')
//     }else{
//       toast.error('No user found with the search name ' + search)
//       setSearch('')
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className='flex items-center gap-2'>
//       <input
//         type="text" placeholder='Search...'
//         className='input input-bordered rounded-full'
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <button type='submit' className='btn btn-circle bg-blue-500 text-white'>

//         <IoSearchSharp className='h-6 w-6 outline-none' />
//       </button>
//     </form>
//   )
// }

// export default SearchIput