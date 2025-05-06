import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigning: false,
    isLoging: false,
    isUpdating: false,

    isCheckingAuth: true,
    
    checkAuth: async () => {
          try {
                   const res = await axiosInstance.put("/auth/check");
          
                   set({authUser: res.data.user, isCheckingAuth: false});
          } catch (error) {
                     set({authUser: null});
          }finally {
                   set({isCheckingAuth: false});
          }
    }
}));