import { create } from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from"../lib/axios"

export useChatStore = create((set) => ({
    messages: [],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,
    
    addMessage: async(message)=>{
        try {
            const response= await axiosInstance.post("/api/messages",message)
            set({messages:[...state.messages,response.data]})
        }
    }
}
)
)