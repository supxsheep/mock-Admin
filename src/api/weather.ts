import axios from "axios";

/**
 * 获取当天天气
 * @returns 
 */
export const getTodayWeatherApi = async ()=>{
  let result:any = await axios.get("https://api.vvhan.com/api/weather")
  result = result.data.info
  return result
}

/**
 * 获取一周天气
 * @returns 
 */
export const getWeekWeatherApi = async () => {
  let result:any = await axios.get("https://api.vvhan.com/api/weather?type=week")
  result = result.data.data
  return result
};
