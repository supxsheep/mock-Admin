import axios from "axios";

/**
 * 获取每日名言
 * @returns 
 */
export const getQuotesApi = async ()=>{
  let result:any = await axios.get("https://api.vvhan.com/api/ian")
  result = result.data
  return result
}
