import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from 'underscore'

export default function useScroll(elRef){
  let el = window

  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  //防抖/节流
  const scrollListenerHandler = throttle( () => {
    if(el === window){
      clientHeight.value = document.documentElement.clientHeight//文档高度
      scrollTop.value = Math.ceil((document.documentElement.scrollTop))//滚了多少
      scrollHeight.value = document.documentElement.scrollHeight//总滚动区域
      
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = Math.ceil(el.scrollTop)
      scrollHeight.value = el.scrollHeight

    }
    
    if(clientHeight.value + scrollTop.value >= scrollHeight.value){
      
      console.log("hhhhhhh")
      isReachBottom.value = true
      
    }
    
  }, 100)

  onMounted(()=>{
    if(elRef) {
      el = elRef.value
    }
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return{ isReachBottom,clientHeight, scrollTop, scrollHeight}
}

