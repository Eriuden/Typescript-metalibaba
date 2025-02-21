import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllArticles } from "../redux/actions/article.actions"
import { ArticleCard } from "./ArticleCard"
import { isEmpty } from "../Utils"

export const Searcher = () => {

    type appDispatch = () => any
    const [search, setSearch] = useState("")
    const articles = useSelector((state: any) => state.allArticleReducer)
    const useAppDispatch = () => useDispatch<appDispatch>()
    const dispatch = useAppDispatch()

    useEffect(()=> {
        getAllArticles(articles, dispatch)
    }, [search])

    const handleSearchChange = (e: any) => {
        setSearch(e.target.value)

        const result = articles.filter((article: any)=> article.name.toLowerCase()
        .includes(search.toLowerCase()) 
        || article.groupe.toLowerCase().includes(search.toLowerCase())
        || article.typeArticle.toLowerCase().includes(search.toLowerCase()))

        setSearch(result)
    }
  return (
    <div className='flex justify-center'>
      <form action='' className='border-2 rounded-sm my-4 max-w-[100%] border-black'>
        <input className='text-center' type="text" placeholder="Article/type/groupe"
        onChange={handleSearchChange} value={search}/>
      </form>

      <div>
        { !isEmpty(articles[0]) && search !="" ? (
          articles.map((article:any) => {
            if (article.name.includes(search)){
              <ArticleCard articleProps={article} key={article._id}/>
            }
          })
        ): ""}
      </div>
    </div>
  )
}
