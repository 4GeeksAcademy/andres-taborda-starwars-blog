import { BASE_URL } from "../const";

export const makeUrlFetch = (options = {}) => {
  const { category = 'general', page = 1, limit = 10, id = null } = options;
  
  if(id){
    return `${BASE_URL}${category}/${id}`
  }
  
  const params = new URLSearchParams();
  params.append('page', page);
  params.append('limit', limit);
  
  
  return `${BASE_URL}${category}/?${params.toString()}`
  
}
