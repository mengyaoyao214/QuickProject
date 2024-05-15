import hyRequset from '../request'
export function getHomeHotSuggests() {
  return hyRequset.get({
    url: "/home/hotSuggests"
  })
}

export function getHomeCategories(){
  return hyRequset.get({
    url:"/home/categories"
  })
}

export function getHomeHouselist(currentPage){
  return hyRequset.get({
    url: "/home/houselist",
    params:{
      page:currentPage
    }
  })
}
