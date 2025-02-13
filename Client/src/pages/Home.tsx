import {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { ArticleCard } from "../components/ArticleCard"
import {getAllArticles} from "../redux/actions/article.actions"
import {isEmpty} from "../Utils"

export const Home = () => {
    const [loadCard, setLoadCard] = useState(false)
    const [count, setCount] = useState(0)
    const dispatch = useDispatch()
    const articles = useSelector((state:any)=> state.allArticleReducer)
  
  
    const loadMore = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >
        document.scrollingElement!.scrollHeight)
        {
          setLoadCard(true)
        }
    }
  
    useEffect(()=> {
      if (loadCard) {
        getAllArticles(count,dispatch)
        setLoadCard(false)
        setCount(count + 10)
      }
      window.addEventListener("scroll", loadMore)
    }, [loadCard, dispatch, count])
    
    return (
      <div>
        <div>
          <ul>
            {!isEmpty(articles[0]) &&
              articles.map((article:any) => {
                return <ArticleCard articleProps={article} key={article._id}/>
            })}
          </ul>
        </div>
      </div>
    )
}
