// import { hyRequest } from "../request"
// export function getCityALL() {
//   return hyRequest.get({
//     url: "/city/all"
//   })
// }
import HYRequest from "../request"; // 注意这里使用默认导入  
  
export function getCityAll() {  
  return HYRequest.get({  
    url: "/city/all"  
  });  
}