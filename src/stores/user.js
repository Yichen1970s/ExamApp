import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userId=ref(0)
  const username=ref('')

  function updateToken(payload){
    token.value=payload
  }
  function updateUserId(payload){
    userId.value=payload
  }
  function updateUsername(payload){
    username.value=payload
  }


  return { token,updateToken,updateUserId,userId,username,updateUsername}},
  
    {persist:{
      path:['token','userId','username']
    }
})
