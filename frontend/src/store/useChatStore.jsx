import { create } from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from"../lib/axios"

export const useChatStore = create((set) => ({
    messages: [],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

   
    getUsers : async()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data});
            
        } catch (error) {
            toast.error(error.response.data.messages)
        }finally{
            set({isUserLoading:false})
        }
    },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({selectedUser:userId,messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },
    // optimize this later
    setSelectedUser:(selectedUser)=> set({selectedUser}),

}
)
)